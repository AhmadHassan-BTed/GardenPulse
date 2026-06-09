// ─────────────────────────────────────────────────────────────────────────────
// RecentlyUsedBanner.tsx — GardenPulse
// Conditional card: last-used tool icon + name + "Open again →" link.
// Used on SCR-04.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface RecentlyUsedBannerProps {
  /** Tool name (e.g., "Nutrient Calculator") */
  toolName: string;
  /** Feather icon name for the tool */
  iconName?: string;
  /** Press handler to re-open the tool */
  onPress?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const RecentlyUsedBanner: React.FC<RecentlyUsedBannerProps> = ({
  toolName,
  iconName = 'tool',
  onPress,
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
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.lg,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.md,
          gap: Spacing.md,
        },
        iconContainer: {
          width: 40,
          height: 40,
          borderRadius: Radius.sm,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
        },
        label: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        toolName: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        link: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7 },
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Feather name={iconName as any} size={18} color={Colors.green.DEFAULT} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Recently used</Text>
        <Text style={styles.toolName}>{toolName}</Text>
      </View>
      <Text style={styles.link}>Open again →</Text>
    </Pressable>
  );
};

export default RecentlyUsedBanner;