// ─────────────────────────────────────────────────────────────────────────────
// ConfettiCelebration.tsx — GardenPulse
// Animated confetti overlay — "All done today!" state.
// Triggered when all tasks are checked off on SCR-01.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ConfettiCelebrationProps {
  /** Whether to show the celebration overlay */
  visible: boolean;
  /** Message shown during celebration */
  message?: string;
  /** Outer style override */
  style?: ViewStyle;
}

const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  visible,
  message = 'All done today! 🎉',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
    }
  }, [visible, fadeAnim, scaleAnim]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        },
        card: {
          backgroundColor: Colors.surface.base,
          borderRadius: Radius.xl,
          padding: Spacing.xl,
          alignItems: 'center',
          gap: Spacing.md,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 8,
        },
        iconCircle: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          textAlign: 'center',
        },
        subtitle: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          textAlign: 'center',
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  if (!visible) return null;

  return (
    <View style={[styles.overlay, style]} pointerEvents="none">
      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.iconCircle}>
          <Feather name="award" size={28} color={Colors.green.DEFAULT} />
        </View>
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.subtitle}>
          Every plant got the attention it needed today.
        </Text>
      </Animated.View>
    </View>
  );
};

export default ConfettiCelebration;