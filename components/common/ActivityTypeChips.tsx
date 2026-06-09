// ─────────────────────────────────────────────────────────────────────────────
// ActivityTypeChips.tsx — GardenPulse
// Multi-select chip group for logging multiple activities at once.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import FilterChip from './FilterChip';

export type StandardActivity = 'Water' | 'Feed' | 'Prune' | 'Check' | 'Harvest' | 'Repot' | 'Transplant' | 'Note';

export interface ActivityTypeChipsProps {
  selectedActivities: StandardActivity[];
  onToggleActivity: (activity: StandardActivity) => void;
  style?: ViewStyle;
}

const ActivityTypeChips: React.FC<ActivityTypeChipsProps> = ({
  selectedActivities,
  onToggleActivity,
  style,
}) => {
  const theme = useTheme();
  const { Spacing } = theme;

  const activities: StandardActivity[] = [
    'Water', 'Feed', 'Prune', 'Check', 
    'Harvest', 'Repot', 'Transplant', 'Note'
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Spacing.sm,
        },
      }),
    [Spacing]
  );

  return (
    <View style={[styles.container, style]}>
      {activities.map((activity) => (
        <FilterChip
          key={activity}
          label={activity}
          isSelected={selectedActivities.includes(activity)}
          onPress={() => onToggleActivity(activity)}
        />
      ))}
    </View>
  );
};

export default ActivityTypeChips;