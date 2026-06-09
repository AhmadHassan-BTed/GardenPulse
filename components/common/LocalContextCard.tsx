// ─────────────────────────────────────────────────────────────────────────────
// LocalContextCard.tsx — GardenPulse
// "What's thriving in [City]" banner + anonymous insight label + View Map link.
// Used on SCR-08 community screen.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface LocalContextCardProps {
  /** User's city name */
  city: string;
  /** Anonymous insight text (e.g., "Tomatoes are trending this week") */
  insight: string;
  /** Press handler for "View Map" */
  onPress?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const LocalContextCard: React.FC<LocalContextCardProps> = ({
  city,
  insight,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.lg,
          borderWidth: 1,
          borderColor: Colors.green.glow,
          padding: Spacing.md,
          gap: Spacing.sm,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        title: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        insight: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
        anonymousLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          fontStyle: 'italic',
        },
        mapLink: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          marginTop: Spacing.xs,
        },
        mapLinkText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Feather name="map-pin" size={16} color={Colors.green.DEFAULT} />
        <Text style={styles.title}>What's thriving in {city}</Text>
      </View>
      <Text style={styles.insight}>{insight}</Text>
      <Text style={styles.anonymousLabel}>Community insight · anonymised</Text>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.mapLink,
          pressed && { opacity: 0.6 },
        ]}
      >
        <Feather name="map" size={14} color={Colors.green.DEFAULT} />
        <Text style={styles.mapLinkText}>View Map</Text>
      </Pressable>
    </View>
  );
};

export default LocalContextCard;