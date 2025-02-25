import { Layout, LayoutProps } from '@ui-kitten/components';
import { memo, PropsWithChildren } from 'react';

import { cn } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ScreenContainer = memo(
  ({
    children,
    className,
    ...props
  }: PropsWithChildren<LayoutProps & { className?: string }>) => {
    const insets = useSafeAreaInsets();

    return (
      <Layout
        level="3"
        style={{
          paddingBottom: insets.bottom || 32,
          paddingTop: insets.top || 56,
        }}
        className={cn('flex flex-1 px-6', className)}
        {...props}
      >
        {children}
      </Layout>
    );
  }
);
