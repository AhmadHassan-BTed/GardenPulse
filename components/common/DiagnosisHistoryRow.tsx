// ─────────────────────────────────────────────────────────────────────────────
// DiagnosisHistoryRow.tsx — GardenPulse
// List row: date + thumbnail + plant name + finding label + severity badge.
// Used in SCR-06 diagnosis history.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import SeverityIndicator, { SeverityLevel } from './SeverityIndicator';

export interface DiagnosisHistoryRowProps {
  /** Date string (e.g., "Jun 5") */
  date: string;
  /** Plant thumbnail URI */
  thumbnailUrl?: string;
  /** Plant name */
  plantName: string;
  /** Finding label (e.g., "Leaf spot detected") */
  finding: string;
  /** Severity level */
  severity: SeverityLevel;
  /** Outer style override */
  style?: ViewStyle;
}

const DiagnosisHistoryRow: React.FC<DiagnosisHistoryRowProps> = ({
  date,
  thumbnailUrl,
  plantName,
  finding,
  severity,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.md,
          paddingVertical: Spacing.sm,
        },
        dateLabel: {
          width: 40,
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          textAlign: 'center',
        },
        thumbnail: {
          width: 40,
          height: 40,
          borderRadius: Radius.sm,
          backgroundColor: Colors.surface.subtle,
        },
        content: {
          flex: 1,
        },
        plantName: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        finding: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: 2,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.row, style]}>
      <Text style={styles.dateLabel}>{date}</Text>
      {thumbnailUrl ? (
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        <Text style={styles.plantName} numberOfLines={1}>{plantName}</Text>
        <Text style={styles.finding} numberOfLines={1}>{finding}</Text>
      </View>
      <SeverityIndicator level={severity} />
    </View>
  );
};

export default DiagnosisHistoryRow;