import { View, Text, StyleSheet, ScrollView, Pressable, Image, RefreshControl } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const todayTasks = [
    { id: 1, title: "Water Monstera", time: "8:00 AM", type: "watering", done: false },
    { id: 2, title: "Check soil moisture", time: "12:00 PM", type: "check", done: true },
    { id: 3, title: "Fertilize tomatoes", time: "4:00 PM", type: "fertilize", done: false },
  ];

  const upcomingTasks = [
    { id: 4, title: "Mist ferns", time: "Tomorrow 8:00 AM", type: "mist", done: false },
    { id: 5, title: "Rotate plants for even growth", time: "Tomorrow 10:00 AM", type: "rotate", done: false },
  ];

  const plantHealth = [
    { id: 1, name: "Monstera", health: 92, status: "Thriving", avatar: "🌿" },
    { id: 2, name: "Snake Plant", health: 78, status: "Good", avatar: "🌱" },
    { id: 3, name: "Pothos", health: 65, status: "Needs Attention", avatar: "🌿" },
  ];

  const tips = [
    { id: 1, title: "Watering Wisdom", excerpt: "Check soil 2 inches deep before watering...", category: "Watering" },
    { id: 2, title: "Light Requirements", excerpt: "Most houseplants prefer bright indirect light...", category: "Light" },
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
      {/* Welcome Header */}
      <View style={styles.welcomeHeader}>
        <View style={styles.welcomeContent}>
          <Text style={[styles.greeting, { color: isDark ? "#fff" : "#1c4a22" }]}>Good morning! 🌱</Text>
          <Text style={[styles.welcomeTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Your garden is thriving</Text>
          <Text style={[styles.welcomeSubtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
            3 plants · 2 tasks today · 92% avg health
          </Text>
        </View>
        <Link href="/garden" asChild>
          <Pressable style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View Garden</Text>
            <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
          </Pressable>
        </Link>
      </View>

      {/* Today's Tasks */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Today's Tasks</Text>
          <Link href="/tools/smart-scheduler" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevronSmall} />
            </Pressable>
          </Link>
        </View>
        <View style={styles.taskList}>
          {todayTasks.map((task) => (
            <Pressable key={task.id} style={styles.taskItem} onPress={() => router.push(`/modals/quick-log?task=${task.id}`)}>
              <View style={[
                styles.taskIcon,
                { backgroundColor: task.type === "watering" ? "#4CAF5020" : task.type === "fertilize" ? "#8BC34A20" : "#2196F320" },
              ]}>
                <Image
                  source={{ uri: task.type === "watering" ? "sf:drop.fill" : task.type === "fertilize" ? "sf:leaf.fill" : "sf:eye.fill" }}
                  style={[styles.taskIconImage, { tintColor: task.type === "watering" ? "#4CAF50" : task.type === "fertilize" ? "#8BC34A" : "#2196F3" }]}
                />
              </View>
              <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>{task.title}</Text>
                <Text style={[styles.taskTime, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{task.time}</Text>
              </View>
              <View style={[
                styles.taskCheckbox,
                { backgroundColor: task.done ? "#4CAF50" : "transparent", borderColor: task.done ? "#4CAF50" : "#E0E0E0" },
              ]}>
                {task.done && <Image source={{ uri: "sf:checkmark" }} style={styles.checkmark} />}
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <Link href="/modals/quick-log" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#4CAF50" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#4CAF5020" }]}>
                <Image source={{ uri: "sf:plus.circle.fill" }} style={[styles.quickActionIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Log Care</Text>
            </Pressable>
          </Link>
          <Link href="/modals/add-plant" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#2196F3" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#2196F320" }]}>
                <Image source={{ uri: "sf:leaf.fill.badge.plus" }} style={[styles.quickActionIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Add Plant</Text>
            </Pressable>
          </Link>
          <Link href="/tools/leaf-diagnostics" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#FF9800" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#FF980020" }]}>
                <Image source={{ uri: "sf:camera.fill" }} style={[styles.quickActionIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Diagnose</Text>
            </Pressable>
          </Link>
          <Link href="/tools/nutrient-calculator" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#9C27B0" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#9C27B020" }]}>
                <Image source={{ uri: "sf:function" }} style={[styles.quickActionIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Calculator</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Plant Health Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Health</Text>
          <Link href="/garden" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevronSmall} />
            </Pressable>
          </Link>
        </View>
        <View style={styles.plantHealthScroll} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plantHealthScrollContent}>
          {plantHealth.map((plant) => (
            <Link key={plant.id} href={`/garden/plant/${plant.id}`} asChild>
              <Pressable style={styles.plantHealthCard}>
                <Text style={styles.plantHealthAvatar}>{plant.avatar}</Text>
                <View style={styles.plantHealthInfo}>
                  <Text style={[styles.plantHealthName, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.name}</Text>
                  <View style={styles.healthBarContainer}>
                    <View style={[
                      styles.healthBarBg,
                      { backgroundColor: isDark ? "#333" : "#E0E0E0" },
                    ]}>
                      <View
                        style={[
                          styles.healthBarFill,
                          { width: `${plant.health}%`, backgroundColor: plant.health >= 80 ? "#4CAF50" : plant.health >= 60 ? "#FF9800" : "#F44336" },
                        ]}
                      />
                    </View>
                    <Text style={[styles.healthPercent, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{plant.health}%</Text>
                  </View>
                  <Text style={[styles.healthStatus, { color: plant.health >= 80 ? "#4CAF50" : plant.health >= 60 ? "#FF9800" : "#F44336" }]}>{plant.status}</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Tips & Insights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Tips & Insights</Text>
          <Link href="/modals/tips" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevronSmall} />
            </Pressable>
          </Link>
        </View>
        <View style={styles.tipsGrid}>
          {tips.map((tip) => (
            <Link key={tip.id} href={`/modals/tip/${tip.id}`} asChild>
              <Pressable style={styles.tipCard}>
                <View style={styles.tipBadge}>{tip.category}</View>
                <Text style={[styles.tipTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>{tip.title}</Text>
                <Text style={[styles.tipExcerpt, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{tip.excerpt}</Text>
                <View style={styles.tipArrow}>
                  <Image source={{ uri: "sf:chevron.right" }} style={styles.chevronSmall} />
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Weekly Bloom Report Banner */}
      <Link href="/modals/bloom-report" asChild>
        <Pressable style={styles.bloomBanner}>
          <View style={styles.bloomContent}>
            <Image source={{ uri: "sf:chart.line.uptrend.xyaxis" }} style={styles.bloomIcon} />
            <View>
              <Text style={styles.bloomTitle}>Weekly Bloom Report</Text>
              <Text style={styles.bloomSubtitle}>Your garden grew 15% this week! Tap to view details.</Text>
            </View>
          </View>
          <Image source={{ uri: "sf:chevron.right" }} style={styles.bloomChevron} />
        </Pressable>
      </Link>
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
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
  },
  welcomeContent: {
    flex: 1,
    gap: 4,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "500",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  welcomeSubtitle: {
    fontSize: 14,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#fff",
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
  seeAllLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
  },
  chevronSmall: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  taskList: {
    gap: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  taskIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  taskIconImage: {
    width: 22,
    height: 22,
  },
  taskContent: {
    flex: 1,
    gap: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  taskTime: {
    fontSize: 13,
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 14,
    height: 14,
    tintColor: "#fff",
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
    gap: 10,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionIconImage: {
    width: 28,
    height: 28,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  plantHealthScroll: {
    gap: 12,
  },
  plantHealthScrollContent: {
    paddingRight: 16,
    gap: 12,
  },
  plantHealthCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 8,
  },
  plantHealthAvatar: {
    fontSize: 32,
  },
  plantHealthInfo: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  plantHealthName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  healthBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  healthBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  healthBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  healthPercent: {
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    width: 36,
  },
  healthStatus: {
    fontSize: 11,
    fontWeight: "500",
  },
  tipsGrid: {
    gap: 12,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    position: "relative",
  },
  tipBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#4CAF5020",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  tipExcerpt: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  tipArrow: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  bloomBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
  },
  bloomContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bloomIcon: {
    width: 40,
    height: 40,
    tintColor: "#4CAF50",
  },
  bloomTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bloomSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
    maxWidth: 200,
  },
  bloomChevron: {
    width: 24,
    height: 24,
    tintColor: "rgba(255,255,255,0.5)",
  },
});