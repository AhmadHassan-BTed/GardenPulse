import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import InScreenTabBar from '../../../components/common/InScreenTabBar';
import LocalContextCard from '../../../components/common/LocalContextCard';
import SuccessStatCard from '../../../components/common/SuccessStatCard';
import ClusterCard from '../../../components/common/ClusterCard';
import ChallengeCard from '../../../components/common/ChallengeCard';
import WinnerSpotlightCard from '../../../components/common/WinnerSpotlightCard';
import ReferralBanner from '../../../components/common/ReferralBanner';
import SectionHeader from '../../../components/common/SectionHeader';
import HorizontalScrollRow from '../../../components/common/HorizontalScrollRow';
import CustomText from '../../../components/common/CustomText';

const successStats = [
  { plantName: 'Cherry Tomatoes', successRate: 87, growerCount: 342, trend: 'up' as const },
  { plantName: 'Genovese Basil', successRate: 92, growerCount: 512, trend: 'flat' as const },
  { plantName: 'Fiddle Leaf Fig', successRate: 78, growerCount: 124, trend: 'down' as const },
];

const joinedClusters = [
  { id: '1', name: 'Urban Jungle Collective', members: 1247, method: 'Apartment', hasRecentActivity: true, isJoined: true },
  { id: '2', name: 'Hydroponics Heroes', members: 892, method: 'Hydroponics', hasRecentActivity: false, isJoined: true },
];

const suggestedClusters = [
  { id: '3', name: 'Balcony Veggie Growers', members: 512, method: 'Soil', isJoined: false },
  { id: '4', name: 'Rare Orchid Collectors', members: 234, method: 'Indoor', isJoined: false },
];

export default function CommunityHubScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [activeTab, setActiveTab] = useState('Local');
  const [clustersList, setClustersList] = useState(joinedClusters);
  const [suggestedList, setSuggestedList] = useState(suggestedClusters);

  const handleJoinPress = (clusterId: string, fromJoined: boolean) => {
    if (fromJoined) {
      // Leave cluster
      const item = clustersList.find(c => c.id === clusterId);
      if (item) {
        setClustersList(clustersList.filter(c => c.id !== clusterId));
        setSuggestedList([...suggestedList, { ...item, isJoined: false }]);
      }
    } else {
      // Join cluster
      const item = suggestedList.find(c => c.id === clusterId);
      if (item) {
        setSuggestedList(suggestedList.filter(c => c.id !== clusterId));
        setClustersList([...clustersList, { ...item, isJoined: true, hasRecentActivity: true }]);
      }
    }
  };

  const handleClusterSelect = (clusterId: string) => {
    router.push(`/community/cluster/${clusterId}`);
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Community"
        showBack={false}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Top Local Insight card */}
        <LocalContextCard
          city="Berlin"
          insight="Balcony Tomatoes & Herbs success rate has surged by 15% due to unusually warm seasonal weather. Monitor container soil evaporation!"
          onPress={() => router.push('/community/local-map')}
        />

        {/* Community switcher tab bar */}
        <InScreenTabBar
          tabs={['Local', 'Clusters', 'Challenges']}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'Local' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="What's Thriving Nearby" />
            <HorizontalScrollRow>
              {successStats.map((stat, idx) => (
                <SuccessStatCard
                  key={idx}
                  plantName={stat.plantName}
                  successRate={stat.successRate}
                  growerCount={stat.growerCount}
                  trend={stat.trend}
                />
              ))}
            </HorizontalScrollRow>

            <View style={{ marginTop: Spacing.md }}>
              <SectionHeader title="Recent Local Logs" />
              <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, lineHeight: 18, fontStyle: 'italic' }}>
                "Just harvested 200g of sweet basil from my hydroponic windowsill tent in Kreuzberg. The leaves are incredibly aromatic!" — green_thumb_berlin
              </CustomText>
            </View>
          </View>
        )}

        {activeTab === 'Clusters' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="My Clusters" />
            {clustersList.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                name={cluster.name}
                memberCount={cluster.members}
                method={cluster.method}
                isJoined={true}
                hasRecentActivity={cluster.hasRecentActivity}
                onJoinPress={() => handleJoinPress(cluster.id, true)}
                onPress={() => handleClusterSelect(cluster.id)}
              />
            ))}

            <SectionHeader title="Suggested Clusters" style={{ marginTop: Spacing.md }} />
            {suggestedList.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                name={cluster.name}
                memberCount={cluster.members}
                method={cluster.method}
                isJoined={false}
                onJoinPress={() => handleJoinPress(cluster.id, false)}
                onPress={() => handleClusterSelect(cluster.id)}
              />
            ))}
          </View>
        )}

        {activeTab === 'Challenges' && (
          <View style={{ gap: Spacing.md }}>
            <ChallengeCard
              title="Best Regrowth from Kitchen Scraps"
              countdownLabel="Ends in 12 days"
              entryCount={1567}
              onSubmitPress={() => {
                router.push('/modals/quick-log');
              }}
            />

            <SectionHeader title="Featured Winner" />
            <WinnerSpotlightCard
              username="green_thumb_berlin"
              challengeName="Best Apartment Herb Harvest"
              methodTag="Balcony"
              prizeLabel="Full Grow Light Kit"
            />
          </View>
        )}

        {/* Invite Promotion Persistent bottom card */}
        <ReferralBanner
          invitedCount={2}
          totalNeeded={3}
          onShare={() => router.push('/modals/export-share')}
        />
      </View>
    </ScreenWrapper>
  );
}