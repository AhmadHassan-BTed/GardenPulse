import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export const StreakDisplay: React.FC<{ currentStreak: number; longestStreak: number; style?: ViewStyle }> = ({ currentStreak, longestStreak, style }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
          <View style={{ backgroundColor: '#F59E0B20', padding: 8, borderRadius: 20 }}>
            <Feather name="zap" size={24} color="#F59E0B" />
          </View>
          <View>
            <Text style={{ fontSize: Typography.sizes.lg, fontWeight: 'bold', color: Colors.text.heading }}>{currentStreak} Days</Text>
            <Text style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>Current Logging Streak</Text>
          </View>
        </View>
        <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, fontWeight: '500' }}>Best: {longestStreak}</Text>
      </View>
    </CustomCard>
  );
};
export default StreakDisplay;