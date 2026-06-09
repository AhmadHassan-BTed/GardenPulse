// ─────────────────────────────────────────────────────────────────────────────
// Divider.tsx — GardenPulse
// Simple horizontal rule to separate sections, with optional center text (e.g., "OR").
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface DividerProps {
  /** Optional text to display in the center of the divider */
  text?: string;
  /** Outer container style */
  style?: ViewStyle;
  /** Override text styling */
  textStyle?: TextStyle;
}

const Divider: React.FC<DividerProps> = ({ text, style, textStyle }) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: Spacing.md,
        },
        line: {
          flex: 1,
          height: 1,
          backgroundColor: Colors.border.subtle,
        },
        text: {
          marginHorizontal: Spacing.md,
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      {text && <View style={styles.line} />}
    </View>
  );
};

export default Divider;