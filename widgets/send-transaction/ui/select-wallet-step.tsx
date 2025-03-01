import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Row, SelectCard, Typography } from '@shared/ui';
import {
  trimHex,
  useBalances,
  useSend,
  useWallets,
} from '@entities/blockchain';
import { secondaryTextProps, SELECTED_CURRENCY_SIGN } from '@shared/config';
import {
  basicIconColor,
  stepTitleProps,
} from '@widgets/send-transaction/model';
import Entypo from '@expo/vector-icons/Entypo';

export const SelectWalletStep = () => {
  const { selectedWallet, setField } = useSend();
  const { wallets } = useWallets();
  const { walletsBalances } = useBalances();

  return (
    <>
      <Typography {...stepTitleProps}>Select Wallet</Typography>

      <Typography {...secondaryTextProps}>
        Select a wallet to send from:
      </Typography>

      <FlatList
        data={wallets}
        contentContainerClassName="gap-2 mt-4"
        renderItem={({ item }) => (
          <SelectCard
            onPress={() => setField('selectedWallet', item)}
            isSelected={selectedWallet?.address === item.address}
          >
            <Row className="items-center justify-between">
              <Row className="items-center gap-2">
                <Avatar>
                  <Entypo {...basicIconColor} name="wallet" size={20} />
                </Avatar>

                <View>
                  <Typography>{item.name}</Typography>
                  <Typography>{trimHex(item.address)}</Typography>
                </View>
              </Row>
              <Typography category="h6" className="my-auto">
                {SELECTED_CURRENCY_SIGN}
                {String(walletsBalances?.[item.address]?.totalBalanceUsd || 0)}
              </Typography>
            </Row>
          </SelectCard>
        )}
      />
    </>
  );
};
