import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import FilterChip from './FilterChip';

export const CauseOfDeathSelector = ({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) => {
  const { Spacing } = useTheme();
  const causes = ['pH Spike', 'Root Rot', 'Overwatering', 'Underwatering', 'Pests', 'Frost', 'Unknown'];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
      {causes.map(c => (
        <FilterChip key={c} label={c} isSelected={selected === c} onPress={() => onSelect(c)} />
      ))}
    </View>
  );
};

export const CemeteryEntryCard = ({ name, method, archivedDate, imageUrl, causeOfDeath, onChangeCauseOfDeath, onRestore, onDelete }: any) => {
  const { Colors, Spacing, Radius, Typography } = useTheme();
  const [localCause, setLocalCause] = useState('Unknown');

  const selectedCause = causeOfDeath !== undefined ? causeOfDeath : localCause;
  const handleSelectCause = (c: string) => {
    if (onChangeCauseOfDeath) {
      onChangeCauseOfDeath(c);
    } else {
      setLocalCause(c);
    }
  };

  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md, borderColor: Colors.border.subtle, borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md }}>
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} 
          style={{ width: 64, height: 64, borderRadius: Radius.md, opacity: 0.7, tintColor: 'gray' }} 
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: Typography.sizes.lg, fontWeight: 'bold', color: Colors.text.heading }}>{name}</Text>
          <Text style={{ fontSize: 10, color: Colors.text.muted, textTransform: 'uppercase', fontWeight: 'bold', marginTop: 2 }}>{method} · Archived {archivedDate}</Text>
        </View>
      </View>
      <Text style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.sm }}>Cause of Death</Text>
      <CauseOfDeathSelector selected={selectedCause} onSelect={handleSelectCause} />
      <View style={{ flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.lg }}>
        <CustomButton label="Restore" variant="secondary" onPress={onRestore} style={{ flex: 1 }} />
        <CustomButton label="Delete Permanently" onPress={onDelete} style={{ flex: 1, backgroundColor: `${Colors.text.error}15` }} labelStyle={{ color: Colors.text.error }} />
      </View>
    </CustomCard>
  );
};