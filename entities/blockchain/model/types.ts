import { SUPPORTED_CHAINS_TESTNET } from '@/entities/blockchain';

export type TSupportedChainTestnet = (typeof SUPPORTED_CHAINS_TESTNET)[number];

export type TSupportedChainIdTestnet = TSupportedChainTestnet['id'];

export type TSupportedAssetSymbolTestnet = '6TEST';

export type TBalanceByToken = {
  symbol: TSupportedAssetSymbolTestnet;
  balanceUsd: number;
  value: string;

  decimals: number;
  valueFormatted: number;
};

export type TBalancesByChain = {
  chainId: TSupportedChainIdTestnet;
  balanceUsd: number;
  balancesByToken: TBalanceByToken[];
};
