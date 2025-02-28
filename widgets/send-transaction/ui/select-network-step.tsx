import React from 'react';
import { FlatList } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Typography } from '@shared/ui';
import { SUPPORTED_CHAINS_TESTNET, useSend } from '@entities/blockchain';

export const SelectNetworkStep = () => {
  const { selectedNetwork, setField } = useSend();

  return (
    <>
      <Typography category="h6" className="mb-4">
        Select Network
      </Typography>
      <FlatList
        data={SUPPORTED_CHAINS_TESTNET}
        contentContainerClassName="gap-2 mt-4"
        renderItem={({ item }) => (
          <Card
            onPress={() => setField('selectedNetwork', item)}
            status={selectedNetwork.id === item.id ? 'primary' : undefined}
          >
            <Typography category="s1">{item.name}</Typography>
          </Card>
        )}
      />
    </>
  );
};
