import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

const badges = [
  { id: "1", name: "Green Thumb", icon: "leaf.fill", color: "#4CAF50", earned: true, date: "Mar 15, 2024", description: "Grow 10 plants successfully" },
  { id: "2", name: "Propagation Pro", icon: "leaf.fill.badge.plus", color: "#8BC34A", earned: true, date: "Apr 22, 2024", description: "Propagate 20 cuttings" },
  { id: "3", name: "Hydro Hero", icon: "drop.fill", color: "#2196F3", earned: true, date: "May 10, 2024", description: "Complete a hydroponic grow" },
  { id: "4", name: "Community Champion", icon: "person.3.fill", color: "#9C27B0", earned: false, progress: 67, description: "Help 50 community members" },
  { id: "5", name: "Rare Collector", icon: "star.fill", color: "#FFD700", earned: false, progress: 30, description: "Own 5 rare plants" },
  { id: "6", name: "Streak Master", icon: "flame.fill", color: "#FF5722", earned: false, progress: 85, description: "30-day care streak" },
];

const stats = [
  { label: "Plants", value: "12", icon: "leaf.fill", color: "#4CAF50" },
  { label: "Care Logs", value: "347", icon: "calendar", color: "#2196F3" },
  { label: "Streak", value: "23 days", icon: "flame.fill", color: "#FF5722" },
  { label: "Community", value: "Level 3", icon: "person.3.fill", color: "#9C27B0" },
];

const recentActivity = [
  { id: "1", type: "watered", plant: "Monstera", time: "2 hours ago", icon: "drop.fill", color: "#4CAF50" },
  { id: "2", type: "diagnosed", plant: "Snake Plant", issue: "Overwatering", time: "Yesterday", icon: "camera.fill", color: "#FF9800" },
  { id: "3", type: "fertilized", plant: "Tomatoes", time: "2 days ago", icon: "leaf.fill", color: "#8BC34A" },
  { id: "3", type: "joined", plant: "Urban Jungle Collective", time: "3 days ago", icon: "person.3.fill", color: "#9C27B0" },
  { id: "4", type: "earned", plant: "Propagation Pro badge", time: "5 days ago", icon: "leaf.fill.badge.plus", color: "#8BC34A" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🌿</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>Level 3</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: isDark ? "#fff" : "#1c4a22" }]}>Alex Green</Text>
          <Text style={[styles.profileBio, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
            Urban gardener • Hydroponics enthusiast • Plant parent since 2023
          </Text>
          <View style={styles.profileMeta}>
            <View style={styles.profileMetaItem}>
              <Image source={{ uri: "sf:location.fill" }} style={styles.profileMetaIcon} />
              <Text style={styles.profileMetaText}>Brooklyn, NY</Text>
            </View>
            <View style={styles.profileMetaItem}>
              <Image source={{ uri: "sf:calendar" }} style={styles.profileMetaIcon} />
              <Text style={styles.profileMetaText}>Member since Mar 2024</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.editButton} onPress={() => setShowEditProfile(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={[
              styles.statIcon,
              { backgroundColor: stat.color + "20" },
            ]}>
              <Image
                source={{ uri: `sf:${stat.icon}` }}
                style={[styles.statIconImage, { tintColor: stat.color }]}
              />
            </View>
            <Text style={[styles.statValue, { color: isDark ? "#fff" : "#1c4a22" }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Badges</Text>
          <Link href="/modals/all-badges" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={[
              styles.badgeCard,
              { borderColor: badge.earned ? badge.color : "#E0E0E0" },
            ]}>
              <View style={[
                styles.badgeIcon,
                { backgroundColor: badge.earned ? badge.color + "20" : "#F0F0F0" },
              ]}>
                <Image
                  source={{ uri: `sf:${badge.icon}` }}
                  style={[
                    styles.badgeIconImage,
                    { tintColor: badge.earned ? badge.color : "#9E9E9E" },
                  ]}
                />
                {!badge.earned && (
                  <View style={styles.badgeProgressRing}>
                    <Text style={styles.badgeProgressText}>{badge.progress}%</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.badgeName, { color: isDark ? "#fff" : "#1c4a22" }]}>{badge.name}</Text>
              {badge.earned ? (
                <Text style={[styles.badgeDate, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Earned {badge.date}</Text>
              ) : (
                <Text style={[styles.badgeDesc, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{badge.description}</Text>
              )}
              {badge.earned && <View style={styles.earnedCheck} />}
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Recent Activity</Text>
          <Link href="/modals/activity-history" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.activityList}>
          {recentActivity.map((activity) => (
            <Pressable key={activity.id} style={styles.activityItem}>
              <View style={[
                styles.activityIcon,
                { backgroundColor: activity.color + "20" },
              ]}>
                <Image
                  source={{ uri: `sf:${activity.icon}` }}
                  style={[styles.activityIconImage, { tintColor: activity.color }]}
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityText, { color: isDark ? "#fff" : "#1c4a22" }]}>
                  {activity.type === "watered" && `Watered ${activity.plant}`}
                  {activity.type === "diagnosed" && `Diagnosed ${activity.plant}: ${activity.issue}`}
                  {activity.type === "fertilized" && `Fertilized ${activity.plant}`}
                  {activity.type === "joined" && `Joined ${activity.plant}`}
                  {activity.type === "earned" && `Earned ${activity.plant}`}
                </Text>
                <Text style={[styles.activityTime, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{activity.time}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <Link href="/garden/reels" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#4CAF50" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#4CAF5020" }]}>
                <Image source={{ uri: "sf:film.fill" }} style={[styles.quickActionIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Progress Reels</Text>
            </Pressable>
          </Link>
          <Link href="/profile/settings" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#2196F3" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#2196F320" }]}>
                <Image source={{ uri: "sf:gearshape.fill" }} style={[styles.quickActionIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Settings</Text>
            </Pressable>
          </Link>
          <Link href="/profile/privacy" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#FF9800" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#FF980020" }]}>
                <Image source={{ uri: "sf:lock.fill" }} style={[styles.quickActionIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Privacy</Text>
            </Pressable>
          </Link>
          <Link href="/profile/cemetery" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#795548" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#79554820" }]}>
                <Image source={{ uri: "sf:leaf.fill" }} style={[styles.quickActionIconImage, { tintColor: "#795548" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Cemetery Log</Text>
            </Pressable>
          </Link>
          <Link href="/profile/creator-studio" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#9C27B0" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#9C27B020" }]}>
                <Image source={{ uri: "sf:video.fill" }} style={[styles.quickActionIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Creator Studio</Text>
            </Pressable>
          </Link>
          <Link href="/modals/export-share" asChild>
            <Pressable style={[styles.quickActionCard, { borderColor: "#607D8B" }]}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#607D8B20" }]}>
                <Image source={{ uri: "sf:square.and.arrow.up" }} style={[styles.quickActionIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <Text style={[styles.quickActionLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Export Data</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Supporter Badge */}
      <View style={styles.supporterBanner}>
        <View style={styles.supporterContent}>
          <Image source={{ uri: "sf:heart.fill" }} style={styles.supporterIcon} />
          <View>
            <Text style={styles.supporterTitle}>Support GardenPulse</Text>
            <Text style={styles.supporterDesc}>Get Pro features, remove ads, and support development</Text>
          </View>
        </View>
        <Pressable style={styles.supporterButton}>
          <Text style={styles.supporterButtonText}>Upgrade to Pro</Text>
        </Pressable>
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#1c4a22",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  avatarText: {
    fontSize: 36,
  },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#1c4a22",
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1c4a22",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  profileMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  profileMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileMetaIcon: {
    width: 14,
    height: 14,
    tintColor: "rgba(255,255,255,0.7)",
  },
  profileMetaText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
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
    gap: 8,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statIconImage: {
    width: 22,
    height: 22,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
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
    paddingHorizontal: 8,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  badgeCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 10,
  },
  badgeIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badgeIconImage: {
    width: 28,
    height: 28,
  },
  badgeProgressRing: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeProgressText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#1c4a22",
  },
  badgeName: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  badgeDate: {
    fontSize: 11,
    textAlign: "center",
  },
  badgeDesc: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  earnedCheck: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  activityList: {
    gap: 10,
  },
  activityItem: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIconImage: {
    width: 20,
    height: 20,
  },
  activityContent: {
    flex: 1,
    gap: 2,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
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
  supporterBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  supporterContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  supporterIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFD700",
  },
  supporterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  supporterDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  supporterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#FFD700",
  },
  supporterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1c4a22",
  },
});
