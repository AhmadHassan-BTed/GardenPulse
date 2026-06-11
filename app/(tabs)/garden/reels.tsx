import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import IconButton from '../../../components/common/IconButton';
import FilterChip from '../../../components/common/FilterChip';
import ReelCard from '../../../components/common/ReelCard';
import VideoPlayer from '../../../components/common/VideoPlayer';
import ReelGeneratorFlow from '../../../components/common/ReelGeneratorFlow';
import CustomCard from '../../../components/common/CustomCard';
import CustomText from '../../../components/common/CustomText';
import EmptyStateView from '../../../components/common/EmptyStateView';
import { useGardenStore } from '../../../store/useGardenStore';

export default function ReelsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const reels = useGardenStore((state) => state.reels);
  const addReel = useGardenStore((state) => state.addReel);
  const plants = useGardenStore((state) => state.plants);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedReel, setSelectedReel] = useState<typeof reels[number] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateReel = () => {
    if (plants.filter((p) => !p.isArchived).length === 0) {
      Alert.alert('No Plants', 'Add a plant to your garden before creating a timelapse reel.');
      return;
    }
    setIsGenerating(true);
  };

  const handleGeneratorComplete = () => {
    const activePlants = plants.filter((p) => !p.isArchived);
    const selectedPlant = activePlants[0];
    if (!selectedPlant) return;

    addReel({
      plantId: selectedPlant.id,
      plantName: selectedPlant.nickname || selectedPlant.name,
      dateRange: `${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
      duration: '0:12',
      methodTag: selectedPlant.method,
      views: 0,
      likes: 0,
    });
    setIsGenerating(false);
    Alert.alert('Success', 'Timelapse reel generated and added to your gallery!');
  };

  // Full-screen overlay configurations
  if (selectedReel) {
    return (
      <VideoPlayer
        videoUrl={selectedReel.videoUrl || ''}
        plantName={selectedReel.plantName}
        methodTag={selectedReel.methodTag}
        onClose={() => setSelectedReel(null)}
        onShare={() => router.push('/modals/export-share')}
        onDownload={() => router.push('/modals/rewarded-video')}
      />
    );
  }

  if (isGenerating) {
    return (
      <ReelGeneratorFlow
        onClose={() => setIsGenerating(false)}
        onComplete={handleGeneratorComplete}
      />
    );
  }

  const filteredReels = useMemo(() => {
    if (selectedFilter === 'All') return reels;
    return reels.filter((r) => r.methodTag.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [reels, selectedFilter]);

  const totalViews = reels.reduce((sum, r) => sum + r.views, 0);
  const totalLikes = reels.reduce((sum, r) => sum + r.likes, 0);

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Progress Reels"
        showBack={false}
        rightNode={
          <IconButton
            name="plus"
            size={20}
            color={Colors.text.heading}
            onPress={handleCreateReel}
          />
        }
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Gallery Statistics Row */}
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          <CustomCard style={styles.statBox}>
            <CustomText style={styles.statValue} variant="heading" size="lg">{reels.length}</CustomText>
            <CustomText style={styles.statLabel} variant="muted" size="xs">Reels</CustomText>
          </CustomCard>
          <CustomCard style={styles.statBox}>
            <CustomText style={styles.statValue} variant="success" size="lg">{totalViews}</CustomText>
            <CustomText style={styles.statLabel} variant="muted" size="xs">Views</CustomText>
          </CustomCard>
          <CustomCard style={styles.statBox}>
            <CustomText style={styles.statValue} variant="error" size="lg">{totalLikes}</CustomText>
            <CustomText style={styles.statLabel} variant="muted" size="xs">Likes</CustomText>
          </CustomCard>
        </View>

        {/* Filters Row */}
        <View style={{ flexDirection: 'row', gap: Spacing.xs }}>
          {['All', 'Hydro', 'Soil', 'Container'].map((f) => (
            <FilterChip
              key={f}
              label={f}
              isSelected={selectedFilter === f}
              onPress={() => setSelectedFilter(f)}
            />
          ))}
        </View>

        {/* Reels Grid layout */}
        {filteredReels.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs }}>
            {filteredReels.map((reel) => (
              <View key={reel.id} style={{ width: '48%' }}>
                <ReelCard
                  plantName={reel.plantName}
                  dateRange={reel.dateRange}
                  duration={reel.duration}
                  onPlayPress={() => setSelectedReel(reel)}
                  onSharePress={() => router.push('/modals/export-share')}
                />
              </View>
            ))}
          </View>
        ) : (
          <EmptyStateView
            title="No reels yet"
            description="Create your first timelapse reel to see your plants grow over time!"
            iconName="film"
            actionLabel="Create a Reel"
            onActionPress={handleCreateReel}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontWeight: 'bold',
  },
  statLabel: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 2,
  },
});