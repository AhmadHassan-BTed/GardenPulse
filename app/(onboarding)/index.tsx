import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(onboarding)/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GardenPulse</Text>
      <Text style={styles.subtitle}>Your Smart Garden Companion</Text>
      <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c4a22",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
  },
});