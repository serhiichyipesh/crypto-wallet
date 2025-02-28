import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Row, Separator, Typography } from '@shared/ui';
import { AntDesign, Entypo } from '@expo/vector-icons';
import {
  COLORS_MAP,
  NETWORK_FEE,
  SELECTED_CURRENCY_RATE,
  SELECTED_CURRENCY_SIGN,
} from '@shared/config';
import { trimHex, useSend } from '@entities/blockchain';

export const ConfirmTransactionStep = () => {
  const {
    selectedWallet,
    destinationAddress,
    selectedNetwork,
    selectedAsset,
    amountToSend,
  } = useSend();

  const mutedTextProp = useMemo(() => {
    return {
      style: { color: COLORS_MAP['color-basic-600'] },
    };
  }, []);

  if (!selectedAsset || !selectedWallet) return null;

  return (
    <View>
      <Typography category="h6" className="mb-4">
        Confirm Transaction
      </Typography>
      <Card>
        <Row className="mb-4 items-center justify-between">
          <Row className="items-center gap-2">
            <Entypo
              name="wallet"
              size={18}
              color={COLORS_MAP['color-basic-100']}
              className="rounded-full bg-primary-500 p-1.5"
            />

            <View>
              <Typography category="s1">{selectedWallet.name}</Typography>
              <Typography>
                {trimHex(selectedWallet.address || '', 4, 4)}
              </Typography>
            </View>
          </Row>
          <AntDesign
            name="arrowright"
            size={22}
            color={COLORS_MAP['color-primary-500']}
          />
          <View>
            <Typography category="s1">Recipient</Typography>
            <Typography>{trimHex(destinationAddress, 4, 4)}</Typography>
          </View>
        </Row>
        <View className="gap-2">
          <Row className="justify-between">
            <Typography>Network</Typography>
            <Typography>{selectedNetwork.name}</Typography>
          </Row>
          <Row className="justify-between">
            <Typography>Asset</Typography>
            <Typography>{selectedAsset.symbol}</Typography>
          </Row>
          <Row className="justify-between">
            <Typography>Amount</Typography>
            <Row className="gap-1">
              <Typography>
                {amountToSend} {selectedAsset.symbol}
              </Typography>
              <Typography {...mutedTextProp}>
                ({SELECTED_CURRENCY_SIGN}
                {+amountToSend * SELECTED_CURRENCY_RATE})
              </Typography>
            </Row>
          </Row>
          <Row className="justify-between">
            <Typography>Network Fee</Typography>
            <Row className="gap-1">
              <Typography>
                {NETWORK_FEE} {selectedAsset.symbol}
              </Typography>
              <Typography {...mutedTextProp}>
                ({SELECTED_CURRENCY_SIGN}
                {NETWORK_FEE * SELECTED_CURRENCY_RATE})
              </Typography>
            </Row>
          </Row>
        </View>

        <Separator className="my-4" bg="color-basic-1100" />
        <Row className="items-center justify-between">
          <Typography category="h6">Total</Typography>
          <Row className="gap-1">
            <Typography>
              {+amountToSend + NETWORK_FEE} {selectedAsset.symbol}
            </Typography>
            <Typography {...mutedTextProp}>
              ({SELECTED_CURRENCY_SIGN}
              {(+amountToSend + NETWORK_FEE) * SELECTED_CURRENCY_RATE})
            </Typography>
          </Row>
        </Row>
      </Card>
    </View>
  );
};
