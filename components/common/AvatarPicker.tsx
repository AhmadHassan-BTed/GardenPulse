import React from 'react';
import { View, Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface AvatarPickerProps {
  imageUrl?: string;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ imageUrl, onPress, size = 80, style }) => {
  const { Colors, Radius } = useTheme();
  
  return (
    <Pressable onPress={onPress} style={[style, { width: size, height: size, position: 'relative' }]}>
      <Image 
        source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-avatar.png')} 
        style={{ width: '100%', height: '100%', borderRadius: size / 2, backgroundColor: Colors.surface.elevated }} 
      />
      <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.green.DEFAULT, borderRadius: Radius.full, padding: 6, borderWidth: 2, borderColor: Colors.surface.base }}>
        <Feather name="camera" size={14} color="#FFF" />
      </View>
    </Pressable>
  );
};
export default AvatarPicker;