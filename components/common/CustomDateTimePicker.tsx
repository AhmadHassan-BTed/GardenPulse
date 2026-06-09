// ─────────────────────────────────────────────────────────────────────────────
// CustomDateTimePicker.tsx — GardenPulse
// A theme-aware trigger button for DateTime picking. 
// (Expects @react-native-community/datetimepicker for actual native modal).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Un-comment when installed
import { useTheme } from '../layout/ThemeProvider';

export interface CustomDateTimePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time';
  style?: ViewStyle;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  label,
  value,
  onChange,
  mode = 'date',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const [show, setShow] = useState(false);

  const formattedValue = mode === 'date' 
    ? value.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const iconName = mode === 'date' ? 'calendar' : 'clock';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.md,
        },
        label: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginBottom: 4,
          marginLeft: 4,
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.border.muted,
          paddingHorizontal: Spacing.md,
          height: 56,
        },
        text: {
          flex: 1,
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          marginLeft: Spacing.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && { borderColor: Colors.green.DEFAULT }]}
        onPress={() => setShow(true)}
      >
        <Feather name={iconName} size={20} color={Colors.green.DEFAULT} />
        <Text style={styles.text}>{formattedValue}</Text>
      </Pressable>

      {/* {show && (
          <DateTimePicker
            value={value}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShow(Platform.OS === 'ios');
              if (selectedDate) onChange(selectedDate);
            }}
          />
        )}
      */}
    </View>
  );
};

export default CustomDateTimePicker;