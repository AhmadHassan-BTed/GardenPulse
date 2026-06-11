// ─────────────────────────────────────────────────────────────────────────────
// app/_layout.tsx — GardenPulse
// Root layout. Wraps the entire app in <ThemeProvider> so every screen
// (tabs, modals, the showcase route, etc.) can call useTheme() /
// useThemeController() without crashing.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useThemeController } from '../components/layout/ThemeProvider';

function RootStack() {
  const { scheme, theme } = useThemeController();
  const isDark = scheme === 'dark';

  return (
    <>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.Colors.surface.base}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.Colors.surface.base },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      try {
        const mobileAds = require('react-native-google-mobile-ads').default;
        mobileAds()
          .initialize()
          .then((adapterStatuses: any) => {
            console.log('AdMob initialization complete:', adapterStatuses);
          })
          .catch((err: any) => {
            console.error('AdMob initialization failed:', err);
          });
      } catch (error) {
        console.error('Failed to require react-native-google-mobile-ads:', error);
      }
    }
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
