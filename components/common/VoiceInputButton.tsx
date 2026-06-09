import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const VoiceInputButton = () => {
  const { Colors } = useTheme();
  const [recording, setRecording] = useState(false);
  return (
    <Pressable onPress={() => setRecording(!recording)} style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: recording ? Colors.text.error : Colors.green.DEFAULT, justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
      <Feather name="mic" size={28} color="#FFF" />
      {recording && <View style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFF' }} />}
    </Pressable>
  );
};

export default VoiceInputButton;
