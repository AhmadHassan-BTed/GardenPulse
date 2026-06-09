// ─────────────────────────────────────────────────────────────────────────────
// CustomSwitch.tsx — GardenPulse
// Theme-aware animated toggle. Thumb slides left/right with spring physics.
// Track background and glow transition on state change.
// Fully accessible (role="switch", accessibilityState).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

// ── Dimensions ────────────────────────────────────────────────────────────────
const TRACK_WIDTH  = 52;
const TRACK_HEIGHT = 30;
const THUMB_SIZE   = 22;
const THUMB_MARGIN = (TRACK_HEIGHT - THUMB_SIZE) / 2;   // 4
const THUMB_ON_X   = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN;  // 26

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  isDisabled?: boolean;
  label?: string;
  description?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

// ── Component ─────────────────────────────────────────────────────────────────
const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  isDisabled = false,
  label,
  description,
  style,
  labelStyle,
  descriptionStyle,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
        rowDisabled: { opacity: 0.4 },
        track: {
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: Radius.full,
          borderWidth: 1,
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        },
        thumb: {
          position: 'absolute',
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: Radius.full,
          top: THUMB_MARGIN,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.22,
          shadowRadius: 4,
        },
        glowRing: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: Radius.full,
          borderWidth: 1,
          borderColor: Colors.green.DEFAULT,
          opacity: 0.35,
        },
        labelGroup: { flex: 1 },
        label: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          color: Colors.text.body,
          letterSpacing: 0.1,
        },
        description: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.regular,
          color: Colors.text.muted,
          marginTop: 2,
          lineHeight: 18,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  const thumbX    = useRef(new Animated.Value(value ? THUMB_ON_X : THUMB_MARGIN)).current;
  const colorAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(thumbX, {
        toValue: value ? THUMB_ON_X : THUMB_MARGIN,
        useNativeDriver: true,
        damping: 14, stiffness: 200, mass: 0.8,
      }),
      Animated.timing(colorAnim, {
        toValue: value ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, thumbX, colorAnim]);

  // Off: light neutral track on light, dark glass on dark. On: brand green.
  const offTrack = isDark ? 'rgba(255,255,255,0.10)' : '#E5E7EB';
  const trackBg = colorAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [offTrack, Colors.green.DEFAULT],
  });
  const trackBorderColor = colorAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [Colors.border.muted, Colors.green.deep],
  });
  const thumbBg = colorAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['#FFFFFF', '#FFFFFF'],
  });

  const handlePress = useCallback(() => {
    if (!isDisabled) onValueChange(!value);
  }, [isDisabled, onValueChange, value]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.row, isDisabled && styles.rowDisabled, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: isDisabled }}
      hitSlop={8}
    >
      <Animated.View
        style={[styles.track, { backgroundColor: trackBg, borderColor: trackBorderColor }]}
      >
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: thumbX }], backgroundColor: thumbBg }]}
        />
        {value && (
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <View style={styles.glowRing} />
          </View>
        )}
      </Animated.View>
      {(label || description) && (
        <View style={styles.labelGroup}>
          {label && <Text style={[styles.label, labelStyle]} numberOfLines={1}>{label}</Text>}
          {description && (
            <Text style={[styles.description, descriptionStyle]} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default CustomSwitch;
