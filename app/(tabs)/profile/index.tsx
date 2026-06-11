import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import ProfileHeaderCard from '../../../components/common/ProfileHeaderCard';
import MetricDial from '../../../components/common/MetricDial';
import MetricBreakdownRow, { PlantMetric } from '../../../components/common/MetricBreakdownRow';
import StatsPillRow from '../../../components/common/StatsPillRow';
import StreakDisplay from '../../../components/common/StreakDisplay';
import CalendarHeatmap from '../../../components/common/CalendarHeatmap';
import BadgeGrid, { BadgeItem } from '../../../components/common/BadgeGrid';
import BadgeDetailSheet, { BadgeDetails } from '../../../components/common/BadgeDetailSheet';
import ConfidenceScoreChart from '../../../components/common/ConfidenceScoreChart';
import NavigationLinkRow from '../../../components/common/NavigationLinkRow';
import { SupporterBadgeBanner } from '../../../components/common/PremiumGuides';
import SectionHeader from '../../../components/common/SectionHeader';
import { useGardenStore } from '../../../store/useGardenStore';

const badgeDefinitions: any[] = [
  { id: '1', name: 'Green Thumb', icon: 'award' as const, colorKey: 'success', description: 'Grow 10 plants successfully', unlockCriteria: 'Successfully complete 10 plant grow cycles.' },
  { id: '2', name: 'Propagation Pro', icon: 'scissors' as const, colorKey: 'green.muted', description: 'Propagate 20 cuttings', unlockCriteria: 'Log 20 successful propagation events.' },
  { id: '3', name: 'Hydro Hero', icon: 'droplet' as const, colorKey: 'info', description: 'Complete a hydroponic grow', unlockCriteria: 'Harvest your first hydroponically grown crop.' },
  { id: '4', name: 'Community Champ', icon: 'users' as const, colorKey: 'purple', description: 'Help 50 community members', unlockCriteria: 'Receive 50 helpful reactions on comments.' },
  { id: '5', name: 'Rare Collector', icon: 'star' as const, colorKey: 'gold', description: 'Own 5 rare plants', unlockCriteria: 'Add 5 rare classified plant species to your garden.' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const userProfile = useGardenStore((state) => state.userProfile);
  const storePlants = useGardenStore((state) => state.plants);
  const storeLogs = useGardenStore((state) => state.logs);

  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [humidity, setHumidity] = useState<string>('—');

  // Compute live stats from store
  const activePlants = useMemo(() => storePlants.filter((p) => !p.isArchived), [storePlants]);

  const avgHealth = useMemo(() => {
    if (activePlants.length === 0) return 0;
    return Math.round(activePlants.reduce((sum, p) => sum + p.healthScore, 0) / activePlants.length);
  }, [activePlants]);

  // Fetch local weather for relative humidity
  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (active) {
            setHumidity('N/A');
          }
          return;
        }

        let lat: number;
        let lon: number;
        try {
          const loc = await Location.getCurrentPositionAsync({});
          lat = loc.coords.latitude;
          lon = loc.coords.longitude;
        } catch (e) {
          console.warn('getCurrentPositionAsync failed:', e);
          if (active) {
            setHumidity('N/A');
          }
          return;
        }

        if (!active) return;
        const { fetchLocalWeather } = require('../../../services/weather');
        const data = await fetchLocalWeather(lat, lon);
        if (active && data) {
          setHumidity(`${data.humidity}%`);
        }
      } catch (err) {
        console.warn('Failed to load weather for profile:', err);
        if (active) {
          setHumidity('N/A');
        }
      }
    };
    loadWeather();
    return () => { active = false; };
  }, []);

  // Compute average metrics from logs
  const environmentalMetrics: PlantMetric[] = useMemo(() => {
    const metricsWithData = storeLogs.filter((l) => l.metrics);
    const avgPh = metricsWithData.length > 0
      ? (metricsWithData.reduce((s, l) => s + (l.metrics?.ph || 0), 0) / metricsWithData.length).toFixed(1)
      : 'N/A';
    const avgEc = metricsWithData.length > 0
      ? (metricsWithData.reduce((s, l) => s + (l.metrics?.ec || 0), 0) / metricsWithData.length).toFixed(1)
      : 'N/A';
    const avgMoisture = metricsWithData.length > 0
      ? `${Math.round(metricsWithData.reduce((s, l) => s + (l.metrics?.moisture || 0), 0) / metricsWithData.length)}%`
      : 'N/A';
    const avgTemp = metricsWithData.length > 0
      ? `${Math.round(metricsWithData.reduce((s, l) => s + (l.metrics?.temp || 0), 0) / metricsWithData.length)}°C`
      : 'N/A';
    const avgUv = metricsWithData.length > 0
      ? Math.round(metricsWithData.reduce((s, l) => s + (l.metrics?.uvIndex || 0), 0) / metricsWithData.length)
      : 'N/A';

    return [
      { id: '1', name: 'Soil Moisture', value: avgMoisture, status: avgMoisture !== 'N/A' && parseInt(avgMoisture) > 30 && parseInt(avgMoisture) < 70 ? 'healthy' as const : 'warning' as const, icon: 'droplet' },
      { id: '2', name: 'Light UV Index', value: avgUv !== 'N/A' ? `${avgUv}` : '—', status: 'healthy' as const, icon: 'sun' },
      { id: '3', name: 'Ambient Temp', value: avgTemp, status: avgTemp !== 'N/A' && parseInt(avgTemp) > 15 && parseInt(avgTemp) < 35 ? 'healthy' as const : 'warning' as const, icon: 'thermometer' },
      { id: '4', name: 'Relative Humidity', value: humidity, status: humidity !== '—' && humidity !== 'N/A' && parseInt(humidity) > 40 && parseInt(humidity) < 80 ? 'healthy' as const : 'warning' as const, icon: 'wind' },
      { id: '5', name: 'Water pH', value: avgPh, status: 'healthy' as const, icon: 'sliders' },
      { id: '6', name: 'Water EC', value: avgEc !== 'N/A' ? `${avgEc} mS/cm` : 'N/A', status: 'healthy' as const, icon: 'zap' },
    ];
  }, [storeLogs, humidity]);

  // Generate 30-day heatmap from actual log timestamps
  const heatmapData = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const logCount = storeLogs.filter((l) => l.timestamp.split('T')[0] === dateStr).length;
      return { date: dateStr, logCount };
    });
  }, [storeLogs]);

  // Determine earned badges based on store data
  const badges = useMemo(() => {
    const totalPlants = (storePlants || []).length;
    const hasHydro = (storePlants || []).some((p) => p.method === 'Hydro');
    return (badgeDefinitions || []).map((b) => {
      let isEarned = false;
      let earnedDate: string | undefined;
      if (b.id === '1' && totalPlants >= 3) { isEarned = true; earnedDate = 'Auto-earned'; }
      if (b.id === '2' && storeLogs.length >= 5) { isEarned = true; earnedDate = 'Auto-earned'; }
      if (b.id === '3' && hasHydro) { isEarned = true; earnedDate = 'Auto-earned'; }
      const color = b.colorKey === 'green.muted'
        ? Colors.green.muted
        : Colors[b.colorKey as keyof typeof Colors] || Colors.green.DEFAULT;
      return { ...b, isEarned, earnedDate, color };
    });
  }, [storePlants, storeLogs, Colors]);

  // Compute dynamic mastery skills scores
  const computedSkills = useMemo(() => {
    const waterLogsCount = storeLogs.filter(l => l.activities.includes('Water')).length;
    const pruneLogsCount = storeLogs.filter(l => l.activities.includes('Prune')).length;
    const checkLogsCount = storeLogs.filter(l => l.activities.includes('Check')).length;
    const hasHydroPlant = storePlants.some(p => p.method === 'Hydro');

    const waterScore = Math.min(100, 40 + waterLogsCount * 10);
    const pruneScore = Math.min(100, 30 + pruneLogsCount * 15);
    const pestScore = Math.min(100, 50 + checkLogsCount * 10);
    const hydroScore = hasHydroPlant ? 95 : 0;

    return [
      { id: '1', name: 'Water Management', score: waterScore },
      { id: '2', name: 'Pest Detection', score: pestScore },
      { id: '3', name: 'Hydroponics Setup', score: hydroScore },
      { id: '4', name: 'Pruning & Training', score: pruneScore },
    ];
  }, [storeLogs, storePlants]);

  if (!isHydrated) {
    return null;
  }

  const handleEditProfile = () => {
    router.push('/profile/settings');
  };

  const handleAvatarPress = () => {
    router.push('/profile/settings');
  };

  const handleUpgrade = () => {
    router.push('/modals/supporter-badge');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader title="My Profile" />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <ProfileHeaderCard
          name={userProfile.name}
          growerTag={userProfile.growerTag}
          avatarUrl={userProfile.avatarUrl}
          onEditProfile={handleEditProfile}
          onAvatarPress={handleAvatarPress}
        />

        <View style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <MetricDial value={avgHealth} label="Garden Health" />
          </View>
          <View style={{ flex: 1, gap: Spacing.sm }}>
            <StatsPillRow
              plantsCount={activePlants.length}
              logCount={storeLogs.length}
              streak={userProfile.streakCount}
              challengesWon={userProfile.challengesWon}
            />
          </View>
        </View>

        <MetricBreakdownRow metrics={environmentalMetrics} title="Environmental Metrics" />

        <StreakDisplay currentStreak={userProfile.streakCount} longestStreak={userProfile.longestStreak} />

        <CalendarHeatmap title="30-Day Activity Log" data={heatmapData} />

        <SectionHeader title="Earned Badges" />
        <BadgeGrid
          badges={(badges || []).map(b => ({
            id: b.id,
            name: b.name,
            icon: b.icon,
            isEarned: b.isEarned,
            color: b.color,
          }))}
          onBadgePress={(badgeItem) => {
            const fullBadge = badges.find((b) => b.id === badgeItem.id) || null;
            setSelectedBadge(fullBadge);
          }}
        />

        <SectionHeader title="Grower Mastery" style={{ marginTop: Spacing.md }} />
        <ConfidenceScoreChart skills={computedSkills} />

        <SectionHeader title="Quick Links" style={{ marginTop: Spacing.md }} />
        <View style={{ backgroundColor: theme.Colors.surface.base, borderRadius: theme.Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: theme.Colors.border.subtle }}>
          <NavigationLinkRow label="Progress Reels Gallery" onPress={() => router.push(`/garden/reels` as any)} />
          <NavigationLinkRow label="Cemetery Log" onPress={() => router.push('/profile/cemetery')} />
          <NavigationLinkRow label="Creator Studio" onPress={() => router.push('/profile/creator-studio')} />
          <NavigationLinkRow label="Settings" onPress={() => router.push('/profile/settings')} />
          <NavigationLinkRow label="Privacy Dashboard" onPress={() => router.push('/profile/privacy')} />
          <NavigationLinkRow label="Export Data" onPress={() => router.push('/modals/export-share')} />
        </View>

        {!userProfile.isSupporter && <SupporterBadgeBanner onUpgrade={handleUpgrade} />}
      </View>

      {/* Badge Detail Bottom Sheet */}
      <BadgeDetailSheet
        visible={selectedBadge !== null}
        onClose={() => setSelectedBadge(null)}
        badge={selectedBadge}
        onShare={(badge) => {
          setSelectedBadge(null);
          router.push('/modals/export-share');
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});

