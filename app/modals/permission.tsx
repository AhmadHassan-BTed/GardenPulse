import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";

const permissions = {
  location: { title: "Location Access", icon: "location.fill", color: "#2196F3", description: "Needed for Local Grow Map to find nearby growers and nurseries.", settingsText: "Open Settings" },
  camera: { title: "Camera Access", icon: "camera.fill", color: "#4CAF50", description: "Required for Leaf Diagnostics to scan plant leaves and identify issues.", settingsText: "Open Settings" },
  microphone: { title: "Microphone Access", icon: "mic.fill", color: "#FF9800", description: "Used for voice notes in care logs and quick logging.", settingsText: "Open Settings" },
  notifications: { title: "Notifications", icon: "bell.fill", color: "#9C27B0", description: "Receive care reminders, bloom reports, and community updates.", settingsText: "Open Settings" },
  photos: { title: "Photos Access", icon: "photo.fill", color: "#607D8B", description: "Add photos to plant profiles, progress reels, and community posts.", settingsText: "Open Settings" },
};

export default function PermissionModal() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const permission = permissions[type as keyof typeof permissions] || permissions.location;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
      </Pressable>

      <View style={styles.iconContainer}>
        <View style={[{ backgroundColor: permission.color + "20" }, styles.iconBg]}>
          <Image source={{ uri: `sf:${permission.icon}` }} style={[styles.permissionIcon, { tintColor: permission.color }]} />
        </View>
      </View>

      <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>{permission.title}</Text>
      <Text style={[styles.description, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{permission.description}</Text>

      <Pressable style={[{ backgroundColor: permission.color }, styles.actionButton]}>
        <Text style={styles.actionButtonText}>{permission.settingsText}</Text>
      </Pressable>

      <Pressable style={styles.laterButton} onPress={() => router.back()}>
        <Text style={styles.laterButtonText}>Not Now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  contentContainer: { padding: 24, paddingBottom: 40, alignItems: "center", gap: 24 },
  closeButton: { position: "absolute", top: 10, right: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 22, height: 22, tintColor: "#1c4a22" },
  iconContainer: { marginTop: 20 },
  iconBg: { width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center" },
  permissionIcon: { width: 48, height: 48 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  description: { fontSize: 16, lineHeight: 24, textAlign: "center", paddingHorizontal: 20 },
  actionButton: { width: "100%", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  actionButtonText: { fontSize: 18, fontWeight: "600", color: "#fff" },
  laterButton: { marginTop: 12 },
  laterButtonText: { fontSize: 16, color: "#9E9E9E" },
});