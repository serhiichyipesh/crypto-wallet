import { createWallet, useWallets } from '@/entities/blockchain';
import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/shared/ui';
import '../../globals';

const CreateWalletPage = () => {
  const { addWallet } = useWallets();
  const router = useRouter();

  if (!crypto.getRandomValues) {
    throw new Error('crypto.getRandomValues is not defined');
  }

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
    <ScreenContainer className="justify-end gap-4 px-8">
      <Button onPress={handleCreateWallet}>
        {isLoading ? 'Creating wallet...' : 'Create wallet'}
      </Button>
      <Button onPress={handleImportWallet}>Import wallet</Button>
    </ScreenContainer>
  );
};

export default CreateWalletPage;
