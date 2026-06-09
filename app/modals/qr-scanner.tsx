import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function QRScannerOverlay() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
      </Pressable>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>QR Scanner</Text>
      <View style={styles.scannerFrame}>
        <Image source={{ uri: "sf:qrcode.viewfinder" }} style={styles.scannerIcon} />
      </View>
      <Text style={[styles.instruction, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Align QR code within frame</Text>
      <Pressable style={styles.flashButton}>
        <Image source={{ uri: "sf:bolt.fill" }} style={styles.flashIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  closeButton: { position: "absolute", top: 50, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 24, height: 24, tintColor: "#fff" },
  title: { position: "absolute", top: 100, fontSize: 20, fontWeight: "700", color: "#fff" },
  scannerFrame: { width: 280, height: 280, borderWidth: 3, borderColor: "#4CAF50", borderRadius: 16, justifyContent: "center", alignItems: "center" },
  scannerIcon: { width: 100, height: 100, tintColor: "#4CAF50", opacity: 0.5 },
  instruction: { marginTop: 24, fontSize: 16, textAlign: "center", color: "#fff" },
  flashButton: { marginTop: 32, width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center" },
  flashIcon: { width: 28, height: 28, tintColor: "#fff" },
});