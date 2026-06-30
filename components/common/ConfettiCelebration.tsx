import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

const ConfettiCelebration = () => {
  const { Colors } = useTheme();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, pointerEvents: 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 50 }}>
      <Text style={{ fontSize: 42 }}> [SUCCESS] </Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.green.DEFAULT, marginTop: 16 }}>All tasks done!</Text>
    </View>
  );
};

export default ConfettiCelebration;
