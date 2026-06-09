import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const SwipeableRowMock = ({ children, onLog, onArchive }: any) => {
  const { Colors, Radius } = useTheme();
  const [swiped, setSwiped] = useState(false);
  
  return (
    <View style={{ position: 'relative', marginBottom: 12 }}>
      <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: Colors.surface.elevated, borderRadius: Radius.lg, overflow: 'hidden' }}>
        <Pressable onPress={onLog} style={{ width: 70, backgroundColor: Colors.green.DEFAULT, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name="edit-2" size={20} color="#FFF" />
        </Pressable>
        <Pressable onPress={onArchive} style={{ width: 70, backgroundColor: Colors.text.error, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name="archive" size={20} color="#FFF" />
        </Pressable>
      </View>
      <Pressable onPress={() => setSwiped(!swiped)} style={{ transform: [{ translateX: swiped ? -140 : 0 }] }}>
        {children}
      </Pressable>
    </View>
  );
};

export default SwipeableRowMock;
