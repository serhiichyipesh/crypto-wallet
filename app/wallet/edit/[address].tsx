import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Button, Card, Input } from '@ui-kitten/components';
import {
  CloseModalButton,
  CopyButton,
  Row,
  ScreenContainer,
  Separator,
  Typography,
} from '@shared/ui';
import { trimHex, useWallets } from '@entities/blockchain';
import { Address } from 'viem';
import { Keyboard, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {
  COLORS_MAP,
  MAX_WALLET_NAME_LENGTH,
  MIN_WALLET_NAME_LENGTH,
} from '@shared/config';
import { MaterialIcons } from '@expo/vector-icons';

const EditPage = () => {
  const { address } = useLocalSearchParams<{ address: Address }>();

  const { getWalletInfo, renameWallet, deleteWallet } = useWallets();

  const walletInfo = getWalletInfo(address);

  const [walletName, setWalletName] = useState(walletInfo?.name || '');

  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  const isNewWalletNameTooShort = walletName.length < MIN_WALLET_NAME_LENGTH;
  const isNewWalletNameTooLong = walletName.length > MAX_WALLET_NAME_LENGTH;

  const isWalletNameValid = !isNewWalletNameTooShort && !isNewWalletNameTooLong;

  const walletLabel = isNewWalletNameTooLong
    ? `Name should be shorter than ${MAX_WALLET_NAME_LENGTH}`
    : isNewWalletNameTooShort
      ? `Name should be longer than ${MIN_WALLET_NAME_LENGTH}`
      : 'Edit wallet name';

  const inputIconProps = useMemo(() => {
    return {
      size: 20,
      className: '-right-2 top-0.5',
    };
  }, []);

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
      <CloseModalButton />

      <Pressable
        className="flex flex-1 gap-1"
        onPress={() => Keyboard.dismiss()}
      >
        <Typography
          category="s1"
          className="mb-2"
          status={isWalletNameValid ? 'basic' : 'danger'}
        >
          {walletLabel}
        </Typography>

        <Input
          status={!isWalletNameValid ? 'danger' : undefined}
          value={walletName}
          onChangeText={setWalletName}
          accessoryRight={
            isWalletNameValid ? (
              <Feather
                {...inputIconProps}
                name="edit-2"
                color={COLORS_MAP['color-basic-100']}
              />
            ) : (
              <MaterialIcons
                {...inputIconProps}
                name="error-outline"
                color={COLORS_MAP['color-danger-500']}
              />
            )
          }
        />

        <Separator className="my-3" />

        <Row className="justify-between">
          <Typography category="s1">Address</Typography>

          <Typography
            style={{ color: COLORS_MAP['color-basic-600'] }}
            category="c1"
          >
            {`(Press to ${showFullAddress ? 'collapse' : 'expand'})`}
          </Typography>
        </Row>

        <Card
          status={showFullAddress ? 'primary' : 'basic'}
          className="mb-4 mt-2"
          footer={<CopyButton stringToCopy={address} />}
          onPress={() => setShowFullAddress((prev) => !prev)}
        >
          <Typography category="s1">
            {showFullAddress ? address : trimHex(address, 10, 10)}
          </Typography>
        </Card>

        <Row className="justify-between">
          <Typography category="s1">Seed Phrase</Typography>

          <Typography
            category="c1"
            style={{ color: COLORS_MAP['color-basic-600'] }}
          >
            {`(Press to ${showSeedPhrase ? 'hide' : 'show'})`}
          </Typography>
        </Row>

        <Card
          status={showSeedPhrase ? 'primary' : 'basic'}
          className="mt-2"
          footer={<CopyButton stringToCopy={mnemonic} />}
          onPress={() => setShowSeedPhrase((prev) => !prev)}
        >
          <Typography>{showSeedPhrase ? mnemonic : '*********'}</Typography>
        </Card>
      </Pressable>

      <Button
        disabled={!isWalletNameValid}
        className="mb-2 mt-auto"
        onPress={handleSave}
      >
        Save
      </Button>
      <Button appearance="ghost" status="danger" onPress={handleDelete}>
        Delete
      </Button>
    </ScreenContainer>
  );
};

export default EditPage;
