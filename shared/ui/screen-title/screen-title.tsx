import { memo } from 'react';
import { Button, Row, Typography } from '@shared/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useTheme } from '@ui-kitten/components';

type TScreenTitleProps = {
  title: string;
  withBackButton?: boolean;
};

export const ScreenTitle = memo(
  ({ title, withBackButton = false }: TScreenTitleProps) => {
    const theme = useTheme();

    if (withBackButton) {
      return (
        <Row className="gap-4">
          <Button size="small" onPress={() => router.back()} appearance="ghost">
            {() => (
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme['color-basic-100']}
              />
            )}
          </Button>
          <Typography category="h2">{title}</Typography>
        </Row>
      );
    }

    return <Typography category="h2">{title}</Typography>;
  }
);
