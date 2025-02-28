import React from 'react';
import { View } from 'react-native';
import { Button, ButtonGroup, Card } from '@ui-kitten/components';
import { Row, Typography } from '@shared/ui';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { COLORS_MAP } from '@shared/config';
import { trimHex, useSend } from '@entities/blockchain';
import { Hex, isAddress } from 'viem';

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
        category="h6"
        className="mb-4"
      >
        {doesEnteredAddress
          ? isSelectedAddressValid
            ? 'Address is valid'
            : 'Invalid address'
          : 'Select Recipient'}
      </Typography>

      <Row className="items-center justify-between gap-4">
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
            <Typography>{trimHex(destinationAddress)}</Typography>
          </Card>
        </View>
        <ButtonGroup appearance="outline">
          <Button onPress={handlePaste}>
            {() => (
              <FontAwesome6
                name="paste"
                color={COLORS_MAP['color-primary-500']}
                size={20}
              />
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
    </>
  );
};
