import { View, Text, StyleSheet, ScrollView, Pressable, Image, Switch } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [haptics, setHaptics] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Customize your GardenPulse experience
        </Text>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Account</Text>
        <View style={styles.settingsList}>
          <Link href="/modals/edit-profile" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#4CAF5020" },
              ]}>
                <Image source={{ uri: "sf:person.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Edit Profile</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Name, bio, avatar, location</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/connected-accounts" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#2196F320" },
              ]}>
                <Image source={{ uri: "sf:link" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Connected Accounts</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Apple, Google, Facebook</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/change-password" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#FF980020" },
              ]}>
                <Image source={{ uri: "sf:lock.fill" }} style={[styles.settingIconImage, { tintColor: "#FF9800" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Change Password</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Update your password</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/delete-account" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#F4433620" },
              ]}>
                <Image source={{ uri: "sf:trash" }} style={[styles.settingIconImage, { tintColor: "#F44336" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Delete Account</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Permanently remove your data</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Preferences</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#4CAF5020" },
            ]}>
              <Image source={{ uri: "sf:bell.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Push Notifications</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Care reminders & updates</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#9C27B020" },
            ]}>
              <Image source={{ uri: "sf:moon.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Dark Mode</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>System / Light / Dark</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#2196F320" },
            ]}>
              <Image source={{ uri: "sf:arrow.clockwise" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Auto Sync</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Sync data automatically</Text>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#FF980020" },
            ]}>
              <Image source={{ uri: "sf:chart.bar.fill" }} style={[styles.settingIconImage, { tintColor: "#FF9800" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Data Saver</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Reduce data usage</Text>
            </View>
            <Switch
              value={dataSaver}
              onValueChange={setDataSaver}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#79554820" },
            ]}>
              <Image source={{ uri: "sf:iphone.gen3.radiowaves.left.right" }} style={[styles.settingIconImage, { tintColor: "#795548" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Haptic Feedback</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Vibration on interactions</Text>
            </View>
            <Switch
              value={haptics}
              onValueChange={setHaptics}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>App</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#607D8B20" },
            ]}>
              <Image source={{ uri: "sf:chart.bar.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Analytics</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Help improve the app</Text>
            </View>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Link href="/modals/notification-prefs" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#4CAF5020" },
              ]}>
                <Image source={{ uri: "sf:bell.badge.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Notification Preferences</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Customize what you receive</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/units" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#FF572220" },
              ]}>
                <Image source={{ uri: "sf:ruler.fill" }} style={[styles.settingIconImage, { tintColor: "#FF5722" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Units & Region</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Metric/Imperial, Language</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/backup-restore" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#8BC34A20" },
              ]}>
                <Image source={{ uri: "sf:icloud.fill" }} style={[styles.settingIconImage, { tintColor: "#8BC34A" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Backup & Restore</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>iCloud / Google Drive</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Support</Text>
        <View style={styles.settingsList}>
          <Link href="/modals/help-center" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#4CAF5020" },
              ]}>
                <Image source={{ uri: "sf:questionmark.circle.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Help Center</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>FAQs & guides</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/contact-support" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#2196F320" },
              ]}>
                <Image source={{ uri: "sf:envelope.fill" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Contact Support</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Email or in-app chat</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/feedback" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#9C27B020" },
              ]}>
                <Image source={{ uri: "sf:bubble.left.and.bubble.right.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Send Feedback</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Feature requests & bugs</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/rate-app" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#FFD70020" },
              ]}>
                <Image source={{ uri: "sf:star.fill" }} style={[styles.settingIconImage, { tintColor: "#FFD700" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Rate GardenPulse</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Share your experience</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Legal</Text>
        <View style={styles.settingsList}>
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
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Read our terms</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
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
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>How we use your data</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
          <Link href="/modals/licenses" asChild>
            <Pressable style={styles.settingItem}>
              <View style={[
                styles.settingIcon,
                { backgroundColor: "#607D8B20" },
              ]}>
                <Image source={{ uri: "sf:list.bullet.rectangle.fill" }} style={[styles.settingIconImage, { tintColor: "#607D8B" }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Open Source Licenses</Text>
                <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Third-party libraries</Text>
              </View>
              <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Version */}
      <View style={styles.version}>
        <Text style={[styles.versionText, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>GardenPulse v1.0.0 (Build 1)</Text>
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
  version: {
    padding: 20,
    alignItems: "center",
  },
  versionText: {
    fontSize: 13,
  },
});
