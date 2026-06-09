// ─────────────────────────────────────────────────────────────────────────────
// CustomSlider.tsx — GardenPulse
// Linear trackers for metric bands (e.g. pH level, sentiment scales).
// Gesture-driven purely with React Native primitives.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, ViewStyle, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface CustomSliderProps {
  label?: string;
  value: number; // 0 to 100
  onValueChange: (val: number) => void;
  style?: ViewStyle;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ label, value, onValueChange, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  
  const widthRef = useRef<number>(0);
  const pan = useRef(new Animated.Value(value)).current; // Maps 0-100 logically

  const handleLayout = (e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        const newValue = Math.max(0, Math.min(100, (gestureState.x0 / widthRef.current) * 100));
        pan.setValue(newValue);
      },
      onPanResponderMove: (e, gestureState) => {
        // Calculate new percentage based on movement
        const rawNewValue = value + (gestureState.dx / widthRef.current) * 100;
        const boundedValue = Math.max(0, Math.min(100, rawNewValue));
        pan.setValue(boundedValue);
      },
      onPanResponderRelease: (e, gestureState) => {
        const rawNewValue = value + (gestureState.dx / widthRef.current) * 100;
        const boundedValue = Math.max(0, Math.min(100, rawNewValue));
        onValueChange(Math.round(boundedValue));
      },
    })
  ).current;

  const thumbLeft = pan.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginVertical: Spacing.sm },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Spacing.xs,
        },
        label: { color: Colors.text.body, fontSize: Typography.sizes.sm },
        value: { color: Colors.green.DEFAULT, fontWeight: Typography.weights.bold },
        trackWrapper: { height: 30, justifyContent: 'center' },
        track: {
          height: 6,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.full,
          overflow: 'hidden',
        },
        fill: {
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: Colors.green.DEFAULT,
        },
        thumb: {
          position: 'absolute',
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: Colors.green.DEFAULT,
          top: 3,
          marginLeft: -12, // Center over the value point
          elevation: 4,
          shadowColor: Colors.green.DEFAULT,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      )}
      <View style={styles.trackWrapper} onLayout={handleLayout} {...panResponder.panHandlers}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width: thumbLeft }]} pointerEvents="none" />
        </View>
        <Animated.View style={[styles.thumb, { left: thumbLeft }]} pointerEvents="none" />
      </View>
    </View>
  );
};

export default CustomSlider;