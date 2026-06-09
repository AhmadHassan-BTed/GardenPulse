import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export const BloomCemeteryAlert = ({ count, onPress }: { count: number, onPress: () => void }) => {
  const { Colors, Spacing, Radius } = useTheme();
  if (count === 0) return null;
  
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: `${Colors.text.error}15`, padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.sm, marginBottom: Spacing.md }}>
      <Feather name="alert-triangle" size={18} color={Colors.text.error} />
      <Text style={{ flex: 1, fontSize: 14, color: Colors.text.heading, fontWeight: '500' }}>
        {count} plant{count > 1 ? 's' : ''} archived this week
      </Text>
      <Text style={{ fontSize: 12, color: Colors.text.error, fontWeight: 'bold' }}>See Log →</Text>
    </Pressable>
  );
};
export default BloomCemeteryAlert;