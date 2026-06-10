import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { CemeteryEntryCard } from '../../../components/common/CemeteryComponents';
import { PatternInsightCard } from '../../../components/common/InsightBanners';
import CustomButton from '../../../components/common/CustomButton';
import SectionHeader from '../../../components/common/SectionHeader';

const initialLostPlants = [
  { id: '1', name: 'Fiddle Leaf Fig', method: 'Soil', archivedDate: 'Mar 15, 2026', imageUrl: null },
  { id: '2', name: 'String of Pearls', method: 'Soil', archivedDate: 'Feb 28, 2026', imageUrl: null },
  { id: '3', name: 'Calathea Orbifolia', method: 'Soil', archivedDate: 'Jan 10, 2026', imageUrl: null },
  { id: '4', name: 'Venus Flytrap', method: 'Sphagnum Moss', archivedDate: 'Dec 18, 2025', imageUrl: null },
];

export default function CemeteryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;
  const [lostPlants, setLostPlants] = useState(initialLostPlants);

  const handleRestore = (id: string) => {
    setLostPlants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDelete = (id: string) => {
    setLostPlants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Cemetery Log" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <PatternInsightCard onAction={() => router.push('/tools/smart-scheduler')} />

        <SectionHeader title="In Memory" />
        
        {lostPlants.map((plant) => (
          <CemeteryEntryCard
            key={plant.id}
            name={plant.name}
            method={plant.method}
            archivedDate={plant.archivedDate}
            imageUrl={plant.imageUrl}
            onRestore={() => handleRestore(plant.id)}
            onDelete={() => handleDelete(plant.id)}
          />
        ))}

        <View style={{ gap: Spacing.md, marginTop: Spacing.lg }}>
          <CustomButton 
            label="Export Cemetery Log" 
            variant="secondary" 
            onPress={() => router.push('/modals/export-share')} 
          />
          <CustomButton 
            label="Download High-Res PDF (Watch Ad)" 
            variant="ghost" 
            onPress={() => router.push('/modals/rewarded-video')} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
