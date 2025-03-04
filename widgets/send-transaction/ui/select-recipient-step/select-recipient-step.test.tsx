import React from 'react';
import { act, render, screen } from '@testing-library/react-native';
import { SelectRecipientStep } from '@widgets/send-transaction';
import { AppProvider } from '@shared/ui';
import { trimHex, useSendStore } from '@entities/blockchain';
import { TEST_WALLET } from '@shared/config';

describe('SelectRecipientStep - integration', () => {
  beforeEach(() => {
    act(() => {
      useSendStore.getState().clearStore();
    });
  });

  it('should display valid destination address message when a valid address is set', () => {
    render(
      <AppProvider>
        <SelectRecipientStep />
      </AppProvider>
    );

    act(() => {
      useSendStore.getState().setField('destinationAddress', TEST_WALLET);
    });

    expect(screen.getByText('Address is valid')).toBeTruthy();
    expect(screen.getByText(trimHex(TEST_WALLET))).toBeTruthy();
  });

  it('should display invalid destination address message when an invalid address is set', () => {
    render(
      <AppProvider>
        <SelectRecipientStep />
      </AppProvider>
    );

    const wrongWallet = '0x123123';

    act(() => {
      useSendStore.getState().setField('destinationAddress', wrongWallet);
    });

    expect(screen.getByText('Invalid address')).toBeTruthy();
    expect(screen.getByText(wrongWallet)).toBeTruthy();
  });
});
