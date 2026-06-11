import React, { useState, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../../components/common/ScreenWrapper';
import CustomHeader from '../../../../components/common/CustomHeader';
import InScreenTabBar from '../../../../components/common/InScreenTabBar';
import ClusterCoverHeader from '../../../../components/common/ClusterCoverHeader';
import PostCard from '../../../../components/common/PostCard';
import { MemberRow, SwapCard } from '../../../../components/common/CommunityExtended';
import PostComposeOverlay from '../../../../components/common/PostComposeOverlay';
import SectionHeader from '../../../../components/common/SectionHeader';
import FAB from '../../../../components/common/FAB';
import { useGardenStore } from '../../../../store/useGardenStore';

export default function ClusterDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const [activeTab, setActiveTab] = useState('Posts');
  const [isPosting, setIsPosting] = useState(false);

  const clusters = useGardenStore((state) => state.clusters);
  const updateCluster = useGardenStore((state) => state.updateCluster);
  const allPosts = useGardenStore((state) => state.posts);
  const addPost = useGardenStore((state) => state.addPost);
  const swaps = useGardenStore((state) => state.swaps);
  const userProfile = useGardenStore((state) => state.userProfile);

  const cluster = useMemo(() => clusters.find((c) => c.id === id), [clusters, id]);

  const clusterPosts = useMemo(() => allPosts.filter((p) => p.clusterId === id), [allPosts, id]);
  const clusterSwaps = useMemo(() => swaps.filter((s) => s.clusterId === id), [swaps, id]);

  const mockMembers = useMemo(() => [
    { name: 'Sarah M.', joinedDate: 'Jan 12, 2024' },
    { name: 'Mike R.', joinedDate: 'Feb 18, 2024' },
    { name: userProfile.name || 'You', joinedDate: 'Just now' }
  ], [userProfile]);

  if (!cluster) {
    return (
      <ScreenWrapper scrollable={true} withPadding={true}>
        <CustomHeader
          title="Collective Details"
          showBack={true}
          onBack={() => router.back()}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <Text style={{ color: Colors.text.muted }}>Cluster not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const handlePostSubmit = (content: string, hasPhoto: boolean) => {
    addPost({
      clusterId: cluster.id,
      username: userProfile.growerTag || 'green_thumb',
      content: content,
      likesCount: 0,
      commentsCount: 0,
      methodTag: cluster.method || 'Indoor',
    });
    setIsPosting(false);
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={false}>
      <CustomHeader
        title="Collective Details"
        showBack={true}
        onBack={() => router.back()}
      />

      {/* Cluster cover header banner */}
      <ClusterCoverHeader
        name={cluster.name}
        memberCount={cluster.members}
        location={cluster.location || 'Local Region'}
        createdAt={cluster.createdAt || 'Est. January 2024'}
        description={cluster.description || 'No description available.'}
        isJoined={cluster.isJoined}
        onJoinToggle={() => updateCluster(cluster.id, { isJoined: !cluster.isJoined })}
      />

      <View style={{ paddingHorizontal: Spacing.md, gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Post compose trigger section */}
        {isPosting && (
          <PostComposeOverlay
            onSubmit={handlePostSubmit}
            style={{ marginTop: Spacing.md }}
          />
        )}

        {/* Navigation Tab selection */}
        <InScreenTabBar
          tabs={['Posts', 'Members', 'Swaps']}
          activeTab={activeTab}
          onTabChange={(t) => setActiveTab(t)}
        />

        {activeTab === 'Posts' && (
          <View style={{ gap: Spacing.sm }}>
            <SectionHeader title="Recent Activity" />
            <View style={{ gap: Spacing.sm }}>
              {clusterPosts.length > 0 ? (
                clusterPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    username={post.username}
                    content={post.content}
                    likesCount={post.likesCount}
                    commentsCount={post.commentsCount}
                    isLiked={post.isLiked}
                    methodTag={post.methodTag}
                    onLike={() => {}}
                    onComment={() => {}}
                    onSave={() => {}}
                    onReport={() => {}}
                  />
                ))
              ) : (
                <Text style={{ color: Colors.text.muted, textAlign: 'center', marginTop: Spacing.md }}>No posts yet in this cluster.</Text>
              )}
            </View>
          </View>
        )}

        {activeTab === 'Members' && (
          <View style={{ gap: Spacing.sm }}>
            <SectionHeader title="Cluster Members" />
            <View style={{ gap: Spacing.sm }}>
              {mockMembers.map((member, idx) => (
                <MemberRow
                  key={idx}
                  name={member.name}
                  joinedDate={member.joinedDate}
                />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'Swaps' && (
          <View style={{ gap: Spacing.sm }}>
            <SectionHeader title="Seed & Clipping Swaps" />
            <View style={{ gap: Spacing.sm }}>
              {clusterSwaps.length > 0 ? (
                clusterSwaps.map((swap) => (
                  <SwapCard
                    key={swap.id}
                    itemName={swap.itemName}
                    type={swap.type}
                    location={swap.location}
                    onExpressInterest={() => Alert.alert('Interest Registered', 'The owner has been notified of your interest.')}
                  />
                ))
              ) : (
                <Text style={{ color: Colors.text.muted, textAlign: 'center', marginTop: Spacing.md }}>No active swaps in this cluster.</Text>
              )}
            </View>
          </View>
        )}
      </View>

      {/* Floating Action Button to post */}
      <FAB
        iconName="edit-2"
        onPress={() => setIsPosting(!isPosting)}
      />
    </ScreenWrapper>
  );
}