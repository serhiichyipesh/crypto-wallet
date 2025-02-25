import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Card, Text } from '@ui-kitten/components';
import { ScreenContainer } from '@/shared/ui';
import { useWallets } from '@/entities/blockchain';
import { Address } from 'viem';
import { Input } from '@ui-kitten/components';
import { Keyboard, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { copyToClipboard } from '@/shared/utils';

const EditPage = () => {
  const { address } = useLocalSearchParams<{ address: Address }>();

  const { getWalletInfo, renameWallet, deleteWallet } = useWallets();

  const walletInfo = getWalletInfo(address);

  const [walletName, setWalletName] = useState(walletInfo?.name || '');

  const handleSave = () => {
    if (walletName.trim() !== walletInfo?.name?.trim()) {
      renameWallet(address, walletName.trim());
    }

    router.back();
  };

  const handleDelete = () => {
    deleteWallet(address);
    router.back();
  };

  if (!walletInfo) return router.back();

  const { mnemonic } = walletInfo;

  return (
    <ScreenContainer>
      <Pressable
        style={{ display: 'flex', flex: 1, gap: 4 }}
        onPress={() => Keyboard.dismiss()}
      >
        <Input
          value={walletName}
          onChangeText={setWalletName}
          accessoryRight={<Feather name="edit-2" size={20} color="white" />}
        />
        <Card>
          <Text category="s1">Address: {address}</Text>
        </Card>

        <Card onPress={() => copyToClipboard(mnemonic)}>
          <Text className="text-center">Seed phrase</Text>
          <Text>{mnemonic}</Text>
        </Card>
      </Pressable>

      <Button className="mb-2 mt-auto" onPress={handleSave}>
        Save
      </Button>
      <Button appearance="ghost" status="danger" onPress={handleDelete}>
        Delete
      </Button>
    </ScreenContainer>
  );
};

export default EditPage;
