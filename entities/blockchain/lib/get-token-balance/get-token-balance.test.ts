import { BLOCKCHAIN_CONFIG, getTokenBalance } from '@entities/blockchain';
import { sepolia } from 'viem/chains';
import { TEST_WALLET } from '@shared/config';

const walletAddress = TEST_WALLET;
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
