import { OracleSource } from '../';
import { DriftEnv } from '../';
import { PublicKey } from '@solana/web3.js';

export type PerpMarketConfig = {
	fullName?: string;
	category?: string[];
	symbol: string;
	baseAssetSymbol: string;
	marketIndex: number;
	launchTs: number;
	oracle: PublicKey;
	oracleSource: OracleSource;
};

export const DevnetPerpMarkets: PerpMarketConfig[] = [
	{
		fullName: 'Solana',
		category: ['L1', 'Infra'],
		symbol: 'SOL-PERP',
		baseAssetSymbol: 'SOL',
		marketIndex: 0,
		oracle: new PublicKey('J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix'),
		launchTs: 1655751353000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Bitcoin',
		category: ['L1', 'Payment'],
		symbol: 'BTC-PERP',
		baseAssetSymbol: 'BTC',
		marketIndex: 1,
		oracle: new PublicKey('HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J'),
		launchTs: 1655751353000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Ethereum',
		category: ['L1', 'Infra'],
		symbol: 'ETH-PERP',
		baseAssetSymbol: 'ETH',
		marketIndex: 2,
		oracle: new PublicKey('EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw'),
		launchTs: 1637691133472,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Aptos',
		category: ['L1', 'Infra'],
		symbol: 'APT-PERP',
		baseAssetSymbol: 'APT',
		marketIndex: 3,
		oracle: new PublicKey('5d2QJ6u2NveZufmJ4noHja5EHs3Bv1DUMPLG5xfasSVs'),
		launchTs: 1675610186000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Bonk',
		category: ['Meme', 'Dog'],
		symbol: '1MBONK-PERP',
		baseAssetSymbol: '1MBONK',
		marketIndex: 4,
		oracle: new PublicKey('6bquU99ktV1VRiHDr8gMhDFt3kMfhCQo5nfNrg2Urvsn'),
		launchTs: 1677068931000,
		oracleSource: OracleSource.PYTH_1M,
	},
	{
		fullName: 'Polygon',
		category: ['L2', 'Infra'],
		symbol: 'MATIC-PERP',
		baseAssetSymbol: 'MATIC',
		marketIndex: 5,
		oracle: new PublicKey('FBirwuDFuRAu4iSGc7RGxN5koHB7EJM1wbCmyPuQoGur'),
		launchTs: 1677690149000, //todo
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Arbitrum',
		category: ['L2', 'Infra'],
		symbol: 'ARB-PERP',
		baseAssetSymbol: 'ARB',
		marketIndex: 6,
		oracle: new PublicKey('4mRGHzjGerQNWKXyQAmr9kWqb9saPPHKqo1xziXGQ5Dh'),
		launchTs: 1679501812000, //todo
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Doge',
		category: ['Meme', 'Dog'],
		symbol: 'DOGE-PERP',
		baseAssetSymbol: 'DOGE',
		marketIndex: 7,
		oracle: new PublicKey('4L6YhY8VvUgmqG5MvJkUJATtzB2rFqdrJwQCmFLv4Jzy'),
		launchTs: 1680808053000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Binance Coin',
		category: ['Exchange'],
		symbol: 'BNB-PERP',
		baseAssetSymbol: 'BNB',
		marketIndex: 8,
		oracle: new PublicKey('GwzBgrXb4PG59zjce24SF2b9JXbLEjJJTBkmytuEZj1b'),
		launchTs: 1680808053000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Sui',
		category: ['L1'],
		symbol: 'SUI-PERP',
		baseAssetSymbol: 'SUI',
		marketIndex: 9,
		oracle: new PublicKey('6SK9vS8eMSSj3LUX2dPku93CrNv8xLCp9ng39F39h7A5'),
		launchTs: 1683125906000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Pepe',
		category: ['Meme'],
		symbol: '1MPEPE-PERP',
		baseAssetSymbol: '1MPEPE',
		marketIndex: 10,
		oracle: new PublicKey('Gz9RfgDeAFSsH7BHDGyNTgCik74rjNwsodJpsCizzmkj'),
		launchTs: 1683781239000,
		oracleSource: OracleSource.PYTH_1M,
	},
	{
		fullName: 'OP',
		category: ['L2', 'Infra'],
		symbol: 'OP-PERP',
		baseAssetSymbol: 'OP',
		marketIndex: 11,
		oracle: new PublicKey('8ctSiDhA7eJoii4TkKV8Rx4KFdz3ycsA1FXy9wq56quG'),
		launchTs: 1686091480000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'RNDR',
		category: ['Infra'],
		symbol: 'RNDR-PERP',
		baseAssetSymbol: 'RNDR',
		marketIndex: 12,
		oracle: new PublicKey('C2QvUPBiU3fViSyqA4nZgGyYqLgYf9PRpd8B8oLoo48w'),
		launchTs: 1687201081000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'XRP',
		category: ['Payments'],
		symbol: 'XRP-PERP',
		baseAssetSymbol: 'XRP',
		marketIndex: 13,
		oracle: new PublicKey('DuG45Td6dgJBe64Ebymb1WjBys16L1VTQdoAURdsviqN'),
		launchTs: 1689270550000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'HNT',
		category: ['IoT'],
		symbol: 'HNT-PERP',
		baseAssetSymbol: 'HNT',
		marketIndex: 14,
		oracle: new PublicKey('6Eg8YdfFJQF2HHonzPUBSCCmyUEhrStg9VBLK957sBe6'),
		launchTs: 1692294955000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'INJ',
		category: ['L1', 'Exchange'],
		symbol: 'INJ-PERP',
		baseAssetSymbol: 'INJ',
		marketIndex: 15,
		oracle: new PublicKey('44uRsNnT35kjkscSu59MxRr9CfkLZWf6gny8bWqUbVxE'),
		launchTs: 1698074659000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'LINK',
		category: ['Oracle'],
		symbol: 'LINK-PERP',
		baseAssetSymbol: 'LINK',
		marketIndex: 16,
		oracle: new PublicKey('9sGidS4qUXS2WvHZFhzw4df1jNd5TvUGZXZVsSjXo7UF'),
		launchTs: 1698074659000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Rollbit',
		category: ['Exchange'],
		symbol: 'RLB-PERP',
		baseAssetSymbol: 'RLB',
		marketIndex: 17,
		oracle: new PublicKey('6BmJozusMugAySsfNfMFsU1YRWcGwyP3oycNX9Pv9oCz'),
		launchTs: 1699265968000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Pyth',
		category: ['Oracle'],
		symbol: 'PYTH-PERP',
		baseAssetSymbol: 'PYTH',
		marketIndex: 18,
		oracle: new PublicKey('ELF78ZhSr8u4SCixA7YSpjdZHZoSNrAhcyysbavpC2kA'),
		launchTs: 1700542800000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Celestia',
		category: ['Data'],
		symbol: 'TIA-PERP',
		baseAssetSymbol: 'TIA',
		marketIndex: 19,
		oracle: new PublicKey('4GiL1Y6u6JkPb7ckakzJgc414h6P7qoYnEKFcd1YtSB9'),
		launchTs: 1701880540000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Jito',
		category: ['MEV'],
		symbol: 'JTO-PERP',
		baseAssetSymbol: 'JTO',
		marketIndex: 20,
		oracle: new PublicKey('29xQnTzyyuRtgJ7RtSKEgBWwRzZqtrrKmyQQ5m3x629f'),
		launchTs: 1701967240000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'SEI',
		category: ['L1'],
		symbol: 'SEI-PERP',
		baseAssetSymbol: 'SEI',
		marketIndex: 21,
		oracle: new PublicKey('B6KVbgqTRY33yDgjAnc1mWw4ATS4W5544xghayQscdt7'),
		launchTs: 1703173331000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'AVAX',
		category: ['Rollup', 'Infra'],
		symbol: 'AVAX-PERP',
		baseAssetSymbol: 'AVAX',
		marketIndex: 22,
		oracle: new PublicKey('FVb5h1VmHPfVb1RfqZckchq18GxRv4iKt8T4eVTQAqdz'),
		launchTs: 1704209558000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Wormhole',
		category: ['Bridge'],
		symbol: 'W-PERP',
		baseAssetSymbol: 'W',
		marketIndex: 23,
		oracle: new PublicKey('A9665pJk2GAm7m3gA4f5qu99cWX8kDisDZtoSA9J4a3F'),
		launchTs: 1709852537000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Kamino',
		category: ['Lending'],
		symbol: 'KMNO-PERP',
		baseAssetSymbol: 'KMNO',
		marketIndex: 24,
		oracle: new PublicKey('FkAaa46aYdHn8QxxwmiUnJt3th8radB2GFXDMtyLALCY'),
		launchTs: 1711475936000,
		oracleSource: OracleSource.Prelaunch,
	},
];

export const MainnetPerpMarkets: PerpMarketConfig[] = [
	{
		fullName: 'Solana',
		category: ['L1', 'Infra', 'Solana'],
		symbol: 'SOL-PERP',
		baseAssetSymbol: 'SOL',
		marketIndex: 0,
		oracle: new PublicKey('H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG'),
		launchTs: 1667560505000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Bitcoin',
		category: ['L1', 'Payment'],
		symbol: 'BTC-PERP',
		baseAssetSymbol: 'BTC',
		marketIndex: 1,
		oracle: new PublicKey('GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU'),
		launchTs: 1670347281000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Ethereum',
		category: ['L1', 'Infra'],
		symbol: 'ETH-PERP',
		baseAssetSymbol: 'ETH',
		marketIndex: 2,
		oracle: new PublicKey('JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB'),
		launchTs: 1670347281000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Aptos',
		category: ['L1', 'Infra'],
		symbol: 'APT-PERP',
		baseAssetSymbol: 'APT',
		marketIndex: 3,
		oracle: new PublicKey('FNNvb1AFDnDVPkocEri8mWbJ1952HQZtFLuwPiUjSJQ'),
		launchTs: 1675802661000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Bonk',
		category: ['Meme', 'Solana'],
		symbol: '1MBONK-PERP',
		baseAssetSymbol: '1MBONK',
		marketIndex: 4,
		oracle: new PublicKey('8ihFLu5FimgTQ1Unh4dVyEHUGodJ5gJQCrQf4KUVB9bN'),
		launchTs: 1677690149000,
		oracleSource: OracleSource.PYTH_1M,
	},
	{
		fullName: 'Polygon',
		category: ['L2', 'Infra'],
		symbol: 'MATIC-PERP',
		baseAssetSymbol: 'MATIC',
		marketIndex: 5,
		oracle: new PublicKey('7KVswB9vkCgeM3SHP7aGDijvdRAHK8P5wi9JXViCrtYh'),
		launchTs: 1677690149000, //todo
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Arbitrum',
		category: ['L2', 'Infra'],
		symbol: 'ARB-PERP',
		baseAssetSymbol: 'ARB',
		marketIndex: 6,
		oracle: new PublicKey('5HRrdmghsnU3i2u5StaKaydS7eq3vnKVKwXMzCNKsc4C'),
		launchTs: 1679501812000, //todo
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Doge',
		category: ['Meme', 'Dog'],
		symbol: 'DOGE-PERP',
		baseAssetSymbol: 'DOGE',
		marketIndex: 7,
		oracle: new PublicKey('FsSM3s38PX9K7Dn6eGzuE29S2Dsk1Sss1baytTQdCaQj'),
		launchTs: 1680808053000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Binance Coin',
		category: ['Exchange'],
		symbol: 'BNB-PERP',
		baseAssetSymbol: 'BNB',
		marketIndex: 8,
		oracle: new PublicKey('4CkQJBxhU8EZ2UjhigbtdaPbpTe6mqf811fipYBFbSYN'),
		launchTs: 1680808053000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Sui',
		category: ['L1'],
		symbol: 'SUI-PERP',
		baseAssetSymbol: 'SUI',
		marketIndex: 9,
		oracle: new PublicKey('3Qub3HaAJaa2xNY7SUqPKd3vVwTqDfDDkEUMPjXD2c1q'),
		launchTs: 1683125906000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Pepe',
		category: ['Meme'],
		symbol: '1MPEPE-PERP',
		baseAssetSymbol: '1MPEPE',
		marketIndex: 10,
		oracle: new PublicKey('FSfxunDmjjbDV2QxpyxFCAPKmYJHSLnLuvQXDLkMzLBm'),
		launchTs: 1683781239000,
		oracleSource: OracleSource.PYTH_1M,
	},
	{
		fullName: 'OP',
		category: ['L2', 'Infra'],
		symbol: 'OP-PERP',
		baseAssetSymbol: 'OP',
		marketIndex: 11,
		oracle: new PublicKey('4o4CUwzFwLqCvmA5x1G4VzoZkAhAcbiuiYyjWX1CVbY2'),
		launchTs: 1686091480000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'RNDR',
		category: ['Infra', 'Solana'],
		symbol: 'RNDR-PERP',
		baseAssetSymbol: 'RNDR',
		marketIndex: 12,
		oracle: new PublicKey('CYGfrBJB9HgLf9iZyN4aH5HvUAi2htQ4MjPxeXMf4Egn'),
		launchTs: 1687201081000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'XRP',
		category: ['Payments'],
		symbol: 'XRP-PERP',
		baseAssetSymbol: 'XRP',
		marketIndex: 13,
		oracle: new PublicKey('Guffb8DAAxNH6kdoawYjPXTbwUhjmveh8R4LM6uEqRV1'),
		launchTs: 1689270550000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'HNT',
		category: ['IoT', 'Solana'],
		symbol: 'HNT-PERP',
		baseAssetSymbol: 'HNT',
		marketIndex: 14,
		oracle: new PublicKey('7moA1i5vQUpfDwSpK6Pw9s56ahB7WFGidtbL2ujWrVvm'),
		launchTs: 1692294955000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'INJ',
		category: ['L1', 'Exchange'],
		symbol: 'INJ-PERP',
		baseAssetSymbol: 'INJ',
		marketIndex: 15,
		oracle: new PublicKey('9EdtbaivHQYA4Nh3XzGR6DwRaoorqXYnmpfsnFhvwuVj'),
		launchTs: 1698074659000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'LINK',
		category: ['Oracle'],
		symbol: 'LINK-PERP',
		baseAssetSymbol: 'LINK',
		marketIndex: 16,
		oracle: new PublicKey('ALdkqQDMfHNg77oCNskfX751kHys4KE7SFuZzuKaN536'),
		launchTs: 1698074659000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Rollbit',
		category: ['Exchange'],
		symbol: 'RLB-PERP',
		baseAssetSymbol: 'RLB',
		marketIndex: 17,
		oracle: new PublicKey('4BA3RcS4zE32WWgp49vvvre2t6nXY1W1kMyKZxeeuUey'),
		launchTs: 1699265968000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Pyth',
		category: ['Oracle', 'Solana'],
		symbol: 'PYTH-PERP',
		baseAssetSymbol: 'PYTH',
		marketIndex: 18,
		oracle: new PublicKey('nrYkQQQur7z8rYTST3G9GqATviK5SxTDkrqd21MW6Ue'),
		launchTs: 1700542800000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Celestia',
		category: ['Data'],
		symbol: 'TIA-PERP',
		baseAssetSymbol: 'TIA',
		marketIndex: 19,
		oracle: new PublicKey('funeUsHgi2QKkLdUPASRLuYkaK8JaazCEz3HikbkhVt'),
		launchTs: 1701880540000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Jito',
		category: ['MEV', 'Solana'],
		symbol: 'JTO-PERP',
		baseAssetSymbol: 'JTO',
		marketIndex: 20,
		oracle: new PublicKey('D8UUgr8a3aR3yUeHLu7v8FWK7E8Y5sSU7qrYBXUJXBQ5'),
		launchTs: 1701967240000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'SEI',
		category: ['L1'],
		symbol: 'SEI-PERP',
		baseAssetSymbol: 'SEI',
		marketIndex: 21,
		oracle: new PublicKey('6cUuAyAX3eXoiWkjFF77RQBEUF15AAMQ7d1hm4EPd3tv'),
		launchTs: 1703173331000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'AVAX',
		category: ['Rollup', 'Infra'],
		symbol: 'AVAX-PERP',
		baseAssetSymbol: 'AVAX',
		marketIndex: 22,
		oracle: new PublicKey('Ax9ujW5B9oqcv59N8m6f1BpTBq2rGeGaBcpKjC5UYsXU'),
		launchTs: 1704209558000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'WIF',
		category: ['Meme', 'Dog', 'Solana'],
		symbol: 'WIF-PERP',
		baseAssetSymbol: 'WIF',
		marketIndex: 23,
		oracle: new PublicKey('6ABgrEZk8urs6kJ1JNdC1sspH5zKXRqxy8sg3ZG2cQps'),
		launchTs: 1706219971000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'JUP',
		category: ['Exchange', 'Infra', 'Solana'],
		symbol: 'JUP-PERP',
		baseAssetSymbol: 'JUP',
		marketIndex: 24,
		oracle: new PublicKey('g6eRCbboSwK4tSWngn773RCMexr1APQr4uA9bGZBYfo'),
		launchTs: 1706713201000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Dymension',
		category: ['Rollup', 'Infra'],
		symbol: 'DYM-PERP',
		baseAssetSymbol: 'DYM',
		marketIndex: 25,
		oracle: new PublicKey('CSRRrhXa6DYu1W5jf89A7unCATdug2Z33tYyV2NXZZxa'),
		launchTs: 1708448765000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'BITTENSOR',
		category: ['AI', 'Infra'],
		symbol: 'TAO-PERP',
		baseAssetSymbol: 'TAO',
		marketIndex: 26,
		oracle: new PublicKey('5NxzemFgGDhimYE3S5qmb5zkjZUmiHXb4up5WGXe7NLn'),
		launchTs: 1709136669000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Wormhole',
		category: ['Bridge'],
		symbol: 'W-PERP',
		baseAssetSymbol: 'W',
		marketIndex: 27,
		oracle: new PublicKey('H9j8CT1bFiWHaZUPMooEaxMRHdWdJ5T9CzFn41z96JHW'),
		launchTs: 1710418343000,
		oracleSource: OracleSource.PYTH,
	},
	{
		fullName: 'Kamino',
		category: ['Lending', 'Solana'],
		symbol: 'KMNO-PERP',
		baseAssetSymbol: 'KMNO',
		marketIndex: 28,
		oracle: new PublicKey('6ynsvjkE2UoiRScbDx7ZxbBsyn7wyvg5P1vENvhtkG1C'),
		launchTs: 1712240681000,
		oracleSource: OracleSource.SWITCHBOARD,
	},
	{
		fullName: 'Tensor',
		category: ['NFT', 'Solana'],
		symbol: 'TNSR-PERP',
		baseAssetSymbol: 'TNSR',
		marketIndex: 29,
		oracle: new PublicKey('7Cfyymx49ipGsgEsCA2XygAB2DUsan4C6Cyb5c8oR5st'),
		launchTs: 1712593532000,
		oracleSource: OracleSource.SWITCHBOARD,
	},
	{
		fullName: 'Drift',
		category: ['DEX', 'Solana'],
		symbol: 'DRIFT-PERP',
		baseAssetSymbol: 'DRIFT',
		marketIndex: 30,
		oracle: new PublicKey('PeNpQeGEm9UEFJ6MBCMauY4WW4h3YxoESPWbsqVKucE'),
		launchTs: 1716595200000,
		oracleSource: OracleSource.SWITCHBOARD,
	},
	{
		fullName: 'Sanctum',
		category: ['LST', 'Solana'],
		symbol: 'CLOUD-PERP',
		baseAssetSymbol: 'CLOUD',
		marketIndex: 31,
		oracle: new PublicKey('C7UxgCodaEy4yqwTe3a4QXfsG7LnpMGGQdEqaxDae4b8'),
		launchTs: 1717597648000,
		oracleSource: OracleSource.Prelaunch,
	},
	{
		fullName: 'IO',
		category: ['DePIN', 'Solana'],
		symbol: 'IO-PERP',
		baseAssetSymbol: 'IO',
		marketIndex: 32,
		oracle: new PublicKey('Gcm39uDrFyRCZko4hdrKMTBQsboPJHEd4RwnWhWFKr9a'),
		launchTs: 1718021389000,
		oracleSource: OracleSource.SWITCHBOARD,
	},
	{
		fullName: 'ZEX',
		category: ['DEX', 'Solana'],
		symbol: 'ZEX-PERP',
		baseAssetSymbol: 'ZEX',
		marketIndex: 33,
		oracle: new PublicKey('4gdbqxkMrF1bYVeEJKRmTqCCvJjRCZrRhxvriGY6SwLj'),
		launchTs: 1719415157000,
		oracleSource: OracleSource.SWITCHBOARD,
	},
];

export const PerpMarkets: { [key in DriftEnv]: PerpMarketConfig[] } = {
	devnet: DevnetPerpMarkets,
	'mainnet-beta': MainnetPerpMarkets,
};
