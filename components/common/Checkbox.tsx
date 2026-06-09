// ─────────────────────────────────────────────────────────────────────────────
// Checkbox.tsx — GardenPulse
// Multi-select nodes with spring animation for task rows and batch modes.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useMemo } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  isDisabled = false,
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const scaleAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 300,
    }).start();
  }, [value, scaleAnim]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          opacity: isDisabled ? 0.4 : 1,
        },
        box: {
          width: 24,
          height: 24,
          borderRadius: Radius.sm,
          borderWidth: 2,
          borderColor: value ? Colors.green.DEFAULT : Colors.border.muted,
          backgroundColor: value ? Colors.green.DEFAULT : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
        label: {
          marginLeft: Spacing.sm,
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
        },
      }),
    [Colors, Spacing, Radius, Typography, value, isDisabled]
  );

  return (
    <Pressable
      onPress={() => !isDisabled && onValueChange(!value)}
      style={[styles.container, style]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled: isDisabled }}
    >
      <View style={styles.box}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Feather name="check" size={16} color="#FFFFFF" />
        </Animated.View>
      </View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </Pressable>
  );
};

export default Checkbox;