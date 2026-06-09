import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList, RefreshControl } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const clusters = [
  { id: "1", name: "Urban Jungle Collective", members: 1247, location: "NYC Metro", plants: 3421, avatar: "🌿", description: "Indoor plant enthusiasts sharing tips for apartment growing", isPrivate: false, tags: ["Indoor", "Apartment", "Beginner Friendly"], unread: 3 },
  { id: "2", name: "Hydroponics Heroes", members: 892, location: "Global", plants: 2156, avatar: "💧", description: "Deep water culture, NFT, and aeroponics discussions", isPrivate: false, tags: ["Hydroponics", "Advanced", "Tech"], unread: 1 },
  { id: "3", name: "Veggie Gardeners United", members: 2156, location: "US/Canada", plants: 8934, avatar: "🥕", description: "Vegetable growing from seed to harvest", isPrivate: false, tags: ["Vegetables", "Outdoor", "Seasonal"], unread: 5 },
  { id: "4", name: "Rare Plant Society", members: 434, location: "Global", plants: 1287, avatar: "🌺", description: "Collectors of rare and unusual species", isPrivate: true, tags: ["Rare", "Collecting", "Expert"], unread: 0 },
  { id: "5", name: "Succulent Squad", members: 1876, location: "Global", plants: 5623, avatar: "🌵", description: "Cacti, succulents, and drought-tolerant plants", isPrivate: false, tags: ["Succulents", "Low Maintenance", "Beginner"], unread: 2 },
  { id: "6", name: "Orchid Obsession", members: 623, location: "Global", plants: 1892, avatar: "🌸", description: "Orchid care, blooming tips, and species ID", isPrivate: false, tags: ["Orchids", "Intermediate", "Flowering"], unread: 0 },
];

const recentPosts = [
  { id: "1", cluster: "Urban Jungle Collective", author: "Sarah M.", avatar: "👩‍🌾", time: "2h ago", content: "My Monstera finally fenestrated! 🎉 Here's my care routine...", image: "🌿", likes: 47, comments: 12, isChallenge: false },
  { id: "2", cluster: "Veggie Gardeners United", author: "Mike R.", avatar: "👨‍🌾", time: "4h ago", content: "Week 3 tomato update - first flowers appearing! Using the nutrient calc from Tools tab.", image: "🍅", likes: 89, comments: 23, isChallenge: true },
  { id: "3", cluster: "Hydroponics Heroes", author: "Alex K.", avatar: "🧑‍🔬", time: "6h ago", content: "pH drift issue in my DWC system. Anyone else experience this with RO water?", image: "💧", likes: 15, comments: 8, isChallenge: false },
  { id: "4", cluster: "Succulent Squad", author: "Jen L.", avatar: "👩‍🌿", time: "8h ago", content: "Propagated 20 string of pearls cuttings - 95% success rate! Tips in comments.", image: "🌿", likes: 134, comments: 31, isChallenge: false },
];

const challenges = [
  { id: "1", title: "June Growth Challenge", description: "Track your plants' growth for 30 days", participants: 2341, prize: "Pro Subscription + Badge", endsIn: "12 days", icon: "chart.line.uptrend.xyaxis", color: "#4CAF50" },
  { id: "2", title: "Best Propagation Setup", description: "Share your propagation station", participants: 892, prize: "Propagation Kit", endsIn: "5 days", icon: "leaf.fill.badge.plus", color: "#8BC34A" },
  { id: "3", title: "Urban Harvest Photo Contest", description: "Best indoor veggie harvest photo", participants: 1567, prize: "Grow Light + Seeds", endsIn: "19 days", icon: "camera.fill", color: "#2196F3" },
];

export default function CommunityHubScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedTab, setSelectedTab] = useState("clusters");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const tabs = [
    { id: "clusters", label: "Clusters", count: clusters.length },
    { id: "feed", label: "Feed", count: recentPosts.length },
    { id: "challenges", label: "Challenges", count: challenges.length },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} />
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Community</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Connect with growers worldwide
        </Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[
              styles.tabButton,
              { backgroundColor: selectedTab === tab.id ? "#4CAF50" : isDark ? "#2a2a2a" : "#fff", borderColor: selectedTab === tab.id ? "#4CAF50" : "#E0E0E0" },
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[
              styles.tabButtonText,
              { color: selectedTab === tab.id ? "#fff" : isDark ? "#fff" : "#1c4a22" },
            ]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Clusters Tab */}
      {selectedTab === "clusters" && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Garden Clusters</Text>
            <Link href="/modals/create-cluster" asChild>
              <Pressable style={styles.createClusterBtn}>
                <Image source={{ uri: "sf:plus" }} style={styles.createClusterIcon} />
                <Text style={styles.createClusterText}>Create</Text>
              </Pressable>
            </Link>
          </View>
          <FlatList
            data={clusters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Link href={`/community/cluster/${item.id}`} asChild>
                <Pressable style={styles.clusterCard}>
                  <View style={styles.clusterAvatar}>
                    <Text style={styles.clusterAvatarText}>{item.avatar}</Text>
                    {item.isPrivate && <View style={styles.privateBadge} />}
                  </View>
                  <View style={styles.clusterInfo}>
                    <View style={styles.clusterHeader}>
                      <Text style={[styles.clusterName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                      {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.clusterDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{item.description}</Text>
                    <View style={styles.clusterMeta}>
                      <View style={styles.metaItem}>
                        <Image source={{ uri: "sf:person.3.fill" }} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{item.members.toLocaleString()} members</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Image source={{ uri: "sf:leaf.fill" }} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{item.plants.toLocaleString()} plants</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Image source={{ uri: "sf:location.fill" }} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{item.location}</Text>
                      </View>
                    </View>
                    <View style={styles.clusterTags}>
                      {item.tags.map((tag) => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
                </Pressable>
              </Link>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}

      {/* Feed Tab */}
      {selectedTab === "feed" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Community Feed</Text>
          <FlatList
            data={recentPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarText}>{item.avatar}</Text>
                  </View>
                  <View style={styles.postAuthorInfo}>
                    <Text style={[styles.postAuthor, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.author}</Text>
                    <Text style={[styles.postMeta, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{item.cluster} · {item.time}</Text>
                  </View>
                </View>
                {item.isChallenge && (
                  <View style={styles.challengeBadge}>
                    <Text style={styles.challengeBadgeText}>CHALLENGE ENTRY</Text>
                  </View>
                )}
                <Text style={[styles.postContent, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.content}</Text>
                {item.image && (
                  <View style={styles.postImage}>
                    <Text style={styles.postImageText}>{item.image}</Text>
                  </View>
                )}
                <View style={styles.postActions}>
                  <Pressable style={styles.actionBtn}>
                    <Image source={{ uri: "sf:heart" }} style={styles.actionIcon} />
                    <Text style={styles.actionText}>{item.likes}</Text>
                  </Pressable>
                  <Pressable style={styles.actionBtn}>
                    <Image source={{ uri: "sf:bubble.left" }} style={styles.actionIcon} />
                    <Text style={styles.actionText}>{item.comments}</Text>
                  </Pressable>
                  <Pressable style={styles.actionBtn}>
                    <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.actionIcon} />
                    <Text style={styles.actionText}>Share</Text>
                  </Pressable>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}

      {/* Challenges Tab */}
      {selectedTab === "challenges" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Active Challenges</Text>
          <FlatList
            data={challenges}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Link href={`/modals/challenge/${item.id}`} asChild>
                <Pressable style={[
                  styles.challengeCard,
                  { borderColor: item.color },
                ]}>
                  <View style={styles.challengeHeader}>
                    <View style={[
                      styles.challengeIcon,
                      { backgroundColor: item.color + "20" },
                    ]}>
                      <Image
                        source={{ uri: `sf:${item.icon}` }}
                        style={[styles.challengeIconImage, { tintColor: item.color }]}
                      />
                    </View>
                    <View style={styles.challengeInfo}>
                      <Text style={[styles.challengeTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.title}</Text>
                      <Text style={[styles.challengeDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{item.description}</Text>
                    </View>
                  </View>
                  <View style={styles.challengeMeta}>
                    <View style={styles.challengeMetaItem}>
                      <Image source={{ uri: "sf:person.3.fill" }} style={styles.challengeMetaIcon} />
                      <Text style={styles.challengeMetaText}>{item.participants.toLocaleString()} participants</Text>
                    </View>
                    <View style={styles.challengeMetaItem}>
                      <Image source={{ uri: "sf:calendar.badge.clock" }} style={styles.challengeMetaIcon} />
                      <Text style={styles.challengeMetaText}>Ends in {item.endsIn}</Text>
                    </View>
                    <View style={styles.challengeMetaItem}>
                      <Image source={{ uri: "sf:gift.fill" }} style={styles.challengeMetaIcon} />
                      <Text style={styles.challengeMetaText}>{item.prize}</Text>
                    </View>
                  </View>
                  <Pressable style={[
                    styles.joinChallengeBtn,
                    { backgroundColor: item.color },
                  ]}>
                    <Text style={styles.joinChallengeBtnText}>Join Challenge</Text>
                  </Pressable>
                </Pressable>
              </Link>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <Link href="/community/local-map" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#2196F3" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#2196F320" }]}>
                <Image source={{ uri: "sf:map.fill" }} style={[styles.quickActionIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Local Grow Map</Text>
              <Text style={[styles.quickActionDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Find growers nearby</Text>
            </Pressable>
          </Link>
          <Link href="/modals/create-cluster" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#4CAF50" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#4CAF5020" }]}>
                <Image source={{ uri: "sf:person.3.fill" }} style={[styles.quickActionIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Create Cluster</Text>
              <Text style={[styles.quickActionDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Start your community</Text>
            </Pressable>
          </Link>
          <Link href="/modals/export-share" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#FF9800" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#FF980020" }]}>
                <Image source={{ uri: "sf:square.and.arrow.up" }} style={[styles.quickActionIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Invite Friends</Text>
              <Text style={[styles.quickActionDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Share referral link</Text>
            </Pressable>
          </Link>
          <Link href="/modals/tips" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#9C27B0" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#9C27B020" }]}>
                <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.quickActionIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Community Tips</Text>
              <Text style={[styles.quickActionDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Browse shared wisdom</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 24,
  },
  header: {
    gap: 4,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
  // NOTE: tabBar.backgroundColor is intentionally static here.
  // `isDark` is only available inside the component body; using it in the
  // module-level StyleSheet.create() would throw "isDark is not defined"
  // at import time. If you need a dynamic background, use an inline style
  // at the call site instead.
  tabBar: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F0F0F0",
    padding: 4,
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  createClusterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  createClusterIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  createClusterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
  },
  clusterCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  clusterAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  clusterAvatarText: {
    fontSize: 24,
  },
  privateBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F44336",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  clusterInfo: {
    flex: 1,
    gap: 8,
  },
  clusterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clusterName: {
    fontSize: 17,
    fontWeight: "600",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  clusterDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  clusterMeta: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaIcon: {
    width: 14,
    height: 14,
    tintColor: "#9E9E9E",
  },
  metaText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  clusterTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#1c4a22",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  listContent: {
    paddingBottom: 20,
  },
  postCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 12,
  },
  postHeader: {
    flexDirection: "row",
    gap: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  postAvatarText: {
    fontSize: 18,
  },
  postAuthorInfo: {
    flex: 1,
    gap: 2,
  },
  postAuthor: {
    fontSize: 15,
    fontWeight: "600",
  },
  postMeta: {
    fontSize: 12,
  },
  challengeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#FFD70020",
    alignSelf: "flex-start",
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFD700",
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  postImage: {
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  postImageText: {
    fontSize: 40,
  },
  postActions: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  challengeCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "#fff",
    gap: 16,
  },
  challengeHeader: {
    flexDirection: "row",
    gap: 16,
  },
  challengeIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  challengeIconImage: {
    width: 26,
    height: 26,
  },
  challengeInfo: {
    flex: 1,
    gap: 4,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  challengeDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  challengeMeta: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  challengeMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  challengeMetaIcon: {
    width: 16,
    height: 16,
    tintColor: "#9E9E9E",
  },
  challengeMetaText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  joinChallengeBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  joinChallengeBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 8,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionIconImage: {
    width: 26,
    height: 26,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  quickActionDesc: {
    fontSize: 11,
    textAlign: "center",
  },
});