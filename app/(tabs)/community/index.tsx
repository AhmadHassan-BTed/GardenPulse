import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
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
import { useGardenStore } from '../../../store/useGardenStore';

export default function CommunityHubScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [activeTab, setActiveTab] = useState('Local');
  const [city, setCity] = useState('Locating...');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const clusters = useGardenStore((state) => state.clusters);
  const updateCluster = useGardenStore((state) => state.updateCluster);
  const successStats = useGardenStore((state) => state.successStats);
  const featuredWinner = useGardenStore((state) => state.featuredWinner);
  const posts = useGardenStore((state) => state.posts);
  const userProfile = useGardenStore((state) => state.userProfile);

  useEffect(() => {
    let active = true;
    const loadLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (active) {
            setCity('Location Access Required');
            setWeatherData(null);
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
            setCity('Location Access Required');
            setWeatherData(null);
          }
          return;
        }

        if (!active) return;
        const { fetchLocalWeather } = require('../../../services/weather');
        const data = await fetchLocalWeather(lat, lon);
        if (active) {
          setCity(data.locationName);
          setWeatherData(data);
        }
      } catch (err) {
        console.warn('Failed to load local weather for community:', err);
        if (active) {
          setCity('Location Access Required');
          setWeatherData(null);
        }
      }
    };
    loadLocationAndWeather();
    return () => { active = false; };
  }, []);

  const clustersList = useMemo(() => (clusters || []).filter((c) => c.isJoined), [clusters]);
  const suggestedList = useMemo(() => (clusters || []).filter((c) => !c.isJoined), [clusters]);

  const handleJoinPress = (clusterId: string, fromJoined: boolean) => {
    updateCluster(clusterId, { isJoined: !fromJoined, hasRecentActivity: !fromJoined });
  };

  const handleClusterSelect = (clusterId: string) => {
    router.push(`/community/cluster/${clusterId}`);
  };

  const recentPost = posts.length > 0 ? posts[0] : null;
  const referralCount = userProfile.referralCount || 0;

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Community"
        showBack={false}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Top Local Insight card */}
        <LocalContextCard
          city={city}
          insight={
            city === 'Location Access Required'
              ? 'To see what is thriving nearby, view your environmental factors, or connect with other growers in your area, please enable location access.'
              : weatherData
                ? `Tomato & herb success rate is high at ${weatherData.humidity}% humidity in ${city}. Monitor watering!`
                : `Urban gardening success rates in ${city} are stable. Check the local grow map!`
          }
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
              {(successStats || []).map((stat, idx) => (
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
                {recentPost 
                  ? `"${recentPost.content}" — ${recentPost.username}`
                  : '"No local logs shared yet. Be the first to share an update in your cluster!"'}
              </CustomText>
            </View>
          </View>
        )}

        {activeTab === 'Clusters' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="My Clusters" />
            {clustersList.length > 0 ? (
              (clustersList || []).map((cluster) => (
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
              ))
            ) : (
              <CustomText style={{ color: Colors.text.muted, textAlign: 'center', marginVertical: Spacing.md }}>
                You have not joined any clusters yet.
              </CustomText>
            )}

            <SectionHeader title="Suggested Clusters" style={{ marginTop: Spacing.md }} />
            {suggestedList.length > 0 ? (
              (suggestedList || []).map((cluster) => (
                <ClusterCard
                  key={cluster.id}
                  name={cluster.name}
                  memberCount={cluster.members}
                  method={cluster.method}
                  isJoined={false}
                  onJoinPress={() => handleJoinPress(cluster.id, false)}
                  onPress={() => handleClusterSelect(cluster.id)}
                />
              ))
            ) : (
              <CustomText style={{ color: Colors.text.muted, textAlign: 'center', marginVertical: Spacing.md }}>
                No suggested clusters available.
              </CustomText>
            )}
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

            {featuredWinner && (
              <>
                <SectionHeader title="Featured Winner" />
                <WinnerSpotlightCard
                  username={featuredWinner.username}
                  challengeName={featuredWinner.challengeName}
                  methodTag={featuredWinner.methodTag}
                  prizeLabel={featuredWinner.prizeLabel}
                />
              </>
            )}
          </View>
        )}

        {/* Invite Promotion Persistent bottom card */}
        <ReferralBanner
          invitedCount={referralCount}
          totalNeeded={3}
          onShare={() => router.push('/modals/export-share')}
        />
      </View>
    </ScreenWrapper>
  );
}