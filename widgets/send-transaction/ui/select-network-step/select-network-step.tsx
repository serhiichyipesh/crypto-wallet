import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Row, SelectCard, Typography } from '@shared/ui';
import { SUPPORTED_CHAINS_TESTNET, useSend } from '@entities/blockchain';
import { secondaryTextProps } from '@shared/config';
import {
  basicIconColor,
  stepTitleProps,
} from '@widgets/send-transaction/model';
import Entypo from '@expo/vector-icons/Entypo';

export const SelectNetworkStep = () => {
  const { selectedNetwork, setField } = useSend();

  return (
    <>
      <Typography {...stepTitleProps}>Select Network</Typography>

      <Typography {...secondaryTextProps}>
        Select a blockchain network:
      </Typography>
      <FlatList
        data={SUPPORTED_CHAINS_TESTNET}
        contentContainerClassName="gap-2 mt-4"
        renderItem={({ item }) => (
          <SelectCard
            onPress={() => setField('selectedNetwork', item)}
            isSelected={selectedNetwork.id === item.id}
          >
            <Row className="items-center gap-2">
              <Avatar>
                <Entypo {...basicIconColor} name="network" size={20} />
              </Avatar>

              <Typography category="s1">{item.name}</Typography>
            </Row>
          </SelectCard>
        )}
      />
    </>
  );
};
