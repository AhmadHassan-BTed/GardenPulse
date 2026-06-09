import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const recentScans = [
  { id: "1", plant: "Monstera", date: "Jun 5", issue: "Nitrogen Deficiency", confidence: 94, status: "Treating", image: "🌿" },
  { id: "2", plant: "Snake Plant", date: "Jun 2", issue: "Overwatering", confidence: 87, status: "Resolved", image: "🌱" },
  { id: "3", plant: "Pothos", date: "May 28", issue: "Spider Mites", confidence: 91, status: "Treating", image: "🌿" },
];

const commonIssues = [
  { id: "nitrogen", name: "Nitrogen Deficiency", icon: "leaf.fill", color: "#FF9800", symptoms: "Yellowing lower leaves, stunted growth" },
  { id: "phosphorus", name: "Phosphorus Deficiency", icon: "leaf.fill", color: "#9C27B0", symptoms: "Dark green/purple leaves, poor flowering" },
  { id: "potassium", name: "Potassium Deficiency", icon: "leaf.fill", color: "#FF5722", symptoms: "Brown leaf edges, weak stems" },
  { id: "overwatering", name: "Overwatering", icon: "drop.fill", color: "#2196F3", symptoms: "Yellow leaves, mushy roots, fungus gnats" },
  { id: "underwatering", name: "Underwatering", icon: "drop.fill", color: "#FF9800", symptoms: "Crispy leaves, soil pulling from pot" },
  { id: "spider-mites", name: "Spider Mites", icon: "ant.fill", color: "#F44336", symptoms: "Fine webbing, stippled leaves" },
  { id: "powdery-mildew", name: "Powdery Mildew", icon: "cloud.fill", color: "#9E9E9E", symptoms: "White powdery spots on leaves" },
  { id: "root-rot", name: "Root Rot", icon: "exclamationmark.triangle.fill", color: "#795548", symptoms: "Black mushy roots, foul smell" },
];

export default function LeafDiagnosticsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = useCallback(() => {
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          Alert.alert("Scan Complete", "Nitrogen deficiency detected (94% confidence). View treatment plan?");
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Leaf Diagnostics</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          AI-powered plant health analysis
        </Text>
      </View>

      {/* Scan Button */}
      <View style={styles.scanSection}>
        {scanning ? (
          <View style={styles.scanningCard}>
            <View style={styles.scanProgressRing}>
              <Text style={[styles.scanProgressText, { color: isDark ? "#fff" : "#1c4a22" }]}>{scanProgress}%</Text>
            </View>
            <Text style={[styles.scanningText, { color: isDark ? "#fff" : "#1c4a22" }]}>Analyzing leaf image...</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${scanProgress}%`, backgroundColor: "#4CAF50" },
                ]}
              />
            </View>
          </View>
        ) : (
          <Pressable style={styles.scanButton} onPress={startScan}>
            <View style={styles.scanButtonIcon}>
              <Image source={{ uri: "sf:camera.fill" }} style={styles.scanButtonIconImage} />
            </View>
            <Text style={styles.scanButtonText}>Scan Leaf</Text>
            <Text style={styles.scanButtonSub}>Tap to take a photo or choose from library</Text>
          </Pressable>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Link href="/modals/qr-scanner" asChild>
          <Pressable style={styles.quickActionBtn}>
            <View style={[styles.quickActionBtnIcon, { backgroundColor: "#4CAF5020" }]}>
              <Image source={{ uri: "sf:qrcode.viewfinder" }} style={[styles.quickActionBtnIconImage, { tintColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.quickActionBtnLabel}>Scan Fertilizer</Text>
          </Pressable>
        </Link>
        <Link href="/modals/permission" asChild>
          <Pressable style={styles.quickActionBtn}>
            <View style={[styles.quickActionBtnIcon, { backgroundColor: "#2196F320" }]}>
              <Image source={{ uri: "sf:photo.fill" }} style={[styles.quickActionBtnIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <Text style={styles.quickActionBtnLabel}>Import Photo</Text>
          </Pressable>
        </Link>
        <Link href="/modals/tips" asChild>
          <Pressable style={styles.quickActionBtn}>
            <View style={[styles.quickActionBtnIcon, { backgroundColor: "#FF980020" }]}>
              <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.quickActionBtnIconImage, { tintColor: "#FF9800" }]} />
            </View>
            <Text style={styles.quickActionBtnLabel}>Browse Issues</Text>
          </Pressable>
        </Link>
      </View>

      {/* Recent Scans */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Recent Scans</Text>
          <Link href="/modals/scan-history" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.recentScansList}>
          {recentScans.map((scan) => (
            <Link key={scan.id} href={`/modals/scan-result/${scan.id}`} asChild>
              <Pressable style={styles.recentScanCard}>
                <View style={styles.recentScanThumbnail}>
                  <Text style={styles.recentScanThumbnailText}>{scan.image}</Text>
                </View>
                <View style={styles.recentScanInfo}>
                  <View style={styles.recentScanHeader}>
                    <Text style={[styles.recentScanPlant, { color: isDark ? "#fff" : "#1c4a22" }]}>{scan.plant}</Text>
                    <Text style={[styles.recentScanDate, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{scan.date}</Text>
                  </View>
                  <Text style={[styles.recentScanIssue, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>{scan.issue}</Text>
                  <View style={styles.recentScanFooter}>
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.confidenceText}>{scan.confidence}%</Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: scan.status === "Treating" ? "#FF980020" : "#4CAF5020" },
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: scan.status === "Treating" ? "#FF9800" : "#4CAF50" },
                      ]}>{scan.status}</Text>
                    </View>
                  </View>
                </View>
                <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Common Issues Library */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Common Issues Library</Text>
        <View style={styles.issuesGrid}>
          {commonIssues.map((issue) => (
            <Link key={issue.id} href={`/modals/issue-detail/${issue.id}`} asChild>
              <Pressable style={[
                styles.issueCard,
                { borderColor: issue.color },
              ]}>
                <View style={[
                  styles.issueIcon,
                  { backgroundColor: issue.color + "20" },
                ]}>
                  <Image
                    source={{ uri: `sf:${issue.icon}` }}
                    style={[styles.issueIconImage, { tintColor: issue.color }]}
                  />
                </View>
                <Text style={[styles.issueName, { color: isDark ? "#fff" : "#1c4a22" }]}>{issue.name}</Text>
                <Text style={[styles.issueSymptoms, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{issue.symptoms}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Pro Tip */}
      <View style={styles.proTip}>
        <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.proTipIcon, { tintColor: "#FFD700" }]} />
        <View>
          <Text style={styles.proTipTitle}>Pro Tip</Text>
          <Text style={styles.proTipText}>
            For best results, photograph leaves in natural daylight against a neutral background. Capture both top and bottom surfaces.
          </Text>
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
  scanSection: {
    gap: 16,
  },
  scanButton: {
    padding: 32,
    borderRadius: 20,
    backgroundColor: "#1c4a22",
    alignItems: "center",
    gap: 16,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  scanButtonIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonIconImage: {
    width: 36,
    height: 36,
    tintColor: "#4CAF50",
  },
  scanButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  scanButtonSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  scanningCard: {
    padding: 32,
    borderRadius: 20,
    backgroundColor: "#1c4a22",
    alignItems: "center",
    gap: 16,
  },
  scanProgressRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  scanProgressText: {
    fontSize: 24,
    fontWeight: "700",
  },
  scanningText: {
    fontSize: 18,
    fontWeight: "500",
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 8,
  },
  quickActionBtnIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionBtnIconImage: {
    width: 22,
    height: 22,
  },
  quickActionBtnLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1c4a22",
    textAlign: "center",
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  seeAllLink: {
    paddingHorizontal: 8,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
  },
  recentScansList: {
    gap: 12,
  },
  recentScanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  recentScanThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  recentScanThumbnailText: {
    fontSize: 24,
  },
  recentScanInfo: {
    flex: 1,
    gap: 6,
  },
  recentScanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentScanPlant: {
    fontSize: 16,
    fontWeight: "600",
  },
  recentScanDate: {
    fontSize: 12,
  },
  recentScanIssue: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentScanFooter: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#4CAF5020",
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  issuesGrid: {
    gap: 12,
  },
  issueCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 10,
  },
  issueIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  issueIconImage: {
    width: 24,
    height: 24,
  },
  issueName: {
    fontSize: 16,
    fontWeight: "600",
  },
  issueSymptoms: {
    fontSize: 13,
    lineHeight: 18,
  },
  proTip: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1c4a22",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  proTipIcon: {
    width: 28,
    height: 28,
    marginTop: 2,
  },
  proTipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFD700",
  },
  proTipText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 20,
    marginTop: 2,
  },
});