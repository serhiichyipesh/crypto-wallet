import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Row, SelectCard, Typography } from '@shared/ui';
import {
  secondaryTextProps,
  SELECTED_CURRENCY_RATE,
  SELECTED_CURRENCY_SIGN,
} from '@shared/config';
import { BLOCKCHAIN_CONFIG, useBalances, useSend } from '@entities/blockchain';
import {
  basicIconColor,
  stepTitleProps,
} from '@widgets/send-transaction/model';
import { MaterialIcons } from '@expo/vector-icons';

export const SelectAssetStep = () => {
  const { selectedAsset, selectedWallet, selectedNetwork, setField } =
    useSend();
  const { getTokenToSend } = useBalances();

  const assets = Object.values(
    BLOCKCHAIN_CONFIG.SUPPORTED_ASSETS[selectedNetwork.id]
  );

  return (
    <>
      <Typography {...stepTitleProps}>Select Assets</Typography>

      <Typography {...secondaryTextProps}>Select an asset to send:</Typography>
      <FlatList
        data={assets}
        contentContainerClassName="gap-2 mt-4"
        renderItem={({ item }) => {
          const balance = getTokenToSend({
            walletAddress: selectedWallet!.address,
            networkId: selectedNetwork.id,
            assetSymbol: item.symbol,
          });
          return (
            <SelectCard
              onPress={() => setField('selectedAsset', item)}
              isSelected={selectedAsset?.symbol === item.symbol}
            >
              <Row className="items-center justify-between">
                <Row className="items-center gap-2">
                  <Avatar>
                    <MaterialIcons
                      {...basicIconColor}
                      name="payments"
                      size={20}
                    />
                  </Avatar>
                  <Typography category="s1">{item.symbol}</Typography>
                </Row>
                <View>
                  <Typography category="s1">{balance?.balanceUsd}</Typography>
                  <Typography>
                    {SELECTED_CURRENCY_SIGN}
                    {(balance?.balanceUsd || 0) * SELECTED_CURRENCY_RATE}
                  </Typography>
                </View>
              </Row>
            </SelectCard>
          );
        }}
      />
    </>
  );
};
