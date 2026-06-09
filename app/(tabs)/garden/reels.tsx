import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const reels = [
  { id: "1", plant: "Monstera", type: "Monstera Deliciosa", date: "Jun 5, 2024", duration: "0:15", thumbnail: "🌿", views: 234, likes: 42, description: "Week 12 growth update - new leaf unfurling!" },
  { id: "2", plant: "Snake Plant", type: "Sansevieria", date: "Jun 2, 2024", duration: "0:12", thumbnail: "🌱", views: 189, likes: 31, description: "Monthly check-in - steady growth" },
  { id: "3", plant: "Pothos", type: "Golden Pothos", date: "May 28, 2024", duration: "0:18", thumbnail: "🌿", views: 312, likes: 56, description: "Propagated cuttings rooted successfully!" },
  { id: "4", plant: "ZZ Plant", type: "Zamioculcas", date: "May 20, 2024", duration: "0:10", thumbnail: "🌿", views: 156, likes: 28, description: "New stem emerging from rhizome" },
  { id: "5", plant: "Fiddle Leaf", type: "Ficus Lyrata", date: "May 15, 2024", duration: "0:22", thumbnail: "🌳", views: 445, likes: 78, description: "Recovery journey - from brown edges to glossy green" },
  { id: "6", plant: "Spider Plant", type: "Chlorophytum", date: "May 10, 2024", duration: "0:14", thumbnail: "🌱", views: 267, likes: 45, description: "Baby spiderettes ready for propagation" },
];

export default function ReelsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

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
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Progress Reels</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Watch your garden grow over time
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#1c4a22" }]}>{reels.length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Reels</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#4CAF50" }]}>{reels.reduce((sum, r) => sum + r.views, 0)}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Views</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#FF9800" }]}>{reels.reduce((sum, r) => sum + r.likes, 0)}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Likes</Text>
        </View>
      </View>

      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/modals/reel/${item.id}`} asChild>
            <Pressable style={styles.reelCard}>
              <View style={styles.reelThumbnail}>
                <Text style={styles.reelThumbnailText}>{item.thumbnail}</Text>
                <View style={styles.playButton}>
                  <Image source={{ uri: "sf:play.fill" }} style={styles.playIcon} />
                </View>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
              <View style={styles.reelInfo}>
                <View style={styles.reelHeader}>
                  <Text style={[styles.reelPlant, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.plant}</Text>
                  <Text style={[styles.reelType, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{item.type}</Text>
                </View>
                <Text style={[styles.reelDescription, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{item.description}</Text>
                <View style={styles.reelMeta}>
                  <View style={styles.metaItem}>
                    <Image source={{ uri: "sf:eye.fill" }} style={styles.metaIcon} />
                    <Text style={styles.metaText}>{item.views}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Image source={{ uri: "sf:heart.fill" }} style={[styles.metaIcon, { tintColor: "#F44336" }]} />
                    <Text style={[styles.metaText, { color: "#F44336" }]}>{item.likes}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Image source={{ uri: "sf:calendar" }} style={styles.metaIcon} />
                    <Text style={styles.metaText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Image source={{ uri: "sf:film.fill" }} style={styles.emptyIcon} />
            <Text style={[styles.emptyTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>No reels yet</Text>
            <Text style={[styles.emptySubtitle, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
              Start caring for your plants to generate progress reels automatically
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
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
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  reelCard: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  reelThumbnail: {
    width: 120,
    aspectRatio: 16 / 9,
    position: "relative",
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  reelThumbnailText: {
    fontSize: 40,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
    marginLeft: 2,
  },
  duration: {
    position: "absolute",
    bottom: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  reelInfo: {
    flex: 1,
    padding: 16,
    gap: 8,
    justifyContent: "center",
  },
  reelHeader: {
    gap: 2,
  },
  reelPlant: {
    fontSize: 16,
    fontWeight: "600",
  },
  reelType: {
    fontSize: 13,
  },
  reelDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  reelMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
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
    fontWeight: "500",
    color: "#9E9E9E",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
    gap: 16,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    tintColor: "#9E9E9E",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: 280,
  },
});