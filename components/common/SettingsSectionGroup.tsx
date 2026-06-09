import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export const SettingsSectionGroup: React.FC<{ title: string; children: React.ReactNode; style?: ViewStyle }> = ({ title, children, style }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <View style={[{ marginBottom: Spacing.lg }, style]}>
      <Text style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.sm, marginLeft: Spacing.xs }}>{title}</Text>
      <CustomCard padding={0} style={{ overflow: 'hidden' }}>{children}</CustomCard>
    </View>
  );
};

export const DangerZoneSection: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const { Colors, Spacing, Typography, Radius } = useTheme();
  return (
    <View style={[{ marginBottom: Spacing.lg }, style]}>
      <Text style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.error, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.sm, marginLeft: Spacing.xs }}>Danger Zone</Text>
      <View style={{ backgroundColor: `${Colors.text.error}10`, borderWidth: 1, borderColor: `${Colors.text.error}30`, borderRadius: Radius.lg, overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );
};