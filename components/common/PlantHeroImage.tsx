import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const PlantHeroImage = ({ imageUrl, photoCount, onAddPhoto }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ width: '100%', height: 250, position: 'relative', backgroundColor: Colors.surface.elevated, marginBottom: Spacing.md }}>
      <Image source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      <View style={{ position: 'absolute', bottom: Spacing.md, left: Spacing.md, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.full, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <Feather name="image" size={14} color="#FFF" />
        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{photoCount} Photos</Text>
      </View>
      <Pressable onPress={onAddPhoto} style={{ position: 'absolute', bottom: Spacing.md, right: Spacing.md, backgroundColor: Colors.green.DEFAULT, width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
        <Feather name="camera" size={20} color="#FFF" />
      </Pressable>
    </View>
  );
};

export default PlantHeroImage;
