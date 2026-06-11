// ─────────────────────────────────────────────────────────────────────────────
// CustomDateTimePicker.tsx — GardenPulse
// A theme-aware trigger button for DateTime picking with fail-safe fallbacks. 
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ViewStyle, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

// Dynamically import DateTimePicker inside a try-catch block to prevent crash when native module is missing.
let DateTimePicker: any = null;
let isDatePickerAvailable = false;

try {
  const module = require('@react-native-community/datetimepicker');
  DateTimePicker = module.default || module;
  isDatePickerAvailable = true;
} catch (e) {
  isDatePickerAvailable = false;
}

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

  // Fallback states
  const [dayInput, setDayInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [hourInput, setHourInput] = useState('');
  const [minuteInput, setMinuteInput] = useState('');
  const [isPM, setIsPM] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'day' | 'month' | 'year' | 'hour' | 'minute' | null>(null);

  // Refs for auto-tabbing in fallback modal
  const dayRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const hourRef = useRef<TextInput>(null);
  const minuteRef = useRef<TextInput>(null);

  const formattedValue = mode === 'date' 
    ? value.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const iconName = mode === 'date' ? 'calendar' : 'clock';

  const handleOpen = () => {
    // Populate fallback values from existing Date object
    setDayInput(value.getDate().toString().padStart(2, '0'));
    setMonthInput((value.getMonth() + 1).toString().padStart(2, '0'));
    setYearInput(value.getFullYear().toString());
    
    let hours = value.getHours();
    const isPMValue = hours >= 12;
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    setHourInput(displayHours.toString().padStart(2, '0'));
    setMinuteInput(value.getMinutes().toString().padStart(2, '0'));
    setIsPM(isPMValue);

    setShow(true);
  };

  // Live Date validation
  const isValidDate = (d: number, m: number, y: number) => {
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > 2100) return false;
    
    // Check actual days in month
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  const isDateValid = useMemo(() => {
    return isValidDate(parseInt(dayInput, 10), parseInt(monthInput, 10), parseInt(yearInput, 10));
  }, [dayInput, monthInput, yearInput]);

  const isTimeValid = useMemo(() => {
    const h = parseInt(hourInput, 10);
    const min = parseInt(minuteInput, 10);
    return !isNaN(h) && !isNaN(min) && h >= 1 && h <= 12 && min >= 0 && min <= 59;
  }, [hourInput, minuteInput]);

  const handleSaveDate = () => {
    const d = parseInt(dayInput, 10);
    const m = parseInt(monthInput, 10);
    const y = parseInt(yearInput, 10);
    
    if (isValidDate(d, m, y)) {
      const newDate = new Date(value);
      newDate.setFullYear(y);
      newDate.setMonth(m - 1);
      newDate.setDate(d);
      onChange(newDate);
      setShow(false);
    }
  };

  const handleSaveTime = () => {
    let h = parseInt(hourInput, 10);
    const min = parseInt(minuteInput, 10);
    
    if (!isNaN(h) && !isNaN(min) && h >= 1 && h <= 12 && min >= 0 && min <= 59) {
      const newDate = new Date(value);
      let finalHour = h;
      if (isPM) {
        if (h < 12) finalHour = h + 12;
      } else {
        if (h === 12) finalHour = 0;
      }
      newDate.setHours(finalHour);
      newDate.setMinutes(min);
      onChange(newDate);
      setShow(false);
    }
  };

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
        // Fallback Modal styling
        modalBackdrop: {
          flex: 1,
          backgroundColor: Colors.surface.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.lg,
        },
        modalCard: {
          width: '100%',
          maxWidth: 320,
          backgroundColor: Colors.surface.base,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.lg,
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        modalTitle: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.md,
        },
        inputRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: Spacing.xs,
          marginBottom: Spacing.sm,
        },
        inputGroup: {
          alignItems: 'center',
          width: 65,
        },
        inputLabel: {
          fontSize: 10,
          color: Colors.text.muted,
          marginBottom: 4,
          textTransform: 'uppercase',
        },
        fallbackInput: {
          width: '100%',
          height: 48,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.border.muted,
          color: Colors.text.body,
          textAlign: 'center',
          fontSize: Typography.sizes.base,
        },
        separator: {
          fontSize: Typography.sizes.lg,
          color: Colors.text.muted,
          alignSelf: 'flex-end',
          marginBottom: 12,
          paddingHorizontal: 2,
        },
        ampmButton: {
          height: 48,
          width: 52,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.border.muted,
          alignSelf: 'flex-end',
        },
        ampmText: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.body,
        },
        errorText: {
          fontSize: 11,
          color: Colors.text.error,
          marginTop: 2,
          marginBottom: 4,
        },
        modalActions: {
          flexDirection: 'row',
          width: '100%',
          gap: Spacing.sm,
          marginTop: Spacing.md,
        },
        modalButton: {
          flex: 1,
          height: 44,
          borderRadius: Radius.md,
          justifyContent: 'center',
          alignItems: 'center',
        },
        cancelButton: {
          borderWidth: 1,
          borderColor: Colors.border.muted,
        },
        saveButton: {
          elevation: 2,
        },
        disabledButton: {
          opacity: 0.5,
        },
        buttonText: {
          fontSize: Typography.sizes.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && { borderColor: Colors.green.DEFAULT }]}
        onPress={handleOpen}
      >
        <Feather name={iconName} size={20} color={Colors.green.DEFAULT} />
        <Text style={styles.text}>{formattedValue}</Text>
      </Pressable>

      {/* Native DateTimePicker (rendered if available) */}
      {isDatePickerAvailable && show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event: any, selectedDate: Date | undefined) => {
            // Automatically hide picker on Android after selection
            if (Platform.OS === 'android') {
              setShow(false);
            }
            if (event.type === "set" && selectedDate) {
              onChange(selectedDate);
            } else if (event.type === "dismissed") {
              setShow(false);
            }
          }}
        />
      )}

      {/* Fail-safe Fallback Modal Picker (rendered if native module not compiled/available) */}
      {!isDatePickerAvailable && show && (
        <Modal
          transparent
          visible={show}
          animationType="fade"
          onRequestClose={() => setShow(false)}
        >
          <Pressable style={styles.modalBackdrop} onPress={() => setShow(false)}>
            <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.modalTitle}>
                {mode === 'date' ? 'Select Date' : 'Select Time'}
              </Text>
              
              {mode === 'date' ? (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Month</Text>
                    <TextInput
                      ref={monthRef}
                      style={[
                        styles.fallbackInput,
                        focusedInput === 'month' && { borderColor: Colors.green.DEFAULT, borderWidth: 1.5 }
                      ]}
                      value={monthInput}
                      onChangeText={(val) => {
                        const sanitized = val.replace(/[^0-9]/g, '');
                        setMonthInput(sanitized);
                        if (sanitized.length === 2) {
                          dayRef.current?.focus();
                        }
                      }}
                      placeholder="MM"
                      placeholderTextColor={Colors.text.muted}
                      keyboardType="number-pad"
                      maxLength={2}
                      onFocus={() => setFocusedInput('month')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  
                  <Text style={styles.separator}>/</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Day</Text>
                    <TextInput
                      ref={dayRef}
                      style={[
                        styles.fallbackInput,
                        focusedInput === 'day' && { borderColor: Colors.green.DEFAULT, borderWidth: 1.5 }
                      ]}
                      value={dayInput}
                      onChangeText={(val) => {
                        const sanitized = val.replace(/[^0-9]/g, '');
                        setDayInput(sanitized);
                        if (sanitized.length === 2) {
                          yearRef.current?.focus();
                        }
                      }}
                      placeholder="DD"
                      placeholderTextColor={Colors.text.muted}
                      keyboardType="number-pad"
                      maxLength={2}
                      onFocus={() => setFocusedInput('day')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  
                  <Text style={styles.separator}>/</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Year</Text>
                    <TextInput
                      ref={yearRef}
                      style={[
                        styles.fallbackInput,
                        focusedInput === 'year' && { borderColor: Colors.green.DEFAULT, borderWidth: 1.5 }
                      ]}
                      value={yearInput}
                      onChangeText={(val) => {
                        const sanitized = val.replace(/[^0-9]/g, '');
                        setYearInput(sanitized);
                      }}
                      placeholder="YYYY"
                      placeholderTextColor={Colors.text.muted}
                      keyboardType="number-pad"
                      maxLength={4}
                      onFocus={() => setFocusedInput('year')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Hour</Text>
                    <TextInput
                      ref={hourRef}
                      style={[
                        styles.fallbackInput,
                        focusedInput === 'hour' && { borderColor: Colors.green.DEFAULT, borderWidth: 1.5 }
                      ]}
                      value={hourInput}
                      onChangeText={(val) => {
                        const sanitized = val.replace(/[^0-9]/g, '');
                        setHourInput(sanitized);
                        if (sanitized.length === 2) {
                          minuteRef.current?.focus();
                        }
                      }}
                      placeholder="HH"
                      placeholderTextColor={Colors.text.muted}
                      keyboardType="number-pad"
                      maxLength={2}
                      onFocus={() => setFocusedInput('hour')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>

                  <Text style={styles.separator}>:</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Minute</Text>
                    <TextInput
                      ref={minuteRef}
                      style={[
                        styles.fallbackInput,
                        focusedInput === 'minute' && { borderColor: Colors.green.DEFAULT, borderWidth: 1.5 }
                      ]}
                      value={minuteInput}
                      onChangeText={(val) => {
                        const sanitized = val.replace(/[^0-9]/g, '');
                        setMinuteInput(sanitized);
                      }}
                      placeholder="MM"
                      placeholderTextColor={Colors.text.muted}
                      keyboardType="number-pad"
                      maxLength={2}
                      onFocus={() => setFocusedInput('minute')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>

                  <Pressable
                    style={[
                      styles.ampmButton,
                      { backgroundColor: Colors.surface.elevated }
                    ]}
                    onPress={() => setIsPM(!isPM)}
                  >
                    <Text style={styles.ampmText}>{isPM ? 'PM' : 'AM'}</Text>
                  </Pressable>
                </View>
              )}

              {/* Validation Feedback */}
              {mode === 'date' && !isDateValid && (dayInput || monthInput || yearInput) ? (
                <Text style={styles.errorText}>Please enter a valid date</Text>
              ) : mode === 'time' && !isTimeValid && (hourInput || minuteInput) ? (
                <Text style={styles.errorText}>Please enter a valid time (1-12, 0-59)</Text>
              ) : (
                <View style={{ height: 18 }} />
              )}

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShow(false)}
                >
                  <Text style={[styles.buttonText, { color: Colors.text.muted }]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.modalButton,
                    styles.saveButton,
                    { backgroundColor: Colors.green.DEFAULT },
                    mode === 'date' ? !isDateValid && styles.disabledButton : !isTimeValid && styles.disabledButton
                  ]}
                  disabled={mode === 'date' ? !isDateValid : !isTimeValid}
                  onPress={mode === 'date' ? handleSaveDate : handleSaveTime}
                >
                  <Text style={[styles.buttonText, { color: '#FFF', fontWeight: '600' }]}>Confirm</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default CustomDateTimePicker;