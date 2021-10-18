pub const MARK_PRICE_MANTISSA: u128 = 10_000_000_000; //expo = -10
pub const PEG_PRECISION: u128 = 1_000; //expo = -3
pub const PRICE_TO_PEG_PRECISION_RATIO: u128 = MARK_PRICE_MANTISSA / PEG_PRECISION; // expo: -7
pub const USDC_PRECISION: u128 = 1_000_000;
pub const AMM_ASSET_AMOUNT_PRECISION: u128 = 10_000_000_000_000; //expo = -13;
pub const AMM_TO_USDC_PRECION_RATIO: u128 = 10_000_000;
pub const FUNDING_PAYMENT_MANTISSA: u128 = 10_000; // expo = -4
pub const MARGIN_MANTISSA: u128 = 10000;
pub const UPDATE_K_ALLOWED_PRICE_CHANGE: u128 = 1_000_000_000; //expo = -19
pub const SHARE_OF_FEES_ALLOCATED_TO_REPEG_NUMERATOR: u128 = 1;
pub const SHARE_OF_FEES_ALLOCATED_TO_REPEG_DENOMINATOR: u128 = 2;

// FEES
pub const DEFAULT_FEE_NUMERATOR: u128 = 10;
pub const DEFAULT_FEE_DENOMINATOR: u128 = 10000;
pub const DEFAULT_PROTOCOL_TOKEN_FIRST_TIER_MINIMUM_BALANCE: u64 = 1_000_000_000_000; // 1000
pub const DEFAULT_PROTOCOL_TOKEN_FIRST_TIER_REBATE_NUMERATOR: u128 = 20;
pub const DEFAULT_PROTOCOL_TOKEN_FIRST_TIER_REBATE_DENOMINATOR: u128 = 100;
pub const DEFAULT_PROTOCOL_TOKEN_SECOND_TIER_MINIMUM_BALANCE: u64 = 100_000_000_000;
pub const DEFAULT_PROTOCOL_TOKEN_SECOND_TIER_REBATE_NUMERATOR: u128 = 15;
pub const DEFAULT_PROTOCOL_TOKEN_SECOND_TIER_REBATE_DENOMINATOR: u128 = 100;
pub const DEFAULT_PROTOCOL_TOKEN_THIRD_TIER_MINIMUM_BALANCE: u64 = 10_000_000_000;
pub const DEFAULT_PROTOCOL_TOKEN_THIRD_TIER_REBATE_NUMERATOR: u128 = 10;
pub const DEFAULT_PROTOCOL_TOKEN_THIRD_TIER_REBATE_DENOMINATOR: u128 = 100;
pub const DEFAULT_PROTOCOL_TOKEN_FOURTH_TIER_MINIMUM_BALANCE: u64 = 1_000_000_000;
pub const DEFAULT_PROTOCOL_TOKEN_FOURTH_TIER_REBATE_NUMERATOR: u128 = 5;
pub const DEFAULT_PROTOCOL_TOKEN_FOURTH_TIER_REBATE_DENOMINATOR: u128 = 100;
pub const DEFAULT_REFERRER_REWARD_NUMERATOR: u128 = 5;
pub const DEFAULT_REFERRER_REWARD_DENOMINATOR: u128 = 100;
pub const DEFAULT_REFEREE_REBATE_NUMERATOR: u128 = 5;
pub const DEFAULT_REFEREE_REBATE_DENOMINATOR: u128 = 100;
