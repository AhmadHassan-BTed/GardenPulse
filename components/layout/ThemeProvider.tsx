// ─────────────────────────────────────────────────────────────────────────────
// ThemeProvider.tsx — GardenPulse
//
// App-wide theme controller. Picks a palette (light or dark), exposes it
// through context, and persists the user's choice with AsyncStorage.
//
// Resolution order on first launch:
//   1. Saved user choice from AsyncStorage
//   2. OS preference (useColorScheme)
//   3. Light (fallback)
//
// Components read colors via the `useTheme()` hook:
//   const { Colors, Spacing, ... } = useTheme();
// ─────────────────────────────────────────────────────────────────────────────

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { AppTheme, ThemeScheme, getTheme } from '../../constants/themes';

const STORAGE_KEY = '@gardenpulse:theme-preference';

// ── Context shape ────────────────────────────────────────────────────────────
interface ThemeContextValue {
  /** The active theme object (Colors + static tokens). */
  theme: AppTheme;
  /** Convenience shortcut: 'light' | 'dark'. */
  scheme: ThemeScheme;
  /** Switch to a specific scheme. */
  setScheme: (scheme: ThemeScheme) => void;
  /** Flip light ↔ dark. */
  toggleScheme: () => void;
  /** True until the persisted choice has been read from disk. */
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const osScheme = useColorScheme(); // 'light' | 'dark' | null
  const [scheme, setSchemeState] = useState<ThemeScheme>('light');
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. On mount: load persisted choice (or fall back to OS preference).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled) {
          if (saved === 'light' || saved === 'dark') {
            setSchemeState(saved);
          } else if (osScheme === 'dark' || osScheme === 'light') {
            setSchemeState(osScheme);
          }
        }
      } catch {
        // Ignore — we just keep the default 'light'.
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []); // intentionally only on mount

  // 2. If the OS preference changes after mount and the user hasn't picked
  //    one yet, follow it.
  useEffect(() => {
    if (!isHydrated) return;
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (!saved && (osScheme === 'light' || osScheme === 'dark')) {
        setSchemeState(osScheme);
      }
    })();
  }, [osScheme, isHydrated]);

  // 3. Persist whenever the user explicitly changes the scheme.
  const setScheme = useCallback((next: ThemeScheme) => {
    setSchemeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const toggleScheme = useCallback(() => {
    setSchemeState(prev => {
      const next: ThemeScheme = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  // Memoize the value so consumers don't re-render on every parent update.
  const value = useMemo<ThemeContextValue>(() => {
    const theme = getTheme(scheme);
    return { theme, scheme, setScheme, toggleScheme, isHydrated };
  }, [scheme, isHydrated, setScheme, toggleScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): AppTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme() must be used inside a <ThemeProvider>.');
  }
  return ctx.theme;
}

/** Hook for the full context — gives you the toggle / setter too. */
export function useThemeController(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      'useThemeController() must be used inside a <ThemeProvider>.',
    );
  }
  return ctx;
}
