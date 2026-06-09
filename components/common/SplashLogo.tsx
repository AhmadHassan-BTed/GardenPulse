// ─────────────────────────────────────────────────────────────────────────────
// SplashLogo.tsx — GardenPulse
// Animated brand entry for ONB-1. Handles leaf unfurl, wordmark, and tagline.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface SplashLogoProps {
  /** Callback fired when the intro animation sequence completes */
  onAnimationComplete?: () => void;
}

const SplashLogo: React.FC<SplashLogoProps> = ({ onAnimationComplete }) => {
  const theme = useTheme();
  const { Colors, Typography, Spacing } = theme;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeWordmarkAnim = useRef(new Animated.Value(0)).current;
  const fadeTaglineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Step 1: Leaf unfurl (scale up with spring bounce)
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 100,
      }),
      // Step 2: Wordmark fades and slides slightly up
      Animated.timing(fadeWordmarkAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Step 3: Tagline fades in
      Animated.timing(fadeTaglineAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onAnimationComplete) onAnimationComplete();
    });
  }, [scaleAnim, fadeWordmarkAnim, fadeTaglineAnim, onAnimationComplete]);

  const translateY = fadeWordmarkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0], // Slight slide up effect
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.surface.base,
        },
        iconContainer: {
          marginBottom: Spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: `${Colors.green.DEFAULT}20`, // Soft green glow behind leaf
        },
        wordmark: {
          fontSize: 36,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          letterSpacing: -0.5,
          marginBottom: Spacing.sm,
        },
        tagline: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          color: Colors.green.DEFAULT,
          letterSpacing: 0.5,
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
        {/* Placeholder for actual logo SVG, using a stylized Feather icon for now */}
        <Feather name="wind" size={42} color={Colors.green.DEFAULT} style={{ transform: [{ rotate: '-45deg' }] }} />
      </Animated.View>

      <Animated.View style={{ opacity: fadeWordmarkAnim, transform: [{ translateY }] }}>
        <Text style={styles.wordmark}>GardenPulse</Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeTaglineAnim }}>
        <Text style={styles.tagline}>Grow Smarter, Anywhere.</Text>
      </Animated.View>
    </View>
  );
};

export default SplashLogo;