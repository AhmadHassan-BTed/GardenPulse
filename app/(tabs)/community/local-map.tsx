import { View, Text, StyleSheet, ScrollView, Pressable, Image, MapView, MapViewMarker } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback, useEffect } from "react";

const nearbyGrowers = [
  { id: "1", name: "Sarah M.", avatar: "👩‍🌾", plants: 23, distance: "0.3 mi", location: "Brooklyn, NY", coordinate: { latitude: 40.7128, longitude: -74.0060 }, specialty: "Monstera & Aroids", rating: 4.9 },
  { id: "2", name: "Mike R.", avatar: "👨‍🌾", plants: 45, distance: "0.8 mi", location: "Queens, NY", coordinate: { latitude: 40.7282, longitude: -73.7949 }, specialty: "Vegetables & Herbs", rating: 4.8 },
  { id: "3", name: "Alex K.", avatar: "🧑‍🔬", plants: 12, distance: "1.2 mi", location: "Manhattan, NY", coordinate: { latitude: 40.7589, longitude: -73.9851 }, specialty: "Hydroponics", rating: 4.7 },
  { id: "4", name: "Jen L.", avatar: "👩‍🌿", plants: 34, distance: "1.5 mi", location: "Jersey City, NJ", coordinate: { latitude: 40.7178, longitude: -74.0431 }, specialty: "Succulents", rating: 4.9 },
  { id: "5", name: "Tom W.", avatar: "👨‍🌾", plants: 18, distance: "2.1 mi", location: "Hoboken, NJ", coordinate: { latitude: 40.7440, longitude: -74.0323 }, specialty: "Orchids", rating: 4.6 },
  { id: "6", name: "Lisa C.", avatar: "👩‍🌾", plants: 56, distance: "2.8 mi", location: "Long Island, NY", coordinate: { latitude: 40.7891, longitude: -73.1350 }, specialty: "Rare Plants", rating: 4.8 },
];

const localNurseries = [
  { id: "n1", name: "Green Thumb Nursery", type: "Nursery", distance: "0.5 mi", rating: 4.7, coordinate: { latitude: 40.7150, longitude: -74.0080 }, hours: "9AM-7PM", phone: "(212) 555-0123" },
  { id: "n2", name: "Urban Jungle Plant Shop", type: "Shop", distance: "1.1 mi", rating: 4.9, coordinate: { latitude: 40.7200, longitude: -74.0020 }, hours: "10AM-8PM", phone: "(212) 555-0145" },
  { id: "n3", name: "Hydroponics Central", type: "Specialty", distance: "1.8 mi", rating: 4.6, coordinate: { latitude: 40.7300, longitude: -73.9900 }, hours: "11AM-6PM", phone: "(212) 555-0167" },
  { id: "n4", name: "Community Garden Plot", type: "Garden", distance: "0.9 mi", rating: 4.5, coordinate: { latitude: 40.7100, longitude: -74.0100 }, hours: "Dawn-Dusk", phone: null },
];

export default function LocalGrowMapScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedTab, setSelectedTab] = useState("growers");
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [selectedGrower, setSelectedGrower] = useState<typeof nearbyGrowers[0] | null>(null);
  const [selectedNursery, setSelectedNursery] = useState<typeof localNurseries[0] | null>(null);

  const tabs = [
    { id: "growers", label: "Nearby Growers", count: nearbyGrowers.length },
    { id: "nurseries", label: "Nurseries & Shops", count: localNurseries.length },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Local Grow Map</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Discover growers and resources near you
        </Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          {selectedTab === "growers" && nearbyGrowers.map((grower) => (
            <MapViewMarker
              key={grower.id}
              coordinate={grower.coordinate}
              title={grower.name}
              description={`${grower.plants} plants · ${grower.specialty}`}
              onPress={() => setSelectedGrower(grower)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>{grower.avatar}</Text>
              </View>
            </MapViewMarker>
          ))}
          {selectedTab === "nurseries" && localNurseries.map((nursery) => (
            <MapViewMarker
              key={nursery.id}
              coordinate={nursery.coordinate}
              title={nursery.name}
              description={`${nursery.type} · ${nursery.distance}`}
              onPress={() => setSelectedNursery(nursery)}
            >
              <View style={styles.marker}>
                <Image source={{ uri: "sf:building.2.fill" }} style={styles.markerIcon} />
              </View>
            </MapViewMarker>
          ))}
        </MapView>
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
            <View style={[
              styles.tabBadge,
              { backgroundColor: selectedTab === tab.id ? "rgba(255,255,255,0.3)" : "#4CAF50" },
            ]}>
              <Text style={[
                styles.tabBadgeText,
                { color: "#fff" },
              ]}>{tab.count}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>
          {selectedTab === "growers" ? "Nearby Growers" : "Nurseries & Shops"}
        </Text>
        <FlatList
          data={selectedTab === "growers" ? nearbyGrowers : localNurseries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.listItem}
              onPress={() => selectedTab === "growers" ? setSelectedGrower(item) : setSelectedNursery(item)}
            >
              {selectedTab === "growers" ? (
                <>
                  <View style={styles.listAvatar}>
                    <Text style={styles.listAvatarText}>{item.avatar}</Text>
                  </View>
                  <View style={styles.listInfo}>
                    <View style={styles.listHeader}>
                      <Text style={[styles.listName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                      <View style={styles.rating}>
                        <Image source={{ uri: "sf:star.fill" }} style={styles.ratingIcon} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                    <Text style={[styles.listSpecialty, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{item.specialty}</Text>
                    <View style={styles.listMeta}>
                      <View style={styles.listMetaItem}>
                        <Image source={{ uri: "sf:leaf.fill" }} style={styles.listMetaIcon} />
                        <Text style={styles.listMetaText}>{item.plants} plants</Text>
                      </View>
                      <View style={styles.listMetaItem}>
                        <Image source={{ uri: "sf:location.fill" }} style={styles.listMetaIcon} />
                        <Text style={styles.listMetaText}>{item.distance}</Text>
                      </View>
                      <View style={styles.listMetaItem}>
                        <Image source={{ uri: "sf:map.fill" }} style={styles.listMetaIcon} />
                        <Text style={styles.listMetaText}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                  <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
                </>
              ) : (
                <>
                  <View style={styles.listAvatar}>
                    <Image source={{ uri: "sf:building.2.fill" }} style={styles.listAvatarIcon} />
                  </View>
                  <View style={styles.listInfo}>
                    <View style={styles.listHeader}>
                      <Text style={[styles.listName, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.name}</Text>
                      <View style={styles.rating}>
                        <Image source={{ uri: "sf:star.fill" }} style={styles.ratingIcon} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                    <Text style={[styles.listType, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{item.type}</Text>
                    <View style={styles.listMeta}>
                      <View style={styles.listMetaItem}>
                        <Image source={{ uri: "sf:clock.fill" }} style={styles.listMetaIcon} />
                        <Text style={styles.listMetaText}>{item.hours}</Text>
                      </View>
                      <View style={styles.listMetaItem}>
                        <Image source={{ uri: "sf:location.fill" }} style={styles.listMetaIcon} />
                        <Text style={styles.listMetaText}>{item.distance}</Text>
                      </View>
                      {item.phone && (
                        <View style={styles.listMetaItem}>
                          <Image source={{ uri: "sf:phone.fill" }} style={styles.listMetaIcon} />
                          <Text style={styles.listMetaText}>{item.phone}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
                </>
              )}
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Selected Grower Modal Preview */}
      {selectedGrower && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetAvatar}>
                <Text style={styles.sheetAvatarText}>{selectedGrower.avatar}</Text>
              </View>
              <View style={styles.sheetInfo}>
                <Text style={[styles.sheetName, { color: isDark ? "#fff" : "#1c4a22" }]}>{selectedGrower.name}</Text>
                <View style={styles.sheetMeta}>
                  <View style={styles.sheetMetaItem}>
                    <Image source={{ uri: "sf:leaf.fill" }} style={styles.sheetMetaIcon} />
                    <Text style={styles.sheetMetaText}>{selectedGrower.plants} plants</Text>
                  </View>
                  <View style={styles.sheetMetaItem}>
                    <Image source={{ uri: "sf:star.fill" }} style={styles.sheetMetaIcon} />
                    <Text style={styles.sheetMetaText}>{selectedGrower.rating} rating</Text>
                  </View>
                  <View style={styles.sheetMetaItem}>
                    <Image source={{ uri: "sf:location.fill" }} style={styles.sheetMetaIcon} />
                    <Text style={styles.sheetMetaText}>{selectedGrower.distance} away</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={[styles.sheetSpecialty, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
              Specialty: {selectedGrower.specialty}
            </Text>
            <View style={styles.sheetActions}>
              <Link href={`/modals/message/${selectedGrower.id}`} asChild>
                <Pressable style={styles.sheetActionBtn}>
                  <Image source={{ uri: "sf:bubble.left.fill" }} style={styles.sheetActionIcon} />
                  <Text style={styles.sheetActionText}>Message</Text>
                </Pressable>
              </Link>
              <Link href={`/modals/profile/${selectedGrower.id}`} asChild>
                <Pressable style={styles.sheetActionBtn}>
                  <Image source={{ uri: "sf:person.fill" }} style={styles.sheetActionIcon} />
                  <Text style={styles.sheetActionText}>View Profile</Text>
                </Pressable>
              </Link>
              <Pressable style={styles.sheetCloseBtn} onPress={() => setSelectedGrower(null)}>
                <Text style={styles.sheetCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Selected Nursery Modal Preview */}
      {selectedNursery && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetAvatar}>
                <Image source={{ uri: "sf:building.2.fill" }} style={styles.sheetAvatarIcon} />
              </View>
              <View style={styles.sheetInfo}>
                <Text style={[styles.sheetName, { color: isDark ? "#fff" : "#1c4a22" }]}>{selectedNursery.name}</Text>
                <View style={styles.sheetMeta}>
                  <View style={styles.sheetMetaItem}>
                    <Image source={{ uri: "sf:star.fill" }} style={styles.sheetMetaIcon} />
                    <Text style={styles.sheetMetaText}>{selectedNursery.rating} rating</Text>
                  </View>
                  <View style={styles.sheetMetaItem}>
                    <Image source={{ uri: "sf:location.fill" }} style={styles.sheetMetaIcon} />
                    <Text style={styles.sheetMetaText}>{selectedNursery.distance} away</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={[styles.sheetType, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
              {selectedNursery.type} · {selectedNursery.hours}
            </Text>
            {selectedNursery.phone && (
              <Text style={[styles.sheetPhone, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
                {selectedNursery.phone}
              </Text>
            )}
            <View style={styles.sheetActions}>
              <Link href={`/maps/directions/${selectedNursery.id}`} asChild>
                <Pressable style={styles.sheetActionBtn}>
                  <Image source={{ uri: "sf:location.fill" }} style={styles.sheetActionIcon} />
                  <Text style={styles.sheetActionText}>Directions</Text>
                </Pressable>
              </Link>
              <Link href={`/modals/call/${selectedNursery.id}`} asChild>
                <Pressable style={styles.sheetActionBtn}>
                  <Image source={{ uri: "sf:phone.fill" }} style={styles.sheetActionIcon} />
                  <Text style={styles.sheetActionText}>Call</Text>
                </Pressable>
              </Link>
              <Pressable style={styles.sheetCloseBtn} onPress={() => setSelectedNursery(null)}>
                <Text style={styles.sheetCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerText: {
    fontSize: 18,
  },
  markerIcon: {
    width: 20,
    height: 20,
    tintColor: "#2196F3",
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
  tabBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
  },
  listAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  listAvatarText: {
    fontSize: 20,
  },
  listAvatarIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  listInfo: {
    flex: 1,
    gap: 6,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listName: {
    fontSize: 16,
    fontWeight: "600",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingIcon: {
    width: 14,
    height: 14,
    tintColor: "#FFD700",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFD700",
  },
  listSpecialty: {
    fontSize: 13,
    fontWeight: "500",
  },
  listType: {
    fontSize: 13,
    fontWeight: "500",
  },
  listMeta: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  listMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  listMetaIcon: {
    width: 14,
    height: 14,
    tintColor: "#9E9E9E",
  },
  listMetaText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  listContent: {
    gap: 0,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1c4a22",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignSelf: "center",
    marginTop: 12,
  },
  sheetContent: {
    padding: 20,
    gap: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    gap: 16,
  },
  sheetAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheetAvatarText: {
    fontSize: 24,
  },
  sheetAvatarIcon: {
    width: 28,
    height: 28,
    tintColor: "#4CAF50",
  },
  sheetInfo: {
    flex: 1,
    gap: 8,
  },
  sheetName: {
    fontSize: 20,
    fontWeight: "700",
  },
  sheetMeta: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  sheetMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sheetMetaIcon: {
    width: 14,
    height: 14,
    tintColor: "rgba(255,255,255,0.7)",
  },
  sheetMetaText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  sheetSpecialty: {
    fontSize: 14,
    marginTop: -8,
  },
  sheetType: {
    fontSize: 14,
    marginTop: -8,
  },
  sheetPhone: {
    fontSize: 14,
    marginTop: -8,
  },
  sheetActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  sheetActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  sheetActionIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  sheetActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  sheetCloseBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  sheetCloseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
});
