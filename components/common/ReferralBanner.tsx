// ─────────────────────────────────────────────────────────────────────────────
// ReferralBanner.tsx — GardenPulse
// "Invite 3 friends → unlock Multi-Zone" + X/3 progress + Share button.
// Used on SCR-08, SCR-11.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ReferralBannerProps {
  /** Number of friends invited so far */
  invitedCount: number;
  /** Total friends needed */
  totalNeeded?: number;
  /** Press handler for the share button */
  onShare?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ReferralBanner: React.FC<ReferralBannerProps> = ({
  invitedCount,
  totalNeeded = 3,
  onShare,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const isComplete = invitedCount >= totalNeeded;

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
        title: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
        },
        progressRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          marginTop: Spacing.xs,
        },
        progressDot: {
          width: 10,
          height: 10,
          borderRadius: 5,
        },
        progressDotFilled: {
          backgroundColor: Colors.green.DEFAULT,
        },
        progressDotEmpty: {
          backgroundColor: Colors.border.subtle,
        },
        shareButton: {
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
        },
        shareButtonText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: '#FFFFFF',
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Feather name="users" size={18} color={Colors.green.DEFAULT} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {isComplete ? 'Multi-Zone unlocked!  [SUCCESS] ' : `Invite ${totalNeeded - invitedCount} more friends → unlock Multi-Zone`}
        </Text>
        <View style={styles.progressRow}>
          {Array.from({ length: totalNeeded }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i < invitedCount ? styles.progressDotFilled : styles.progressDotEmpty,
              ]}
            />
          ))}
          <Text style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>
            {invitedCount}/{totalNeeded}
          </Text>
        </View>
      </View>
      {!isComplete && (
        <Pressable
          onPress={onShare}
          style={({ pressed }) => [
            styles.shareButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ReferralBanner;