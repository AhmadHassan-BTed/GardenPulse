// ─────────────────────────────────────────────────────────────────────────────
// RepeatSelector.tsx — GardenPulse
// Selector for recurrence: Once · Daily · Weekly · Custom interval[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import FilterChip from './FilterChip';
import { useTheme } from '../layout/ThemeProvider';

export type RepeatInterval = 'Once' | 'Daily' | 'Weekly' | 'Custom';

export interface RepeatSelectorProps {
  value: RepeatInterval;
  onChange: (value: RepeatInterval) => void;
  style?: ViewStyle;
}

const RepeatSelector: React.FC<RepeatSelectorProps> = ({ value, onChange, style }) => {
  const theme = useTheme();
  const { Spacing } = theme;
  
  const options: RepeatInterval[] = ['Once', 'Daily', 'Weekly', 'Custom'];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 0,
        },
        content: {
          gap: Spacing.sm,
        },
      }),
    [Spacing]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => (
        <FilterChip
          key={option}
          label={option}
          isSelected={value === option}
          onPress={() => onChange(option)}
        />
      ))}
    </ScrollView>
  );
};

export default RepeatSelector;