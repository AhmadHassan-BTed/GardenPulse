// ─────────────────────────────────────────────────────────────────────────────
// MetricDial.tsx — GardenPulse
// Circular progress indicator for health scores.
// Note: Requires `react-native-svg` installed in your Expo project.
// Run: npx expo install react-native-svg
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useTheme } from '../layout/ThemeProvider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface MetricDialProps {
  /** Value from 0 to 100 */
  value: number;
  /** Size of the dial in pixels (width and height) */
  size?: number;
  /** Thickness of the ring */
  strokeWidth?: number;
  /** Custom label beneath the number (e.g. "Health") */
  label?: string;
}

const MetricDial: React.FC<MetricDialProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  label,
}) => {
  const theme = useTheme();
  const { Colors, Typography } = theme;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [value, animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  // Calculate dynamic color based on score (Red < 40, Amber < 70, Green >= 70)
  const getScoreColor = (score: number) => {
    if (score < 40) return Colors.text.error;
    if (score < 70) return '#F59E0B'; // Amber
    return Colors.green.DEFAULT;
  };

  const dialColor = getScoreColor(value);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        textContainer: {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
        },
        valueText: {
          fontSize: size * 0.25,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        labelText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: -2,
        },
      }),
    [Colors, Typography, size]
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.surface.elevated}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={dialColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.valueText}>{value}</Text>
        {label && <Text style={styles.labelText}>{label}</Text>}
      </View>
    </View>
  );
};

export default MetricDial;