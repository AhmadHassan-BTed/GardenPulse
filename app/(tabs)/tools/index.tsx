import { View, Text, StyleSheet, ScrollView, Pressable, Image, Link } from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

const tools = [
  {
    id: "nutrient-calculator",
    title: "Nutrient Calculator",
    subtitle: "Mix perfect nutrient recipes",
    icon: "function",
    color: "#9C27B0",
    description: "Calculate precise NPK ratios for hydroponics and soil",
    features: ["Multi-part recipes", "EC/PPM targets", "Cost calculator", "Export recipes"],
  },
  {
    id: "leaf-diagnostics",
    title: "Leaf Diagnostics",
    subtitle: "AI-powered plant health scan",
    icon: "camera.fill",
    color: "#FF9800",
    description: "Identify diseases, deficiencies, and pests from photos",
    features: ["Instant AI analysis", "Treatment plans", "Progress tracking", "Community verified"],
  },
  {
    id: "smart-scheduler",
    title: "Smart Scheduler",
    subtitle: "Automated care reminders",
    icon: "calendar.badge.clock",
    color: "#2196F3",
    description: "Personalized watering, fertilizing, and care schedules",
    features: ["Weather-aware", "Plant-specific", "Push notifications", "Calendar sync"],
  },
];

export default function ToolsHubScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Garden Tools</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Powerful utilities for serious growers
        </Text>
      </View>

      <View style={styles.toolsGrid}>
        {tools.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.id}`} asChild>
            <Pressable style={styles.toolCard}>
              <View style={[
                styles.toolIcon,
                { backgroundColor: tool.color + "20" },
              ]}>
                <Image
                  source={{ uri: `sf:${tool.icon}` }}
                  style={[styles.toolIconImage, { tintColor: tool.color }]}
                />
              </View>
              <View style={styles.toolContent}>
                <Text style={[styles.toolTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>{tool.title}</Text>
                <Text style={[styles.toolSubtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{tool.subtitle}</Text>
                <Text style={[styles.toolDescription, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{tool.description}</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <Link href="/modals/qr-scanner" asChild>
            <Pressable style={[styles.quickAccessCard, { borderColor: "#4CAF50" }]}>
              <View style={[styles.quickAccessIcon, { backgroundColor: "#4CAF5020" }]}>
                <Image source={{ uri: "sf:qrcode.viewfinder" }} style={[styles.quickAccessIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <Text style={[styles.quickAccessLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>QR Scanner</Text>
              <Text style={[styles.quickAccessDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Scan fertilizer labels</Text>
            </Pressable>
          </Link>
          <Link href="/modals/batch-mode" asChild>
            <Pressable style={[styles.quickAccessCard, { borderColor: "#2196F3" }]}>
              <View style={[styles.quickAccessIcon, { backgroundColor: "#2196F320" }]}>
                <Image source={{ uri: "sf:square.stack.3d.up.fill" }} style={[styles.quickAccessIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <Text style={[styles.quickAccessLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Batch Mode</Text>
              <Text style={[styles.quickAccessDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Log multiple plants</Text>
            </Pressable>
          </Link>
          <Link href="/modals/tips" asChild>
            <Pressable style={[styles.quickAccessCard, { borderColor: "#FF9800" }]}>
              <View style={[styles.quickAccessIcon, { backgroundColor: "#FF980020" }]}>
                <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.quickAccessIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <Text style={[styles.quickAccessLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Tips Library</Text>
              <Text style={[styles.quickAccessDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Browse growing guides</Text>
            </Pressable>
          </Link>
          <Link href="/modals/export-share" asChild>
            <Pressable style={[styles.quickAccessCard, { borderColor: "#9C27B0" }]}>
              <View style={[styles.quickAccessIcon, { backgroundColor: "#9C27B020" }]}>
                <Image source={{ uri: "sf:square.and.arrow.up" }} style={[styles.quickAccessIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <Text style={[styles.quickAccessLabel, { color: isDark ? "#fff" : "#1c4a22" }]}>Export Data</Text>
              <Text style={[styles.quickAccessDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Share reports & recipes</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Pro Features */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Pro Features</Text>
        <View style={styles.proCard}>
          <View style={styles.proContent}>
            <View style={styles.proBadge}>PRO</View>
            <Text style={[styles.proTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Unlock Advanced Tools</Text>
            <Text style={[styles.proDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
              Get unlimited AI diagnoses, custom nutrient recipes, advanced scheduling, and detailed analytics.
            </Text>
          </View>
          <Pressable style={styles.proButton}>
            <Text style={styles.proButtonText}>Upgrade to Pro</Text>
            <Image source={{ uri: "sf:chevron.right" }} style={styles.proButtonIcon} />
          </Pressable>
        </View>
      </View>
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
  toolsGrid: {
    gap: 16,
  },
  toolCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  toolIconImage: {
    width: 28,
    height: 28,
  },
  toolContent: {
    flex: 1,
    gap: 4,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  toolSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  toolDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  chevron: {
    width: 24,
    height: 24,
    tintColor: "#9E9E9E",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  quickAccessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  quickAccessCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 8,
  },
  quickAccessIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quickAccessIconImage: {
    width: 26,
    height: 26,
  },
  quickAccessLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  quickAccessDesc: {
    fontSize: 11,
    textAlign: "center",
  },
  proCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
  },
  proContent: {
    flex: 1,
    gap: 8,
  },
  proBadge: {
    width: 48,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#FFD700",
  },
  proTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  proDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  proButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFD700",
  },
  proButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c4a22",
  },
  proButtonIcon: {
    width: 18,
    height: 18,
    tintColor: "#1c4a22",
  },
});