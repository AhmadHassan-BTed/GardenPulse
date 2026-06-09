import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const CustomReminderForm = () => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.sm }}>New Custom Reminder</Text>
      <CustomInput label="Task Type (e.g. Turn lights off)" value="" onChangeText={() => {}} />
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm }}>
        <View style={{ flex: 1 }}><CustomInput label="Time" value="08:00 AM" onChangeText={() => {}} /></View>
        <View style={{ flex: 1 }}><CustomInput label="Repeat" value="Daily" onChangeText={() => {}} /></View>
      </View>
      <CustomButton label="Save Reminder" onPress={() => {}} style={{ marginTop: Spacing.md }} />
    </CustomCard>
  );
};

export default CustomReminderForm;
