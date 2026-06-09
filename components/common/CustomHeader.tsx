// ─────────────────────────────────────────────────────────────────────────────
// CustomHeader.tsx — GardenPulse
// Theme-aware top navigation bar with optional back action and right-side slots.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../layout/ThemeProvider';

export interface CustomHeaderProps {
  /** Text to display in the centre of the header */
  title?: string;
  /** Whether to show the back arrow on the left */
  showBack?: boolean;
  /** Optional override for the back button behavior (defaults to router.back()) */
  onBack?: () => void;
  /** Custom components (like icons) to render on the right side */
  rightNode?: React.ReactNode;
  /** Override the outer container style */
  style?: ViewStyle;
  /** Removes background color and bottom border when true */
  transparent?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightNode,
  style,
  transparent = false,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Spacing.lg,
          backgroundColor: transparent ? 'transparent' : Colors.surface.base,
          borderBottomWidth: transparent ? 0 : 1,
          borderBottomColor: transparent ? 'transparent' : Colors.border.subtle,
        },
        leftSlot: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        },
        centerSlot: {
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
        rightSlot: {
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        },
        title: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          letterSpacing: 0.2,
        },
        iconButton: {
          padding: Spacing.xs,
          margin: -Spacing.xs, // Expand hit area safely
        },
      }),
    [Colors, Spacing, Typography, transparent]
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSlot}>
        {showBack && (
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && { opacity: 0.7 },
            ]}
            hitSlop={12}
          >
            <Feather name="arrow-left" size={24} color={Colors.text.heading} />
          </Pressable>
        )}
      </View>

      <View style={styles.centerSlot}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightSlot}>
        {rightNode}
      </View>
    </View>
  );
};

export default CustomHeader;