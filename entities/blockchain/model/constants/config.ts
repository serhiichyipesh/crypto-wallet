import { createPublicClient, http, PublicClient } from 'viem';
import {
  TSupportedAssetSymbolTestnet,
  TSupportedAssetTestnet,
  TSupportedChainIdTestnet,
  TSupportedChainTestnet,
} from '@entities/blockchain';
import { arbitrumSepolia, sepolia } from 'viem/chains';

export const SUPPORTED_CHAINS_TESTNET = [sepolia, arbitrumSepolia] as const;

const SUPPORTED_CHAINS_TESTNET_MAP: Record<
  TSupportedChainIdTestnet,
  TSupportedChainTestnet
> = {
  [arbitrumSepolia.id]: arbitrumSepolia,
  [sepolia.id]: sepolia,
} as const;

export const SUPPORTED_ASSETS: Record<
  TSupportedChainIdTestnet,
  Record<TSupportedAssetSymbolTestnet, TSupportedAssetTestnet>
> = {
  [arbitrumSepolia.id]: {
    PIM: {
      symbol: 'PIM',
      address: '0xFC3e86566895Fb007c6A0d3809eb2827DF94F751',
      decimals: 6,
    },
  },
  [sepolia.id]: {
    PIM: {
      symbol: 'PIM',
      address: '0xFC3e86566895Fb007c6A0d3809eb2827DF94F751',
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
