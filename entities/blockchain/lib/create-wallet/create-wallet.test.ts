import { createWallet } from './create-wallet';

describe('createWallet Test', () => {
  it('should create a wallet with mnemonic, privateKey, and address', async () => {
    const wallet = await createWallet();

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
});
