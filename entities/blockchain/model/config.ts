import { Address, createPublicClient, http, PublicClient } from 'viem';
import {
  TSupportedAssetSymbolTestnet,
  TSupportedChainIdTestnet,
  TSupportedChainTestnet,
} from '@/entities/blockchain';
import { arbitrumSepolia, sepolia } from 'viem/chains';

export const SUPPORTED_CHAINS_TESTNET = [arbitrumSepolia, sepolia] as const;

const SUPPORTED_CHAINS_TESTNET_MAP: Record<
  TSupportedChainIdTestnet,
  TSupportedChainTestnet
> = {
  [arbitrumSepolia.id]: arbitrumSepolia,
  [sepolia.id]: sepolia,
} as const;

export const SUPPORTED_ASSETS: Record<
  TSupportedChainIdTestnet,
  Record<
    TSupportedAssetSymbolTestnet,
    {
      symbol: TSupportedAssetSymbolTestnet;
      address: Address;
      decimals: number;
    }
  >
> = {
  [arbitrumSepolia.id]: {
    '6TEST': {
      symbol: '6TEST',
      address: '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
      decimals: 6,
    },
  },
  [sepolia.id]: {
    '6TEST': {
      symbol: '6TEST',
      address: '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
      decimals: 6,
    },
  },
} as const;

const PUBLIC_CLIENT_BY_CHAIN_MAP = Object.fromEntries(
  SUPPORTED_CHAINS_TESTNET.map((chain) => [
    chain.id,
    createPublicClient({
      chain,
      transport: http(),
    }),
  ])
) as unknown as Record<TSupportedChainIdTestnet, PublicClient>;

export const BLOCKCHAIN_CONFIG = {
  SUPPORTED_CHAINS_TESTNET,
  SUPPORTED_CHAINS_TESTNET_MAP,
  SUPPORTED_ASSETS,
  PUBLIC_CLIENT_BY_CHAIN_MAP,
} as const;
