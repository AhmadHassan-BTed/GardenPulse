import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function RewardedVideoPrompt() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
      </Pressable>

      <View style={styles.iconContainer}>
        <View style={styles.iconBg}>
          <Image source={{ uri: "sf:play.circle.fill" }} style={styles.videoIcon} />
        </View>
      </View>

      <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Unlock with Video</Text>
      <Text style={[styles.description, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Watch a short video to unlock this feature for free</Text>

      <Pressable style={styles.watchButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:play.fill" }} style={styles.playIcon} />
        <Text style={styles.watchButtonText}>Watch Video (15-30s)</Text>
      </Pressable>

      <Pressable style={styles.laterButton} onPress={() => router.back()}>
        <Text style={styles.laterButtonText}>Maybe Later</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center", padding: 24 },
  closeButton: { position: "absolute", top: 10, right: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 22, height: 22, tintColor: "#1c4a22" },
  iconContainer: { marginBottom: 16 },
  iconBg: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#FFD70020", justifyContent: "center", alignItems: "center" },
  videoIcon: { width: 48, height: 48, tintColor: "#FFD700" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  description: { fontSize: 16, lineHeight: 24, textAlign: "center", paddingHorizontal: 20, marginTop: 8 },
  watchButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", paddingVertical: 16, borderRadius: 12, backgroundColor: "#FFD700", marginTop: 24 },
  playIcon: { width: 24, height: 24, tintColor: "#1c4a22" },
  watchButtonText: { fontSize: 18, fontWeight: "600", color: "#1c4a22" },
  laterButton: { marginTop: 16 },
  laterButtonText: { fontSize: 16, color: "#9E9E9E" },
});