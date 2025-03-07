import { createWallet, useWallets } from '@entities/blockchain';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button, ScreenContainer, ScreenTitle } from '@shared/ui';

const CreateWalletPage = () => {
  const { addWallet, hasAnyWallet } = useWallets();
  const router = useRouter();

  const handleImportWallet = () => {
    router.push('/wallet/import');
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWallet = async () => {
    setIsLoading(true);
    const wallet = await createWallet();

    if (!wallet) throw new Error('Could not create wallet!');

    addWallet(wallet);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <ScreenContainer className="gap-4">
      <ScreenTitle title="Add Wallet" withBackButton={hasAnyWallet} />

      <Button
        isLoading={isLoading}
        onPress={handleCreateWallet}
        className="mt-auto"
        testID="createWalletBtn"
      >
        Create wallet
      </Button>
      <Button onPress={handleImportWallet} testID="go-to-import">
        Import wallet
      </Button>
    </ScreenContainer>
  );
};

export default CreateWalletPage;
