// ─────────────────────────────────────────────────────────────────────────────
// MetricBreakdownRow.tsx — GardenPulse
// Expandable accordion row displaying a grid of 8 environmental/plant metrics.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, LayoutAnimation } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import HealthDotIndicator, { HealthStatus } from './HealthDotIndicator';

export interface PlantMetric {
  id: string;
  name: string; // e.g., "Soil Moisture", "Light DLI"
  value: string; // e.g., "45%", "12 mol"
  status: HealthStatus;
  icon: keyof typeof Feather.glyphMap;
}

export interface MetricBreakdownRowProps {
  metrics: PlantMetric[];
  title?: string;
  style?: ViewStyle;
}

const MetricBreakdownRow: React.FC<MetricBreakdownRowProps> = ({
  metrics,
  title = "Environmental Metrics",
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          borderRadius: Radius.md,
          marginBottom: Spacing.md,
          overflow: 'hidden',
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: Spacing.md,
          backgroundColor: expanded ? (theme.scheme === 'dark' ? Colors.surface.elevated : '#F9FAFB') : Colors.surface.base,
        },
        headerLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        headerTitle: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        gridContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: Spacing.sm,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
        },
        metricCell: {
          width: '50%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: Spacing.sm,
        },
        iconBox: {
          width: 32,
          height: 32,
          borderRadius: Radius.sm,
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.elevated : '#E5E7EB',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: Spacing.sm,
        },
        metricTextContent: {
          flex: 1,
        },
        metricLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        valueRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 2,
        },
        metricValue: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
      }),
    [Colors, Spacing, Radius, Typography, theme.scheme, expanded]
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.header} onPress={toggleExpand}>
        <View style={styles.headerLeft}>
          <Feather name="activity" size={18} color={Colors.text.muted} />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={Colors.text.muted} />
      </Pressable>

      {expanded && (
        <View style={styles.gridContainer}>
          {metrics.map((metric) => (
            <View key={metric.id} style={styles.metricCell}>
              <View style={styles.iconBox}>
                <Feather name={metric.icon} size={16} color={Colors.text.body} />
              </View>
              <View style={styles.metricTextContent}>
                <Text style={styles.metricLabel}>{metric.name}</Text>
                <View style={styles.valueRow}>
                  <HealthDotIndicator status={metric.status} size={8} />
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MetricBreakdownRow;