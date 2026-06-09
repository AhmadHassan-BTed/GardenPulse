import React from 'react';
import { View, Text, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export const NavigationLinkRow: React.FC<{ label: string; value?: string; onPress: () => void; isDestructive?: boolean; style?: ViewStyle }> = ({ label, value, onPress, isDestructive, style }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, backgroundColor: pressed ? Colors.surface.elevated : 'transparent' }, style]}>
      <Text style={{ fontSize: Typography.sizes.base, fontWeight: '500', color: isDestructive ? Colors.text.error : Colors.text.heading }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        {value && <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted }}>{value}</Text>}
        <Feather name="chevron-right" size={18} color={isDestructive ? Colors.text.error : Colors.text.muted} />
      </View>
    </Pressable>
  );
};
export default NavigationLinkRow;