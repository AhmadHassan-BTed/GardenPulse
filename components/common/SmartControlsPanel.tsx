// ─────────────────────────────────────────────────────────────────────────────
// SmartControlsPanel.tsx — GardenPulse
// Weather sync toggle + skip weekends + travel mode + timing radio selector.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomSwitch from './CustomSwitch';
import RadioGroup from './RadioGroup';
import CustomDateTimePicker from './CustomDateTimePicker';

export interface SmartControlsPanelProps {
  style?: ViewStyle;
}

const SmartControlsPanel: React.FC<SmartControlsPanelProps> = ({ style }) => {
  const theme = useTheme();
  const { Spacing, Colors } = theme;

  // Local state for demonstration; in prod, wire these to your global store/context
  const [weatherSync, setWeatherSync] = useState(true);
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [travelMode, setTravelMode] = useState(false);
  const [travelStart, setTravelStart] = useState(new Date());
  const [travelEnd, setTravelEnd] = useState(new Date(Date.now() + 86400000 * 7)); // +7 days
  const [reminderTiming, setReminderTiming] = useState<string | number>('Morning');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: Spacing.lg,
        },
        group: {
          gap: Spacing.md,
        },
        travelDateRow: {
          flexDirection: 'row',
          gap: Spacing.md,
          marginTop: Spacing.sm,
          paddingTop: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
        },
        datePickerWrapper: {
          flex: 1,
        },
        divider: {
          height: 1,
          backgroundColor: Colors.border.subtle,
          marginVertical: Spacing.sm,
        },
      }),
    [Spacing, Colors]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      
      {/* Toggles Group */}
      <View style={styles.group}>
        <CustomSwitch
          value={weatherSync}
          onValueChange={setWeatherSync}
          label=" Weather sync"
          description="Auto-adjust tasks for rain forecast"
        />
        
        <CustomSwitch
          value={skipWeekends}
          onValueChange={setSkipWeekends}
          label=" Skip weekends"
        />
        
        <CustomSwitch
          value={travelMode}
          onValueChange={setTravelMode}
          label=" Travel Mode"
          description="Pause all reminders while away"
        />

        {travelMode && (
          <View style={styles.travelDateRow}>
            <View style={styles.datePickerWrapper}>
              <CustomDateTimePicker
                label="Departing"
                value={travelStart}
                onChange={setTravelStart}
              />
            </View>
            <View style={styles.datePickerWrapper}>
              <CustomDateTimePicker
                label="Returning"
                value={travelEnd}
                onChange={setTravelEnd}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      {/* Timing Preference */}
      <View style={styles.group}>
        <RadioGroup
          options={[
            { label: 'Morning (7–9 AM)', value: 'Morning' },
            { label: 'Afternoon (12–2 PM)', value: 'Afternoon' },
            { label: 'Evening (6–8 PM)', value: 'Evening' },
          ]}
          selectedValue={reminderTiming}
          onSelect={setReminderTiming}
        />
      </View>

    </CustomCard>
  );
};

export default SmartControlsPanel;