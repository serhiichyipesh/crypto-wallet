import { Layout, LayoutProps } from '@ui-kitten/components';
import { memo, PropsWithChildren } from 'react';

import { cn } from '@shared/lib';
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
          paddingHorizontal: 16,
        }}
        className={cn('flex flex-1', className)}
        {...props}
      >
        {children}
      </Layout>
    );
  }
);

ScreenContainer.displayName = 'ScreenContainer';
