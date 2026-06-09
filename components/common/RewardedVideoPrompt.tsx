// ─────────────────────────────────────────────────────────────────────────────
// RewardedVideoPrompt.tsx — GardenPulse
// "Unlock [X]" heading + duration label + Watch Video CTA + No Thanks link.
// Can be placed inside a ModalDialog or BottomSheet.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import TextLink from './TextLink';

export interface RewardedVideoPromptProps {
  featureName: string; // e.g., "Premium PDF Export"
  durationLabel?: string; // e.g., "~30 seconds"
  onWatchPress: () => void;
  onDismiss: () => void;
  style?: ViewStyle;
}

const RewardedVideoPrompt: React.FC<RewardedVideoPromptProps> = ({
  featureName,
  durationLabel = '~30 seconds',
  onWatchPress,
  onDismiss,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          padding: Spacing.xl,
        },
        iconWrapper: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.lg,
          borderWidth: 2,
          borderColor: Colors.green.DEFAULT,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          textAlign: 'center',
          marginBottom: Spacing.sm,
        },
        description: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: Spacing.lg,
        },
        metaRow: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? Colors.surface.elevated : '#F9FAFB',
          paddingHorizontal: Spacing.md,
          paddingVertical: 8,
          borderRadius: Radius.full,
          marginBottom: Spacing.xl,
          gap: 6,
        },
        metaText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
        },
        actions: {
          width: '100%',
          gap: Spacing.md,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard variant="default" padding={0} style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        <Feather name="play" size={36} color={Colors.green.DEFAULT} style={{ marginLeft: 6 }} />
      </View>

      <Text style={styles.title}>Unlock {featureName}</Text>
      <Text style={styles.description}>
        Watch a short sponsor video to support GardenPulse and unlock this feature instantly.
      </Text>

      <View style={styles.metaRow}>
        <Feather name="clock" size={14} color={Colors.text.muted} />
        <Text style={styles.metaText}>{durationLabel}</Text>
      </View>

      <View style={styles.actions}>
        <CustomButton label="Watch Video" onPress={onWatchPress} fullWidth />
        <TextLink label="No Thanks" onPress={onDismiss} variant="muted" style={{ alignSelf: 'center' }} />
      </View>
    </CustomCard>
  );
};

export default RewardedVideoPrompt;