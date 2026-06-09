import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";

export default function CarePlanScreen() {
  const router = useRouter();
  const { method, plantName, plantType, location } = useLocalSearchParams<{
    method?: string;
    plantName?: string;
    plantType?: string;
    location?: string;
  }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const carePlan = {
    watering: "Every 7-10 days",
    light: "Bright, indirect light",
    humidity: "Medium (40-60%)",
    temperature: "65-80°F (18-27°C)",
    fertilizer: "Monthly during growing season",
    nextWatering: "In 3 days",
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            { backgroundColor: animate ? "#4CAF50" : "#4CAF5080" },
          ]}
        >
          <Image
            source={{ uri: "sf:checkmark.circle.fill" }}
            style={styles.badgeIcon}
          />
        </View>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>
          Your Care Plan is Ready!
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          We've created a personalized schedule for your {plantName}
        </Text>
      </View>

      <View style={styles.plantCard}>
        <View style={styles.plantInfo}>
          <Text style={[styles.plantName, { color: isDark ? "#fff" : "#1c4a22" }]}>
            {plantName}
          </Text>
          <Text style={[styles.plantType, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
            {plantType} · {location}
          </Text>
          <View style={styles.methodTag}>
            <Text style={styles.methodTagText}>{method?.charAt(0).toUpperCase() + method?.slice(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>
          Care Schedule
        </Text>
        <View style={styles.scheduleGrid}>
          <View style={[styles.scheduleItem, { borderColor: "#4CAF50" }]}>
            <Image
              source={{ uri: "sf:drop.fill" }}
              style={[styles.scheduleIcon, { tintColor: "#4CAF50" }]}
            />
            <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Watering</Text>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{carePlan.watering}</Text>
            <Text style={[styles.nextAction, { color: "#4CAF50" }]}>Next: {carePlan.nextWatering}</Text>
          </View>
          <View style={[styles.scheduleItem, { borderColor: "#FF9800" }]}>
            <Image
              source={{ uri: "sf:sun.max.fill" }}
              style={[styles.scheduleIcon, { tintColor: "#FF9800" }]}
            />
            <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Light</Text>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{carePlan.light}</Text>
          </View>
          <View style={[styles.scheduleItem, { borderColor: "#2196F3" }]}>
            <Image
              source={{ uri: "sf:humidity.fill" }}
              style={[styles.scheduleIcon, { tintColor: "#2196F3" }]}
            />
            <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Humidity</Text>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{carePlan.humidity}</Text>
          </View>
          <View style={[styles.scheduleItem, { borderColor: "#FF5722" }]}>
            <Image
              source={{ uri: "sf:thermometer" }}
              style={[styles.scheduleIcon, { tintColor: "#FF5722" }]}
            />
            <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Temperature</Text>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{carePlan.temperature}</Text>
          </View>
          <View style={[styles.scheduleItem, { borderColor: "#8BC34A" }]}>
            <Image
              source={{ uri: "sf:leaf.fill" }}
              style={[styles.scheduleIcon, { tintColor: "#8BC34A" }]}
            />
            <Text style={[styles.scheduleLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Fertilizer</Text>
            <Text style={[styles.scheduleValue, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{carePlan.fertilizer}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.primaryButtonText}>Start Growing!</Text>
        </Pressable>
        <Link href="/(onboarding)/add-plant" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Adjust Settings</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.autoRedirect}>
        <Text style={[styles.autoRedirectText, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
          Redirecting to dashboard in 5 seconds...
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c4a22",
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    gap: 16,
    alignItems: "center",
    marginTop: 40,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  plantCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  plantInfo: {
    alignItems: "center",
    gap: 4,
  },
  plantName: {
    fontSize: 24,
    fontWeight: "700",
  },
  plantType: {
    fontSize: 16,
  },
  methodTag: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  methodTagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  scheduleGrid: {
    gap: 12,
  },
  scheduleItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    gap: 8,
  },
  scheduleIcon: {
    width: 24,
    height: 24,
  },
  scheduleLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  scheduleValue: {
    fontSize: 14,
  },
  nextAction: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  autoRedirect: {
    marginTop: 24,
    alignItems: "center",
  },
  autoRedirectText: {
    fontSize: 14,
  },
});