// ─────────────────────────────────────────────────────────────────────────────
// ZoneGroupHeader.tsx — GardenPulse
// Collapsible section header for multi-zone grouping (e.g., "Windowsill").
// Shown post-referral unlock on SCR-02.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ZoneGroupHeaderProps {
  /** Zone name (e.g., "Windowsill", "Balcony") */
  zoneName: string;
  /** Number of plants in this zone */
  plantCount?: number;
  /** Whether the section is currently expanded */
  isExpanded?: boolean;
  /** Toggle callback */
  onToggle?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ZoneGroupHeader: React.FC<ZoneGroupHeaderProps> = ({
  zoneName,
  plantCount,
  isExpanded = true,
  onToggle,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
          gap: Spacing.sm,
        },
        zoneIcon: {
          width: 28,
          height: 28,
          borderRadius: Radius.sm,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        label: {
          flex: 1,
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          letterSpacing: 0.3,
          textTransform: 'uppercase',
        },
        countBadge: {
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 2,
        },
        countText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7 },
        style,
      ]}
    >
      <View style={styles.zoneIcon}>
        <Feather name="map-pin" size={14} color={Colors.green.DEFAULT} />
      </View>
      <Text style={styles.label}>{zoneName}</Text>
      {plantCount !== undefined && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{plantCount} plants</Text>
        </View>
      )}
      <Feather
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={16}
        color={Colors.text.muted}
      />
    </Pressable>
  );
};

export default ZoneGroupHeader;