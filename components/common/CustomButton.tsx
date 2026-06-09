// ─────────────────────────────────────────────────────────────────────────────
// CustomButton.tsx — GardenPulse
// Theme-aware button with 'primary', 'secondary', and 'ghost' variants.
//
// • Primary:   Default CTA — dark on light, white on dark.
// • Secondary: Surface-colored with a hairline border.
// • Ghost:     No border, theme-aware text.
// • IMPORTANT CTAs can opt into the brand green via the `style` prop:
//     <CustomButton ... style={{ backgroundColor: theme.Colors.button.accentBg }} />
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface CustomButtonProps {
  /** Button label text */
  label: string;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Visual variant — controls fill, border, and label colour */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** When true, the button is non-interactive and visually dimmed */
  isDisabled?: boolean;
  /** Shows a spinner instead of the label — use during async operations */
  isLoading?: boolean;
  /** Optional icon rendered to the left of the label */
  leftIcon?: React.ReactNode;
  /** Override the outer container style */
  style?: ViewStyle;
  /** Override the label text style */
  labelStyle?: TextStyle;
  /** Full-width layout when true */
  fullWidth?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  leftIcon,
  style,
  labelStyle,
  fullWidth = false,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const disabled = isDisabled || isLoading;

  // Recompute styles on every render so theme switches take effect immediately.
  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          minHeight: 52,
          borderRadius: Radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.sm + 4,
          overflow: 'hidden',
        },
        fullWidth: { width: '100%' },
        inner: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        iconWrap: { marginRight: 2 },

        primary: {
          backgroundColor: Colors.button.primaryBg,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 10,
        },
        secondary: {
          backgroundColor: Colors.button.secondaryBg,
          borderWidth: 1,
          borderColor: Colors.border.muted,
          elevation: 0,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          elevation: 0,
        },

        label: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.semibold,
          letterSpacing: 0.4,
        },
        primaryLabel:   { color: Colors.button.primaryText },
        secondaryLabel: { color: Colors.button.secondaryText },
        ghostLabel:     { color: Colors.text.body },

        disabledContainer: {
          opacity: 0.38,
          elevation: 0,
          shadowOpacity: 0,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabledContainer,
        pressed && !disabled && { opacity: 0.82, transform: [{ scale: 0.978 }] },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      android_ripple={
        disabled
          ? undefined
          : {
              color:
                variant === 'primary'
                  ? theme.scheme === 'dark'
                    ? 'rgba(0,0,0,0.18)'
                    : 'rgba(255,255,255,0.20)'
                  : Colors.green.glow,
              borderless: false,
            }
      }
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.button.primaryText : Colors.green.DEFAULT}
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconWrap}>{leftIcon}</View>}
          <Text
            style={[
              styles.label,
              styles[`${variant}Label` as 'primaryLabel' | 'secondaryLabel' | 'ghostLabel'],
              disabled && { opacity: 0.7 },
              labelStyle,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;
