import React from 'react';
import { FlatList, View } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Row, Typography } from '@shared/ui';
import { SELECTED_CURRENCY_RATE, SELECTED_CURRENCY_SIGN } from '@shared/config';
import { BLOCKCHAIN_CONFIG, useBalances, useSend } from '@entities/blockchain';

export const SelectAssetStep = () => {
  const { selectedAsset, selectedWallet, selectedNetwork, setField } =
    useSend();
  const { getTokenToSend } = useBalances();

  const assets = Object.values(
    BLOCKCHAIN_CONFIG.SUPPORTED_ASSETS[selectedNetwork.id]
  );

  return (
    <>
      <Typography category="h6" className="mb-4">
        Select Assets
      </Typography>
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
            <Card
              status={
                selectedAsset?.symbol === item.symbol ? 'primary' : undefined
              }
              onPress={() => setField('selectedAsset', item)}
            >
              <Row className="items-center justify-between">
                <Typography category="s1">{item.symbol}</Typography>
                <View>
                  <Typography category="s1">{balance?.balanceUsd}</Typography>
                  <Typography>
                    {SELECTED_CURRENCY_SIGN}
                    {(balance?.balanceUsd || 0) * SELECTED_CURRENCY_RATE}
                  </Typography>
                </View>
              </Row>
            </Card>
          );
        }}
      />
    </>
  );
};
