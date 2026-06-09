import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList, Switch } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

const myContent = [
  { id: "1", title: "Monstera Care Guide", type: "Guide", views: 1234, likes: 89, status: "Published", date: "Jun 1", image: "🌿" },
  { id: "2", title: "Hydroponic Setup Tutorial", type: "Video", views: 567, likes: 45, status: "Draft", date: "May 28", image: "💧" },
  { id: "3", title: "Propagation Station Tour", type: "Reel", views: 2341, likes: 234, status: "Published", date: "May 20", image: "🌱" },
  { id: "4", title: "Nutrient Calculator Walkthrough", type: "Guide", views: 892, likes: 67, status: "Review", date: "May 15", image: "🧪" },
];

const templates = [
  { id: "care-guide", name: "Care Guide", icon: "doc.text.fill", color: "#4CAF50", description: "Step-by-step plant care" },
  { id: "video-tutorial", name: "Video Tutorial", icon: "video.fill", color: "#2196F3", description: "Record & share tutorials" },
  { id: "progress-reel", name: "Progress Reel", icon: "film.fill", color: "#FF9800", description: "Time-lapse growth videos" },
  { id: "tip-article", name: "Tip Article", icon: "lightbulb.fill", color: "#FFD700", description: "Quick growing tips" },
];

export default function CreatorStudioScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  const totalViews = myContent.reduce((sum, c) => sum + c.views, 0);
  const totalLikes = myContent.reduce((sum, c) => sum + c.likes, 0);
  const publishedCount = myContent.filter(c => c.status === "Published").length;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Creator Studio</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Create & share growing knowledge
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#1c4a22" }]}>{publishedCount}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Published</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#4CAF50" }]}>{totalViews.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Views</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#FFD700" }]}>{totalLikes}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Likes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#2196F3" }]}>{myContent.length}</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Total Content</Text>
        </View>
      </View>

      {/* Create New */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Create New</Text>
        </View>
        <View style={styles.templatesGrid}>
          {templates.map((template) => (
            <Link key={template.id} href={`/modals/create-content/${template.id}`} asChild>
              <Pressable style={[
                styles.templateCard,
                { borderColor: template.color },
              ]}>
                <View style={[
                  styles.templateIcon,
                  { backgroundColor: template.color + "20" },
                ]}>
                  <Image
                    source={{ uri: `sf:${template.icon}` }}
                    style={[styles.templateIconImage, { tintColor: template.color }]}
                  />
                </View>
                <Text style={[styles.templateName, { color: isDark ? "#fff" : "#1c4a22" }]}>{template.name}</Text>
                <Text style={[styles.templateDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{template.description}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* My Content */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>My Content</Text>
          <Link href="/modals/all-content" asChild>
            <Pressable style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </Link>
        </View>
        <FlatList
          data={myContent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.contentCard}>
              <View style={styles.contentHeader}>
                <View style={styles.contentAvatar}>
                  <Text style={styles.contentAvatarText}>{item.image}</Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={[styles.contentTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.title}</Text>
                  <View style={styles.contentMeta}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: 
                        item.status === "Published" ? "#4CAF5020" : 
                        item.status === "Draft" ? "#9E9E9E20" : 
                        "#FF980020" },
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: 
                          item.status === "Published" ? "#4CAF50" : 
                          item.status === "Draft" ? "#9E9E9E" : 
                          "#FF9800" },
                      ]}>{item.status}</Text>
                    </View>
                    <Text style={[styles.contentType, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{item.type}</Text>
                    <Text style={[styles.contentDate, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.contentStats}>
                <View style={styles.statItem}>
                  <Image source={{ uri: "sf:eye.fill" }} style={styles.statIcon} />
                  <Text style={styles.statText}>{item.views.toLocaleString()}</Text>
                </View>
                <View style={styles.statItem}>
                  <Image source={{ uri: "sf:heart.fill" }} style={[styles.statIcon, { tintColor: "#F44336" }]} />
                  <Text style={[styles.statText, { color: "#F44336" }]}>{item.likes}</Text>
                </View>
              </View>
              <View style={styles.contentActions}>
                <Link href={`/modals/edit-content/${item.id}`} asChild>
                  <Pressable style={styles.contentActionBtn}>
                    <Text style={styles.contentActionText}>Edit</Text>
                  </Pressable>
                </Link>
                <Pressable style={styles.contentActionBtn}>
                  <Text style={styles.contentActionText}>Share</Text>
                </Pressable>
                <Pressable style={styles.contentActionBtn}>
                  <Text style={[styles.contentActionText, { color: "#F44336" }]}>Delete</Text>
                </Pressable>
              </View>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Creator Settings</Text>
        <View style={styles.settingsList}>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#4CAF5020" },
            ]}>
              <Image source={{ uri: "sf:bell.fill" }} style={[styles.settingIconImage, { tintColor: "#4CAF50" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Notifications</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>New comments & likes</Text>
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
              { backgroundColor: "#2196F320" },
            ]}>
              <Image source={{ uri: "sf:arrow.clockwise" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Auto-save Drafts</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Save every 30 seconds</Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#9C27B020" },
            ]}>
              <Image source={{ uri: "sf:person.fill" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Public Profile</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Show your content publicly</Text>
            </View>
            <Switch
              value={publicProfile}
              onValueChange={setPublicProfile}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
        </View>
      </View>

      {/* Monetization */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Monetization</Text>
        <View style={styles.monetizationCard}>
          <View style={styles.monetizationContent}>
            <View style={[
              styles.monetizationIcon,
              { backgroundColor: "#FFD70020" },
            ]}>
              <Image source={{ uri: "sf:dollarsign.circle.fill" }} style={[styles.monetizationIconImage, { tintColor: "#FFD700" }]} />
            </View>
            <View>
              <Text style={[styles.monetizationTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Creator Fund</Text>
              <Text style={[styles.monetizationDesc, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>Earn from your content. Join the Creator Fund to get paid for views and engagement.</Text>
            </View>
          </View>
          <Pressable style={styles.monetizationBtn}>
            <Text style={styles.monetizationBtnText}>Learn More</Text>
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
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
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
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  templateCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 10,
  },
  templateIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  templateIconImage: {
    width: 26,
    height: 26,
  },
  templateName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  templateDesc: {
    fontSize: 11,
    textAlign: "center",
  },
  contentCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 12,
  },
  contentHeader: {
    flexDirection: "row",
    gap: 12,
  },
  contentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1c4a22",
    justifyContent: "center",
    alignItems: "center",
  },
  contentAvatarText: {
    fontSize: 20,
  },
  contentInfo: {
    flex: 1,
    gap: 6,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentMeta: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  contentType: {
    fontSize: 11,
    fontWeight: "500",
  },
  contentDate: {
    fontSize: 11,
  },
  contentStats: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statIcon: {
    width: 16,
    height: 16,
    tintColor: "#9E9E9E",
  },
  statText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  contentActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  contentActionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  contentActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1c4a22",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  listContent: {
    paddingBottom: 20,
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
  monetizationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1c4a22",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  monetizationContent: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
  },
  monetizationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  monetizationIconImage: {
    width: 24,
    height: 24,
  },
  monetizationTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  monetizationDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  monetizationBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#FFD700",
  },
  monetizationBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c4a22",
  },
});