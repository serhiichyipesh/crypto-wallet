import { memo } from 'react';
import { Button } from '@shared/ui';
import { copyToClipboard } from '@shared/lib';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '@ui-kitten/components';

export const CopyButton = memo(
  ({ stringToCopy = '' }: { stringToCopy: string }) => {
    const theme = useTheme();

    return (
      <Button size="small" onPress={() => copyToClipboard(stringToCopy)}>
        {() => (
          <Feather name="copy" size={20} color={theme['color-basic-100']} />
        )}
      </Button>
    );
  }
);
