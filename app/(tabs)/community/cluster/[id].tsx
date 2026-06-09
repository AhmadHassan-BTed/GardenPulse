import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

export default function ClusterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [joined, setJoined] = useState(false);
  const [tab, setTab] = useState("posts");

  const cluster = {
    id: id || "1",
    name: "Urban Jungle Collective",
    members: 1247,
    location: "NYC Metro",
    plants: 3421,
    avatar: "🌿",
    description: "Indoor plant enthusiasts sharing tips for apartment growing. Weekly meetups, plant swaps, and expert Q&A sessions.",
    isPrivate: false,
    tags: ["Indoor", "Apartment", "Beginner Friendly"],
    cover: "🏙️",
    rules: [
      "Be respectful and supportive",
      "Share photos with care details",
      "No selling or spam",
      "Use relevant tags",
      "Credit sources for advice",
    ],
    admins: ["Sarah M.", "Mike R.", "Alex K."],
  };

  const posts = [
    { id: "1", author: "Sarah M.", avatar: "👩‍🌾", time: "2h ago", content: "My Monstera finally fenestrated! 🎉 Here's my care routine: water every 7 days, bright indirect light, 60% humidity. Using the nutrient calculator for monthly feeds.", image: "🌿", likes: 47, comments: 12, tags: ["Monstera", "Success Story"] },
    { id: "2", author: "Mike R.", avatar: "👨‍🌾", time: "5h ago", content: "Question: My pothos leaves are curling. Soil feels moist but leaves are limp. Any ideas?", image: null, likes: 8, comments: 15, tags: ["Pothos", "Help Needed"] },
    { id: "3", author: "Alex K.", avatar: "🧑‍🔬", time: "1d ago", content: "Just set up my first propagation station! 20 cuttings of various philodendrons. Using perlite + moss mix with a humidity dome.", image: "🌱", likes: 67, comments: 23, tags: ["Propagation", "Setup"] },
  ];

  const members = [
    { id: "1", name: "Sarah M.", avatar: "👩‍🌾", plants: 23, role: "Admin", location: "Brooklyn, NY" },
    { id: "2", name: "Mike R.", avatar: "👨‍🌾", plants: 45, role: "Admin", location: "Queens, NY" },
    { id: "3", name: "Alex K.", avatar: "🧑‍🔬", plants: 12, role: "Admin", location: "Manhattan, NY" },
    { id: "4", name: "Jen L.", avatar: "👩‍🌿", plants: 34, role: "Member", location: "Jersey City, NJ" },
    { id: "5", name: "Tom W.", avatar: "👨‍🌾", plants: 18, role: "Member", location: "Hoboken, NJ" },
    { id: "6", name: "Lisa C.", avatar: "👩‍🌾", plants: 56, role: "Member", location: "Long Island, NY" },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Cover */}
      <View style={styles.cover}>
        <Text style={styles.coverText}>{cluster.cover}</Text>
        <View style={styles.coverOverlay} />
        <View style={styles.coverContent}>
          <View style={styles.clusterAvatarLarge}>
            <Text style={styles.clusterAvatarLargeText}>{cluster.avatar}</Text>
          </View>
          <Text style={styles.clusterNameLarge}>{cluster.name}</Text>
          <View style={styles.coverMeta}>
            <View style={styles.coverMetaItem}>
              <Image source={{ uri: "sf:person.3.fill" }} style={styles.coverMetaIcon} />
              <Text style={styles.coverMetaText}>{cluster.members.toLocaleString()} members</Text>
            </View>
            <View style={styles.coverMetaItem}>
              <Image source={{ uri: "sf:leaf.fill" }} style={styles.coverMetaIcon} />
              <Text style={styles.coverMetaText}>{cluster.plants.toLocaleString()} plants</Text>
            </View>
            <View style={styles.coverMetaItem}>
              <Image source={{ uri: "sf:location.fill" }} style={styles.coverMetaIcon} />
              <Text style={styles.coverMetaText}>{cluster.location}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Join/Manage Button */}
      <View style={styles.joinButtonContainer}>
        <Pressable
          style={[
            styles.joinButton,
            { backgroundColor: joined ? "#fff" : "#4CAF50", borderColor: joined ? "#4CAF50" : "#4CAF50" },
          ]}
          onPress={() => setJoined(!joined)}
        >
          <Text style={[
            styles.joinButtonText,
            { color: joined ? "#4CAF50" : "#fff" },
          ]}>
            {joined ? "Joined" : "Join Cluster"}
          </Text>
        </Pressable>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>About</Text>
        <Text style={[styles.description, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
          {cluster.description}
        </Text>
        <View style={styles.tags}>
          {cluster.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {["posts", "members", "rules"].map((t) => (
          <Pressable
            key={t}
            style={[
              styles.tabButton,
              { backgroundColor: tab === t ? "#4CAF50" : isDark ? "#2a2a2a" : "#fff", borderColor: tab === t ? "#4CAF50" : "#E0E0E0" },
            ]}
            onPress={() => setTab(t)}
          >
            <Text style={[
              styles.tabButtonText,
              { color: tab === t ? "#fff" : isDark ? "#fff" : "#1c4a22" },
            ]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Posts Tab */}
      {tab === "posts" && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Posts</Text>
            <Link href="/modals/create-post" asChild>
              <Pressable style={styles.createPostBtn}>
                <Image source={{ uri: "sf:plus" }} style={styles.createPostIcon} />
                <Text style={styles.createPostText}>Post</Text>
              </Pressable>
            </Link>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarText}>{item.avatar}</Text>
                  </View>
                  <View style={styles.postAuthorInfo}>
                    <Text style={[styles.postAuthor, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.author}</Text>
                    <Text style={[styles.postMeta, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{item.time}</Text>
                  </View>
                </View>
                <Text style={[styles.postContent, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.content}</Text>
                {item.image && (
                  <View style={styles.postImage}>
                    <Text style={styles.postImageText}>{item.image}</Text>
                  </View>
                )}
                <View style={styles.postTags}>
                  {item.tags.map((tag) => (
                    <View key={tag} style={styles.postTag}>
                      <Text style={styles.postTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
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

      {/* Members Tab */}
      {tab === "members" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Members ({cluster.members})</Text>
          <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.memberCard}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{item.avatar}</Text>
                  {item.role === "Admin" && <View style={styles.adminBadge} />}
                </View>
                <View style={styles.memberInfo}>
                  <View style={styles.memberHeader}>
                    <Text style={[styles.memberName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                    {item.role === "Admin" && (
                      <View style={styles.roleBadge}>
                        <Text style={styles.roleBadgeText}>Admin</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.memberMeta}>
                    <View style={styles.memberMetaItem}>
                      <Image source={{ uri: "sf:leaf.fill" }} style={styles.memberMetaIcon} />
                      <Text style={styles.memberMetaText}>{item.plants} plants</Text>
                    </View>
                    <View style={styles.memberMetaItem}>
                      <Image source={{ uri: "sf:location.fill" }} style={styles.memberMetaIcon} />
                      <Text style={styles.memberMetaText}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}

      {/* Rules Tab */}
      {tab === "rules" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Cluster Rules</Text>
          <View style={styles.rulesList}>
            {cluster.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <View style={styles.ruleNumber}>{index + 1}</View>
                <Text style={[styles.ruleText, { color: isDark ? "#fff" : "#1c4a22" }]}>{rule}</Text>
              </View>
            ))}
          </View>
          <View style={styles.admins}>
            <Text style={[styles.adminsTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Admins</Text>
            <View style={styles.adminsList}>
              {cluster.admins.map((admin) => (
                <Text key={admin} style={[styles.adminName, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{admin}</Text>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Link href="/modals/export-share" asChild>
          <Pressable style={styles.actionBtn}>
            <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.actionBtnIcon} />
            <Text style={styles.actionBtnText}>Share Cluster</Text>
          </Pressable>
        </Link>
        <Link href="/modals/create-cluster" asChild>
          <Pressable style={styles.actionBtn}>
            <Image source={{ uri: "sf:person.3.fill" }} style={styles.actionBtnIcon} />
            <Text style={styles.actionBtnText}>Create Your Own</Text>
          </Pressable>
        </Link>
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
    paddingBottom: 100,
  },
  cover: {
    height: 200,
    position: "relative",
  },
  coverText: {
    fontSize: 100,
    textAlign: "center",
    marginTop: 40,
  },
  coverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(28, 74, 34, 0.7)",
  },
  coverContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    gap: 8,
  },
  clusterAvatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  clusterAvatarLargeText: {
    fontSize: 32,
  },
  clusterNameLarge: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  coverMeta: {
    flexDirection: "row",
    gap: 20,
  },
  coverMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  coverMetaIcon: {
    width: 16,
    height: 16,
    tintColor: "rgba(255,255,255,0.8)",
  },
  coverMetaText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  joinButtonContainer: {
    padding: 16,
    marginTop: -30,
  },
  joinButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CAF50",
  },
  // NOTE: tabBar.backgroundColor is intentionally static here.
  // `isDark` is only available inside the component body; using it in the
  // module-level StyleSheet.create() would throw "isDark is not defined"
  // at import time. If you need a dynamic background, use an inline style
  // at the call site instead.
  tabBar: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    paddingVertical: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createPostBtn: {
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
  createPostIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  createPostText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
  },
  postCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
  postTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  postTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
  },
  postTagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#1c4a22",
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
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 68,
  },
  listContent: {
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  memberAvatarText: {
    fontSize: 20,
  },
  adminBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  memberInfo: {
    flex: 1,
    gap: 4,
  },
  memberHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#FFD70020",
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFD700",
  },
  memberMeta: {
    flexDirection: "row",
    gap: 16,
  },
  memberMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  memberMetaIcon: {
    width: 14,
    height: 14,
    tintColor: "#9E9E9E",
  },
  memberMetaText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  rulesList: {
    gap: 12,
  },
  ruleItem: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ruleNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 2,
  },
  admins: {
    marginTop: 8,
    gap: 8,
  },
  adminsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  adminsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  adminName: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 13,
    fontWeight: "500",
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  actionBtnIcon: {
    width: 22,
    height: 22,
    tintColor: "#1c4a22",
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1c4a22",
  },
});