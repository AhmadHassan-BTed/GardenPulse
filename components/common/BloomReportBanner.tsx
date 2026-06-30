// ─────────────────────────────────────────────────────────────────────────────
// BloomReportBanner.tsx — GardenPulse
// "Your weekly report is ready " label + View Report button.
// Conditional Monday banner shown on SCR-01.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface BloomReportBannerProps {
  /** Press handler to view the full bloom report */
  onPress?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const BloomReportBanner: React.FC<BloomReportBannerProps> = ({
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
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.lg,
          borderWidth: 1,
          borderColor: Colors.green.glow,
          padding: Spacing.md,
          gap: Spacing.md,
        },
        iconContainer: {
          width: 40,
          height: 40,
          borderRadius: Radius.sm,
          backgroundColor: Colors.green.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
        },
        title: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        subtitle: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: 2,
        },
        ctaBadge: {
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.xs,
        },
        ctaText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: '#FFFFFF',
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
        <Feather name="bar-chart-2" size={18} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your weekly report is ready </Text>
        <Text style={styles.subtitle}>See how your garden performed this week</Text>
      </View>
      <View style={styles.ctaBadge}>
        <Text style={styles.ctaText}>View</Text>
      </View>
    </Pressable>
  );
};

export default BloomReportBanner;