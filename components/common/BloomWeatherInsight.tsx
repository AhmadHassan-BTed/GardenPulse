import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export const BloomWeatherInsight = ({ insightText }: { insightText: string }) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.md, marginBottom: Spacing.md }}>
      <View style={{ backgroundColor: '#F59E0B', borderRadius: 20, padding: 8 }}>
        <Feather name="sun" size={16} color="#FFF" />
      </View>
      <Text style={{ flex: 1, fontSize: 14, color: Colors.text.body, lineHeight: 20 }}>
        {insightText}
      </Text>
    </View>
  );
};
export default BloomWeatherInsight;