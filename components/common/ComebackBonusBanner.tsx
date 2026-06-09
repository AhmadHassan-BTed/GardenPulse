// ─────────────────────────────────────────────────────────────────────────────
// ComebackBonusBanner.tsx — GardenPulse
// Animated welcome-back illustration + message + CTA button.
// Conditional on lapse — shown when user returns after inactivity on SCR-01.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ComebackBonusBannerProps {
  /** Number of days since last activity */
  daysSince?: number;
  /** CTA button label */
  ctaLabel?: string;
  /** Press handler for the CTA */
  onPress?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ComebackBonusBanner: React.FC<ComebackBonusBannerProps> = ({
  daysSince = 3,
  ctaLabel = "Let's go",
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.lg,
          alignItems: 'center',
        },
        iconCircle: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.md,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          textAlign: 'center',
          marginBottom: Spacing.xs,
        },
        subtitle: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          textAlign: 'center',
          marginBottom: Spacing.lg,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
        ctaButton: {
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.xl,
          paddingVertical: Spacing.sm,
        },
        ctaButtonText: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.semibold,
          color: '#FFFFFF',
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Feather name="sun" size={28} color={Colors.green.DEFAULT} />
      </View>
      <Text style={styles.title}>Welcome back! 🌱</Text>
      <Text style={styles.subtitle}>
        Your garden missed you. It's been {daysSince} days —{' '}
        let's check in on your plants.
      </Text>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.ctaButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.ctaButtonText}>{ctaLabel}</Text>
      </Pressable>
    </View>
  );
};

export default ComebackBonusBanner;