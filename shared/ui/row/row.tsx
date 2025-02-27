import { memo } from 'react';
import { cn } from '@shared/lib';
import { View, ViewProps } from 'react-native';

type TRowProps = ViewProps & { className?: string };

export const Row = memo(({ className, ...rest }: TRowProps) => {
  return (
    <View
      style={{ flexDirection: 'row' }}
      className={cn('item-center justify-center', className)}
      {...rest}
    />
  );
});
