import { BN } from '@project-serum/anchor';
import {
	AMM_RESERVE_PRECISION, MARK_PRICE_PRECISION, QUOTE_PRECISION
} from '../constants/numericConstants';
import { PythClient } from '../pythClient';
import { Market } from '../types';
import { calculateMarkPrice } from './market';
/**
 *
 * @param market
 * @param pythClient
 * @param periodAdjustment
 * @param estimationMethod
 * @returns Estimated funding rate. : Precision //TODO-PRECISION
 */
export async function calculateEstimatedFundingRate(
	market: Market,
	pythClient: PythClient,
	periodAdjustment: BN = new BN(1),
	estimationMethod: 'interpolated' | 'lowerbound' | 'capped'
): Promise<BN> {
	// periodAdjustment
	// 	1: hourly
	//  24: daily
	//  24 * 365.25: annualized
	const secondsInHour = new BN(3600);
	const hoursInDay = new BN(24);

	if (!market.initialized) {
		return new BN(0);
	}

	const payFreq = new BN(market.amm.fundingPeriod);

	const oraclePriceData = await pythClient.getPriceData(market.amm.oracle);
	const oracleTwapWithMantissa = new BN(
		oraclePriceData.twap.value * MARK_PRICE_PRECISION.toNumber()
	);

	const now = new BN((Date.now() / 1000).toFixed(0));
	const timeSinceLastUpdate = now.sub(market.amm.lastFundingRateTs);

	const lastMarkTwapWithMantissa = market.amm.lastMarkPriceTwap;
	const lastMarkPriceTwapTs = market.amm.lastMarkPriceTwapTs;

	const timeSinceLastMarkChange = now.sub(lastMarkPriceTwapTs);
	const markTwapTimeSinceLastUpdate = lastMarkPriceTwapTs.sub(
		market.amm.lastFundingRateTs
	);

	const baseAssetPriceWithMantissa = calculateMarkPrice(market);

	const markTwapWithMantissa = markTwapTimeSinceLastUpdate
		.mul(lastMarkTwapWithMantissa)
		.add(timeSinceLastMarkChange.mul(baseAssetPriceWithMantissa))
		.div(timeSinceLastMarkChange.add(markTwapTimeSinceLastUpdate));

	const twapSpread = markTwapWithMantissa.sub(oracleTwapWithMantissa);

	const twapSpreadPct = twapSpread
		.mul(MARK_PRICE_PRECISION)
		.mul(new BN(100))
		.div(oracleTwapWithMantissa);

	if (estimationMethod == 'lowerbound') {
		//assuming remaining funding period has no gap
		return twapSpreadPct
			.mul(payFreq)
			.mul(BN.min(secondsInHour, timeSinceLastUpdate))
			.mul(periodAdjustment)
			.div(secondsInHour)
			.div(secondsInHour)
			.div(hoursInDay);
	} else if (estimationMethod == 'capped') {
		const interpRateQuote = twapSpreadPct
			.mul(periodAdjustment)
			.div(hoursInDay)
			.div(MARK_PRICE_PRECISION.div(QUOTE_PRECISION));
		const feePoolSize = calculateFundingPool(market);

		if (market.baseAssetAmountLong.gt(market.baseAssetAmountShort)) {
			const largerSide = market.baseAssetAmountLong;
			const smallerSide = market.baseAssetAmountShort;
			const cappedAltRate = feePoolSize
				.add(smallerSide.mul(interpRateQuote).div(AMM_RESERVE_PRECISION))
				.div(largerSide);
			return cappedAltRate;
		} else if (market.baseAssetAmountLong.lt(market.baseAssetAmountShort)) {
			const largerSide = market.baseAssetAmountShort;
			const smallerSide = market.baseAssetAmountLong;
			const cappedAltRate = feePoolSize
				.add(smallerSide.mul(interpRateQuote).div(AMM_RESERVE_PRECISION))
				.div(largerSide);
			return cappedAltRate;
		} else {
			return twapSpreadPct.mul(periodAdjustment).div(hoursInDay);
		}
	} else {
		return twapSpreadPct.mul(periodAdjustment).div(hoursInDay);
	}
}

/**
 *
 * @param market
 * @returns Estimated fee pool size
 */
export function calculateFundingPool(market: Market): BN {
	const totalFeeLB = market.amm.totalFee.div(new BN(2));
	const feePool = market.amm.totalFeeMinusDistributions.sub(totalFeeLB);
	return feePool;
}
