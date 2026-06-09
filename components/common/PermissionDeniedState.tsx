// ─────────────────────────────────────────────────────────────────────────────
// PermissionDeniedState.tsx — GardenPulse
// Illustration + heading + Open Settings button + optional gallery fallback button[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import PermissionIllustration, { PermissionType } from './PermissionIllustration';
import CustomButton from './CustomButton';

export interface PermissionDeniedStateProps {
  permissionType: PermissionType;
  title?: string;
  description?: string;
  onOpenSettings: () => void;
  onGalleryFallback?: () => void;
  style?: ViewStyle;
}

const PermissionDeniedState: React.FC<PermissionDeniedStateProps> = ({
  permissionType,
  title = `${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)} access needed`,
  description = `GardenPulse needs access to your ${permissionType} to provide this feature. You can change this in your device settings.`,
  onOpenSettings,
  onGalleryFallback,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.xl,
        },
        illustration: {
          marginBottom: Spacing.xl,
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
          color: Colors.text.muted,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: Spacing.xl,
        },
        actions: {
          width: '100%',
          maxWidth: 300,
          gap: Spacing.md,
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <PermissionIllustration type={permissionType} style={styles.illustration} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.actions}>
        <CustomButton label="Open Settings" onPress={onOpenSettings} fullWidth />
        {onGalleryFallback && (
          <CustomButton 
            label="Upload from Gallery" 
            onPress={onGalleryFallback} 
            variant="secondary" 
            fullWidth 
          />
        )}
      </View>
    </View>
  );
};

export default PermissionDeniedState;