// ─────────────────────────────────────────────────────────────────────────────
// FAB.tsx (Floating Action Button) — GardenPulse
// Circular fixed button hanging in the bottom-right corner.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface FABProps {
  /** Press handler */
  onPress: () => void;
  /** Icon name from Feather icons (default: 'plus') */
  iconName?: keyof typeof Feather.glyphMap;
  /** Custom absolute positioning styles (overrides bottom/right defaults) */
  style?: ViewStyle;
}

const FAB: React.FC<FABProps> = ({ onPress, iconName = 'plus', style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        fab: {
          position: 'absolute',
          bottom: Spacing.xl + 64, // Accounts for BottomNavigationBar height
          right: Spacing.lg,
          width: 56,
          height: 56,
          borderRadius: Radius.full,
          backgroundColor: Colors.green.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
          shadowColor: Colors.green.DEFAULT,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
      }),
    [Colors, Spacing, Radius]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        style,
        pressed && { opacity: 0.85, transform: [{ scale: 0.95 }] },
      ]}
      android_ripple={{ color: 'rgba(255,255,255,0.3)', borderless: false }}
    >
      <Feather name={iconName} size={24} color="#FFFFFF" />
    </Pressable>
  );
};

export default FAB;