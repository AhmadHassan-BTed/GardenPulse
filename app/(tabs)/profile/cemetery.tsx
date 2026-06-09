import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const lostPlants = [
  { id: "1", name: "Fiddle Leaf Fig", type: "Ficus Lyrata", planted: "Jan 2024", lost: "Mar 2024", cause: "Root rot", daysAlive: 65, image: "🌳", notes: "Overwatered during vacation" },
  { id: "2", name: "String of Pearls", type: "Senecio", planted: "Nov 2023", lost: "Feb 2024", cause: "Underwatering", daysAlive: 92, image: "🌿", notes: "Forgot for 3 weeks" },
  { id: "3", name: "Calathea Orbifolia", type: "Calathea", planted: "Dec 2023", lost: "Jan 2024", cause: "Low humidity", daysAlive: 34, image: "🌿", notes: "Crispy edges, couldn't recover" },
  { id: "4", name: "Venus Flytrap", type: "Dionaea", planted: "Oct 2023", lost: "Dec 2023", cause: "Wrong soil", daysAlive: 58, image: "🪰", notes: "Used regular potting soil" },
];

export default function CemeteryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const totalDays = lostPlants.reduce((sum, p) => sum + p.daysAlive, 0);
  const avgDays = Math.round(totalDays / lostPlants.length);

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
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Cemetery Log</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Remembering plants that didn't make it
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#1c4a22" }]}>{lostPlants.length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Plants Lost</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#FF9800" }]}>{avgDays}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Avg Days Alive</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#F44336" }]}>{lostPlants.filter(p => p.cause === "Root rot").length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Root Rot</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#2196F3" }]}>{lostPlants.filter(p => p.cause === "Underwatering").length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Underwatered</Text>
        </View>
      </View>

      {/* Lessons Learned */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Lessons Learned</Text>
        <View style={styles.lessonsGrid}>
          <View style={styles.lessonCard}>
            <View style={[
              styles.lessonIcon,
              { backgroundColor: "#F4433620" },
            ]}>
              <Image source={{ uri: "sf:drop.fill" }} style={[styles.lessonIconImage, { tintColor: "#F44336" }]} />
            </View>
            <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Check Soil First</Text>
            <Text style={[styles.lessonDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Always check 2 inches deep before watering</Text>
          </View>
          <View style={styles.lessonCard}>
            <View style={[
              styles.lessonIcon,
              { backgroundColor: "#2196F320" },
            ]}>
              <Image source={{ uri: "sf:humidity.fill" }} style={[styles.lessonIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Humidity Matters</Text>
            <Text style={[styles.lessonDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Calatheas need 60%+ humidity</Text>
          </View>
          <View style={styles.lessonCard}>
            <View style={[
              styles.lessonIcon,
              { backgroundColor: "#79554820" },
            ]}>
              <Image source={{ uri: "sf:cube.fill" }} style={[styles.lessonIconImage, { tintColor: "#795548" }]} />
            </View>
            <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Right Soil Mix</Text>
            <Text style={[styles.lessonDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Carnivorous plants need special soil</Text>
          </View>
          <View style={styles.lessonCard}>
            <View style={[
              styles.lessonIcon,
              { backgroundColor: "#FF980020" },
            ]}>
              <Image source={{ uri: "sf:calendar.badge.exclamationmark" }} style={[styles.lessonIconImage, { tintColor: "#FF9800" }]} />
            </View>
            <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Vacation Plan</Text>
            <Text style={[styles.lessonDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Set up auto-water or plant sitter</Text>
          </View>
        </View>
      </View>

      {/* Lost Plants List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>In Memory</Text>
          <Link href="/modals/add-memorial" asChild>
            <Pressable style={styles.addMemorialBtn}>
              <Image source={{ uri: "sf:plus" }} style={styles.addMemorialIcon} />
              <Text style={styles.addMemorialText}>Add Memorial</Text>
            </Pressable>
          </Link>
        </View>
        <FlatList
          data={lostPlants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.memorialCard}>
              <View style={styles.memorialAvatar}>
                <Text style={styles.memorialAvatarText}>{item.image}</Text>
              </View>
              <View style={styles.memorialInfo}>
                <View style={styles.memorialHeader}>
                  <Text style={[styles.memorialName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                  <Text style={[styles.memorialDates, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{item.planted} – {item.lost}</Text>
                </View>
                <Text style={[styles.memorialType, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{item.type}</Text>
                <View style={styles.memorialMeta}>
                  <View style={styles.memorialMetaItem}>
                    <Image source={{ uri: "sf:exclamationmark.triangle.fill" }} style={styles.memorialMetaIcon} />
                    <Text style={styles.memorialMetaText}>{item.cause}</Text>
                  </View>
                  <View style={styles.memorialMetaItem}>
                    <Image source={{ uri: "sf:calendar" }} style={styles.memorialMetaIcon} />
                    <Text style={styles.memorialMetaText}>{item.daysAlive} days</Text>
                  </View>
                </View>
                <Text style={[styles.memorialNotes, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>"{item.notes}"</Text>
              </View>
              <View style={styles.memorialActions}>
                <Link href="/modals/export-share" asChild>
                  <Pressable style={styles.memorialActionBtn}>
                    <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.memorialActionIcon} />
                  </Pressable>
                </Link>
                <Link href="/modals/rewarded-video" asChild>
                  <Pressable style={styles.memorialActionBtn}>
                    <Image source={{ uri: "sf:arrow.down.circle.fill" }} style={styles.memorialActionIcon} />
                  </Pressable>
                </Link>
              </View>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Link href="/modals/export-share" asChild>
          <Pressable style={styles.actionBtn}>
            <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.actionBtnIcon} />
            <Text style={styles.actionBtnText}>Export Log</Text>
          </Pressable>
        </Link>
        <Link href="/modals/rewarded-video" asChild>
          <Pressable style={styles.actionBtn}>
            <Image source={{ uri: "sf:arrow.down.circle.fill" }} style={styles.actionBtnIcon} />
            <Text style={styles.actionBtnText}>Download (Watch Ad)</Text>
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
  statsContainer: {
    flexDirection: "row",
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
  lessonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  lessonCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 10,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonIconImage: {
    width: 24,
    height: 24,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  lessonDesc: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  addMemorialBtn: {
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
  addMemorialIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  addMemorialText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
  },
  memorialCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  memorialAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  memorialAvatarText: {
    fontSize: 24,
  },
  memorialInfo: {
    flex: 1,
    gap: 6,
  },
  memorialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memorialName: {
    fontSize: 17,
    fontWeight: "600",
  },
  memorialDates: {
    fontSize: 12,
  },
  memorialType: {
    fontSize: 13,
  },
  memorialMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  memorialMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  memorialMetaIcon: {
    width: 14,
    height: 14,
    tintColor: "#9E9E9E",
  },
  memorialMetaText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  memorialNotes: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },
  memorialActions: {
    flexDirection: "column",
    gap: 8,
  },
  memorialActionBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  memorialActionIcon: {
    width: 22,
    height: 22,
    tintColor: "#1c4a22",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  listContent: {
    paddingBottom: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#1c4a22",
  },
});
