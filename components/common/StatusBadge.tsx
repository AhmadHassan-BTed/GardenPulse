// ─────────────────────────────────────────────────────────────────────────────
// StatusBadge.tsx — GardenPulse
// Small color-coded label conveying health statuses or issue severities.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export type StatusType = 'success' | 'warning' | 'error' | 'neutral';

export interface StatusBadgeProps {
  /** The text label */
  label: string;
  /** Semantic status determining the color scheme */
  status?: StatusType;
  /** 'dot' adds a colored circle next to text, 'filled' colors the background */
  variant?: 'dot' | 'filled';
  /** Outer container style */
  style?: ViewStyle;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status = 'neutral',
  variant = 'filled',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const statusColors = {
    success: Colors.green.DEFAULT,
    warning: '#F59E0B', // Amber
    error: Colors.text.error,
    neutral: Colors.text.muted,
  };

  const activeColor = statusColors[status];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          paddingHorizontal: variant === 'filled' ? Spacing.sm : 0,
          paddingVertical: variant === 'filled' ? 4 : 0,
          borderRadius: Radius.sm,
          backgroundColor:
            variant === 'filled'
              ? isDark
                ? `${activeColor}20` // 20% opacity for dark mode backgrounds
                : `${activeColor}15` // 15% opacity for light mode backgrounds
              : 'transparent',
        },
        dot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: activeColor,
          marginRight: 6,
        },
        label: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: variant === 'filled' ? activeColor : Colors.text.body,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }),
    [activeColor, variant, isDark, Spacing, Radius, Typography, Colors]
  );

  return (
    <View style={[styles.container, style]}>
      {variant === 'dot' && <View style={styles.dot} />}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default StatusBadge;