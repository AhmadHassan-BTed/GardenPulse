import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomSwitch from './CustomSwitch';

const WatermarkToggleRow = ({ isSupporter }: { isSupporter: boolean }) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderColor: Colors.border.subtle }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: isSupporter ? Colors.text.heading : Colors.text.muted }}>Include GardenPulse branding</Text>
          {!isSupporter && <Feather name="lock" size={12} color={Colors.text.muted} />}
        </View>
        <Text style={{ fontSize: 12, color: Colors.text.muted, marginTop: 2 }}>{isSupporter ? 'Toggle off to remove watermarks' : 'Supporter feature'}</Text>
      </View>
      <CustomSwitch value={true} onValueChange={() => {}} label="" isDisabled={!isSupporter} />
    </View>
  );
};

export default WatermarkToggleRow;
