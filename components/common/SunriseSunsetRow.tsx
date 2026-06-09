// ─────────────────────────────────────────────────────────────────────────────
// SunriseSunsetRow.tsx — GardenPulse
// Sunrise + Sunset time labels derived from zone and local timezone.
// Used on SCR-07.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface SunriseSunsetRowProps {
  /** Sunrise time string (e.g., "6:12 AM") */
  sunriseTime: string;
  /** Sunset time string (e.g., "8:45 PM") */
  sunsetTime: string;
  /** Outer style override */
  style?: ViewStyle;
}

const SunriseSunsetRow: React.FC<SunriseSunsetRowProps> = ({
  sunriseTime,
  sunsetTime,
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
          justifyContent: 'space-around',
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.md,
        },
        item: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        time: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        label: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        divider: {
          width: 1,
          height: 28,
          backgroundColor: Colors.border.subtle,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.row, style]}>
      <View style={styles.item}>
        <Feather name="sunrise" size={18} color="#F59E0B" />
        <View>
          <Text style={styles.time}>{sunriseTime}</Text>
          <Text style={styles.label}>Sunrise</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Feather name="sunset" size={18} color="#F97316" />
        <View>
          <Text style={styles.time}>{sunsetTime}</Text>
          <Text style={styles.label}>Sunset</Text>
        </View>
      </View>
    </View>
  );
};

export default SunriseSunsetRow;