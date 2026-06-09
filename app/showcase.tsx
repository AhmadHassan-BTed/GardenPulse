// ─────────────────────────────────────────────────────────────────────────────
// app/showcase.tsx — GardenPulse
//
// Component Library preview screen — a route in the expo-router tree.
//
// Path:  app/showcase.tsx
// URL:   /showcase            (in expo-router)
//        gardenpulse://showcase   (on device via the app scheme)
//
// To run it in the BROWSER:
//   1. npm run web
//   2. Open the URL printed in the terminal (usually http://localhost:8081)
//   3. Navigate to /showcase  (or just open http://localhost:8081/showcase)
//
// On a real device / emulator, the same route is available via the URL bar
// in Expo Go after running `npm start`.
// ─────────────────────────────────────────────────────────────────────────────

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ComponentShowcase } from '../components';
import { useThemeController } from '../components/layout/ThemeProvider';

export default function ShowcaseRoute() {
  const { scheme, theme } = useThemeController();
  const isDark = scheme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.Colors.surface.base} />
      <Stack.Screen
        options={{
          title: 'Component Library',
          headerStyle: { backgroundColor: theme.Colors.surface.base },
          headerTitleStyle: { color: theme.Colors.text.heading },
          headerTintColor: theme.Colors.text.heading,
          contentStyle: { backgroundColor: theme.Colors.surface.base },
        }}
      />
      <ComponentShowcase />
    </>
  );
}
