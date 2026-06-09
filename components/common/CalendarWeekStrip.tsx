// ─────────────────────────────────────────────────────────────────────────────
// CalendarWeekStrip.tsx — GardenPulse
// Horizontal 7-day strip with coloured task dots and today highlight ring.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface CalendarDayData {
  date: Date;
  label: string; // e.g., "Mon"
  dayNumber: number; // e.g., 14
  isToday: boolean;
  taskColors: string[]; // Array of hex colors for dots (blue, green, yellow, etc.)
}

export interface CalendarWeekStripProps {
  days: CalendarDayData[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  style?: ViewStyle;
}

const CalendarWeekStrip: React.FC<CalendarWeekStripProps> = ({
  days,
  selectedDate,
  onSelectDate,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: theme.Spacing.md,
        },
        dayContainer: {
          alignItems: 'center',
          gap: 6,
        },
        dayLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
        },
        numberCircle: {
          width: 36,
          height: 36,
          borderRadius: Radius.full,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: 'transparent',
        },
        numberSelected: {
          borderColor: Colors.green.DEFAULT,
          backgroundColor: `${Colors.green.DEFAULT}20`,
        },
        numberToday: {
          borderColor: Colors.text.heading,
        },
        numberText: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        dotsRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 3,
          height: 6, // Reserve space even if no dots
        },
        dot: {
          width: 6,
          height: 6,
          borderRadius: 3,
        },
      }),
    [Colors, Radius, Typography, theme.Spacing]
  );

  return (
    <View style={[styles.container, style]}>
      {days.map((day, index) => {
        const isSelected = selectedDate.toDateString() === day.date.toDateString();
        
        return (
          <Pressable 
            key={index} 
            style={styles.dayContainer} 
            onPress={() => onSelectDate(day.date)}
            hitSlop={10}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
            
            <View 
              style={[
                styles.numberCircle,
                day.isToday && !isSelected && styles.numberToday,
                isSelected && styles.numberSelected,
              ]}
            >
              <Text style={styles.numberText}>{day.dayNumber}</Text>
            </View>

            <View style={styles.dotsRow}>
              {day.taskColors.slice(0, 3).map((color, i) => (
                <View key={i} style={[styles.dot, { backgroundColor: color }]} />
              ))}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CalendarWeekStrip;