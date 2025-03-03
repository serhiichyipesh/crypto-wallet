import { fetchWalletsBalances, useWalletsStore } from '@entities/blockchain';
import { TEST_MNEMONIC, TEST_PRIVATE_KEY, TEST_WALLET } from '@shared/config';

describe('fetch wallets balances', () => {
  beforeAll(() => {
    const setWallets = useWalletsStore.getState().addWallet;

    setWallets({
      address: TEST_WALLET,
      mnemonic: TEST_MNEMONIC,
      privateKey: TEST_PRIVATE_KEY,
    });
  });

  it('should fetch balance', async () => {
    const balances = await fetchWalletsBalances();

    const balanceKeys = Object.keys(balances[TEST_WALLET]);

    const didGetBalance =
      Object.keys(balances).includes(TEST_WALLET) &&
      balanceKeys.includes('totalBalanceUsd') &&
      balanceKeys.includes('balancesByChain');

    expect(balances).toBeDefined();
    expect(didGetBalance).toBeTruthy();
  });
});
