// ─────────────────────────────────────────────────────────────────────────────
// SeverityIndicator.tsx — GardenPulse
// Colour-coded chip conveying issue severities (Low · Medium · High).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export type SeverityLevel = 'low' | 'medium' | 'high';

export interface SeverityIndicatorProps {
  /** The severity level driving the visual warning */
  level: SeverityLevel;
  /** Optional custom text (defaults to the capitalized level name) */
  label?: string;
  /** Outer container style */
  style?: ViewStyle;
}

const SeverityIndicator: React.FC<SeverityIndicatorProps> = ({
  level,
  label,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const config: Record<SeverityLevel, { color: string; icon: keyof typeof Feather.glyphMap }> = {
    low: { color: Colors.green.DEFAULT, icon: 'check-circle' },
    medium: { color: '#F59E0B', icon: 'alert-triangle' }, // Amber
    high: { color: Colors.text.error, icon: 'alert-octagon' }, // Red
  };

  const { color, icon } = config[level];
  const displayLabel = label || level.toUpperCase();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: isDark ? `${color}15` : `${color}10`,
          borderWidth: 1,
          borderColor: isDark ? `${color}30` : `${color}25`,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 4,
          borderRadius: Radius.sm,
        },
        icon: {
          marginRight: 6,
        },
        text: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: color,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        },
      }),
    [color, isDark, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Feather name={icon} size={12} color={color} style={styles.icon} />
      <Text style={styles.text}>{displayLabel}</Text>
    </View>
  );
};

export default SeverityIndicator;