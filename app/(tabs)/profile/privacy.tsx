import { View, Text, StyleSheet, ScrollView, Pressable, Image, Switch } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

export default function PrivacyScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [communityVisibility, setCommunityVisibility] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Privacy Dashboard</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Control your data and privacy settings
        </Text>
      </View>

      {/* Data Collection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Data Collection</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#4CAF5020" },
            ]}>
              <Image source={{ uri: "sf:chart.bar.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Analytics & Usage</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Help improve the app</Text>
            </View>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#FF980020" },
            ]}>
              <Image source={{ uri: "sf:exclamationmark.triangle.fill" }} style={[styles.settingIconImage, { tintColor: "#FF9800" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Crash Reports</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Automatically send crash data</Text>
            </View>
            <Switch
              value={crashReports}
              onValueChange={setCrashReports}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
        </View>
      </View>

      {/* Advertising */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Advertising</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#9C27B020" },
            ]}>
              <Image source={{ uri: "sf:megaphone.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Personalized Ads</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Show relevant advertisements</Text>
            </View>
            <Switch
              value={personalizedAds}
              onValueChange={setPersonalizedAds}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Link href="/modals/ad-preferences" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#9C27B020" },
              ]}>
                <Image source={{ uri: "sf:slider.horizontal.3" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Ad Preferences</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Manage ad topics</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Location & Sharing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Location & Sharing</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#2196F320" },
            ]}>
              <Image source={{ uri: "sf:location.fill" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Location Sharing</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Share location with community</Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#9C27B020" },
            ]}>
              <Image source={{ uri: "sf:person.3.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Community Visibility</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Show profile in clusters</Text>
            </View>
            <Switch
              value={communityVisibility}
              onValueChange={setCommunityVisibility}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
        </View>
      </View>

      {/* Data Rights */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Your Data Rights</Text>
        <View style={styles.settingsList}>
          <Link href="/modals/export-data" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#4CAF5020" },
              ]}>
                <Image source={{ uri: "sf:square.and.arrow.up.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Export My Data</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Download all your data</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/delete-data" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#F4433620" },
              ]}>
                <Image source={{ uri: "sf:trash.fill" }} style={[styles.settingIconImage, { tintColor: "#F44336" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Delete My Data</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Request data deletion</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/data-retention" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#607D8B20" },
              ]}>
                <Image source={{ uri: "sf:clock.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Data Retention</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>How long we keep data</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Permissions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>App Permissions</Text>
        <View style={styles.settingsList}>
          <Link href="/modals/permission" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#4CAF5020" },
              ]}>
                <Image source={{ uri: "sf:camera.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Camera</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Required for diagnostics</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/permission" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#2196F320" },
              ]}>
                <Image source={{ uri: "sf:location.fill" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Location</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>For local grow map</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/permission" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#FF980020" },
              ]}>
                <Image source={{ uri: "sf:mic.fill" }} style={[styles.settingIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Microphone</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Voice notes for logs</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/permission" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#9C27B020" },
              ]}>
                <Image source={{ uri: "sf:bell.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Notifications</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Care reminders</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/permission" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#607D8B20" },
              ]}>
                <Image source={{ uri: "sf:photo.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Photos</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Progress reels & avatar</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Legal Links */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Legal</Text>
        <View style={styles.settingsList}>
          <Link href="/modals/privacy-policy" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#607D8B20" },
              ]}>
                <Image source={{ uri: "sf:hand.raised.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Privacy Policy</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Full privacy policy</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/terms" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#607D8B20" },
              ]}>
                <Image source={{ uri: "sf:doc.text.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Terms of Service</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Terms and conditions</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
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
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  settingsList: {
    gap: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingIconImage: {
    width: 20,
    height: 20,
  },
  settingContent: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingDesc: {
    fontSize: 13,
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
});
