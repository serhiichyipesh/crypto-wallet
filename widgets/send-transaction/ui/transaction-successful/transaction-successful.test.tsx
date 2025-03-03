import { TransactionSuccessful } from '@widgets/send-transaction';
import { render } from '@testing-library/react-native';
import { AppProvider } from '@shared/ui';
import { TEST_HASH } from '@shared/config';

describe('Successful transaction', () => {
  it('should render txHash', () => {
    const { getByText } = render(
      <AppProvider>
        <TransactionSuccessful txHash={TEST_HASH} />
      </AppProvider>
    );

    expect(getByText(TEST_HASH)).toBeTruthy();
  });
});
