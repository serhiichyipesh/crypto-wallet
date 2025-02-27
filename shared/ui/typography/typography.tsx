import React, { memo } from 'react';
import { Text, type TextProps } from '@ui-kitten/components';

export const Typography = memo((props: TextProps) => {
  return <Text {...props} />;
});

Typography.displayName = 'Typography';
