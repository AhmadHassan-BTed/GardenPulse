import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const SunriseSunsetRow = ({ sunrise, sunset }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Feather name="sunrise" size={20} color="#F59E0B" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{sunrise}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{sunset}</Text>
        <Feather name="sunset" size={20} color="#8B5CF6" />
      </View>
    </View>
  );
};

export default SunriseSunsetRow;
