// ─────────────────────────────────────────────────────────────────────────────
// ForecastStrip.tsx — GardenPulse
// 3-day horizontal strip: icon + high/low per day; child of WeatherWidget.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ForecastDay {
  id: string;
  dayLabel: string; // e.g., "Mon", "Tue"
  icon: keyof typeof Feather.glyphMap;
  high: number;
  low: number;
}

export interface ForecastStripProps {
  forecast: ForecastDay[];
  style?: ViewStyle;
}

const ForecastStrip: React.FC<ForecastStripProps> = ({ forecast, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: isDark ? Colors.surface.elevated : '#F9FAFB',
          borderRadius: Radius.md,
          padding: Spacing.sm,
        },
        dayColumn: {
          alignItems: 'center',
          flex: 1,
        },
        dayLabel: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
          marginBottom: 4,
        },
        iconWrapper: {
          marginVertical: 4,
        },
        tempRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginTop: 2,
        },
        highTemp: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        lowTemp: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <View style={[styles.container, style]}>
      {forecast.slice(0, 3).map((day) => (
        <View key={day.id} style={styles.dayColumn}>
          <Text style={styles.dayLabel}>{day.dayLabel}</Text>
          <View style={styles.iconWrapper}>
            <Feather 
              name={day.icon} 
              size={20} 
              color={day.icon === 'sun' ? '#F59E0B' : Colors.text.body} 
            />
          </View>
          <View style={styles.tempRow}>
            <Text style={styles.highTemp}>{day.high}°</Text>
            <Text style={styles.lowTemp}>{day.low}°</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ForecastStrip;