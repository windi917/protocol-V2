import { BN } from '@project-serum/anchor';
import { assert } from '../assert/assert';
import { ZERO } from './../constants/numericConstants';

export class BigNum {
	val: BN;
	precision: BN;

	static delim = '.';
	static spacer = ',';

	constructor(
		val: BN | number | string,
		precisionVal: BN | number | string = new BN(0)
	) {
		this.val = new BN(val);
		this.precision = new BN(precisionVal);
	}

	public add(bn: BigNum): BigNum {
		assert(bn.precision.eq(this.precision), 'Adding unequal precisions');

		return BigNum.from(this.val.add(bn.val), this.precision);
	}

	public sub(bn: BigNum): BigNum {
		assert(bn.precision.eq(this.precision), 'Subtracting unequal precisions');

		return BigNum.from(this.val.sub(bn.val), this.precision);
	}

	public mul(bn: BigNum | BN): BigNum {
		const mulVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		return BigNum.from(
			this.val.mul(mulVal.val),
			this.precision.add(mulVal.precision)
		);
	}

	/**
	 * Multiplies by another big number then scales the result down by the big number's precision so that we're in the same precision space
	 * @param bn
	 * @returns
	 */
	public scalarMul(bn: BigNum | BN): BigNum {
		if (bn instanceof BN) return BigNum.from(this.val.mul(bn), this.precision);

		return BigNum.from(
			this.val.mul(bn.val),
			this.precision.add(bn.precision)
		).shift(bn.precision.neg());
	}

	public div(bn: BigNum | BN): BigNum {
		if (bn instanceof BN) return BigNum.from(this.val.div(bn), this.precision);
		return BigNum.from(this.val.div(bn.val), this.precision.sub(bn.precision));
	}

	/**
	 * Shift precision up or down
	 * @param exponent
	 * @param skipAdjustingPrecision
	 * @returns
	 */
	public shift(exponent: BN | number, skipAdjustingPrecision = false): BigNum {
		const shiftVal = typeof exponent === 'number' ? new BN(exponent) : exponent;

		return BigNum.from(
			shiftVal.isNeg()
				? this.val.div(new BN(10).pow(shiftVal))
				: this.val.mul(new BN(10).pow(shiftVal)),
			skipAdjustingPrecision ? this.precision : this.precision.add(shiftVal)
		);
	}

	/**
	 * Shift to a target precision
	 * @param targetPrecision
	 * @returns
	 */
	public shiftTo(targetPrecision: BN): BigNum {
		return this.shift(targetPrecision.sub(this.precision));
	}

	/**
	 * Scale the number by a fraction
	 * @param numerator
	 * @param denominator
	 * @returns
	 */
	public scale(numerator: BN | number, denominator: BN | number): BigNum {
		return this.mul(BigNum.from(new BN(numerator))).div(new BN(denominator));
	}

	public toPercentage(denominator: BigNum, precision: number): string {
		return this.shift(precision)
			.shift(2, true)
			.div(denominator)
			.toPrecision(precision);
	}

	public gt(bn: BigNum | BN, ignorePrecision?: boolean): boolean {
		const comparisonVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		if (!ignorePrecision && !comparisonVal.eq(ZERO)) {
			assert(
				comparisonVal.precision.eq(this.precision),
				'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter'
			);
		}

		return this.val.gt(comparisonVal.val);
	}

	public lt(bn: BigNum | BN, ignorePrecision?: boolean): boolean {
		const comparisonVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		if (!ignorePrecision && !comparisonVal.val.eq(ZERO)) {
			assert(
				comparisonVal.precision.eq(this.precision),
				'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter'
			);
		}

		return this.val.lt(comparisonVal.val);
	}

	public gte(bn: BigNum | BN, ignorePrecision?: boolean): boolean {
		const comparisonVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		if (!ignorePrecision && !comparisonVal.val.eq(ZERO)) {
			assert(
				comparisonVal.precision.eq(this.precision),
				'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter'
			);
		}

		return this.val.gte(comparisonVal.val);
	}

	public lte(bn: BigNum | BN, ignorePrecision?: boolean): boolean {
		const comparisonVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		if (!ignorePrecision && !comparisonVal.val.eq(ZERO)) {
			assert(
				comparisonVal.precision.eq(this.precision),
				'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter'
			);
		}

		return this.val.lte(comparisonVal.val);
	}

	public eq(bn: BigNum | BN, ignorePrecision?: boolean): boolean {
		const comparisonVal = bn instanceof BigNum ? bn : BigNum.from(bn);

		if (!ignorePrecision && !comparisonVal.val.eq(ZERO)) {
			assert(
				comparisonVal.precision.eq(this.precision),
				'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter'
			);
		}

		return this.val.eq(comparisonVal.val);
	}

	public eqZero() {
		return this.val.eq(ZERO);
	}

	public gtZero() {
		return this.val.gt(ZERO);
	}

	public ltZero() {
		return this.val.lt(ZERO);
	}

	public gteZero() {
		return this.val.gte(ZERO);
	}

	public lteZero() {
		return this.val.lte(ZERO);
	}

	public abs(): BigNum {
		return new BigNum(this.val.abs(), this.precision);
	}

	public neg(): BigNum {
		return new BigNum(this.val.neg(), this.precision);
	}

	public toString = (base?: number | 'hex', length?: number): string =>
		this.val.toString(base, length);

	/**
	 * Pretty print the underlying value in human-readable form. Depends on precision being correct for the output string to be correct
	 * @returns
	 */
	public print(): string {
		assert(
			this.precision.gte(ZERO),
			'Tried to print a BN with precision lower than zero'
		);

		const plainString = this.toString();
		const precisionNum = this.precision.toNumber();

		// make a string with at least the precisionNum number of zeroes
		let printString = [
			...Array(this.precision.toNumber()).fill(0),
			...plainString.split(''),
		].join('');

		// inject decimal
		printString =
			printString.substring(0, printString.length - precisionNum) +
			BigNum.delim +
			printString.substring(printString.length - precisionNum);

		// remove leading zeroes
		printString = printString.replace(/^0+/, '');

		// add zero if leading delim
		if (printString[0] === BigNum.delim) printString = `0${printString}`;

		// remove trailing delim
		if (printString[printString.length - 1] === BigNum.delim)
			printString = printString.slice(0, printString.length - 1);

		return printString;
	}

	public prettyPrint(): string {
		const [leftSide, rightSide] = this.printShort().split(BigNum.delim);

		let formattedLeftSide = leftSide;

		const isNeg = formattedLeftSide.includes('-');
		if (isNeg) {
			formattedLeftSide = formattedLeftSide.replace('-', '');
		}

		let index = formattedLeftSide.length - 3;

		while (index >= 1) {
			const formattedLeftSideArray = formattedLeftSide.split('');

			formattedLeftSideArray.splice(index, 0, BigNum.spacer);

			formattedLeftSide = formattedLeftSideArray.join('');

			index -= 3;
		}

		return `${isNeg ? '-' : ''}${formattedLeftSide}${
			rightSide ? `${BigNum.delim}${rightSide}` : ''
		}`;
	}

	/**
	 * Print and remove unnecessary trailing zeroes
	 * @returns
	 */
	public printShort(
		useTradePrecision?: boolean,
		precisionOverride?: number
	): string {
		const printVal = precisionOverride
			? this.toPrecision(precisionOverride)
			: useTradePrecision
			? this.toTradePrecision()
			: this.print();

		return printVal.replace(/0+$/g, '').replace(/\.$/, '').replace(/,$/, '');
	}

	public debug() {
		console.log(
			`${this.toString()} | ${this.print()} | ${this.precision.toString()}`
		);
	}

	/**
	 * Pretty print with the specified number of decimal places
	 * @param fixedPrecision
	 * @returns
	 */
	public toFixed(fixedPrecision: number): string {
		const printString = this.print();

		const [leftSide, rightSide] = printString.split(BigNum.delim);

		const filledRightSide = [
			...(rightSide ?? '').slice(0, fixedPrecision),
			...Array(fixedPrecision).fill('0'),
		]
			.slice(0, fixedPrecision)
			.join('');

		return `${leftSide}${BigNum.delim}${filledRightSide}`;
	}

	/**
	 * Pretty print to the specified number of significant figures
	 * @param fixedPrecision
	 * @returns
	 */
	public toPrecision(fixedPrecision: number, trailingZeroes = false): string {
		const printString = this.print();

		let precisionPrintString = printString.slice(0, fixedPrecision + 1);

		if (
			!precisionPrintString.includes(BigNum.delim) ||
			precisionPrintString[precisionPrintString.length - 1] === BigNum.delim
		) {
			precisionPrintString = printString.slice(0, fixedPrecision);
		}

		const pointsOfPrecision = precisionPrintString.replace(
			BigNum.delim,
			''
		).length;

		if (pointsOfPrecision < fixedPrecision) {
			precisionPrintString = [
				...precisionPrintString.split(''),
				...Array(fixedPrecision - pointsOfPrecision).fill('0'),
			].join('');
		}

		if (!precisionPrintString.includes(BigNum.delim)) {
			const delimFullStringLocation = printString.indexOf(BigNum.delim);

			let skipExponent = false;

			if (delimFullStringLocation === -1) {
				// no decimal, not missing any precision
				skipExponent = true;
			}

			if (
				precisionPrintString[precisionPrintString.length - 1] === BigNum.delim
			) {
				// decimal is at end of string, not missing any precision, do nothing
				skipExponent = true;
			}

			if (printString.indexOf(BigNum.delim) === fixedPrecision) {
				// decimal is at end of string, not missing any precision, do nothing
				skipExponent = true;
			}

			if (!skipExponent) {
				const exponent = delimFullStringLocation - fixedPrecision;
				if (trailingZeroes) {
					precisionPrintString = `${precisionPrintString}${Array(exponent)
						.fill('0')
						.join('')}`;
				} else {
					precisionPrintString = `${precisionPrintString}e${exponent}`;
				}
			}
		}

		return precisionPrintString;
	}

	public toTradePrecision(): string {
		return this.toPrecision(6, true);
	}

	public toNotional(): string {
		return `${this.lt(BigNum.zero()) ? `-` : ``}$${BigNum.fromPrint(
			this.toFixed(2),
			new BN(2)
		)
			.prettyPrint()
			.replace('-', '')}`;
	}

	public toMillified(precision = 3): string {
		const stringVal = this.print();

		const [leftSide] = stringVal.split(BigNum.delim);

		if (!leftSide) {
			return this.shift(new BN(precision)).toPrecision(precision, true);
		}

		if (leftSide.length <= 3) {
			return this.shift(new BN(precision)).toPrecision(precision, true);
		}

		const unitTicks = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		const unitNumber = Math.floor((leftSide.length - 1) / 3);
		const unit = unitTicks[unitNumber];

		let leadDigits = leftSide.slice(0, precision);

		if (leadDigits.length < precision) {
			leadDigits = [
				...leadDigits.split(''),
				...Array(precision - leadDigits.length).fill('0'),
			].join('');
		}

		const decimalLocation = leftSide.length - 3 * unitNumber;

		let leadString = '';

		if (decimalLocation >= precision) {
			leadString = `${leadDigits}`;
		} else {
			leadString = `${leadDigits.slice(0, decimalLocation)}${
				BigNum.delim
			}${leadDigits.slice(decimalLocation)}`;
		}

		return `${leadString}${unit}`;
	}

	public toJSON() {
		return {
			val: this.val.toString(),
			precision: this.precision.toString(),
		};
	}

	public isNeg() {
		return this.lt(ZERO, true);
	}

	public isPos() {
		return !this.isNeg();
	}

	static fromJSON(json: { val: string; precision: string }) {
		return BigNum.from(new BN(json.val), new BN(json.precision));
	}

	/**
	 * Create a BigNum instance
	 * @param val
	 * @param precision
	 * @returns
	 */
	static from(
		val: BN | number | string = ZERO,
		precision?: BN | number | string
	): BigNum {
		assert(
			new BN(precision).lt(new BN(100)),
			'Tried to create a bignum with precision higher than 10^100'
		);
		return new BigNum(val, precision);
	}

	/**
	 * Create a BigNum instance from a printed BigNum
	 * @param val
	 * @param precisionOverride
	 * @returns
	 */
	static fromPrint(val: string, precisionShift?: BN): BigNum {
		// Handle empty number edge cases
		if (!val) return BigNum.from(ZERO, precisionShift);
		if (!val.replace(BigNum.delim, ''))
			return BigNum.from(ZERO, precisionShift);

		const [leftSide, rightSide] = val.split(BigNum.delim);

		const rawBn = new BN(`${leftSide ?? ''}${rightSide ?? ''}`);

		const rightSideLength = rightSide?.length ?? 0;

		const totalShift = precisionShift
			? precisionShift.sub(new BN(rightSideLength))
			: ZERO;

		return BigNum.from(rawBn, precisionShift).shift(totalShift, true);
	}

	static max(a: BigNum, b: BigNum): BigNum {
		return a.gt(b) ? a : b;
	}

	static min(a: BigNum, b: BigNum): BigNum {
		return a.lt(b) ? a : b;
	}

	static zero(precision?: BN | number): BigNum {
		return BigNum.from(0, precision);
	}
}
