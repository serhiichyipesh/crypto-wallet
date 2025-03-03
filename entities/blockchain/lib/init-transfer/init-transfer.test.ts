import { initTransfer } from './init-transfer';
import { sepolia } from 'viem/chains';

const TEST_PRIVATE_KEY = process.env.EXPO_PUBLIC_TEST_PRIVATE_KEY;

describe('initTransfer (integration)', () => {
  it('should initialize transfer with real env variables', async () => {
    expect(process.env.EXPO_PUBLIC_PIMLICO_API_URL).toBeDefined();
    expect(process.env.EXPO_PUBLIC_PIMLICO_API_KEY).toBeDefined();

    const result = await initTransfer({
      chain: sepolia,
      privateKey: TEST_PRIVATE_KEY,
    });

    expect(result).toBeDefined();
  });
});
