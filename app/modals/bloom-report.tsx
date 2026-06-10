import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import BloomStatsPillRow from '../../components/common/BloomStatsPillRow';
import BloomBestPlantCard from '../../components/common/BloomBestPlantCard';
import BloomWeatherInsight from '../../components/common/BloomWeatherInsight';
import BloomCemeteryAlert from '../../components/common/BloomCemeteryAlert';
import CustomButton from '../../components/common/CustomButton';
import SectionHeader from '../../components/common/SectionHeader';
import { useGardenStore } from '../../store/useGardenStore';

export default function WeeklyBloomReportModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storePlants = useGardenStore((state) => state.plants);
  const storeLogs = useGardenStore((state) => state.logs);
  const userProfile = useGardenStore((state) => state.userProfile);

  // Compute weekly stats
  const weeklyStats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekLogs = storeLogs.filter((l) => new Date(l.timestamp) >= oneWeekAgo);
    const plantsLoggedSet = new Set(weekLogs.map((l) => l.plantId));
    return {
      plantsLogged: plantsLoggedSet.size,
      logEntries: weekLogs.length,
    };
  }, [storeLogs]);

  // Compute health delta (simulated as a positive comparison)
  const healthDelta = useMemo(() => {
    const activePlants = storePlants.filter((p) => !p.isArchived);
    if (activePlants.length === 0) return 0;
    const avgHealth = Math.round(activePlants.reduce((s, p) => s + p.healthScore, 0) / activePlants.length);
    // Simulated delta from baseline 75
    return Math.max(0, avgHealth - 75);
  }, [storePlants]);

  // Find top performer (highest health score)
  const topPlant = useMemo(() => {
    const active = storePlants.filter((p) => !p.isArchived);
    if (active.length === 0) return null;
    return active.reduce((best, p) => (p.healthScore > best.healthScore ? p : best), active[0]);
  }, [storePlants]);

  // Cemetery alert count
  const cemeteryCount = useMemo(() => {
    return storePlants.filter((p) => p.isArchived).length;
  }, [storePlants]);

  if (!isHydrated) {
    return null;
  }

  const handleShare = () => {
    router.push('/modals/export-share');
  };

  const handleCemeteryPress = () => {
    router.push('/profile/cemetery');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Weekly Bloom Report" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        <SectionHeader title="Your Weekly Stats" />
        <BloomStatsPillRow
          plantsLogged={weeklyStats.plantsLogged}
          logEntries={weeklyStats.logEntries}
          healthDelta={healthDelta}
          streak={userProfile.streakCount}
        />

        <SectionHeader title="Top Performer" style={{ marginTop: Spacing.sm }} />
        <BloomBestPlantCard
          plantName={topPlant?.nickname || topPlant?.name || 'No plants yet'}
          method={topPlant?.method || 'N/A'}
          healthDelta={topPlant ? Math.max(0, topPlant.healthScore - 75) : 0}
        />

        <SectionHeader title="Environmental Factor" style={{ marginTop: Spacing.sm }} />
        <BloomWeatherInsight
          insightText="A warm spell of 26°C with 65% humidity increased transpirational growth. High lighting conditions helped double the leaf size on indoor cultivars!"
        />

        {cemeteryCount > 0 && (
          <BloomCemeteryAlert
            count={cemeteryCount}
            onPress={handleCemeteryPress}
          />
        )}

        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton 
            label="Share Weekly Growth Report" 
            onPress={handleShare} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});