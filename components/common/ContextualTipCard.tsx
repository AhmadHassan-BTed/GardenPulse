// ─────────────────────────────────────────────────────────────────────────────
// ContextualTipCard.tsx — GardenPulse
// Article title + method tag + read time label + tap trigger.
// Styled as a native content card — used in SCR-01, SCR-03, SCR-05, SCR-06.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ContextualTipCardProps {
  /** Article / tip title */
  title: string;
  /** Growing method tag (e.g., "Soil", "Hydroponic") */
  method?: string;
  /** Estimated read time (e.g., "3 min read") */
  readTime?: string;
  /** Tap handler — opens the article */
  onPress?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ContextualTipCard: React.FC<ContextualTipCardProps> = ({
  title,
  method,
  readTime,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
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
        content: {
          flex: 1,
        },
        title: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          marginBottom: Spacing.xs,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.tight,
        },
        metaRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        methodBadge: {
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 2,
        },
        methodText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: Colors.green.DEFAULT,
        },
        readTime: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        chevron: {
          marginLeft: Spacing.xs,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={styles.iconContainer}>
        <Feather name="book-open" size={18} color={Colors.green.DEFAULT} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          {method && (
            <View style={styles.methodBadge}>
              <Text style={styles.methodText}>{method}</Text>
            </View>
          )}
          {readTime && (
            <Text style={styles.readTime}>{readTime}</Text>
          )}
        </View>
      </View>
      <Feather
        name="chevron-right"
        size={18}
        color={Colors.text.muted}
        style={styles.chevron}
      />
    </Pressable>
  );
};

export default ContextualTipCard;