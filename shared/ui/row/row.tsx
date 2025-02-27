import { memo } from 'react';
import { ViewProps } from 'react-native';
import { Layout } from '@ui-kitten/components';

type TRowProps = ViewProps & { className?: string };

export const Row = memo(({ ...rest }: TRowProps) => {
  return (
    <Layout
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
      }}
      {...rest}
    />
  );
});
