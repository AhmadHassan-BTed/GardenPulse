// ─────────────────────────────────────────────────────────────────────────────
// RadioGroup.tsx — GardenPulse
// Selectors for growing methods, categories, and fixed choices.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string | number | null;
  onSelect: (value: string | number) => void;
  horizontal?: boolean;
  style?: ViewStyle;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onSelect,
  horizontal = false,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: horizontal ? 'row' : 'column',
          gap: Spacing.md,
        },
        option: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        outerCircle: {
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        innerCircle: {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Colors.green.DEFAULT,
        },
        label: {
          marginLeft: Spacing.sm,
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
        },
      }),
    [Colors, Spacing]
  );

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <Pressable
            key={option.value}
            style={styles.option}
            onPress={() => onSelect(option.value)}
          >
            <View
              style={[
                styles.outerCircle,
                { borderColor: isSelected ? Colors.green.DEFAULT : Colors.border.muted },
              ]}
            >
              {isSelected && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioGroup;