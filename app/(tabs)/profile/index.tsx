import React, { useState } from 'react';
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

const mockBadges: any[] = [
  { id: '1', name: 'Green Thumb', icon: 'award' as const, isEarned: true, colorKey: 'success', description: 'Grow 10 plants successfully', unlockCriteria: 'Successfully complete 10 plant grow cycles.', earnedDate: 'Mar 15, 2026' },
  { id: '2', name: 'Propagation Pro', icon: 'scissors' as const, isEarned: true, colorKey: 'green.muted', description: 'Propagate 20 cuttings', unlockCriteria: 'Log 20 successful propagation events.', earnedDate: 'Apr 22, 2026' },
  { id: '3', name: 'Hydro Hero', icon: 'droplet' as const, isEarned: true, colorKey: 'info', description: 'Complete a hydroponic grow', unlockCriteria: 'Harvest your first hydroponically grown crop.', earnedDate: 'May 10, 2026' },
  { id: '4', name: 'Community Champ', icon: 'users' as const, isEarned: false, colorKey: 'purple', description: 'Help 50 community members', unlockCriteria: 'Receive 50 helpful reactions on comments.' },
  { id: '5', name: 'Rare Collector', icon: 'star' as const, isEarned: false, colorKey: 'gold', description: 'Own 5 rare plants', unlockCriteria: 'Add 5 rare classified plant species to your garden.' },
];

const mockEnvironmentalMetrics: PlantMetric[] = [
  { id: '1', name: 'Soil Moisture', value: '45%', status: 'healthy' as const, icon: 'droplet' },
  { id: '2', name: 'Light DLI', value: '14 mol/m²/d', status: 'healthy' as const, icon: 'sun' },
  { id: '3', name: 'Ambient Temp', value: '24°C', status: 'healthy' as const, icon: 'thermometer' },
  { id: '4', name: 'Relative Humidity', value: '55%', status: 'warning' as const, icon: 'wind' },
  { id: '5', name: 'Water pH', value: '6.2', status: 'healthy' as const, icon: 'sliders' },
  { id: '6', name: 'Water EC', value: '1.4 mS/cm', status: 'healthy' as const, icon: 'zap' },
];

const mockHeatmapData = Array.from({ length: 30 }).map((_, i) => ({
  date: `2026-05-${30 - i}`,
  logCount: Math.floor(Math.random() * 4),
}));

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

  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  const badges = React.useMemo(() => {
    return mockBadges.map(b => ({
      ...b,
      color: b.colorKey === 'green.muted'
        ? Colors.green.muted
        : Colors[b.colorKey as keyof typeof Colors] || Colors.green.DEFAULT
    }));
  }, [Colors]);

  const handleEditProfile = () => {
    router.push('/modals/edit-profile');
  };

  const handleAvatarPress = () => {
    router.push('/modals/edit-avatar');
  };

  const handleUpgrade = () => {
    router.push('/modals/supporter-badge');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader title="My Profile" />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <ProfileHeaderCard
          name="Alex Green"
          growerTag="Hydroponic Specialist · Level 4"
          avatarUrl={undefined}
          onEditProfile={handleEditProfile}
          onAvatarPress={handleAvatarPress}
        />

        <View style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <MetricDial value={88} label="Garden Health" />
          </View>
          <View style={{ flex: 1, gap: Spacing.sm }}>
            <StatsPillRow
              plantsCount={12}
              logCount={347}
              streak={23}
              challengesWon={4}
            />
          </View>
        </View>

        <MetricBreakdownRow metrics={mockEnvironmentalMetrics} title="Environmental Metrics" />

        <StreakDisplay currentStreak={23} longestStreak={45} />

        <CalendarHeatmap title="30-Day Activity Log" data={mockHeatmapData} />

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

        <SupporterBadgeBanner onUpgrade={handleUpgrade} />
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
