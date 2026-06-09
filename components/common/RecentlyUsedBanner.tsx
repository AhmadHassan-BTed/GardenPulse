import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

const RecentlyUsedBanner = ({ toolName, icon, onOpen }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.sm, marginBottom: Spacing.md }}>
      <View style={{ backgroundColor: Colors.surface.base, padding: 8, borderRadius: Radius.sm }}>
        <Feather name={icon} size={16} color={Colors.text.heading} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, color: Colors.text.muted, textTransform: 'uppercase', fontWeight: 'bold' }}>Recently Used</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{toolName}</Text>
      </View>
      <CustomButton label="Open →" variant="ghost" onPress={onOpen} style={{ paddingHorizontal: 0 }} />
    </View>
  );
};

export default RecentlyUsedBanner;
