// Polyfill
import '../globals';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { OPEN_STORYBOOK, theme } from '@shared/config';
import '../global.css';
import { useWallets } from '@entities/blockchain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from 'expo-router';
import { default as StoryBookApp } from '.././.storybook';

export const queryClient = new QueryClient();

function Layout() {
  const { hasAnyWallet } = useWallets();

  useEffect(() => {
    if (!hasAnyWallet) router.push('wallet/create');
  }, [hasAnyWallet]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar key="dark" style="light" />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="wallet/create" />
          <Stack.Screen
            name="wallet/import"
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="wallet/edit/[address]"
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen name="send" />
          <Stack.Screen name="deposit" options={{ presentation: 'modal' }} />
        </Stack>
      </QueryClientProvider>
    </ApplicationProvider>
  );
}

let App = Layout;

if (OPEN_STORYBOOK) {
  App = () => (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <StoryBookApp />
    </ApplicationProvider>
  );
}

export default App;
