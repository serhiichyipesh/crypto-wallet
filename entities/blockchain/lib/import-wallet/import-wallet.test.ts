import { importWallet } from './import-wallet';

const TEST_MNEMONIC = process.env.EXPO_PUBLIC_TEST_MNEMONIC;

const WRONG_TEST_MNEMONIC = 'test';

describe('importWallet', () => {
  it('should import wallet', () => {
    const wallet = importWallet(TEST_MNEMONIC);

    expect(wallet).not.toBeNull();

    if (wallet) {
      expect(typeof wallet.mnemonic).toBe('string');
      expect(wallet.mnemonic.length).toBeGreaterThan(0);

      expect(typeof wallet.privateKey).toBe('string');
      expect(wallet.privateKey.length).toBeGreaterThan(0);
      expect(wallet.privateKey.startsWith('0x')).toBeTruthy();

      expect(typeof wallet.address).toBe('string');
      expect(wallet.address.length).toBeGreaterThan(0);
      expect(wallet.address.startsWith('0x')).toBeTruthy();
    }
  });

  it('should not import wallet', () => {
    const wallet = importWallet(WRONG_TEST_MNEMONIC);

    expect(wallet).toBeNull();
  });
});
