import React, { useState } from 'react';
import { View, Text } from 'react-native';
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

const initialPosts = [
  {
    id: '1',
    username: 'Sarah M.',
    content: 'My Monstera deliciosa has finally fenestrated! 🎉 Watering every 7 days, bright indirect light. Also using the recipe calculator from Tools tab for monthly feeds.',
    likesCount: 47,
    commentsCount: 12,
    methodTag: 'Hydroponics',
    isLiked: true,
  },
  {
    id: '2',
    username: 'Mike R.',
    content: 'Question: My Pothos leaves are curling. The soil feels moist but leaves are limp. Any ideas or suggestions?',
    likesCount: 8,
    commentsCount: 15,
    methodTag: 'Soil',
  },
];

const mockMembers = [
  { name: 'Sarah M.', joinedDate: 'Jan 12, 2024' },
  { name: 'Mike R.', joinedDate: 'Feb 18, 2024' },
  { name: 'Alex K.', joinedDate: 'Mar 01, 2024' },
];

const mockSwaps = [
  { itemName: 'Golden Pothos Cuttings', type: 'Cutting', location: 'Kreuzberg' },
  { itemName: 'Organic Fertilizer Pellets', type: 'Nutrient', location: 'Neukölln' },
];

export default function ClusterDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const [isJoined, setIsJoined] = useState(true);
  const [activeTab, setActiveTab] = useState('Posts');
  const [posts, setPosts] = useState(initialPosts);
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = (content: string, hasPhoto: boolean) => {
    const newPost = {
      id: String(posts.length + 1),
      username: 'me',
      content: content,
      likesCount: 0,
      commentsCount: 0,
      methodTag: 'Indoor',
    };
    setPosts([newPost, ...posts]);
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
        name="Urban Jungle Collective"
        memberCount={1247}
        location="Berlin Region"
        createdAt="Est. January 2024"
        description="A group for indoor plant growers sharing tips for apartment microclimates, humidity challenges, and vertical shelving."
        isJoined={isJoined}
        onJoinToggle={() => setIsJoined(!isJoined)}
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
              {posts.map((post) => (
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
              ))}
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
              {mockSwaps.map((swap, idx) => (
                <SwapCard
                  key={idx}
                  itemName={swap.itemName}
                  type={swap.type}
                  location={swap.location}
                  onExpressInterest={() => alert('Interest registered! The owner has been notified.')}
                />
              ))}
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