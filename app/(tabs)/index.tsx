import { Card } from '@ui-kitten/components';

import { Avatar, Button, Row, ScreenContainer, Typography } from '@shared/ui';
import { trimHex, useBalances, useWallets } from '@entities/blockchain';
import { FlatList, RefreshControl } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import {
  COLORS_MAP,
  SELECTED_CURRENCY,
  SELECTED_CURRENCY_RATE,
} from '@shared/config';
import { WalletsListHeader } from '@widgets/wallets-tab';
import Entypo from '@expo/vector-icons/Entypo';
import { basicIconColor } from '@widgets/send-transaction';

export default function Tab() {
  const { wallets } = useWallets();

  const {
    isRefreshingBalance,
    refreshBalances,
    refetchBalances,
    walletsBalances,
  } = useBalances();

  useFocusEffect(
    useCallback(() => {
      refetchBalances();
    }, [refetchBalances])
  );

  return (
    <ScreenContainer>
      <FlatList
        contentContainerClassName="gap-2"
        data={wallets}
        ListHeaderComponent={WalletsListHeader}
        refreshControl={
          <RefreshControl
            progressViewOffset={-10}
            refreshing={isRefreshingBalance}
            tintColor={COLORS_MAP['color-primary-400']}
            onRefresh={refreshBalances}
          />
        }
        renderItem={({ item }) => {
          const balance = (
            walletsBalances?.[item.address]?.totalBalanceUsd || 0
          ).toString();

          return (
            <Card
              header={() => (
                <Row className="items-center justify-between px-6 py-3">
                  <Row className="items-center gap-2">
                    <Avatar>
                      <Entypo {...basicIconColor} name="wallet" size={20} />
                    </Avatar>
                    <Typography category="h6">{item.name}</Typography>
                  </Row>

                  <Button
                    accessoryLeft={
                      <Feather
                        name="edit-2"
                        size={12}
                        color={COLORS_MAP['color-primary-500']}
                      />
                    }
                    size="small"
                    appearance="outline"
                    onPress={() => router.push(`wallet/edit/${item.address}`)}
                  >
                    Edit
                  </Button>
                </Row>
              )}
            >
              <Row className="justify-between">
                <Typography category="s1">
                  {trimHex(item.address, 10, 10)}
                </Typography>

                <Typography category="s1">
                  {+balance * SELECTED_CURRENCY_RATE} {SELECTED_CURRENCY}
                </Typography>
              </Row>
            </Card>
          );
        }}
      />
    </ScreenContainer>
  );
}
