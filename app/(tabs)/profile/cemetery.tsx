import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { CemeteryEntryCard } from '../../../components/common/CemeteryComponents';
import { PatternInsightCard } from '../../../components/common/InsightBanners';
import CustomButton from '../../../components/common/CustomButton';
import SectionHeader from '../../../components/common/SectionHeader';
import EmptyStateView from '../../../components/common/EmptyStateView';
import { useGardenStore } from '../../../store/useGardenStore';

export default function CemeteryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storePlants = useGardenStore((state) => state.plants);
  const updatePlant = useGardenStore((state) => state.updatePlant);
  const deletePlant = useGardenStore((state) => state.deletePlant);

  if (!isHydrated) {
    return null;
  }

  const lostPlants = (storePlants || []).filter((p) => p.isArchived);

  const handleRestore = (id: string) => {
    updatePlant(id, {
      isArchived: false,
      causeOfDeath: undefined,
      archivedDate: undefined,
    });
  };

  const handleDelete = (id: string) => {
    deletePlant(id);
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
        
        {lostPlants.length > 0 ? (
          lostPlants.map((plant) => (
            <CemeteryEntryCard
              key={plant.id}
              name={plant.nickname || plant.name}
              method={plant.method}
              archivedDate={plant.archivedDate 
                ? new Date(plant.archivedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Unknown'
              }
              imageUrl={plant.imageUrl}
              causeOfDeath={plant.causeOfDeath}
              onChangeCauseOfDeath={(cause: string) => updatePlant(plant.id, { causeOfDeath: cause })}
              onRestore={() => handleRestore(plant.id)}
              onDelete={() => handleDelete(plant.id)}
            />
          ))
        ) : (
          <EmptyStateView
            title="Cemetery is empty"
            description="All your plants are alive and kicking! Any archived plants will appear here."
            iconName="heart"
            actionLabel="View Active Plants"
            onActionPress={() => router.push('/garden')}
          />
        )}

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
