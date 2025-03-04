import { initTransfer } from './init-transfer';
import { sepolia } from 'viem/chains';
import { API_KEY, API_URL, TEST_PRIVATE_KEY } from '@shared/config';

describe('initTransfer (integration)', () => {
  it('should initialize transfer with real env variables', async () => {
    expect(API_URL).toBeDefined();
    expect(API_KEY).toBeDefined();

    const result = await initTransfer({
      chain: sepolia,
      privateKey: TEST_PRIVATE_KEY,
    });

    expect(result).toBeDefined();
  });
});
