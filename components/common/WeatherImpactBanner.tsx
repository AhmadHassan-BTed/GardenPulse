// ─────────────────────────────────────────────────────────────────────────────
// WeatherImpactBanner.tsx — GardenPulse
// Conditional banner on plant detail: shows weather-based care alert.
// Used on SCR-03.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface WeatherImpactBannerProps {
  /** Alert message (e.g., "Rain expected tomorrow — skip watering") */
  message: string;
  /** Severity of the weather impact */
  severity?: 'info' | 'warning' | 'critical';
  /** Outer style override */
  style?: ViewStyle;
}

const WeatherImpactBanner: React.FC<WeatherImpactBannerProps> = ({
  message,
  severity = 'info',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const severityConfig = {
    info: { bg: Colors.green.tint, icon: 'cloud-rain' as const, color: Colors.green.DEFAULT },
    warning: { bg: 'rgba(245, 158, 11, 0.12)', icon: 'alert-triangle' as const, color: '#F59E0B' },
    critical: { bg: 'rgba(220, 38, 38, 0.10)', icon: 'alert-circle' as const, color: Colors.text.error },
  };

  const config = severityConfig[severity];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: Radius.md,
          padding: Spacing.md,
          gap: Spacing.sm,
        },
        text: {
          flex: 1,
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.body,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, { backgroundColor: config.bg }, style]}>
      <Feather name={config.icon} size={16} color={config.color} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default WeatherImpactBanner;