import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function SupporterBadgeDialog() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
      </Pressable>

      <View style={styles.badgeContainer}>
        <View style={styles.badgeRing}>
          <Image source={{ uri: "sf:heart.fill" }} style={styles.badgeIcon} />
        </View>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Support GardenPulse</Text>
        <Text style={[styles.description, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Upgrade to Pro and get the Supporter badge on your profile</Text>

        <View style={styles.perks}>
          <View style={styles.perk}>
            <Image source={{ uri: "sf:checkmark.circle.fill" }} style={[styles.perkIcon, { tintColor: "#4CAF50" }]} />
            <Text style={styles.perkText}>No ads</Text>
          </View>
          <View style={styles.perk}>
            <Image source={{ uri: "sf:checkmark.circle.fill" }} style={[styles.perkIcon, { tintColor: "#4CAF50" }]} />
            <Text style={styles.perkText}>Unlimited AI diagnoses</Text>
          </View>
          <View style={styles.perk}>
            <Image source={{ uri: "sf:checkmark.circle.fill" }} style={[styles.perkIcon, { tintColor: "#4CAF50" }]} />
            <Text style={styles.perkText}>Custom nutrient recipes</Text>
          </View>
          <View style={styles.perk}>
            <Image source={{ uri: "sf:checkmark.circle.fill" }} style={[styles.perkIcon, { tintColor: "#4CAF50" }]} />
            <Text style={styles.perkText}>Advanced analytics</Text>
          </View>
        </View>

        <Pressable style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade to Pro — $4.99/mo</Text>
        </Pressable>

        <Pressable style={styles.restoreButton} onPress={() => router.back()}>
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </Pressable>

        <Pressable style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeBtnText}>Not Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 24 },
  closeButton: { position: "absolute", top: 10, right: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 22, height: 22, tintColor: "#1c4a22" },
  badgeContainer: { flex: 1, justifyContent: "center", alignItems: "center", gap: 20, paddingHorizontal: 20 },
  badgeRing: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#FFD70020", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#FFD700" },
  badgeIcon: { width: 48, height: 48, tintColor: "#FFD700" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  description: { fontSize: 16, lineHeight: 24, textAlign: "center", paddingHorizontal: 20 },
  perks: { gap: 12, width: "100%", maxWidth: 300 },
  perk: { flexDirection: "row", alignItems: "center", gap: 12 },
  perkIcon: { width: 24, height: 24 },
  perkText: { fontSize: 16, color: "#1c4a22" },
  upgradeButton: { width: "100%", paddingVertical: 16, borderRadius: 12, backgroundColor: "#FFD700", alignItems: "center", marginTop: 8 },
  upgradeButtonText: { fontSize: 18, fontWeight: "600", color: "#1c4a22" },
  restoreButton: { marginTop: 12 },
  restoreButtonText: { fontSize: 16, color: "#2196F3" },
  closeBtn: { marginTop: 8 },
  closeBtnText: { fontSize: 16, color: "#9E9E9E" },
});