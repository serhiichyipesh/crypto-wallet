import { mint } from '@entities/blockchain';
import { sepolia } from 'viem/chains';
import { TEST_DESTINATION_WALLET, TEST_PRIVATE_KEY } from '@shared/config';

describe('mint of tokens', () => {
  it('should mint tokens', async () => {
    const txHash = await mint({
      chain: sepolia,
      asset: { symbol: 'PIM', decimals: 6 },
      destinationAddress: TEST_DESTINATION_WALLET,
      privateKey: TEST_PRIVATE_KEY,
      amountToSend: 0.1,
    });

    expect(txHash).toBeDefined();
    expect(txHash.startsWith('0x')).toBe(true);
  }, 20_000);
});
