import React from 'react';
import { FlatList, View } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Row, Typography } from '@shared/ui';
import {
  trimHex,
  useBalances,
  useSend,
  useWallets,
} from '@entities/blockchain';
import { SELECTED_CURRENCY_SIGN } from '@shared/config';

export const SelectWalletStep = () => {
  const { selectedWallet, setField } = useSend();
  const { wallets } = useWallets();
  const { walletsBalances } = useBalances();

  return (
    <>
      <Typography category="h6" className="mb-4">
        Select Wallet
      </Typography>
      <FlatList
        data={wallets}
        contentContainerClassName="gap-2 mt-4"
        renderItem={({ item }) => (
          <Card
            onPress={() => setField('selectedWallet', item)}
            status={
              selectedWallet?.address === item.address ? 'primary' : undefined
            }
          >
            <Row className="items-center justify-between">
              <View>
                <Typography>{item.name}</Typography>
                <Typography>{trimHex(item.address)}</Typography>
              </View>
              <Typography category="h6" className="my-auto">
                {SELECTED_CURRENCY_SIGN}
                {String(walletsBalances?.[item.address]?.totalBalanceUsd || 0)}
              </Typography>
            </Row>
          </Card>
        )}
      />
    </>
  );
};
