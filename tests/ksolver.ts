import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import BN from 'bn.js';
import { USDC_PRECISION } from '../sdk/lib';
import {
	AMM_MANTISSA,
	ClearingHouse,
	PositionDirection,
	stripMantissa,
	PEG_SCALAR,
	MAX_LEVERAGE,
} from '../sdk/src';
import { ClearingHouseUser } from '../sdk/src/clearingHouseUser';
import {
	createPriceFeed,
	mockUSDCMint,
	mockUserUSDCAccount,
} from './testHelpers';

describe('AMM Curve', () => {
	// K SOLVER: find opitimal k given exchange details

	const NUM_USERS = 100;
	const MAX_DEPOSIT = 1000;
	const initialSOLPrice = 150;

	const MAX_USER_TRADE = MAX_DEPOSIT * MAX_LEVERAGE.toNumber();
	const ARB_CAPITAL = 50000;
	const TARGET_MAX_SLIPPAGE = 0.2; // for MAX_DEPOSIT * MAX_LEVERAGE position

	function calculateTheoPriceImpact(
		direction: PositionDirection,
		amount: BN,
		kSqrt: BN,
		unit?:
			| 'entryPrice'
			| 'maxPrice'
			| 'priceDelta'
			| 'priceDeltaAsNumber'
			| 'pctAvg'
			| 'pctMax'
			| 'quoteAssetAmount'
			| 'quoteAssetAmountPeg'
			| 'acquiredBaseAssetAmount'
			| 'acquiredQuoteAssetAmount'
	) {
		if (amount.eq(new BN(0))) {
			return new BN(0);
		}
		const market = this.getMarketsAccount().markets[marketIndex.toNumber()];
		const oldPrice = this.calculateBaseAssetPriceWithMantissa(marketIndex);
		const invariant = market.amm.sqrtK.mul(market.amm.sqrtK);

		const [newQuoteAssetAmount, newBaseAssetAmount] = this.findSwapOutput(
			kSqrt,
			kSqrt,
			direction,
			amount.abs(),
			'quote',
			invariant,
			market.amm.pegMultiplier
		);

		const entryPrice = this.calculateCurvePriceWithMantissa(
			market.amm.baseAssetReserve.sub(newBaseAssetAmount),
			market.amm.quoteAssetReserve.sub(newQuoteAssetAmount),
			market.amm.pegMultiplier
		).mul(new BN(-1));

		if (entryPrice.eq(new BN(0))) {
			return new BN(0);
		}

		const newPrice = this.calculateCurvePriceWithMantissa(
			newBaseAssetAmount,
			newQuoteAssetAmount,
			market.amm.pegMultiplier
		);

		if (oldPrice == newPrice) {
			throw new Error('insufficient `amount` passed:');
		}

		let slippage;
		if (newPrice.gt(oldPrice)) {
			if (unit == 'pctMax') {
				slippage = newPrice.sub(oldPrice).mul(AMM_MANTISSA).div(oldPrice);
			} else if (unit == 'pctAvg') {
				slippage = entryPrice.sub(oldPrice).mul(AMM_MANTISSA).div(oldPrice);
			} else if (
				[
					'priceDelta',
					'quoteAssetAmount',
					'quoteAssetAmountPeg',
					'priceDeltaAsNumber',
				].includes(unit)
			) {
				slippage = newPrice.sub(oldPrice);
			}
		} else {
			if (unit == 'pctMax') {
				slippage = oldPrice.sub(newPrice).mul(AMM_MANTISSA).div(oldPrice);
			} else if (unit == 'pctAvg') {
				slippage = oldPrice.sub(entryPrice).mul(AMM_MANTISSA).div(oldPrice);
			} else if (
				[
					'priceDelta',
					'quoteAssetAmount',
					'quoteAssetAmountPeg',
					'priceDeltaAsNumber',
				].includes(unit)
			) {
				slippage = oldPrice.sub(newPrice);
			}
		}
		if (unit == 'quoteAssetAmount') {
			slippage = slippage.mul(amount);
		} else if (unit == 'quoteAssetAmountPeg') {
			slippage = slippage.mul(amount).div(market.amm.pegMultiplier);
		} else if (unit == 'priceDeltaAsNumber') {
			slippage = stripMantissa(slippage);
		}

		return slippage;
	}

	function kSolver() {
		const kSqrt0 = new anchor.BN(2 * 10 ** 13);

		let count = 0;

		let avgSlippageCenter = calculateTheoPriceImpact(
			PositionDirection.LONG,
			new BN(MAX_DEPOSIT).mul(MAX_LEVERAGE).mul(AMM_MANTISSA),
			kSqrt0,
			'pctMax'
		);

		const targetSlippageBN = new BN(
			TARGET_MAX_SLIPPAGE * AMM_MANTISSA.toNumber()
		);
		let kSqrtI: BN;

		while (avgSlippageCenter.gt(targetSlippageBN) || count > 1000) {
			kSqrtI = kSqrt0.mul(targetSlippageBN.div(avgSlippageCenter));
			avgSlippageCenter = calculateTheoPriceImpact(
				PositionDirection.LONG,
				new BN(MAX_DEPOSIT).mul(MAX_LEVERAGE).mul(AMM_MANTISSA),
				kSqrtI,
				'pctMax'
			);

			count += 1;
		}

		return kSqrtI;
	}

	const provider = anchor.Provider.local();
	const connection = provider.connection;
	anchor.setProvider(provider);
	const chProgram = anchor.workspace.ClearingHouse as Program;

	const clearingHouse = ClearingHouse.from(
		connection,
		provider.wallet,
		chProgram.programId
	);

	const kSqrt = new anchor.BN(2 * 10 ** 12);

	let usdcMint: Keypair;
	let userUSDCAccount: Keypair;

	let solUsdOracle;
	const marketIndex = new BN(0);
	const initialSOLPriceBN = new BN(initialSOLPrice * PEG_SCALAR.toNumber());
	function normAssetAmount(assetAmount: BN, pegMultiplier: BN): BN {
		// assetAmount is scaled to offer comparable slippage
		return assetAmount.mul(AMM_MANTISSA).div(pegMultiplier);
	}
	const usdcAmount = new BN(1000 * 10 ** 6);
	const solPositionInitialValue = usdcAmount;

	let userAccount: ClearingHouseUser;

	before(async () => {
		usdcMint = await mockUSDCMint(provider);
		userUSDCAccount = await mockUserUSDCAccount(usdcMint, usdcAmount, provider);

		await clearingHouse.initialize(usdcMint.publicKey, true);
		await clearingHouse.subscribe();

		solUsdOracle = await createPriceFeed({
			oracleProgram: anchor.workspace.Pyth,
			initPrice: initialSOLPrice,
		});
		const periodicity = new BN(60 * 60); // 1 HOUR
		const kSqrtNorm = normAssetAmount(kSqrt, initialSOLPriceBN);
		await clearingHouse.initializeMarket(
			marketIndex,
			solUsdOracle,
			kSqrtNorm,
			kSqrtNorm,
			periodicity,
			initialSOLPriceBN
		);
		await clearingHouse.initializeUserAccount();
		userAccount = ClearingHouseUser.from(
			clearingHouse,
			provider.wallet.publicKey
		);
		await userAccount.subscribe();
	});

	after(async () => {
		await clearingHouse.unsubscribe();
		await userAccount.unsubscribe();
	});

	const showBook = (marketIndex) => {
		const market =
			clearingHouse.getMarketsAccount().markets[marketIndex.toNumber()];
		const currentMark =
			clearingHouse.calculateBaseAssetPriceWithMantissa(marketIndex);

		const [bidsPrice, bidsCumSize, asksPrice, asksCumSize] =
			clearingHouse.liquidityBook(marketIndex, 3, 0.5);

		for (let i = asksCumSize.length - 1; i >= 0; i--) {
			console.log(
				stripMantissa(asksPrice[i]),
				stripMantissa(asksCumSize[i], USDC_PRECISION)
			);
		}

		console.log('------------');
		console.log(currentMark.toNumber() / AMM_MANTISSA.toNumber());
		console.log(
			'peg:',
			stripMantissa(market.amm.pegMultiplier, PEG_SCALAR),
			'k (M*M):',
			stripMantissa(market.amm.sqrtK)
		);
		console.log('------------');
		for (let i = 0; i < bidsCumSize.length; i++) {
			console.log(
				stripMantissa(bidsPrice[i]),
				stripMantissa(bidsCumSize[i], USDC_PRECISION)
			);
		}
	};

	it('After Deposit', async () => {
		await clearingHouse.depositCollateral(
			usdcAmount,
			userUSDCAccount.publicKey
		);
	});

	it('After Position Taken', async () => {
		await clearingHouse.openPosition(
			PositionDirection.LONG,
			solPositionInitialValue,
			marketIndex
		);

		const avgSlippageCenter = clearingHouse.calculatePriceImpact(
			PositionDirection.LONG,
			new BN(MAX_USER_TRADE * AMM_MANTISSA.toNumber()),
			new BN(0),
			'pctAvg'
		);
		showBook(marketIndex);

		const targetPriceUp = new BN(initialSOLPrice * AMM_MANTISSA.toNumber() * 2);

		const [direction, tradeSize, _] = clearingHouse.calculateTargetPriceTrade(
			marketIndex,
			targetPriceUp
		);

		await clearingHouse.moveAmmToPrice(marketIndex, targetPriceUp);

		const avgSlippage25PctOut = clearingHouse.calculatePriceImpact(
			PositionDirection.LONG,
			new BN(MAX_USER_TRADE * AMM_MANTISSA.toNumber()),
			new BN(0),
			'pctAvg'
		);

		showBook(marketIndex);

		console.log(
			'arbBot Long Size',
			stripMantissa(tradeSize, USDC_PRECISION),
			'\n Center Slippage:',
			stripMantissa(avgSlippageCenter) / 100,
			'\n 100% up out Slippage:',
			stripMantissa(avgSlippage25PctOut) / 100
		);
	});
});
