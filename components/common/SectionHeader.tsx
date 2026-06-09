// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader.tsx — GardenPulse
// Standardized heading row for sections (e.g., "Today's Tasks", "My Plants").
// Supports an optional trailing text link for actions like "See All →".
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface SectionHeaderProps {
  /** The main section title */
  title: string;
  /** Optional text for the right-side action link (e.g., "See All →") */
  actionLabel?: string;
  /** Callback fired when the action link is pressed */
  onActionPress?: () => void;
  /** Outer container style overrides */
  style?: ViewStyle;
  /** Title text style overrides */
  titleStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
  style,
  titleStyle,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingVertical: Spacing.sm,
          marginBottom: Spacing.sm,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          letterSpacing: 0.2,
        },
        actionText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.green.DEFAULT, // Brand green for actionable links
          letterSpacing: 0.1,
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      
      {actionLabel && (
        <Pressable
          onPress={onActionPress}
          hitSlop={{ top: 12, bottom: 12, left: 16, right: 12 }}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;