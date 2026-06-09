import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const MapLayerToggleSheet = () => {
  const { Colors, Spacing } = useTheme();
  const [active, setActive] = useState('success');
  return (
    <View style={{ padding: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.md }}>Map Layers</Text>
      <Pressable onPress={() => setActive('success')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Success Rates</Text>
        {active === 'success' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
      <Pressable onPress={() => setActive('growers')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Active Growers</Text>
        {active === 'growers' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
      <Pressable onPress={() => setActive('logs')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Recent Logs</Text>
        {active === 'logs' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
    </View>
  );
};

export default MapLayerToggleSheet;
