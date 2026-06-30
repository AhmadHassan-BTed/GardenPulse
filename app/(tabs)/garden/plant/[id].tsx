import React, { useState, useMemo, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useTheme } from '../../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../../components/common/ScreenWrapper';
import CustomHeader from '../../../../components/common/CustomHeader';
import PlantHeroImage from '../../../../components/common/PlantHeroImage';
import ActionPillRow from '../../../../components/common/ActionPillRow';
import PlantInfoCard from '../../../../components/common/PlantInfoCard';
import { WeatherImpactBanner } from '../../../../components/common/InsightAndMapCards';
import SectionHeader from '../../../../components/common/SectionHeader';
import TaskCard from '../../../../components/common/TaskCard';
import LogTimeline from '../../../../components/common/LogTimeline';
import { ContextualTipCard } from '../../../../components/common/InsightBanners';
import NotesInput from '../../../../components/common/NotesInput';
import FAB from '../../../../components/common/FAB';
import { useGardenStore } from '../../../../store/useGardenStore';

export default function PlantDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storePlants = useGardenStore((state) => state.plants);
  const storeLogs = useGardenStore((state) => state.logs);
  const storeTasks = useGardenStore((state) => state.tasks);
  const toggleTaskDone = useGardenStore((state) => state.toggleTaskDone);

  const plant = useMemo(() => {
    return storePlants.find((p) => p.id === id);
  }, [storePlants, id]);

  const [weatherAlert, setWeatherAlert] = useState<string | null>(null);

  useEffect(() => {
    if (isHydrated && !plant) {
      router.replace('/(tabs)/garden');
    }
  }, [isHydrated, plant]);

  // Fetch live weather for contextual alert
  useEffect(() => {
    if (!plant) return;
    if (plant.method === 'Indoor') {
      setWeatherAlert(' Stable indoor environment — no weather impact expected');
      return;
    }

    let active = true;
    const loadWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({});
        if (!active) return;

        const { fetchLocalWeather } = require('../../../../services/weather');
        const data = await fetchLocalWeather(loc.coords.latitude, loc.coords.longitude);
        if (!active) return;

        if (data.condition.toLowerCase().includes('rain')) {
          setWeatherAlert(` Rain expected in ${data.locationName} — reduce watering for ${plant.name}`);
        } else if (data.humidity > 80) {
          setWeatherAlert(` High humidity (${data.humidity}%) — monitor ${plant.name} for fungal issues`);
        } else if (data.temp > 35) {
          setWeatherAlert(` [HOT]  Extreme heat (${data.temp}°C) — provide shade for ${plant.name}`);
        } else if (data.uvIndex >= 8) {
          setWeatherAlert(` High UV (${data.uvIndex}) — consider shade cloth for ${plant.name}`);
        } else {
          setWeatherAlert(null);
        }
      } catch {
        // Weather is non-critical for plant detail
      }
    };

    loadWeather();
    return () => { active = false; };
  }, [plant?.id, plant?.method]);

  const plantLogs = useMemo(() => {
    return (storeLogs || [])
      .filter((l) => l.plantId === id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [storeLogs, id]);

  const plantTasks = useMemo(() => {
    return (storeTasks || []).filter((t) => t.plantId === id);
  }, [storeTasks, id]);

  const formattedDate = useMemo(() => {
    if (!plant) return '';
    return new Date(plant.dateAdded).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [plant?.dateAdded]);

  const getActivityColor = (act: string) => {
    switch (act) {
      case 'Water':
        return Colors.info;
      case 'Feed':
        return Colors.success;
      case 'Prune':
        return Colors.warning;
      case 'Check':
        return Colors.purple;
      default:
        return Colors.green.DEFAULT;
    }
  };

  const formattedLogs = useMemo(() => {
    return (plantLogs || []).map((log) => {
      const date = new Date(log.timestamp);
      const formattedTimestamp = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ', ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const activities = (log.activities || []).map((act, idx) => ({
        id: `${log.id}-act-${idx}`,
        label: act,
        color: getActivityColor(act),
      }));

      const metrics: string[] = [];
      if (log.metrics?.ph !== undefined) metrics.push(`pH ${log.metrics.ph}`);
      if (log.metrics?.ec !== undefined) metrics.push(`EC ${log.metrics.ec}`);
      if (log.metrics?.moisture !== undefined) metrics.push(`Moisture ${log.metrics.moisture}%`);
      if (log.metrics?.temp !== undefined) metrics.push(`Temp ${log.metrics.temp}°C`);

      return {
        id: log.id,
        timestamp: formattedTimestamp,
        activities,
        metrics,
        notes: log.notes,
        hasVoiceNote: log.hasVoiceNote,
      };
    });
  }, [plantLogs, Colors]);

  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  if (!isHydrated || !plant) {
    return null;
  }

  const handleMicPress = () => {
    Alert.alert(
      'Voice Recording',
      'Voice logging requires native microphone permissions and expo-av integration. This feature will be available in a future update.',
      [{ text: 'OK' }]
    );
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

  // Dynamic tip based on plant health
  const tipTitle = plant.healthScore < 50
    ? ` [WARNING]  ${plant.name} needs attention — health score at ${plant.healthScore}%`
    : plant.healthScore < 75
      ? ` [TIP]  Boost ${plant.name} health with consistent care routines`
      : ` ${plant.name} is thriving — keep up the great work!`;

  return (
    <ScreenWrapper scrollable={true} withPadding={false}>
      <CustomHeader
        title={plant.nickname || plant.name}
        showBack={true}
        onBack={() => router.back()}
      />

      {/* Full-bleed hero banner */}
      <PlantHeroImage
        imageUrl={plant.imageUrl}
        photoCount={plant.imageUrl ? 1 : 0}
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
              onPress: () => router.push(`/modals/quick-log?plantId=${plant.id}`),
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
          commonName={plant.nickname || plant.name}
          species={plant.name}
          method={plant.method}
          stage={plant.stage}
          dateAdded={formattedDate}
          zone={plant.zone}
          containerSize={plant.containerSize}
          onEdit={handleEdit}
        />

        {/* Environment Alert — live weather context */}
        {weatherAlert && (
          <WeatherImpactBanner
            message={weatherAlert}
          />
        )}

        {/* Daily schedule tasks */}
        {plantTasks.length > 0 && (
          <View style={{ gap: Spacing.sm }}>
            <SectionHeader
              title="Daily Care Schedule"
              actionLabel="See all"
              onActionPress={() => router.push('/tools/smart-scheduler')}
            />
            <View style={{ gap: Spacing.xs }}>
              {(plantTasks || []).map((task) => (
                <TaskCard
                  key={task.id}
                  plantName={plant.nickname || plant.name}
                  taskType={task.taskType}
                  isDone={task.isDone}
                  onDonePress={() => toggleTaskDone(task.id)}
                  style={{ width: '100%' }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Historical log timeline */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader title="Log History" />
          <LogTimeline
            entries={formattedLogs}
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

        {/* Dynamic learning tip card */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader title="Grower Tip" />
          <ContextualTipCard
            title={tipTitle}
            tag={plant.method}
            readTime="3 min read"
            onPress={() => router.push(`/modals/tips` as any)}
          />
        </View>
      </View>

      {/* Floating Action Button */}
      <FAB
        iconName="plus"
        onPress={() => router.push(`/modals/quick-log?plantId=${plant.id}`)}
      />
    </ScreenWrapper>
  );
}