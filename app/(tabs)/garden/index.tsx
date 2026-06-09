import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList, RefreshControl } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const plants = [
  { id: "1", name: "Monstera Deliciosa", type: "Monstera", location: "Living Room", health: 92, lastWatered: "2 days ago", nextWatering: "In 5 days", avatar: "🌿", image: null },
  { id: "2", name: "Snake Plant", type: "Sansevieria", location: "Bedroom", health: 78, lastWatered: "1 week ago", nextWatering: "In 2 days", avatar: "🌱", image: null },
  { id: "3", name: "Golden Pothos", type: "Epipremnum", location: "Kitchen", health: 65, lastWatered: "3 days ago", nextWatering: "Tomorrow", avatar: "🌿", image: null },
  { id: "4", name: "ZZ Plant", type: "Zamioculcas", location: "Office", health: 88, lastWatered: "1 week ago", nextWatering: "In 4 days", avatar: "🌿", image: null },
  { id: "5", name: "Fiddle Leaf Fig", type: "Ficus", location: "Living Room", health: 72, lastWatered: "4 days ago", nextWatering: "In 3 days", avatar: "🌳", image: null },
  { id: "6", name: "Spider Plant", type: "Chlorophytum", location: "Bathroom", health: 95, lastWatered: "1 day ago", nextWatering: "In 6 days", avatar: "🌱", image: null },
];

export default function PlantListScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "healthy" && plant.health >= 80) ||
      (filter === "attention" && plant.health < 70) ||
      (filter === "needs-water" && plant.nextWatering.includes("Tomorrow") || plant.nextWatering.includes("day"));
    return matchesSearch && matchesFilter;
  });

  const filters = ["all", "healthy", "attention", "needs-water"];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} />
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff", borderColor: isDark ? "#444" : "#E0E0E0" },
        ]}>
          <Image source={{ uri: "sf:magnifyingglass" }} style={[
            styles.searchIcon,
            { tintColor: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" },
          ]} />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDark ? "#fff" : "#1c4a22", placeholderTextColor: isDark ? "rgba(255,255,255,0.4)" : "rgba(28,74,34,0.4)" },
            ]}
            placeholder="Search plants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Link href="/modals/add-plant" asChild>
          <Pressable style={styles.addButton}>
            <Image source={{ uri: "sf:plus" }} style={styles.addButtonIcon} />
          </Pressable>
        </Link>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
        {filters.map((f) => (
          <Pressable
            key={f}
            style={[
              styles.filterChip,
              { backgroundColor: filter === f ? "#4CAF50" : isDark ? "#2a2a2a" : "#fff", borderColor: filter === f ? "#4CAF50" : "#E0E0E0" },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[
              styles.filterChipText,
              { color: filter === f ? "#fff" : isDark ? "#fff" : "#1c4a22" },
            ]}>
              {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Plant Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#1c4a22" }]}>{plants.length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Plants</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#4CAF50" }]}>{plants.filter(p => p.health >= 80).length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Thriving</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#FF9800" }]}>{plants.filter(p => p.health < 80 && p.health >= 60).length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Needs Care</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#F44336" }]}>{plants.filter(p => p.health < 60).length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Critical</Text>
        </View>
      </View>

      {/* Plant List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/garden/plant/${item.id}`} asChild>
            <Pressable style={styles.plantCard}>
              <View style={styles.plantCardLeft}>
                <View style={[
                  styles.plantAvatar,
                  { backgroundColor: item.health >= 80 ? "#4CAF5020" : item.health >= 60 ? "#FF980020" : "#F4433620" },
                ]}>
                  <Text style={styles.plantAvatarText}>{item.avatar}</Text>
                </View>
                <View style={styles.plantInfo}>
                  <Text style={[styles.plantName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                  <Text style={[styles.plantType, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{item.type} · {item.location}</Text>
                  <View style={styles.plantMeta}>
                    <View style={styles.metaItem}>
                      <Image source={{ uri: "sf:drop.fill" }} style={[styles.metaIcon, { tintColor: "#4CAF50" }]} />
                      <Text style={[styles.metaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Watered {item.lastWatered}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Image source={{ uri: "sf:calendar" }} style={[styles.metaIcon, { tintColor: "#FF9800" }]} />
                      <Text style={[styles.metaText, { color: "#FF9800", fontWeight: "600" }]}>{item.nextWatering}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.plantCardRight}>
                <View style={[
                  styles.healthCircle,
                  { borderColor: item.health >= 80 ? "#4CAF50" : item.health >= 60 ? "#FF9800" : "#F44336" },
                ]}>
                  <Text style={[
                    styles.healthCircleText,
                    { color: item.health >= 80 ? "#4CAF50" : item.health >= 60 ? "#FF9800" : "#F44336" },
                  ]}>{item.health}%</Text>
                </View>
                <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
              </View>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Image source={{ uri: "sf:leaf.fill" }} style={styles.emptyIcon} />
            <Text style={[styles.emptyTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>No plants found</Text>
            <Text style={[styles.emptySubtitle, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
              {searchQuery ? "Try a different search" : "Add your first plant to get started"}
            </Text>
            <Link href="/modals/add-plant" asChild>
              <Pressable style={styles.emptyAction}>
                <Text style={styles.emptyActionText}>Add Plant</Text>
              </Pressable>
            </Link>
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
    gap: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  filterContainer: {
    gap: 10,
    paddingHorizontal: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  statItem: {
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
  },
  plantCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  plantCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  plantAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  plantAvatarText: {
    fontSize: 28,
  },
  plantInfo: {
    gap: 4,
  },
  plantName: {
    fontSize: 17,
    fontWeight: "600",
  },
  plantType: {
    fontSize: 14,
  },
  plantMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: {
    width: 16,
    height: 16,
  },
  metaText: {
    fontSize: 13,
  },
  plantCardRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  healthCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  healthCircleText: {
    fontSize: 14,
    fontWeight: "700",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 88,
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
  },
  emptyAction: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
  emptyActionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});