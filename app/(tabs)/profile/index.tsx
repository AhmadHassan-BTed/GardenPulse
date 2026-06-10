import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
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

const mockSkills = [
  { id: '1', name: 'Water Management', score: 85 },
  { id: '2', name: 'Pest Detection', score: 60 },
  { id: '3', name: 'Hydroponics setup', score: 90 },
  { id: '4', name: 'Pruning & Training', score: 70 },
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

  // Compute live stats from store
  const activePlants = useMemo(() => storePlants.filter((p) => !p.isArchived), [storePlants]);

  const avgHealth = useMemo(() => {
    if (activePlants.length === 0) return 0;
    return Math.round(activePlants.reduce((sum, p) => sum + p.healthScore, 0) / activePlants.length);
  }, [activePlants]);

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
      ? Math.round(metricsWithData.reduce((s, l) => s + (l.metrics?.moisture || 45), 0) / metricsWithData.length)
      : 45;
    const avgTemp = metricsWithData.length > 0
      ? Math.round(metricsWithData.reduce((s, l) => s + (l.metrics?.temp || 24), 0) / metricsWithData.length)
      : 24;

    return [
      { id: '1', name: 'Soil Moisture', value: `${avgMoisture}%`, status: avgMoisture > 30 && avgMoisture < 70 ? 'healthy' as const : 'warning' as const, icon: 'droplet' },
      { id: '2', name: 'Light DLI', value: '14 mol/m²/d', status: 'healthy' as const, icon: 'sun' },
      { id: '3', name: 'Ambient Temp', value: `${avgTemp}°C`, status: avgTemp > 15 && avgTemp < 35 ? 'healthy' as const : 'warning' as const, icon: 'thermometer' },
      { id: '4', name: 'Relative Humidity', value: '55%', status: 'warning' as const, icon: 'wind' },
      { id: '5', name: 'Water pH', value: `${avgPh}`, status: 'healthy' as const, icon: 'sliders' },
      { id: '6', name: 'Water EC', value: `${avgEc} mS/cm`, status: 'healthy' as const, icon: 'zap' },
    ];
  }, [storeLogs]);

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
    const totalPlants = storePlants.length;
    const hasHydro = storePlants.some((p) => p.method === 'Hydro');
    return badgeDefinitions.map((b) => {
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

  if (!isHydrated) {
    return null;
  }

  const handleEditProfile = () => {
    console.log('Edit Profile');
  };

  const handleAvatarPress = () => {
    console.log('Change Avatar');
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
          badges={badges.map(b => ({
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
        <ConfidenceScoreChart skills={mockSkills} />

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
