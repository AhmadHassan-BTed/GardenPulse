import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import TextLink from './TextLink';
import CustomButton from './CustomButton';

export const ComebackBonusBanner = ({ onClaim }: { onClaim: () => void }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard variant="accent" padding={Spacing.lg} style={{ backgroundColor: Colors.green.DEFAULT, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm }}>
        <Feather name="award" size={20} color="#FFF" />
        <Text style={{ fontSize: Typography.sizes.lg, fontWeight: 'bold', color: '#FFF' }}>Welcome Back!</Text>
      </View>
      <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: Spacing.md }}>You've unlocked a welcome bonus of 50 seeds to jumpstart your garden.</Text>
      <CustomButton label="Claim Seeds" onPress={onClaim} style={{ backgroundColor: '#FFF' }} labelStyle={{ color: Colors.green.DEFAULT }} />
    </CustomCard>
  );
};

export const BloomReportBanner = ({ onViewReport }: { onViewReport: () => void }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <View style={{ backgroundColor: '#3B82F620', padding: 8, borderRadius: 20 }}><Feather name="bar-chart-2" size={16} color="#3B82F6" /></View>
        <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading }}>Weekly Report Ready</Text>
      </View>
      <CustomButton label="View" onPress={onViewReport} style={{ minHeight: 36, paddingVertical: 0 }} />
    </CustomCard>
  );
};

export const PatternInsightCard = ({ onAction }: { onAction: () => void }) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md, borderColor: '#F59E0B50', borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm }}>
        <Feather name="search" size={20} color="#F59E0B" style={{ marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 4 }}>Pattern Detected</Text>
          <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.body, marginBottom: Spacing.sm }}>You consistently water your Pothos 2 days later than scheduled.</Text>
          <TextLink label="Adjust Schedule →" onPress={onAction} variant="primary" />
        </View>
      </View>
    </CustomCard>
  );
};

export const ContextualTipCard = ({ title, tag, readTime, onPress }: { title: string, tag: string, readTime: string, onPress: () => void }) => {
  const { Colors, Spacing, Typography, Radius } = useTheme();
  return (
    <CustomCard onPress={onPress} padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
        <View style={{ backgroundColor: `${Colors.green.DEFAULT}20`, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.sm }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors.green.DEFAULT, textTransform: 'uppercase' }}>{tag}</Text>
        </View>
        <Text style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}><Feather name="clock" size={10} /> {readTime}</Text>
      </View>
      <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.xs }}>{title}</Text>
      <Text style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT, fontWeight: '500' }}>Read Tip →</Text>
    </CustomCard>
  );
};