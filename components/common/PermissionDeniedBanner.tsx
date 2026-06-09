// ─────────────────────────────────────────────────────────────────────────────
// PermissionDeniedBanner.tsx — GardenPulse
// Warning icon + "[Permission] access is off" label + Open Settings button + optional gallery fallback (camera only)[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import TextLink from './TextLink';

export interface PermissionDeniedBannerProps {
  permissionName: string;
  onOpenSettings: () => void;
  onGalleryFallback?: () => void;
  style?: ViewStyle;
}

const PermissionDeniedBanner: React.FC<PermissionDeniedBannerProps> = ({
  permissionName,
  onOpenSettings,
  onGalleryFallback,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: `${Colors.text.error}15`,
          borderWidth: 1,
          borderColor: `${Colors.text.error}30`,
          borderRadius: Radius.md,
          padding: Spacing.md,
          flexDirection: 'column',
          gap: Spacing.sm,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        label: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
          flex: 1,
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: Spacing.lg,
          marginTop: Spacing.xs,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Feather name="alert-triangle" size={18} color={Colors.text.error} />
        <Text style={styles.label}>{permissionName} access is off</Text>
      </View>
      <View style={styles.actions}>
        {onGalleryFallback && (
          <TextLink label="Use Gallery Instead" onPress={onGalleryFallback} variant="muted" />
        )}
        <TextLink label="Open Settings" onPress={onOpenSettings} variant="primary" />
      </View>
    </View>
  );
};

export default PermissionDeniedBanner;