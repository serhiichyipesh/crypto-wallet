import React from 'react';
import { View } from 'react-native';
import { Button, Input } from '@ui-kitten/components';
import { Row, Typography } from '@shared/ui';
import { secondaryTextProps } from '@shared/config';
import { useBalances, useSend } from '@entities/blockchain';
import { stepTitleProps } from '@widgets/send-transaction/model';

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

  if (!balance) return null;

  const { symbol, balanceUsd } = balance;

  return (
    <>
      <Typography {...stepTitleProps}>Enter Amount</Typography>

      <Row className="mb-4 justify-between">
        <Typography {...secondaryTextProps}>Amount</Typography>
        <Typography {...secondaryTextProps}>
          Balance: {balanceUsd} {symbol}
        </Typography>
      </Row>

      <Row className="items-center gap-4">
        <View className="flex-1">
          <Input
            value={amountToSend}
            onChangeText={(text) => setField('amountToSend', text)}
            placeholder="0.00"
            accessoryRight={() => (
              <Typography
                {...secondaryTextProps}
                category="p2"
                className="right-1"
              >
                {symbol}
              </Typography>
            )}
          />
        </View>
        <Button
          size="small"
          className="h-full"
          onPress={() => setField('amountToSend', String(balance?.balanceUsd))}
        >
          MAX
        </Button>
      </Row>
    </>
  );
};
