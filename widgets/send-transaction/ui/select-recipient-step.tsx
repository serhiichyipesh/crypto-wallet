import React from 'react';
import { View } from 'react-native';
import { Button, ButtonGroup, Card } from '@ui-kitten/components';
import { Row, SelectCard, Typography } from '@shared/ui';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { COLORS_MAP } from '@shared/config';
import { trimHex, useSend } from '@entities/blockchain';
import { Hex, isAddress } from 'viem';
import { primaryIconColor, stepTitleProps } from '@widgets/send-transaction';

export const SelectRecipientStep = () => {
  const { destinationAddress, setField, handlePaste } = useSend();
  const doesEnteredAddress = destinationAddress.length > 0;
  const isSelectedAddressValid = isAddress(destinationAddress);

  return (
    <>
      <Typography
        status={
          doesEnteredAddress
            ? isSelectedAddressValid
              ? 'success'
              : 'danger'
            : 'basic'
        }
        {...stepTitleProps}
      >
        {doesEnteredAddress
          ? isSelectedAddressValid
            ? 'Address is valid'
            : 'Invalid address'
          : 'Enter Recipient'}
      </Typography>

      <Row className="items-center justify-between gap-2">
        <View className="mr-3 flex-1">
          <Card
            style={[
              {
                borderColor: doesEnteredAddress
                  ? isSelectedAddressValid
                    ? COLORS_MAP['color-success-600']
                    : COLORS_MAP['color-danger-600']
                  : COLORS_MAP['color-basic-1100'],
              },
              { paddingVertical: 0 },
            ]}
          >
            <Typography category="s1">{trimHex(destinationAddress)}</Typography>
          </Card>
        </View>
        <ButtonGroup className="h-full" appearance="outline">
          <Button onPress={handlePaste}>
            {() => (
              <FontAwesome6 name="paste" size={20} {...primaryIconColor} />
            )}
          </Button>
          <Button onPress={() => setField('destinationAddress', '' as Hex)}>
            {() => (
              <MaterialIcons
                name="clear"
                size={20}
                color={COLORS_MAP['color-primary-500']}
              />
            )}
          </Button>
        </ButtonGroup>
      </Row>

      <SelectCard className="mt-4" border="color-warning-600">
        <Typography status="warning" category="s1">
          Double-check the recipient address before proceeding. Transactions
          cannot be reversed once confirmed.
        </Typography>
      </SelectCard>
    </>
  );
};
