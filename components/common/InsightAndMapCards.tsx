import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import SeverityIndicator from './SeverityIndicator';

export const DiagnosisHistoryRow = ({ date, plantName, finding, severity, imageUrl }: any) => {
  const { Colors, Spacing, Typography, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderColor: Colors.border.subtle, gap: Spacing.md }}>
      <Image source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} style={{ width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.surface.elevated }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, marginBottom: 2 }}>{date} · {plantName}</Text>
        <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 4 }}>{finding}</Text>
        <SeverityIndicator level={severity} />
      </View>
    </View>
  );
};

export const LocalContextCard = ({ city, insightText, onMapPress }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ backgroundColor: `${Colors.green.DEFAULT}15`, padding: Spacing.md, borderRadius: Radius.md, marginBottom: Spacing.md }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.green.DEFAULT, marginBottom: 4 }}>What's thriving in {city}?</Text>
      <Text style={{ fontSize: 12, color: Colors.text.heading, marginBottom: Spacing.sm }}>{insightText}</Text>
      <CustomButton label="View Local Map" variant="secondary" onPress={onMapPress} style={{ minHeight: 32, paddingVertical: 0, alignSelf: 'flex-start' }} />
    </View>
  );
};

export const ReferralBanner = ({ progress, total, onShare }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <CustomCard variant="accent" padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 4 }}>Unlock Multi-Zone Tracking</Text>
      <Text style={{ fontSize: 12, color: Colors.text.body, marginBottom: Spacing.sm }}>Invite {total} friends to unlock. ({progress}/{total} joined)</Text>
      <View style={{ height: 6, backgroundColor: Colors.surface.elevated, borderRadius: 3, marginBottom: Spacing.sm, overflow: 'hidden' }}>
        <View style={{ height: '100%', width: `${(progress/total)*100}%`, backgroundColor: Colors.green.DEFAULT }} />
      </View>
      <CustomButton label="Share Invite Link" onPress={onShare} />
    </CustomCard>
  );
};

export const MapClusterPopupCard = ({ cropName, stats, tip, onGrow }: any) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ elevation: 10, shadowOpacity: 0.2 }}>
      <Text style={{ fontSize: Typography.sizes.lg, fontWeight: 'bold', color: Colors.text.heading, marginBottom: 2 }}>{cropName}</Text>
      <Text style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT, fontWeight: 'bold', marginBottom: Spacing.sm }}>{stats}</Text>
      <View style={{ backgroundColor: Colors.surface.elevated, padding: Spacing.sm, borderRadius: 8, marginBottom: Spacing.md }}>
        <Text style={{ fontSize: 12, color: Colors.text.body }}>💡 <Text style={{ fontWeight: 'bold' }}>Top Tip: </Text>{tip}</Text>
      </View>
      <CustomButton label="Grow This Plant" onPress={onGrow} />
    </CustomCard>
  );
};

export const PrivacyFooter = () => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.lg, gap: 6 }}>
      <Feather name="lock" size={12} color={Colors.text.muted} />
      <Text style={{ fontSize: 10, color: Colors.text.muted }}>Map data is anonymised and aggregated.</Text>
    </View>
  );
};

export const ZoneGroupHeader = ({ title, plantCount }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.md, marginBottom: Spacing.sm }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.text.heading }}>{title}</Text>
      <Text style={{ fontSize: 12, color: Colors.text.muted }}>{plantCount} plants</Text>
    </View>
  );
};

export const WeatherImpactBanner = ({ message }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: '#F59E0B20', padding: Spacing.sm, borderRadius: Radius.md, marginBottom: Spacing.md }}>
      <Feather name="cloud-rain" size={20} color="#F59E0B" />
      <Text style={{ flex: 1, fontSize: 12, color: Colors.text.heading }}>{message}</Text>
    </View>
  );
};

export const CrossMethodInsightCard = ({ deltaMessage }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Feather name="git-pull-request" size={16} color={Colors.green.DEFAULT} />
        <Text style={{ flex: 1, fontSize: 12, color: Colors.text.body, fontWeight: '500' }}>{deltaMessage}</Text>
      </View>
    </CustomCard>
  );
};

export const ScanningStateOverlay = () => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <View style={{ width: 200, height: 200, borderRadius: Radius.lg, borderWidth: 2, borderColor: Colors.green.DEFAULT, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg }}>
        <Feather name="cpu" size={48} color={Colors.green.DEFAULT} />
      </View>
      <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: Spacing.sm }}>Analysing on-device...</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
        <Feather name="shield" size={12} color="#FFF" />
        <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Privacy Protected</Text>
      </View>
    </View>
  );
};