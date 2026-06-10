import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

interface ReelData {
  id: string;
  plantName: string;
  dateRange: string;
  duration: string;
  methodTag: string;
  views: number;
  likes: number;
}

const initialReels: ReelData[] = [
  { id: '1', plantName: 'Monstera Deliciosa', dateRange: 'March - June 2026', duration: '0:15', methodTag: 'Hydroponics', views: 245, likes: 62 },
  { id: '2', plantName: 'Sweet Basil', dateRange: 'May - June 2026', duration: '0:10', methodTag: 'Soil Drench', views: 189, likes: 45 },
  { id: '3', dateRange: 'Jan - June 2026', plantName: 'Fiddle Leaf Fig', duration: '0:18', methodTag: 'Container', views: 312, likes: 88 },
];

export default function ReelsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const [reels, setReels] = useState<ReelData[]>(initialReels);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedReel, setSelectedReel] = useState<ReelData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateReel = () => {
    setIsGenerating(true);
  };

  const handleGeneratorComplete = () => {
    const newReel: ReelData = {
      id: String(reels.length + 1),
      plantName: 'Cherry Tomatoes',
      dateRange: 'April - June 2026',
      duration: '0:12',
      methodTag: 'Balcony',
      views: 0,
      likes: 0,
    };
    setReels([newReel, ...reels]);
    setIsGenerating(false);
    alert('Timelapse Reel generated successfully and added to your gallery!');
  };

  // Full-screen overlay configurations
  if (selectedReel) {
    return (
      <VideoPlayer
        videoUrl="https://example.com/video.mp4"
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
            <Text style={[styles.statValue, { color: Colors.text.heading }]}>{reels.length}</Text>
            <Text style={[styles.statLabel, { color: Colors.text.muted }]}>Reels</Text>
          </CustomCard>
          <CustomCard style={styles.statBox}>
            <Text style={[styles.statValue, { color: Colors.green.DEFAULT }]}>{totalViews}</Text>
            <Text style={[styles.statLabel, { color: Colors.text.muted }]}>Views</Text>
          </CustomCard>
          <CustomCard style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#E11D48' }]}>{totalLikes}</Text>
            <Text style={[styles.statLabel, { color: Colors.text.muted }]}>Likes</Text>
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs }}>
          {reels.map((reel) => (
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 2,
  },
});