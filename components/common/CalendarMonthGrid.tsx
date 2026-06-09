// ─────────────────────────────────────────────────────────────────────────────
// CalendarMonthGrid.tsx — GardenPulse
// Monthly grid view with task dots per day; toggle alternative to week strip.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface MonthDayData {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  taskColors: string[]; // Hex colors for task indicators
}

export interface CalendarMonthGridProps {
  days: MonthDayData[]; // Expects exactly 35 or 42 days (5 or 6 weeks)
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  style?: ViewStyle;
}

const CalendarMonthGrid: React.FC<CalendarMonthGridProps> = ({
  days,
  selectedDate,
  onSelectDate,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Radius, Typography, Spacing } = theme;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: Spacing.sm,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Spacing.sm,
        },
        headerCell: {
          flex: 1,
          alignItems: 'center',
        },
        headerText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        dayCell: {
          width: '14.28%', // 100% / 7
          aspectRatio: 0.8,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 4,
        },
        numberCircle: {
          width: 32,
          height: 32,
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
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        numberDimmed: {
          color: Colors.border.muted,
        },
        dotsRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          marginTop: 4,
          paddingHorizontal: 4,
          height: 14, // Fixed height to prevent layout shifts
        },
        dot: {
          width: 5,
          height: 5,
          borderRadius: 2.5,
        },
      }),
    [Colors, Radius, Typography, Spacing]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        {weekDays.map((day, idx) => (
          <View key={idx} style={styles.headerCell}>
            <Text style={styles.headerText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day, idx) => {
          const isSelected = selectedDate.toDateString() === day.date.toDateString();

          return (
            <Pressable
              key={idx}
              style={styles.dayCell}
              onPress={() => onSelectDate(day.date)}
            >
              <View
                style={[
                  styles.numberCircle,
                  day.isToday && !isSelected && styles.numberToday,
                  isSelected && styles.numberSelected,
                ]}
              >
                <Text
                  style={[
                    styles.numberText,
                    !day.isCurrentMonth && styles.numberDimmed,
                    isSelected && { fontWeight: Typography.weights.bold },
                  ]}
                >
                  {day.dayNumber}
                </Text>
              </View>

              <View style={styles.dotsRow}>
                {day.taskColors.slice(0, 4).map((color, colorIdx) => (
                  <View key={colorIdx} style={[styles.dot, { backgroundColor: color }]} />
                ))}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarMonthGrid;