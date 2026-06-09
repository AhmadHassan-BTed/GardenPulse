// ─────────────────────────────────────────────────────────────────────────────
// TextLink.tsx — GardenPulse
// Subtle text-only interactive buttons for secondary actions ("Skip", "Cancel").
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Pressable, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface TextLinkProps {
  /** The text label */
  label: string;
  /** Press handler */
  onPress: () => void;
  /** Color variant: 'primary' (brand green), 'muted' (grey), 'danger' (red) */
  variant?: 'primary' | 'muted' | 'danger';
  /** Outer container style */
  style?: ViewStyle;
  /** Text style override */
  labelStyle?: TextStyle;
}

const TextLink: React.FC<TextLinkProps> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const { Colors, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
        },
        primary: { color: Colors.green.DEFAULT },
        muted: { color: Colors.text.muted },
        danger: { color: Colors.text.error },
      }),
    [Colors, Typography]
  );

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && { opacity: 0.6 },
      ]}
    >
      <Text style={[styles.text, styles[variant], labelStyle]}>{label}</Text>
    </Pressable>
  );
};

export default TextLink;