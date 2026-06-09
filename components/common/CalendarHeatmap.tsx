// ─────────────────────────────────────────────────────────────────────────────
// CalendarHeatmap.tsx — GardenPulse
// 30-day logging activity heatmap; colour intensity = logs per day.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface HeatmapDay {
  date: string; // ISO string or short date
  logCount: number;
}

export interface CalendarHeatmapProps {
  title?: string;
  data: HeatmapDay[]; // Expected to be an array of the last 30 days
  style?: ViewStyle;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  title = '30-Day Activity',
  data,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  // Helper to determine cell color based on log count intensity
  const getCellColor = (count: number) => {
    if (count === 0) return isDark ? Colors.surface.elevated : '#F3F4F6';
    if (count === 1) return `${Colors.green.DEFAULT}40`; // 40% opacity green
    if (count === 2) return `${Colors.green.DEFAULT}80`; // 80% opacity green
    return Colors.green.DEFAULT; // 3+ logs = full brand green
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing.md,
        },
        title: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        legendRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        legendText: {
          fontSize: 10,
          color: Colors.text.muted,
        },
        legendBox: {
          width: 8,
          height: 8,
          borderRadius: 2,
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 6,
        },
        cell: {
          width: 24,
          height: 24,
          borderRadius: 4,
        },
      }),
    [Colors, Spacing, Typography, isDark]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.legendRow}>
          <Text style={styles.legendText}>Less</Text>
          <View style={[styles.legendBox, { backgroundColor: getCellColor(0) }]} />
          <View style={[styles.legendBox, { backgroundColor: getCellColor(1) }]} />
          <View style={[styles.legendBox, { backgroundColor: getCellColor(2) }]} />
          <View style={[styles.legendBox, { backgroundColor: getCellColor(3) }]} />
          <Text style={styles.legendText}>More</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {data.slice(0, 30).map((day, index) => (
          <View 
            key={index} 
            style={[styles.cell, { backgroundColor: getCellColor(day.logCount) }]} 
            accessibilityLabel={`${day.logCount} logs on ${day.date}`}
          />
        ))}
      </View>
    </CustomCard>
  );
};

export default CalendarHeatmap;