import {
  CloseModalButton,
  CopyButton,
  ScreenContainer,
  Separator,
  Typography,
} from '@shared/ui';
import React, { useState } from 'react';
import { Card } from '@ui-kitten/components';
import { trimHex, useWallets } from '@entities/blockchain';
import { FlatList, View } from 'react-native';
import { QrCode } from '@shared/ui/qr-code';
import { COLORS_MAP } from '@shared/config';

const DepositScreen = () => {
  const { wallets } = useWallets();

  const [{ address }, setSelectedWallet] = useState(wallets[0]);

  const isMoreThatOneWalletAdded = wallets.length > 1;

  return (
    <ScreenContainer>
      <CloseModalButton />

      <Typography category="h3" className="mb-8 text-center">
        Deposit
      </Typography>

      <View className="items-center">
        <QrCode data={address} />

        <Typography category="h6" className="mb-4 mt-10 px-12 text-center">
          {address}
        </Typography>

        <CopyButton stringToCopy={address} />
      </View>

      <Separator className="mt-auto" bg="color-basic-1000" />

      {isMoreThatOneWalletAdded && (
        <FlatList
          horizontal
          data={wallets}
          className="max-h-[80px]"
          contentContainerClassName="gap-4"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              onPress={() => setSelectedWallet(item)}
              style={{
                borderWidth: 2,
                width: 185,
                borderColor:
                  item.address === address
                    ? COLORS_MAP['color-primary-500']
                    : COLORS_MAP['color-basic-800'],
              }}
            >
              <Typography category="h6" className="mb-2 text-center">
                {item.name}
              </Typography>
              <Typography category="s1" className="pb-4 text-center">
                {trimHex(item.address, 5, 5)}
              </Typography>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
};

export default DepositScreen;
