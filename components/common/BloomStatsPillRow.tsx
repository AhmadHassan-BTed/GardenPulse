// ─────────────────────────────────────────────────────────────────────────────
// BloomStatsPillRow.tsx — GardenPulse
// 4 horizontal pill stat cards specific to the Weekly Bloom Report.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import HorizontalScrollRow from './HorizontalScrollRow';

export interface BloomStatsPillRowProps {
  plantsLogged: number;
  logEntries: number;
  healthDelta: number; // e.g., +5 or -2
  streak: number;
  style?: ViewStyle;
}

const BloomStatsPillRow: React.FC<BloomStatsPillRowProps> = ({
  plantsLogged,
  logEntries,
  healthDelta,
  streak,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        pill: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.elevated : '#F9FAFB',
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          borderRadius: Radius.lg,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          minWidth: 130,
        },
        iconWrapper: {
          marginRight: Spacing.sm,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: Colors.surface.base,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textWrapper: {
          flexDirection: 'column',
        },
        valueRow: {
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 2,
        },
        value: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        label: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: 2,
        },
      }),
    [Colors, Spacing, Radius, Typography, theme.scheme]
  );

  const StatPill = ({
    value,
    label,
    icon,
    color,
    isDelta = false,
  }: {
    value: number;
    label: string;
    icon: keyof typeof Feather.glyphMap;
    color: string;
    isDelta?: boolean;
  }) => {
    const displayValue = isDelta && value > 0 ? `+${value}` : value;
    const valueColor = isDelta && value > 0 ? Colors.green.DEFAULT : isDelta && value < 0 ? Colors.text.error : Colors.text.heading;

    return (
      <View style={styles.pill}>
        <View style={styles.iconWrapper}>
          <Feather name={icon} size={16} color={color} />
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.valueRow}>
            <Text style={[styles.value, { color: valueColor }]}>{displayValue}</Text>
            {isDelta && <Text style={{ fontSize: 10, color: valueColor }}>pts</Text>}
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    );
  };

  return (
    <HorizontalScrollRow gap={Spacing.md} edgePadding style={style}>
      <StatPill value={plantsLogged} label="Plants tracked" icon="target" color={Colors.green.DEFAULT} />
      <StatPill value={logEntries} label="Tasks completed" icon="check-square" color="#3B82F6" />
      <StatPill value={healthDelta} label="Health shift" icon="activity" color={healthDelta >= 0 ? Colors.green.DEFAULT : Colors.text.error} isDelta />
      <StatPill value={streak} label="Day streak" icon="zap" color="#F59E0B" />
    </HorizontalScrollRow>
  );
};

export default BloomStatsPillRow;