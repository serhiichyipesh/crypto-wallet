import React from 'react';
import { SelectWalletStep } from '../select-wallet-step';
import { trimHex, useSendStore, useWalletsStore } from '@entities/blockchain';
import { TEST_MNEMONIC, TEST_PRIVATE_KEY, TEST_WALLET } from '@shared/config';
import { fireEvent, render } from '@testing-library/react-native';
import { AppProvider } from '@shared/ui';

describe('SelectWalletStep - integration', () => {
  beforeAll(() => {
    useWalletsStore.getState().addWallet({
      address: TEST_WALLET,
      privateKey: TEST_PRIVATE_KEY,
      mnemonic: TEST_MNEMONIC,
    });
  });

  it('renders and displays wallet details correctly', () => {
    const { getByText } = render(
      <AppProvider>
        <SelectWalletStep />
      </AppProvider>
    );

    expect(getByText(trimHex(TEST_WALLET))).toBeTruthy();
  });

  it('handles press events on the wallet item', () => {
    const { getByText } = render(
      <AppProvider>
        <SelectWalletStep />
      </AppProvider>
    );

    const walletItem = getByText(trimHex(TEST_WALLET));

    fireEvent.press(walletItem);

    const selectedWallet = useSendStore.getState().selectedWallet;

    expect(selectedWallet?.address).toBe(TEST_WALLET);
  });
});
