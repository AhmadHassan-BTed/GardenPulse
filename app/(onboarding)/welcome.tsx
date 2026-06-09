import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const methods = [
    {
      id: "indoor",
      title: "Indoor Plants",
      subtitle: "Houseplants, herbs, succulents",
      icon: "house.fill",
      color: "#4CAF50",
    },
    {
      id: "outdoor",
      title: "Outdoor Garden",
      subtitle: "Vegetables, flowers, shrubs",
      icon: "tree.fill",
      color: "#8BC34A",
    },
    {
      id: "hydroponic",
      title: "Hydroponics",
      subtitle: "Soilless, nutrient solutions",
      icon: "drop.fill",
      color: "#2196F3",
    },
    {
      id: "greenhouse",
      title: "Greenhouse",
      subtitle: "Controlled environment growing",
      icon: "building.2.fill",
      color: "#FF9800",
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>
          Welcome to GardenPulse
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Choose your growing method to personalize your experience
        </Text>
      </View>

      <View style={styles.grid}>
        {methods.map((method) => (
          <Link
            key={method.id}
            href={`/(onboarding)/add-plant?method=${method.id}`}
            asChild
          >
            <Pressable style={styles.card}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: method.color + "20", borderColor: method.color },
                ]}
              >
                <Image
                  source={{ uri: `sf:${method.icon}` }}
                  style={[
                    styles.icon,
                    { tintColor: method.color },
                  ]}
                />
              </View>
              <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>
                {method.title}
              </Text>
              <Text style={[styles.cardSubtitle, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>
                {method.subtitle}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
          You can change this later in Settings
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 24,
    gap: 32,
  },
  header: {
    gap: 12,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  grid: {
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FAFAFA",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    marginTop: 16,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
  },
});