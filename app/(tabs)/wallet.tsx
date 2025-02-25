import { Button, Divider, Layout, Text, useTheme } from '@ui-kitten/components';

import { ScreenContainer } from '@/shared/ui';
import {
  fetchWalletsBalances,
  trimHex,
  useWallets,
} from '@/entities/blockchain';
import { FlatList, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import to from 'await-to-js';
import { ethers } from 'ethers';

export default function Tab() {
  const { wallets } = useWallets();
  const theme = useTheme();

  const {
    data: walletsBalances,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['walletsBalances'],
    queryFn: async () => {
      const [err, res] = await to(fetchWalletsBalances());

      if (err) {
        throw err;
      }

      return res;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const totalBalance = Object.values(walletsBalances || {}).reduce(
    (acc, current) => acc + current.totalBalanceUsd,
    0
  );

  return (
    <ScreenContainer className="justify-center px-6 pt-16">
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <Text category="h4">Total balance</Text>
              <Text category="h6">{totalBalance} USD</Text>

              <Divider
                className="my-4"
                style={{ backgroundColor: theme['color-basic-700'] }}
              />

              <Layout level="3" className="mb-2 flex flex-row gap-4">
                <Button
                  onPress={() => router.push('../deposit')}
                  className="flex-1"
                >
                  Deposit
                </Button>
                <Button onPress={() => router.push('../send')} className="flex-1">
                  Send
                </Button>
              </Layout>
            </>
          );
        }}
        data={wallets}
        renderItem={({ item }) => {
          return (
            <Layout className="my-1 w-full flex-row items-center justify-between rounded-md border-[0.5px] p-4">
              <Text category="s1">{item.name}</Text>
              <Text>{trimHex(item.address)}</Text>

              <Text>
                {(
                  walletsBalances?.[item.address].totalBalanceUsd || 0
                ).toString()}
              </Text>

              <Button
                accessoryLeft={
                  <Feather name="edit-2" size={16} color="white" />
                }
                size="small"
                onPress={() => router.push(`wallet/edit/${item.address}`)}
              >
                Edit
              </Button>
            </Layout>
          );
        }}
      />
    </ScreenContainer>
  );
}
