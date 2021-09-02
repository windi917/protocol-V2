import { TradeRecord } from './DataTypes';
import { AMM_MANTISSA } from './clearingHouse';
import { Candle } from './types';

export type Candles = {
	s: 'ok' | 'error';
	t: number[];
	c: number[];
	o: number[];
	h: number[];
	l: number[];
	v: number[];
};

// This Type is copied from tradingview charting_library
type Bar = {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
};

const tradePrice = (trade: TradeRecord) =>
	trade.quoteAssetNotionalAmount
		.div(trade.baseAssetAmount)
		.div(AMM_MANTISSA)
		.toNumber();

const tradeVolume = (trade: TradeRecord) =>
	trade.quoteAssetNotionalAmount
		.div(trade.baseAssetAmount)
		.div(AMM_MANTISSA)
		.toNumber();

/**
 * Batches multiple TradeRecords over a span of time into an array of TradingView Bars
 * @param trades
 * @param from
 * @param to
 * @param resolution
 * @param index
 * @returns
 */
export const batchTradeRecordsToTvBars = (
	trades: TradeRecord[],
	from: number,
	to: number,
	resolution: number,
	index?: number
): Bar[] | undefined => {
	let filteredTrades = trades.filter(
		(t) => t.ts.toNumber() >= from && t.ts.toNumber() < to
	);

	if (index !== undefined)
		filteredTrades = filteredTrades.filter(
			(trade) => trade.marketIndex.toNumber() !== index
		);

	if (filteredTrades.length === 0) return undefined;

	const tradeBlocks: Bar[] = [];

	let currentFrom = from;

	//TODO - this runs in O(n^2) time .. can be done more efficiently if required
	while (currentFrom + resolution <= resolution) {
		const tradesForBar = filteredTrades.filter(
			(t) =>
				t.ts.toNumber() >= currentFrom &&
				t.ts.toNumber() < currentFrom + resolution
		);

		tradeBlocks.push(tradeRecordsToTvBar(tradesForBar));
		currentFrom += resolution;
	}

	// check if any remainder blocks which need to be handled;
	if (currentFrom < to) {
		const tradesForBar = filteredTrades.filter(
			(t) => t.ts.toNumber() >= currentFrom && t.ts.toNumber() < to
		);

		tradeBlocks.push(tradeRecordsToTvBar(tradesForBar));
	}

	return tradeBlocks;
};

/**
 * This method Converts TradeRecords from the ClearingHouse into a Bar for the TradingView Chart.
 * @param trades
 * @returns
 */
export const tradeRecordsToTvBar = (trades: TradeRecord[]): Bar => {
	const t0 = trades[0];

	const c: Bar = {
		open: tradePrice(t0),
		close: tradePrice(t0),
		high: tradePrice(t0),
		low: tradePrice(t0),
		volume: tradeVolume(t0),
		time: t0.ts.toNumber(),
	};

	trades.slice(1).forEach((t) => {
		c.close = tradePrice(t);
		c.high = Math.max(c.high, tradePrice(t));
		c.low = Math.min(c.low, tradePrice(t));
		c.volume += tradeVolume(t);
	});

	return c;
};

/**
 * This method handles the candles that come back from the exchange history server and converts them into Bars for the TradingView Chart.
 * @param candles
 * @returns
 */
export const candlesToTvBars = (candles: Candle[]): Bar[] => {
	return candles.map((candle) => ({
		time: candle.start + new Date().getTimezoneOffset() * 60 * 1000 * -1,
		open: candle.open,
		close: candle.close,
		low: candle.low,
		high: candle.high,
		volume: candle.volume,
	}));
};
