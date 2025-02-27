import React, { memo } from 'react';
import { Divider, type DividerProps, useTheme } from '@ui-kitten/components';
import { theme } from '@shared/config';

type TSeparatorProps = DividerProps & {
  bg?: keyof typeof theme;
  className?: string;
};

export const Separator = memo(({ bg, ...rest }: TSeparatorProps) => {
  const theme = useTheme();

  return (
    <Divider
      style={{ backgroundColor: theme[bg || 'color-basic-700'] }}
      {...rest}
    />
  );
});

Separator.displayName = 'Separator';
