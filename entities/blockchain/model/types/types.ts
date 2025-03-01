import { SUPPORTED_CHAINS_TESTNET } from '@entities/blockchain';
import { Address, Hex } from 'viem';

export type TSupportedChainTestnet = (typeof SUPPORTED_CHAINS_TESTNET)[number];

export type TSupportedChainIdTestnet = TSupportedChainTestnet['id'];

export type TSupportedAssetSymbolTestnet = 'PIM';

export type TSupportedAssetTestnet = {
  symbol: TSupportedAssetSymbolTestnet;
  address: Address;
  decimals: number;
};

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

export type TSendTransferPayload = {
  chain: TSupportedChainTestnet;
  privateKey: Hex;
  asset: { symbol: TSupportedAssetSymbolTestnet; decimals: number };
  destinationAddress: Address;
  amountToSend: number;
};
