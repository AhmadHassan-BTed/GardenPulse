// ─────────────────────────────────────────────────────────────────────────────
// FilterChip.tsx — GardenPulse
// Horizontal selectable pill used to drill down parameters.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface FilterChipProps {
  /** The text label of the chip */
  label: string;
  /** Whether the chip is currently selected */
  isSelected?: boolean;
  /** Press handler */
  onPress: () => void;
  /** Outer container style override */
  style?: ViewStyle;
  /** Text style override */
  labelStyle?: TextStyle;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected = false,
  onPress,
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        chip: {
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          borderRadius: Radius.full,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        selectedChip: {
          backgroundColor: Colors.green.DEFAULT,
          borderColor: Colors.green.DEFAULT,
        },
        unselectedChip: {
          backgroundColor: 'transparent',
          borderColor: Colors.border.muted,
        },
        label: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
        },
        selectedLabel: {
          color: '#FFFFFF', // High contrast on brand green
        },
        unselectedLabel: {
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isSelected ? styles.selectedChip : styles.unselectedChip,
        style,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text
        style={[
          styles.label,
          isSelected ? styles.selectedLabel : styles.unselectedLabel,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default FilterChip;