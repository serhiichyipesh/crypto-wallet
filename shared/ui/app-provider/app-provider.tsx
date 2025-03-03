import { memo, PropsWithChildren } from 'react';
import * as eva from '@eva-design/eva';
import { theme } from '@shared/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider } from '@ui-kitten/components';

const queryClient = new QueryClient();

export const AppProvider = memo(({ children }: PropsWithChildren) => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApplicationProvider>
  );
});
