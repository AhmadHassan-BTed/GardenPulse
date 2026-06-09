// ─────────────────────────────────────────────────────────────────────────────
// CustomCard.tsx — GardenPulse
// Theme-aware card with three variants and optional press behaviour.
// • default  — soft surface panel with a hairline border
// • accent   — green left stripe + brand-green glow shadow
// • minimal  — no elevation, very subtle border
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface CustomCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'accent' | 'minimal';
  padding?: number;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

// ── Component ─────────────────────────────────────────────────────────────────
const CustomCard: React.FC<CustomCardProps> = ({
  children,
  title,
  subtitle,
  headerRight,
  footer,
  variant = 'default',
  padding,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          borderRadius: Radius.lg,
          backgroundColor: Colors.surface.glass,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          overflow: 'hidden',
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
        },
        cardAccent: {
          borderColor: Colors.green.deep,
          shadowColor: Colors.green.DEFAULT,
          shadowOpacity: 0.22,
          elevation: 5,
        },
        cardMinimal: {
          elevation: 0,
          shadowOpacity: 0,
          borderColor: Colors.border.subtle,
        },
        accentStripe: {
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 3,
          backgroundColor: Colors.green.DEFAULT,
          borderTopLeftRadius: Radius.lg,
          borderBottomLeftRadius: Radius.lg,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingBottom: Spacing.xs,
        },
        headerText: { flex: 1, marginRight: Spacing.sm },
        headerRight: { justifyContent: 'center' },
        title: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          lineHeight: Typography.sizes.md * 1.3,
          letterSpacing: 0.2,
        },
        subtitle: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.regular,
          color: Colors.text.muted,
          marginTop: 2,
          letterSpacing: 0.1,
        },
        footer: {
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          paddingTop: Spacing.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  const isAccent  = variant === 'accent';
  const isMinimal = variant === 'minimal';
  const padValue = padding ?? Spacing.md;

  const cardContent = (
    <>
      {isAccent && <View style={styles.accentStripe} />}
      {(title || subtitle || headerRight) && (
        <View style={[styles.header, { paddingHorizontal: padValue, paddingTop: padValue }]}>
          <View style={styles.headerText}>
            {title    && <Text style={[styles.title, titleStyle]} numberOfLines={2}>{title}</Text>}
            {subtitle && <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>{subtitle}</Text>}
          </View>
          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}
      <View style={{ padding: padValue }}>{children}</View>
      {footer && (
        <View style={[styles.footer, { paddingHorizontal: padValue, paddingBottom: padValue }]}>
          {footer}
        </View>
      )}
    </>
  );

  const cardStyle: (ViewStyle | false)[] = [
    styles.card,
    isAccent  && styles.cardAccent,
    isMinimal && styles.cardMinimal,
    style ?? {},
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyle,
          pressed && { opacity: 0.88, transform: [{ scale: 0.992 }] },
        ]}
        android_ripple={{ color: Colors.green.glow }}
      >
        {cardContent}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{cardContent}</View>;
};

export default CustomCard;
