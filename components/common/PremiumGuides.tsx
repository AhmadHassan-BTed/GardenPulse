import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';

export const PublishedGuideCard = ({ title, status, views, revenue, onEdit }: any) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: Spacing.sm }}>
          <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 4 }}>{title}</Text>
          <Text style={{ fontSize: Typography.sizes.xs, textTransform: 'uppercase', fontWeight: 'bold', color: status === 'Live' ? Colors.green.DEFAULT : '#F59E0B' }}>● {status}</Text>
          <View style={{ flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.sm }}>
            <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.body }}><Feather name="eye" size={12} /> {views}</Text>
            <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.body }}><Feather name="dollar-sign" size={12} /> {revenue}</Text>
          </View>
        </View>
        <CustomButton label="Edit" variant="secondary" onPress={onEdit} style={{ minHeight: 32, paddingVertical: 0 }} />
      </View>
    </CustomCard>
  );
};

export const RevenueBanner = ({ onLearnMore }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ backgroundColor: `${Colors.green.DEFAULT}15`, padding: Spacing.md, borderRadius: Radius.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: `${Colors.green.DEFAULT}30` }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 4 }}>Earn with GardenPulse</Text>
      <Text style={{ fontSize: 12, color: Colors.text.body, marginBottom: Spacing.sm }}>Write guides and earn a share of AdMob revenue when growers read them.</Text>
      <CustomButton label="Learn How It Works" variant="ghost" onPress={onLearnMore} labelStyle={{ color: Colors.green.DEFAULT, fontSize: 12 }} style={{ minHeight: 24, paddingVertical: 0, alignSelf: 'flex-start' }} />
    </View>
  );
};

export const SupporterBadgeBanner = ({ onUpgrade }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, marginBottom: Spacing.md, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>Become a Supporter</Text>
        <Text style={{ fontSize: 12, color: Colors.text.muted }}>$2.99/mo · Remove interstitial ads</Text>
      </View>
      <CustomButton label="Upgrade" onPress={onUpgrade} style={{ minHeight: 32, paddingVertical: 0 }} />
    </View>
  );
};

export const SupporterBenefitsList = () => {
  const { Colors, Spacing } = useTheme();
  const benefits = ['Remove all full-screen ads', 'Custom PDF Exports', 'Remove Video Watermarks', 'Supporter Profile Badge'];
  return (
    <View style={{ marginBottom: Spacing.md }}>
      {benefits.map(b => (
        <View key={b} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 8 }}>
          <Feather name="check-circle" size={16} color={Colors.green.DEFAULT} />
          <Text style={{ fontSize: 14, color: Colors.text.heading }}>{b}</Text>
        </View>
      ))}
      <Text style={{ fontSize: 12, color: Colors.text.muted, marginTop: Spacing.sm, fontStyle: 'italic' }}>* Native inline tip ads will remain to support community creators.</Text>
    </View>
  );
};

export const UnlockSuccessState = () => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ backgroundColor: Colors.surface.base, padding: Spacing.xl, borderRadius: Radius.lg, alignItems: 'center', borderWidth: 1, borderColor: Colors.green.DEFAULT }}>
      <Feather name="unlock" size={48} color={Colors.green.DEFAULT} style={{ marginBottom: Spacing.md }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 8 }}>Unlocked!</Text>
      <Text style={{ fontSize: 14, color: Colors.text.body, textAlign: 'center', marginBottom: Spacing.lg }}>Thank you for watching. Your export is ready.</Text>
      <CustomButton 
        label="Download PDF" 
        onPress={() => {
          Alert.alert('PDF Exported', 'Your custom PDF growth report has been successfully generated and saved to files.');
        }} 
        fullWidth 
      />
    </View>
  );
};

export const VideoProgressOverlay = () => {
  const { Spacing } = useTheme();
  return (
    <View style={{ height: 200, backgroundColor: '#000', borderRadius: 16, justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: Spacing.md }}>
      <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>0:14</Text>
      <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 8 }}>Ad is playing...</Text>
      <View style={{ position: 'absolute', top: Spacing.md, right: Spacing.md, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>Skip in 2s</Text>
      </View>
    </View>
  );
};