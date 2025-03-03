import { BLOCKCHAIN_CONFIG, getTokenBalance } from '@entities/blockchain';
import { sepolia } from 'viem/chains';

const walletAddress = process.env.EXPO_PUBLIC_TEST_WALLET;
const chainId = sepolia.id;
const publicClient = BLOCKCHAIN_CONFIG.PUBLIC_CLIENT_BY_CHAIN_MAP[chainId];
const tokenAddress = BLOCKCHAIN_CONFIG.SUPPORTED_ASSETS[chainId].PIM.address;

describe('get token balance', () => {
  it('should return token balance as bigint', async () => {
    const tokenBalance = await getTokenBalance(
      publicClient,
      walletAddress,
      tokenAddress
    );

    expect(typeof tokenBalance).toEqual('bigint');
  });
});
