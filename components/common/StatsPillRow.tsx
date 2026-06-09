// ─────────────────────────────────────────────────────────────────────────────
// StatsPillRow.tsx — GardenPulse
// 4 horizontal scrollable pill stats: plants · logs · streak · challenges.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import HorizontalScrollRow from './HorizontalScrollRow';

export interface StatsPillRowProps {
  plantsCount: number;
  logCount: number;
  streak: number;
  challengesWon: number;
  style?: ViewStyle;
}

const StatsPillRow: React.FC<StatsPillRowProps> = ({
  plantsCount,
  logCount,
  streak,
  challengesWon,
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
          backgroundColor: Colors.surface.glass,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          borderRadius: Radius.lg,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          minWidth: 120,
        },
        iconWrapper: {
          marginRight: Spacing.sm,
        },
        textWrapper: {
          flexDirection: 'column',
        },
        value: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        label: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  const StatPill = ({ value, label, icon, color }: { value: number, label: string, icon: keyof typeof Feather.glyphMap, color: string }) => (
    <View style={styles.pill}>
      <View style={styles.iconWrapper}>
        <Feather name={icon} size={20} color={color} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );

  return (
    <HorizontalScrollRow gap={Spacing.md} edgePadding style={style}>
      <StatPill value={plantsCount} label="Plants" icon="grid" color={Colors.green.DEFAULT} />
      <StatPill value={logCount} label="Entries" icon="file-text" color="#3B82F6" />
      <StatPill value={streak} label="Day Streak" icon="zap" color="#F59E0B" />
      <StatPill value={challengesWon} label="Wins" icon="award" color="#EC4899" />
    </HorizontalScrollRow>
  );
};

export default StatsPillRow;