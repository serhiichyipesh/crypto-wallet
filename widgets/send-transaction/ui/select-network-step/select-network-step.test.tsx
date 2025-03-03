import { BLOCKCHAIN_CONFIG, useSendStore } from '@entities/blockchain';
import { SelectNetworkStep } from '@widgets/send-transaction';
import { fireEvent, render } from '@testing-library/react-native';
import { AppProvider } from '@shared/ui';

const networksNames = BLOCKCHAIN_CONFIG.SUPPORTED_CHAINS_TESTNET.map(
  ({ name }) => name
);

describe('SelectNetworkStep - integration', () => {
  test.each(networksNames)('renders correctly', (name) => {
    const { getByText } = render(
      <AppProvider>
        <SelectNetworkStep />
      </AppProvider>
    );

    const network = getByText(name);

    expect(network).toBeTruthy();
  });

  test.each(networksNames)('selecting network correctly', (name) => {
    const { getByText } = render(
      <AppProvider>
        <SelectNetworkStep />
      </AppProvider>
    );

    const item = getByText(name);
    fireEvent.press(item);

    const selectedNetwork = useSendStore.getState().selectedNetwork;
    expect(selectedNetwork.name).toBe(name);
  });
});
