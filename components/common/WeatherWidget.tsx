// ─────────────────────────────────────────────────────────────────────────────
// WeatherWidget.tsx — GardenPulse
// City + zone badge, temp/humidity/UV/rain, 3-day forecast strip, smart alert.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import ZoneBadge from './ZoneBadge';
import SmartAlertChip from './SmartAlertChip';
import ForecastStrip, { ForecastDay } from './ForecastStrip';

export interface WeatherWidgetProps {
  city: string;
  zone: string;
  currentTemp: number;
  conditionIcon: keyof typeof Feather.glyphMap;
  humidity: number;
  uvIndex: number;
  rainChance: number;
  forecast: ForecastDay[];
  alertMessage?: string;
  style?: ViewStyle;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  zone,
  currentTemp,
  conditionIcon,
  humidity,
  uvIndex,
  rainChance,
  forecast,
  alertMessage,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: Spacing.md,
        },
        tempRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        tempText: {
          fontSize: 42,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          letterSpacing: -1,
        },
        locationContainer: {
          alignItems: 'flex-end',
          gap: 4,
        },
        metricsGrid: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Spacing.md,
          paddingHorizontal: Spacing.xs,
        },
        metricItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        metricText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.body,
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.tempRow}>
          <Feather 
            name={conditionIcon} 
            size={36} 
            color={conditionIcon === 'sun' ? '#F59E0B' : Colors.text.heading} 
          />
          <Text style={styles.tempText}>{currentTemp}°</Text>
        </View>
        <View style={styles.locationContainer}>
          <ZoneBadge zone={zone} location={city} />
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Feather name="droplet" size={16} color="#3B82F6" />
          <Text style={styles.metricText}>{humidity}% Hum</Text>
        </View>
        <View style={styles.metricItem}>
          <Feather name="sun" size={16} color="#F59E0B" />
          <Text style={styles.metricText}>UV {uvIndex}</Text>
        </View>
        <View style={styles.metricItem}>
          <Feather name="cloud-rain" size={16} color="#6366F1" />
          <Text style={styles.metricText}>{rainChance}% Rain</Text>
        </View>
      </View>

      <ForecastStrip forecast={forecast} style={{ marginBottom: alertMessage ? Spacing.md : 0 }} />

      {alertMessage && (
        <SmartAlertChip 
          message={alertMessage} 
          type="warning" 
          iconName="alert-circle" 
          style={{ width: '100%', marginTop: Spacing.md }} 
        />
      )}
    </CustomCard>
  );
};

export default WeatherWidget;