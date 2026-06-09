import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

const plantData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Monstera Deliciosa",
    type: "Monstera",
    location: "Living Room",
    health: 92,
    lastWatered: "2 days ago",
    nextWatering: "In 5 days",
    avatar: "🌿",
    acquired: "March 15, 2024",
    age: "1 year 2 months",
    potSize: "10 inch",
    soilType: "Well-draining aroid mix",
    lightLevel: "Bright indirect",
    humidity: "65%",
    temperature: "72°F",
    careHistory: [
      { date: "Jun 5", action: "Watered", amount: "500ml", notes: "Soil was dry 2 inches down" },
      { date: "Jun 2", action: "Fertilized", amount: "1/2 strength", notes: "Used balanced 20-20-20" },
      { date: "May 28", action: "Misted", amount: "Light", notes: "Morning misting session" },
      { date: "May 25", action: "Watered", amount: "400ml", notes: "" },
      { date: "May 20", action: "Rotated", amount: "90°", notes: "For even growth" },
    ],
  },
  "2": {
    id: "2",
    name: "Snake Plant",
    type: "Sansevieria",
    location: "Bedroom",
    health: 78,
    lastWatered: "1 week ago",
    nextWatering: "In 2 days",
    avatar: "🌱",
    acquired: "January 10, 2024",
    age: "1 year 5 months",
    potSize: "8 inch",
    soilType: "Cactus/succulent mix",
    lightLevel: "Low to medium",
    humidity: "40%",
    temperature: "68°F",
    careHistory: [
      { date: "Jun 1", action: "Watered", amount: "200ml", notes: "Soil completely dry" },
      { date: "May 15", action: "Watered", amount: "150ml", notes: "" },
      { date: "May 1", action: "Dusted leaves", amount: "N/A", notes: "Used damp cloth" },
    ],
  },
};

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const plant = plantData[id] || plantData["1"];

  const getHealthColor = (health: number) => {
    if (health >= 80) return "#4CAF50";
    if (health >= 60) return "#FF9800";
    return "#F44336";
  };

  const getHealthLabel = (health: number) => {
    if (health >= 80) return "Thriving";
    if (health >= 60) return "Needs Attention";
    return "Critical";
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[
          styles.heroAvatar,
          { backgroundColor: getHealthColor(plant.health) + "20" },
        ]}>
          <Text style={styles.heroAvatarText}>{plant.avatar}</Text>
        </View>
        <View style={styles.heroInfo}>
          <Text style={[styles.heroName, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.name}</Text>
          <Text style={[styles.heroType, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>{plant.type}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Image source={{ uri: "sf:location.fill" }} style={[styles.heroMetaIcon, { tintColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]} />
              <Text style={[styles.heroMetaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{plant.location}</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Image source={{ uri: "sf:calendar" }} style={[styles.heroMetaIcon, { tintColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]} />
              <Text style={[styles.heroMetaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Since {plant.acquired}</Text>
            </View>
          </View>
        </View>
        <View style={[
          styles.healthBadge,
          { backgroundColor: getHealthColor(plant.health), borderColor: getHealthColor(plant.health) },
        ]}>
          <Text style={styles.healthBadgeText}>{plant.health}%</Text>
          <Text style={styles.healthBadgeLabel}>{getHealthLabel(plant.health)}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Link href="/modals/quick-log" asChild>
          <Pressable style={[
            styles.quickActionBtn,
            { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
          ]}>
            <Image source={{ uri: "sf:drop.fill" }} style={styles.quickActionBtnIcon} />
            <Text style={styles.quickActionBtnText}>Water</Text>
          </Pressable>
        </Link>
        <Link href="/tools/leaf-diagnostics" asChild>
          <Pressable style={[
            styles.quickActionBtn,
            { backgroundColor: "#fff", borderColor: "#E0E0E0" },
          ]}>
            <Image source={{ uri: "sf:camera.fill" }} style={[styles.quickActionBtnIcon, { tintColor: "#1c4a22" }]} />
            <Text style={[styles.quickActionBtnText, { color: "#1c4a22" }]}>Diagnose</Text>
          </Pressable>
        </Link>
        <Link href="/modals/add-plant" asChild>
          <Pressable style={[
            styles.quickActionBtn,
            { backgroundColor: "#fff", borderColor: "#E0E0E0" },
          ]}>
            <Image source={{ uri: "sf:pencil" }} style={[styles.quickActionBtnIcon, { tintColor: "#1c4a22" }]} />
            <Text style={[styles.quickActionBtnText, { color: "#1c4a22" }]}>Edit</Text>
          </Pressable>
        </Link>
        <Pressable
          style={[
            styles.quickActionBtn,
            { backgroundColor: "#fff", borderColor: "#F44336" },
          ]}
          onPress={() => setShowDeleteConfirm(true)}
        >
          <Image source={{ uri: "sf:trash" }} style={[styles.quickActionBtnIcon, { tintColor: "#F44336" }]} />
          <Text style={[styles.quickActionBtnText, { color: "#F44336" }]}>Remove</Text>
        </Pressable>
      </View>

      {/* Care Schedule */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Care Schedule</Text>
        <View style={styles.scheduleGrid}>
          <View style={[styles.scheduleCard, { borderColor: "#4CAF50" }]}>
            <View style={styles.scheduleCardHeader}>
              <Image source={{ uri: "sf:drop.fill" }} style={[styles.scheduleIcon, { tintColor: "#4CAF50" }]} />
              <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Watering</Text>
            </View>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Every 7-10 days</Text>
            <Text style={[styles.scheduleNext, { color: "#4CAF50" }]}>Last: {plant.lastWatered}</Text>
            <Text style={[styles.scheduleNext, { color: "#4CAF50", fontWeight: "600" }]}>Next: {plant.nextWatering}</Text>
          </View>
          <View style={[styles.scheduleCard, { borderColor: "#FF9800" }]}>
            <View style={styles.scheduleCardHeader}>
              <Image source={{ uri: "sf:sun.max.fill" }} style={[styles.scheduleIcon, { tintColor: "#FF9800" }]} />
              <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Light</Text>
            </View>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{plant.lightLevel}</Text>
          </View>
          <View style={[styles.scheduleCard, { borderColor: "#2196F3" }]}>
            <View style={styles.scheduleCardHeader}>
              <Image source={{ uri: "sf:humidity.fill" }} style={[styles.scheduleIcon, { tintColor: "#2196F3" }]} />
              <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Humidity</Text>
            </View>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{plant.humidity}</Text>
          </View>
          <View style={[styles.scheduleCard, { borderColor: "#FF5722" }]}>
            <View style={styles.scheduleCardHeader}>
              <Image source={{ uri: "sf:thermometer" }} style={[styles.scheduleIcon, { tintColor: "#FF5722" }]} />
              <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Temperature</Text>
            </View>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{plant.temperature}</Text>
          </View>
        </View>
      </View>

      {/* Plant Details */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Age</Text>
            <Text style={[styles.detailValue, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.age}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Pot Size</Text>
            <Text style={[styles.detailValue, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.potSize}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Soil Type</Text>
            <Text style={[styles.detailValue, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.soilType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Acquired</Text>
            <Text style={[styles.detailValue, { color: isDark ? "#fff" : "#1c4a22" }]}>{plant.acquired}</Text>
          </View>
        </View>
      </View>

      {/* Care History */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Care History</Text>
          <Link href="/modals/export-share" asChild>
            <Pressable style={styles.exportButton}>
              <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.exportIcon} />
              <Text style={styles.exportText}>Export</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.historyList}>
          {plant.careHistory.map((entry: any, index: number) => (
            <View key={index} style={styles.historyItem}>
              <View style={[
                styles.historyDot,
                { backgroundColor: entry.action === "Watered" ? "#4CAF50" : entry.action === "Fertilized" ? "#8BC34A" : entry.action === "Misted" ? "#2196F3" : "#9C27B0" },
              ]} />
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyAction, { color: isDark ? "#fff" : "#1c4a22" }]}>{entry.action}</Text>
                  <Text style={[styles.historyDate, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{entry.date}</Text>
                </View>
                {entry.amount && (
                  <Text style={[styles.historyAmount, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{entry.amount}</Text>
                )}
                {entry.notes && (
                  <Text style={[styles.historyNotes, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{entry.notes}</Text>
                )}
              </View>
              <View style={styles.historyLine} />
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.bottomActions}>
        <Link href="/garden/reels" asChild>
          <Pressable style={styles.reelsButton}>
            <Image source={{ uri: "sf:film.fill" }} style={styles.reelsButtonIcon} />
            <Text style={styles.reelsButtonText}>View Progress Reels</Text>
          </Pressable>
        </Link>
        <Link href="/modals/export-share" asChild>
          <Pressable style={styles.shareButton}>
            <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.shareButtonIcon} />
            <Text style={styles.shareButtonText}>Share Plant</Text>
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
    gap: 20,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#1c4a22",
  },
  heroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heroAvatarText: {
    fontSize: 40,
  },
  heroInfo: {
    flex: 1,
    gap: 4,
  },
  heroName: {
    fontSize: 24,
    fontWeight: "700",
  },
  heroType: {
    fontSize: 16,
    fontWeight: "500",
  },
  heroMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  heroMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heroMetaIcon: {
    width: 16,
    height: 16,
  },
  heroMetaText: {
    fontSize: 13,
  },
  healthBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    minWidth: 70,
  },
  healthBadgeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  healthBadgeLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  quickActionBtnIcon: {
    width: 20,
    height: 20,
  },
  quickActionBtnText: {
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
  scheduleGrid: {
    gap: 12,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 8,
  },
  scheduleCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleIcon: {
    width: 22,
    height: 22,
  },
  scheduleLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  scheduleValue: {
    fontSize: 14,
  },
  scheduleNext: {
    fontSize: 13,
    fontWeight: "500",
  },
  detailsGrid: {
    gap: 12,
  },
  detailItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  exportButton: {
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
  exportIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  exportText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
  },
  historyList: {
    gap: 0,
  },
  historyItem: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingLeft: 12,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyAction: {
    fontSize: 16,
    fontWeight: "600",
  },
  historyDate: {
    fontSize: 13,
  },
  historyAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  historyNotes: {
    fontSize: 13,
    fontStyle: "italic",
  },
  historyLine: {
    position: "absolute",
    left: 18,
    top: 48,
    bottom: 0,
    width: 2,
    backgroundColor: "#E0E0E0",
  },
  bottomActions: {
    gap: 12,
    marginTop: 8,
  },
  reelsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#1c4a22",
  },
  reelsButtonIcon: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },
  reelsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  shareButton: {
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
  shareButtonIcon: {
    width: 22,
    height: 22,
    tintColor: "#1c4a22",
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c4a22",
  },
});