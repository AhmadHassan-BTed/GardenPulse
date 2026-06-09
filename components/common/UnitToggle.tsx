// ─────────────────────────────────────────────────────────────────────────────
// UnitToggle.tsx — GardenPulse
// Segmented control pill to switch between Metric and Imperial measurements.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export type UnitSystem = 'metric' | 'imperial';

export interface UnitToggleProps {
  /** The currently selected unit system */
  value: UnitSystem;
  /** Fired when the user taps the unselected option */
  onChange: (system: UnitSystem) => void;
  /** Overall width of the toggle (defaults to 160) */
  width?: number;
  /** Outer container style */
  style?: ViewStyle;
}

const UnitToggle: React.FC<UnitToggleProps> = ({
  value,
  onChange,
  width = 160,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Radius, Typography } = theme;
  const isMetric = value === 'metric';

  // Animated sliding pill background
  const slideAnim = useRef(new Animated.Value(isMetric ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isMetric ? 0 : 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 250,
      mass: 0.8,
    }).start();
  }, [isMetric, slideAnim]);

  const thumbTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, (width / 2) - 2], // 2px padding inside the track
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width,
          height: 36,
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.full,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
        },
        activeThumb: {
          position: 'absolute',
          width: (width / 2) - 4,
          height: 30,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.full,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        option: {
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        },
        text: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
        },
        activeText: {
          color: Colors.green.DEFAULT,
        },
        inactiveText: {
          color: Colors.text.muted,
        },
      }),
    [Colors, Radius, Typography, width]
  );

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.activeThumb, { transform: [{ translateX: thumbTranslateX }] }]} />
      
      <Pressable onPress={() => onChange('metric')} style={styles.option}>
        <Text style={[styles.text, isMetric ? styles.activeText : styles.inactiveText]}>
          Metric
        </Text>
      </Pressable>

      <Pressable onPress={() => onChange('imperial')} style={styles.option}>
        <Text style={[styles.text, !isMetric ? styles.activeText : styles.inactiveText]}>
          Imperial
        </Text>
      </Pressable>
    </View>
  );
};

export default UnitToggle;