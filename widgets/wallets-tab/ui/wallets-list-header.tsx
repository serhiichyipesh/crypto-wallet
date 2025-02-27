import { Button, Row, ScreenTitle, Separator, Typography } from '@shared/ui';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { COLORS_MAP, SELECTED_CURRENCY } from '@shared/config';
import { useBalances } from '@entities/blockchain';
import { useMemo } from 'react';

export const WalletsListHeader = () => {
  const { totalBalance } = useBalances();

  const actionButtonsIconsProps = useMemo(() => {
    return {
      color: COLORS_MAP['color-basic-100'],
      size: 24,
    };
  }, []);

  return (
    <>
      <ScreenTitle title="Total balance" />

      <Typography category="h6" className="mb-4">
        {totalBalance} {SELECTED_CURRENCY}
      </Typography>

      <Separator />

      <Row className="mb-2 mt-2  gap-4">
        <Button className="flex-1" onPress={() => router.push('../deposit')}>
          {() => (
            <MaterialCommunityIcons
              {...actionButtonsIconsProps}
              name="arrow-down-bold-circle"
            />
          )}
        </Button>
        <Button className="flex-1" onPress={() => router.push('../send')}>
          {() => (
            <MaterialCommunityIcons
              {...actionButtonsIconsProps}
              name="arrow-up-bold-circle"
            />
          )}
        </Button>
        <Button
          className="flex-1"
          onPress={() => router.push('/wallet/create')}
        >
          {() => (
            <Row>
              <FontAwesome
                {...actionButtonsIconsProps}
                name="plus-circle"
                className="left-3 z-10 rounded-full bg-primary-500 px-1"
              />
              <Entypo {...actionButtonsIconsProps} name="wallet" />
            </Row>
          )}
        </Button>
      </Row>
    </>
  );
};
