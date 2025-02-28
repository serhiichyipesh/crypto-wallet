import { Card } from '@ui-kitten/components';

import { Button, Row, ScreenContainer, Typography } from '@shared/ui';
import { trimHex, useBalances, useWallets } from '@entities/blockchain';
import { FlatList, RefreshControl } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { COLORS_MAP, SELECTED_CURRENCY } from '@shared/config';
import { WalletsListHeader } from '@widgets/wallets-tab';

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
                <Row className="justify-between px-6 py-3">
                  <Typography category="s1">{item.name}</Typography>

                  <Button
                    accessoryLeft={
                      <Feather
                        name="edit-2"
                        size={12}
                        color={COLORS_MAP['color-primary-500']}
                      />
                    }
                    size="tiny"
                    appearance="outline"
                    onPress={() => router.push(`wallet/edit/${item.address}`)}
                  >
                    Edit
                  </Button>
                </Row>
              )}
            >
              <Row className="justify-between">
                <Typography>{trimHex(item.address, 10, 10)}</Typography>

                <Typography>
                  {balance} {SELECTED_CURRENCY}
                </Typography>
              </Row>
            </Card>
          );
        }}
      />
    </ScreenContainer>
  );
}
