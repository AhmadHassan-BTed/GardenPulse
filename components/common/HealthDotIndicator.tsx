// ─────────────────────────────────────────────────────────────────────────────
// HealthDotIndicator.tsx — GardenPulse
// Small coloured dot showing plant health status at a glance.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export type HealthStatus = 'healthy' | 'warning' | 'critical';

export interface HealthDotIndicatorProps {
  /** The current health status driving the colour */
  status: HealthStatus;
  /** Diameter of the dot (defaults to 10) */
  size?: number;
  /** Outer style override */
  style?: ViewStyle;
}

const HealthDotIndicator: React.FC<HealthDotIndicatorProps> = ({
  status,
  size = 10,
  style,
}) => {
  const theme = useTheme();
  const { Colors } = theme;

  const colorMap: Record<HealthStatus, string> = {
    healthy: Colors.green.DEFAULT,
    warning: '#F59E0B', // Amber
    critical: Colors.text.error, // Red
  };

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colorMap[status],
          borderWidth: 1,
          borderColor: theme.scheme === 'dark' ? 'rgba(0,0,0,0.5)' : '#FFFFFF',
        },
        style,
      ]}
    />
  );
};

export default HealthDotIndicator;