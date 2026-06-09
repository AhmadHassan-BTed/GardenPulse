// ─────────────────────────────────────────────────────────────────────────────
// CustomReminderForm.tsx — GardenPulse
// Inline form: plant selector + task type + repeat selector + date-time picker.
// Used on SCR-07.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

export interface CustomReminderFormProps {
  /** Selected plant name (if any) */
  selectedPlant?: string;
  /** Selected task type */
  taskType?: string;
  /** Selected repeat interval */
  repeatInterval?: string;
  /** Press handler to select plant */
  onSelectPlant?: () => void;
  /** Press handler to select task type */
  onSelectTask?: () => void;
  /** Press handler to select repeat */
  onSelectRepeat?: () => void;
  /** Press handler to pick date/time */
  onPickDateTime?: () => void;
  /** Save callback */
  onSave?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const CustomReminderForm: React.FC<CustomReminderFormProps> = ({
  selectedPlant,
  taskType = 'Water',
  repeatInterval = 'Daily',
  onSelectPlant,
  onSelectTask,
  onSelectRepeat,
  onPickDateTime,
  onSave,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: Spacing.md,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        field: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.md,
        },
        fieldLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        fieldValue: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        placeholderValue: {
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  const renderField = (
    icon: string,
    label: string,
    value: string,
    onPress?: () => void,
  ) => (
    <View style={styles.field}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Feather name={icon as any} size={16} color={Colors.green.DEFAULT} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Text
        style={[styles.fieldValue, !value && styles.placeholderValue]}
        onPress={onPress}
      >
        {value || 'Select…'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {renderField('leaf', 'Plant', selectedPlant || '', onSelectPlant)}
      {renderField('check-square', 'Task', taskType, onSelectTask)}
      {renderField('repeat', 'Repeat', repeatInterval, onSelectRepeat)}
      {renderField('calendar', 'Date & time', '', onPickDateTime)}
      <CustomButton label="Save Reminder" onPress={onSave} variant="primary" />
    </View>
  );
};

export default CustomReminderForm;