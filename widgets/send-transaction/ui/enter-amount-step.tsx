import React from 'react';
import { View } from 'react-native';
import { Button, Input } from '@ui-kitten/components';
import { Row, Typography } from '@shared/ui';
import { SELECTED_CURRENCY, SELECTED_CURRENCY_RATE } from '@shared/config';
import { useBalances, useSend } from '@entities/blockchain';

export const EnterAmountStep = () => {
  const {
    amountToSend,
    selectedWallet,
    selectedNetwork,
    selectedAsset,
    setField,
  } = useSend();
  const { getTokenToSend } = useBalances();

  const balance = getTokenToSend({
    walletAddress: selectedWallet!.address,
    networkId: selectedNetwork.id,
    assetSymbol: selectedAsset!.symbol,
  });

  return (
    <>
      <Row className="mb-4">
        <Typography category="h6">
          Balance: {String((balance?.balanceUsd || 0) * SELECTED_CURRENCY_RATE)}{' '}
          {SELECTED_CURRENCY}
        </Typography>
      </Row>
      <Row className="items-center gap-4">
        <View className="flex-1">
          <Input
            value={amountToSend}
            onChangeText={(text) => setField('amountToSend', text)}
            className="flex-grow"
            placeholder="Enter amount"
          />
        </View>
        <Button
          size="small"
          onPress={() => setField('amountToSend', String(balance?.balanceUsd))}
        >
          MAX
        </Button>
      </Row>
    </>
  );
};
