import { importWallet, useWallets } from '@entities/blockchain';
import { Button, Card, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@shared/ui';
import to from 'await-to-js';
import { getTextFromClipboard } from 'shared/lib';
import { IS_DETOX_ENV, TEST_MNEMONIC } from '@shared/config';

const ImportWalletPage = () => {
  const { addWallet, checkIfWalletAdded } = useWallets();
  const router = useRouter();

  const [seedPhrase, setSeedPhrase] = useState('');

  const handleImportWallet = () => {
    if (!seedPhrase) return;

    setSeedPhrase('');

    const wallet = importWallet(seedPhrase);

    if (!wallet) throw new Error('Wallet not found!');

    if (checkIfWalletAdded(wallet.address)) return;

    addWallet(wallet);
    router.push('/');
  };

  const handleInsertSeedPhrase = async () => {
    if (IS_DETOX_ENV) {
      setSeedPhrase(TEST_MNEMONIC);
      return;
    }

    const [err, string] = await to(getTextFromClipboard());

    if (err || !string) return;

    setSeedPhrase(string);
  };

  return (
    <ScreenContainer className="justify-end gap-4 px-8 pb-16">
      <Card
        onPress={handleInsertSeedPhrase}
        testID="insert-seed-phrase-btn"
        className="my-auto"
      >
        <Text className="text-center">Insert seed phrase</Text>
        {seedPhrase && <Text>{seedPhrase}</Text>}
      </Card>
      <Button onPress={handleImportWallet} testID="import-btn">
        Import wallet
      </Button>
    </ScreenContainer>
  );
};

export default ImportWalletPage;
