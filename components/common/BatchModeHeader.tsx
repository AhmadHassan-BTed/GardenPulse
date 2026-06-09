import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import TextLink from './TextLink';

export const BatchModeHeader = ({ count, onSelectAll, onCancel }: { count: number, onSelectAll: () => void, onCancel: () => void }) => {
  const { Colors, Spacing, Typography } = useTheme();
  
  return (
    <SafeAreaView style={{ backgroundColor: Colors.surface.base, borderBottomWidth: 1, borderBottomColor: Colors.border.subtle }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md, height: 56 }}>
        <TextLink label="Select All" onPress={onSelectAll} variant="primary" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: Typography.sizes.md, fontWeight: 'bold', color: Colors.text.heading }}>Batch Mode</Text>
          <View style={{ backgroundColor: Colors.green.DEFAULT, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 }}>
            <Text style={{ fontSize: 10, color: '#FFF', fontWeight: 'bold' }}>{count}</Text>
          </View>
        </View>
        <TextLink label="Cancel" onPress={onCancel} variant="muted" />
      </View>
    </SafeAreaView>
  );
};
export default BatchModeHeader;