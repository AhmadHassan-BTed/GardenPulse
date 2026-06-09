import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export const MoodEmojiSlider = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => {
  const { Colors, Spacing, Radius, Typography } = useTheme();
  const emojis = ['😟', '😕', '😐', '🙂', '😄'];
  
  return (
    <View style={{ marginVertical: Spacing.sm }}>
      <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.heading, marginBottom: Spacing.sm, fontWeight: 'bold' }}>How did it go?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surface.elevated, borderRadius: Radius.full, padding: 4 }}>
        {emojis.map((emoji, index) => {
          const val = index + 1;
          const isSelected = value === val;
          return (
            <Pressable 
              key={val} 
              onPress={() => onChange(val)}
              style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: Radius.full, backgroundColor: isSelected ? Colors.surface.base : 'transparent', elevation: isSelected ? 2 : 0 }}
            >
              <Text style={{ fontSize: 24, opacity: isSelected ? 1 : 0.4 }}>{emoji}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
export default MoodEmojiSlider;