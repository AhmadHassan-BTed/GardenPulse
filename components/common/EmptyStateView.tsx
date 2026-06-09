// ─────────────────────────────────────────────────────────────────────────────
// EmptyStateView.tsx — GardenPulse
// Centralized empty state for lists (No plants, no reels, no history, etc).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

export interface EmptyStateViewProps {
  /** The main heading (e.g., "No plants yet") */
  title: string;
  /** Optional secondary text for context */
  description?: string;
  /** Feather icon name to use as a graphic (defaults to 'inbox') */
  iconName?: keyof typeof Feather.glyphMap;
  /** Optional text for a Call To Action button */
  actionLabel?: string;
  /** Action fired when the CTA is pressed */
  onActionPress?: () => void;
  /** Outer container style */
  style?: ViewStyle;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  title,
  description,
  iconName = 'inbox',
  actionLabel,
  onActionPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.xl,
          minHeight: 250, // Ensures it occupies enough space in lists
        },
        iconCircle: {
          width: 80,
          height: 80,
          borderRadius: Radius.full,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.lg,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          textAlign: 'center',
          marginBottom: Spacing.xs,
        },
        description: {
          fontSize: Typography.sizes.base,
          color: Colors.text.muted,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: Spacing.xl,
          maxWidth: '85%',
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Feather name={iconName} size={32} color={Colors.text.muted} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {description && <Text style={styles.description}>{description}</Text>}
      
      {actionLabel && onActionPress && (
        <CustomButton label={actionLabel} onPress={onActionPress} variant="secondary" />
      )}
    </View>
  );
};

export default EmptyStateView;