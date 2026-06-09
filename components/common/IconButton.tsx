// ─────────────────────────────────────────────────────────────────────────────
// IconButton.tsx — GardenPulse
// Small, asset-friendly hit boxes for recurring utility functions.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface IconButtonProps {
  /** Feather icon name */
  name: keyof typeof Feather.glyphMap;
  /** Press handler */
  onPress: () => void;
  /** Icon size (default: 24) */
  size?: number;
  /** Optional icon color override (defaults to theme's heading text color) */
  color?: string;
  /** Outer container style */
  style?: ViewStyle;
  /** Render inside a visible circular background if true */
  filled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  onPress,
  size = 24,
  color,
  style,
  filled = false,
}) => {
  const theme = useTheme();
  const { Colors, Radius } = theme;

  const iconColor = color || Colors.text.heading;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          width: filled ? size * 1.8 : size,
          height: filled ? size * 1.8 : size,
          borderRadius: Radius.full,
          backgroundColor: filled ? Colors.surface.glass : 'transparent',
          ...(filled && {
            borderWidth: 1,
            borderColor: Colors.surface.glassBorder,
          }),
        },
      }),
    [Colors, Radius, filled, size]
  );

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && { opacity: 0.6, transform: [{ scale: 0.95 }] },
      ]}
    >
      <Feather name={name} size={size} color={iconColor} />
    </Pressable>
  );
};

export default IconButton;