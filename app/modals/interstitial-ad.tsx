import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function InterstitialAd() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
      </Pressable>

      <View style={styles.adContainer}>
        <View style={styles.adBadge}>Advertisement</View>
        <View style={styles.adPlaceholder}>
          <Image source={{ uri: "sf:play.rectangle.fill" }} style={styles.adIcon} />
        </View>
        <Text style={[styles.adText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Video ad will play here (15-30s)</Text>
        <Text style={[styles.adText, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Sponsored content supports free features</Text>
      </View>

      <Pressable style={styles.skipButton} onPress={() => router.back()}>
        <Text style={styles.skipButtonText}>Skip Ad</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  closeButton: { position: "absolute", top: 50, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 22, height: 22, tintColor: "#fff" },
  adContainer: { padding: 24, alignItems: "center", gap: 16 },
  adBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.3)" },
  adPlaceholder: { width: 300, height: 200, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)", justifyContent: "center", alignItems: "center" },
  adIcon: { width: 60, height: 60, tintColor: "rgba(255,255,255,0.5)" },
  adText: { fontSize: 16, textAlign: "center" },
  skipButton: { marginTop: 24, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)" },
  skipButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});