// ─────────────────────────────────────────────────────────────────────────────
// ZoneBadge.tsx — GardenPulse
// A localized layout chip highlighting geographic/zone context.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ZoneBadgeProps {
  /** The planting zone (e.g., "Zone 7b") */
  zone: string;
  /** The city or region (e.g., "Berlin") */
  location?: string;
  /** Outer container style */
  style?: ViewStyle;
}

const ZoneBadge: React.FC<ZoneBadgeProps> = ({ zone, location, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: Colors.surface.glass,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          borderRadius: Radius.md,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 4,
        },
        icon: {
          marginRight: 6,
        },
        text: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
          letterSpacing: 0.2,
        },
        separator: {
          color: Colors.text.muted,
          marginHorizontal: 4,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Feather name="map-pin" size={12} color={Colors.green.DEFAULT} style={styles.icon} />
      <Text style={styles.text}>{zone}</Text>
      {location && (
        <>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.text}>{location}</Text>
        </>
      )}
    </View>
  );
};

export default ZoneBadge;