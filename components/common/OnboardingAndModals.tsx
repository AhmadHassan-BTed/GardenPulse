import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import CustomSwitch from './CustomSwitch';

export const CarePlanSummaryCard = ({ method, light, waterFreq }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md, backgroundColor: `${Colors.green.DEFAULT}10` }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.sm }}>Care Plan Generated</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 8 }}>
        <Feather name="sun" size={14} color={Colors.text.muted} />
        <Text style={{ fontSize: 12, color: Colors.text.body }}>{light}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 8 }}>
        <Feather name="droplet" size={14} color={Colors.text.muted} />
        <Text style={{ fontSize: 12, color: Colors.text.body }}>{waterFreq}</Text>
      </View>
      <View style={{ alignSelf: 'flex-start', backgroundColor: Colors.surface.base, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.border.subtle, marginTop: 4 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors.text.muted, textTransform: 'uppercase' }}>{method}</Text>
      </View>
    </CustomCard>
  );
};

export const NotificationOptInRow = ({ isEnabled, onToggle, plantName }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md }}>
      <View style={{ backgroundColor: isEnabled ? Colors.green.DEFAULT : Colors.surface.elevated, padding: 8, borderRadius: 20 }}>
        <Feather name="bell" size={20} color={isEnabled ? '#FFF' : Colors.text.muted} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, fontWeight: '500', color: Colors.text.heading }}>Get reminders for {plantName}</Text>
      <CustomSwitch value={isEnabled} onValueChange={onToggle} label="" />
    </View>
  );
};

export const PlantBrowseGrid = ({ categories }: { categories: string[] }) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md }}>
      {categories.map(c => (
        <View key={c} style={{ width: '31%', aspectRatio: 1, backgroundColor: Colors.surface.elevated, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name="grid" size={24} color={Colors.text.muted} style={{ marginBottom: 4 }} />
          <Text style={{ fontSize: 12, color: Colors.text.heading, fontWeight: 'bold' }}>{c}</Text>
        </View>
      ))}
    </View>
  );
};

export const SelectedPlantPreviewCard = ({ name, scientific, methodBadge, imageUrl }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <CustomCard padding={Spacing.sm} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md }}>
      <Image source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} style={{ width: 56, height: 56, borderRadius: Radius.sm, backgroundColor: Colors.surface.elevated }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading }}>{name}</Text>
        <Text style={{ fontSize: 12, color: Colors.text.muted, fontStyle: 'italic', marginBottom: 4 }}>{scientific}</Text>
        <Text style={{ fontSize: 10, color: Colors.green.DEFAULT, fontWeight: 'bold', textTransform: 'uppercase' }}>✓ {methodBadge} Compatible</Text>
      </View>
    </CustomCard>
  );
};

export const QRSuccessCard = ({ name, brand, type, onScanAnother }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ borderColor: Colors.green.DEFAULT, borderWidth: 2, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm }}>
        <Feather name="check-circle" size={20} color={Colors.green.DEFAULT} />
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading }}>Product Identified</Text>
      </View>
      <Text style={{ fontSize: 14, color: Colors.text.heading, fontWeight: 'bold' }}>{brand} - {name}</Text>
      <Text style={{ fontSize: 12, color: Colors.text.muted, marginBottom: Spacing.md }}>Type: {type}</Text>
      <CustomButton label="Scan Another" variant="ghost" onPress={onScanAnother} />
    </CustomCard>
  );
};

export const RelatedArticlesRow = () => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.md }}>
      {[1, 2].map((i) => (
        <View key={i} style={{ flex: 1, backgroundColor: Colors.surface.elevated, borderRadius: Radius.sm, padding: Spacing.sm }}>
          <View style={{ height: 60, backgroundColor: Colors.border.subtle, borderRadius: Radius.sm, marginBottom: 8 }} />
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.text.heading }}>Related Guide #{i}</Text>
        </View>
      ))}
    </View>
  );
};

export const NotificationCategoryRow = ({ icon, label, enabled, onToggle }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
      <Feather name={icon} size={18} color={Colors.text.muted} style={{ marginRight: Spacing.sm }} />
      <Text style={{ flex: 1, fontSize: 14, color: Colors.text.heading }}>{label}</Text>
      <CustomSwitch value={enabled} onValueChange={onToggle} label="" />
    </View>
  );
};

export const LocationTagRow = ({ zone, onRemove }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: Colors.surface.elevated, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm, gap: 6, marginBottom: Spacing.sm }}>
      <Feather name="map-pin" size={12} color={Colors.text.muted} />
      <Text style={{ fontSize: 12, color: Colors.text.body }}>{zone}</Text>
      <Pressable onPress={onRemove}><Feather name="x" size={14} color={Colors.text.error} /></Pressable>
    </View>
  );
};

export const AddToReelToggle = ({ enabled, onToggle }: any) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Feather name="film" size={16} color={Colors.text.muted} />
        <Text style={{ fontSize: 14, color: Colors.text.heading, fontWeight: '500' }}>Add to Timelapse Reel</Text>
      </View>
      <CustomSwitch value={enabled} onValueChange={onToggle} label="" />
    </View>
  );
};