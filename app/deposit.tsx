import { ScreenContainer } from '@/shared/ui';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Layout,
  Text,
  useTheme,
  ViewPager,
} from '@ui-kitten/components';
import QRCodeStyled from 'react-native-qrcode-styled';
import { trimHex, useWallets } from '@/entities/blockchain';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DepositScreen = () => {
  const theme = useTheme();
  const { wallets } = useWallets();

  const [{ address }, setSelectedWallet] = useState(wallets[0]);

  const isMoreThatOneWalletAdded = wallets.length > 1;

  return (
    <ScreenContainer>
      <Text category="h3" className="mb-8 text-center">
        Deposit
      </Text>

      <View className="items-center">
        <QRCodeStyled
          data={address}
          outerEyesOptions={{ borderRadius: 6 }}
          innerEyesOptions={{ borderRadius: 2 }}
          pieceCornerType="rounded"
          isPiecesGlued={true}
          pieceBorderRadius={4}
          pieceSize={7}
          color={theme['color-primary-500']}
          pieceScale={1.04}
          // logo={{ href: logo, padding: 6, scale: 1.1 }}
        />

        <Text category="h6" className="mt-8 px-12 text-center">
          {address}
        </Text>
      </View>

      <Divider className="mt-auto" />

      {isMoreThatOneWalletAdded && (
        <FlatList
          horizontal
          style={{ maxHeight: 80 }}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4"
          data={wallets}
          renderItem={({ item }) => (
            <Card
              onPress={() => setSelectedWallet(item)}
              style={{
                borderWidth: 2,
                width: 185,
                borderColor:
                  item.address === address
                    ? theme['color-primary-500']
                    : theme['color-basic-800'],
              }}
            >
              <Text category="h6" className="mb-2 text-center">
                {item.name}
              </Text>
              <Text category="s1" className="pb-4 text-center">
                {trimHex(item.address, 5, 5)}
              </Text>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
};

export default DepositScreen;
