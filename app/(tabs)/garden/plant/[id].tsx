import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../../components/common/ScreenWrapper';
import CustomHeader from '../../../../components/common/CustomHeader';
import PlantHeroImage from '../../../../components/common/PlantHeroImage';
import ActionPillRow from '../../../../components/common/ActionPillRow';
import PlantInfoCard from '../../../../components/common/PlantInfoCard';
import { WeatherImpactBanner } from '../../../../components/common/InsightAndMapCards';
import SectionHeader from '../../../../components/common/SectionHeader';
import TaskCard, { TaskType } from '../../../../components/common/TaskCard';
import LogTimeline from '../../../../components/common/LogTimeline';
import { ContextualTipCard } from '../../../../components/common/InsightBanners';
import NotesInput from '../../../../components/common/NotesInput';
import FAB from '../../../../components/common/FAB';
import { GrowingStage } from '../../../../components/common/GrowingStageChip';

const plantMockData: Record<string, any> = {
  '1': {
    id: '1',
    commonName: 'Monstera Deliciosa',
    species: 'Monstera deliciosa',
    method: 'Hydroponics',
    stage: 'Veg' as GrowingStage,
    dateAdded: 'March 15, 2024',
    zone: 'Zone 7b · Berlin',
    containerSize: '10 Gallons',
    photoCount: 12,
    imageUrl: null, // Sourced from placeholder
    weatherAlert: '🌧 High humidity expected in 2 days → reduce reservoir topping.',
    tasks: [
      { id: 't1', name: 'Check pH levels', type: 'Check' as TaskType, done: false },
      { id: 't2', name: 'Refill nutrient tank', type: 'Feed' as TaskType, done: false },
      { id: 't3', name: 'Prune yellow bottom leaf', type: 'Prune' as TaskType, done: true },
    ],
    logs: [
      {
        id: 'l1',
        timestamp: 'Today, 10:30 AM',
        activities: [{ id: 'a1', label: 'Pruned', color: '#F59E0B' }],
        metrics: ['pH 5.9', 'EC 1.6'],
        notes: 'Pruned one of the lowest leaves that showed heavy yellowing due to nitrogen deficiency. Adjusted nutrient dosage by +10%.',
        hasVoiceNote: true,
      },
      {
        id: 'l2',
        timestamp: 'Jun 4, 2026',
        activities: [{ id: 'a2', label: 'Watered', color: '#3B82F6' }, { id: 'a3', label: 'Fed', color: '#10B981' }],
        metrics: ['pH 6.0', 'EC 1.5'],
        notes: 'Refilled the main reservoir. Plant looks healthy and new leaf is beginning to unfurl.',
      },
    ],
  },
  '2': {
    id: '2',
    commonName: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    method: 'Soil',
    stage: 'Veg' as GrowingStage,
    dateAdded: 'January 10, 2024',
    zone: 'Zone 7b · Berlin',
    containerSize: '8 Inches',
    photoCount: 4,
    imageUrl: null,
    weatherAlert: '☀️ Sunny week ahead → monitor soil moisture closely.',
    tasks: [
      { id: 't4', name: 'Water soil thoroughly', type: 'Water' as TaskType, done: false },
      { id: 't5', name: 'Check for root boundaries', type: 'Check' as TaskType, done: false },
    ],
    logs: [
      {
        id: 'l3',
        timestamp: 'Jun 1, 2026',
        activities: [{ id: 'a4', label: 'Check', color: '#8B5CF6' }],
        metrics: ['Moisture 35%'],
        notes: 'Soil is moderately dry. Will water in the next few days if it drops below 25%.',
      },
    ],
  },
};

export default function PlantDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const plant = plantMockData[id || '1'] || plantMockData['1'];
  
  const [tasks, setTasks] = useState(plant.tasks);
  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleDonePress = (taskId: string) => {
    setTasks((prev: any[]) =>
      prev.map(t => t.id === taskId ? { ...t, done: true } : t)
    );
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setNoteText('Recorded simulated voice log: Sweet Basil moisture levels are stabilized.');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleEdit = () => {
    router.push(`/modals/add-plant?id=${plant.id}`);
  };

  const handleAddPhoto = () => {
    router.push({
      pathname: '/modals/permission',
      params: { type: 'camera', next: `/garden/plant/${plant.id}` },
    });
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={false}>
      <CustomHeader
        title={plant.commonName}
        showBack={true}
        onBack={() => router.back()}
      />

      {/* Full-bleed hero banner */}
      <PlantHeroImage
        imageUrl={plant.imageUrl}
        photoCount={plant.photoCount}
        onAddPhoto={handleAddPhoto}
      />

      {/* Content wrapper */}
      <View style={{ paddingHorizontal: Spacing.md, gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        
        {/* Quick action row */}
        <ActionPillRow
          actions={[
            {
              id: 'log',
              label: 'Log Activity',
              icon: 'edit' as any,
              onPress: () => router.push(`/modals/quick-log?id=${plant.id}`),
            },
            {
              id: 'diagnose',
              label: 'Diagnose Leaf',
              icon: 'camera' as any,
              onPress: () => router.push(`/tools/leaf-diagnostics?id=${plant.id}`),
            },
            {
              id: 'share',
              label: 'Share Info',
              icon: 'share-2' as any,
              onPress: () => router.push('/modals/export-share'),
            },
            {
              id: 'archive',
              label: 'Cemetery',
              icon: 'archive' as any,
              isDestructive: true,
              onPress: () => router.push('/profile/cemetery'),
            },
          ]}
        />

        {/* Detailed specifications */}
        <PlantInfoCard
          commonName={plant.commonName}
          species={plant.species}
          method={plant.method}
          stage={plant.stage}
          dateAdded={plant.dateAdded}
          zone={plant.zone}
          containerSize={plant.containerSize}
          onEdit={handleEdit}
        />

        {/* Environment Alert */}
        {plant.weatherAlert && (
          <WeatherImpactBanner
            message={plant.weatherAlert}
          />
        )}

        {/* Daily schedule tasks */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader
            title="Daily Care Schedule"
            actionLabel="See all"
            onActionPress={() => router.push('/tools/smart-scheduler')}
          />
          <View style={{ gap: Spacing.xs }}>
            {tasks.map((task: any) => (
              <TaskCard
                key={task.id}
                plantName={plant.commonName}
                taskType={task.type}
                isDone={task.done}
                onDonePress={() => handleDonePress(task.id)}
                style={{ width: '100%' }}
              />
            ))}
          </View>
        </View>

        {/* Historical log timeline */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader title="Log History" />
          <LogTimeline
            entries={plant.logs}
          />
        </View>

        {/* Dictation journal notes */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader title="Quick Journal Notes" />
          <NotesInput
            label="Write or record note..."
            value={noteText}
            onChangeText={setNoteText}
            isRecording={isRecording}
            onMicPress={handleMicPress}
          />
        </View>

        {/* Learning tip card */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader title="Grower Tip" />
          <ContextualTipCard
            title="Recognizing Magnesium Deficiency in Monstera Leaves"
            tag="Nutrition"
            readTime="3 min read"
            onPress={() => router.push('/modals/tips')}
          />
        </View>
      </View>

      {/* Floating Action Button */}
      <FAB
        iconName="plus"
        onPress={() => router.push(`/modals/quick-log?id=${plant.id}`)}
      />
    </ScreenWrapper>
  );
}