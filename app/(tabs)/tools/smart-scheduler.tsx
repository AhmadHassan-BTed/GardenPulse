import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList, Switch } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const todayTasks = [
  { id: "1", plant: "Monstera", type: "watering", time: "8:00 AM", done: false, icon: "drop.fill", color: "#4CAF50" },
  { id: "2", plant: "Snake Plant", type: "check", time: "12:00 PM", done: true, icon: "eye.fill", color: "#2196F3" },
  { id: "3", plant: "Tomatoes", type: "fertilize", time: "4:00 PM", done: false, icon: "leaf.fill", color: "#8BC34A" },
  { id: "4", plant: "Ferns", type: "mist", time: "6:00 PM", done: false, icon: "cloud.fill", color: "#9C27B0" },
];

const upcomingTasks = [
  { id: "5", plant: "Pothos", type: "watering", time: "Tomorrow 8:00 AM", done: false, icon: "drop.fill", color: "#4CAF50" },
  { id: "6", plant: "All Plants", type: "rotate", time: "Tomorrow 10:00 AM", done: false, icon: "rotate.right.fill", color: "#FF9800" },
  { id: "7", plant: "Herbs", type: "harvest", time: "Tomorrow 5:00 PM", done: false, icon: "scissors", color: "#4CAF50" },
  { id: "8", plant: "Monstera", type: "fertilize", time: "Jun 7, 8:00 AM", done: false, icon: "leaf.fill", color: "#8BC34A" },
  { id: "9", plant: "Succulents", type: "watering", time: "Jun 8, 9:00 AM", done: false, icon: "drop.fill", color: "#4CAF50" },
];

const schedules = [
  { 
    id: "monstera", 
    plant: "Monstera", 
    type: "Indoor", 
    frequency: "Every 7 days", 
    nextDue: "In 5 days",
    notifications: true,
    tasks: ["Water", "Mist leaves", "Check soil", "Rotate"],
  },
  { 
    id: "snake", 
    plant: "Snake Plant", 
    type: "Indoor", 
    frequency: "Every 14 days", 
    nextDue: "In 2 days",
    notifications: true,
    tasks: ["Water", "Dust leaves"],
  },
  { 
    id: "pothos", 
    plant: "Pothos", 
    type: "Indoor", 
    frequency: "Every 5 days", 
    nextDue: "Tomorrow",
    notifications: false,
    tasks: ["Water", "Check for pests"],
  },
  { 
    id: "tomatoes", 
    plant: "Tomatoes", 
    type: "Vegetable", 
    frequency: "Every 3 days", 
    nextDue: "Today",
    notifications: true,
    tasks: ["Water", "Fertilize", "Prune", "Check support"],
  },
];

export default function SmartSchedulerScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedTab, setSelectedTab] = useState("today");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const tabs = [
    { id: "today", label: "Today", count: todayTasks.filter(t => !t.done).length },
    { id: "upcoming", label: "Upcoming", count: upcomingTasks.length },
    { id: "schedules", label: "Schedules", count: schedules.length },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} />
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Smart Scheduler</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Automated care reminders tailored to your plants
        </Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[
              styles.tabButton,
              { backgroundColor: selectedTab === tab.id ? "#4CAF50" : isDark ? "#2a2a2a" : "#fff", borderColor: selectedTab === tab.id ? "#4CAF50" : "#E0E0E0" },
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[
              styles.tabButtonText,
              { color: selectedTab === tab.id ? "#fff" : isDark ? "#fff" : "#1c4a22" },
            ]}>
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={[
                styles.tabBadge,
                { backgroundColor: selectedTab === tab.id ? "rgba(255,255,255,0.3)" : "#4CAF50" },
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  { color: selectedTab === tab.id ? "#fff" : "#fff" },
                ]}>{tab.count}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Today Tab */}
      {selectedTab === "today" && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Today's Tasks</Text>
            <Text style={[styles.taskSummary, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
              {todayTasks.filter(t => t.done).length} of {todayTasks.length} done
            </Text>
          </View>
          <View style={styles.taskList}>
            {todayTasks.map((task) => (
              <Pressable key={task.id} style={styles.taskItem} onPress={() => router.push(`/modals/quick-log?task=${task.id}`)}>
                <View style={[
                  styles.taskCheckbox,
                  { backgroundColor: task.done ? task.color : "transparent", borderColor: task.done ? task.color : "#E0E0E0" },
                ]}
                  onPress={() => {}}
                >
                  {task.done && <Image source={{ uri: "sf:checkmark" }} style={styles.checkmark} />}
                </View>
                <View style={[
                  styles.taskIcon,
                  { backgroundColor: task.color + "20" },
                ]}>
                  <Image
                    source={{ uri: `sf:${task.icon}` }}
                    style={[styles.taskIconImage, { tintColor: task.color }]}
                  />
                </View>
                <View style={styles.taskContent}>
                  <View style={styles.taskHeader}>
                    <Text style={[styles.taskPlant, { color: isDark ? "#fff" : "#1c4a22" }]}>{task.plant}</Text>
                    <Text style={[styles.taskTime, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>{task.time}</Text>
                  </View>
                  <Text style={[styles.taskType, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)", textDecorationLine: task.done ? "line-through" : "none" }]}>
                    {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
          {todayTasks.every(t => t.done) && (
            <View style={styles.completeBanner}>
              <Image source={{ uri: "sf:party.popper.fill" }} style={styles.completeIcon} />
              <Text style={styles.completeText}>All tasks complete! 🎉</Text>
            </View>
          )}
        </View>
      )}

      {/* Upcoming Tab */}
      {selectedTab === "upcoming" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Upcoming Tasks</Text>
          <FlatList
            data={upcomingTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.upcomingItem} onPress={() => router.push(`/modals/quick-log?task=${item.id}`)}>
                <View style={[
                  styles.upcomingIcon,
                  { backgroundColor: item.color + "20" },
                ]}>
                  <Image
                    source={{ uri: `sf:${item.icon}` }}
                    style={[styles.upcomingIconImage, { tintColor: item.color }]}
                  />
                </View>
                <View style={styles.upcomingContent}>
                  <View style={styles.upcomingHeader}>
                    <Text style={[styles.upcomingPlant, { color: isDark ? "#fff" : "#1c4a22" }]}>{item.plant}</Text>
                    <Text style={[styles.upcomingTime, { color: item.color, fontWeight: "600" }]}>{item.time}</Text>
                  </View>
                  <Text style={[styles.upcomingType, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Text>
                </View>
                <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}

      {/* Schedules Tab */}
      {selectedTab === "schedules" && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Schedules</Text>
            <Link href="/modals/add-schedule" asChild>
              <Pressable style={styles.addScheduleBtn}>
                <Image source={{ uri: "sf:plus" }} style={styles.addScheduleIcon} />
                <Text style={styles.addScheduleText}>Add Schedule</Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.schedulesList}>
            {schedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleCard}>
                <View style={styles.scheduleHeader}>
                  <View style={styles.schedulePlantInfo}>
                    <Text style={[styles.schedulePlant, { color: isDark ? "#fff" : "#1c4a22" }]}>{schedule.plant}</Text>
                    <Text style={[styles.scheduleType, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{schedule.type}</Text>
                  </View>
                  <Switch
                    value={schedule.notifications}
                    onValueChange={(value) => {}}
                    thumbColor={schedule.notifications ? "#4CAF50" : "#9E9E9E"}
                    trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
                  />
                </View>
                <View style={styles.scheduleMeta}>
                  <View style={styles.scheduleMetaItem}>
                    <Image source={{ uri: "sf:repeat" }} style={styles.metaIcon} />
                    <Text style={[styles.metaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>{schedule.frequency}</Text>
                  </View>
                  <View style={styles.scheduleMetaItem}>
                    <Image source={{ uri: "sf:calendar.badge.clock" }} style={styles.metaIcon} />
                    <Text style={[styles.metaText, { color: "#FF9800", fontWeight: "600" }]}>Next: {schedule.nextDue}</Text>
                  </View>
                </View>
                <View style={styles.scheduleTasks}>
                  {schedule.tasks.map((task, index) => (
                    <View key={index} style={styles.taskTag}>
                      <Text style={styles.taskTagText}>{task}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.scheduleActions}>
                  <Link href={`/modals/edit-schedule/${schedule.id}`} asChild>
                    <Pressable style={styles.scheduleActionBtn}>
                      <Text style={styles.scheduleActionText}>Edit</Text>
                    </Pressable>
                  </Link>
                  <Link href={`/modals/schedule-history/${schedule.id}`} asChild>
                    <Pressable style={styles.scheduleActionBtn}>
                      <Text style={styles.scheduleActionText}>History</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Notification Settings</Text>
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
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Receive care reminders</Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => router.push("/modals/notification-prefs")}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#2196F320" },
            ]}>
              <Image source={{ uri: "sf:cloud.sun.fill" }} style={[styles.settingIconImage, { tintColor: "#2196F3" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Weather-Aware</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Adjust for rain & heat</Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#FF980020" },
            ]}>
              <Image source={{ uri: "sf:moon.fill" }} style={[styles.settingIconImage, { tintColor: "#FF9800" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Quiet Hours</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>10 PM - 7 AM</Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => router.push("/modals/notification-prefs")}
              thumbColor="#4CAF50"
              trackColor={{ false: "#E0E0E0", true: "#4CAF5080" }}
            />
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={[
              styles.settingIcon,
              { backgroundColor: "#9C27B020" },
            ]}>
              <Image source={{ uri: "sf:calendar" }} style={[styles.settingIconImage, { tintColor: "#9C27B0" }]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Calendar Sync</Text>
              <Text style={[styles.settingDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Apple/Google Calendar</Text>
            </View>
            <Pressable style={styles.syncButton}>
              <Text style={styles.syncButtonText}>Connect</Text>
            </Pressable>
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
  // NOTE: tabBar.backgroundColor is intentionally static here.
  // `isDark` is only available inside the component body; using it in the
  // module-level StyleSheet.create() would throw "isDark is not defined"
  // at import time. If you need a dynamic background, use an inline style
  // at the call site instead.
  tabBar: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F0F0F0",
    padding: 4,
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: "700",
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
  taskSummary: {
    fontSize: 14,
    fontWeight: "500",
  },
  taskList: {
    gap: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  taskCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 16,
    height: 16,
    tintColor: "#fff",
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskIconImage: {
    width: 20,
    height: 20,
  },
  taskContent: {
    flex: 1,
    gap: 2,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskPlant: {
    fontSize: 16,
    fontWeight: "600",
  },
  taskTime: {
    fontSize: 13,
  },
  taskType: {
    fontSize: 14,
  },
  completeBanner: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
    gap: 8,
  },
  completeIcon: {
    width: 28,
    height: 28,
    tintColor: "#4CAF50",
  },
  completeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  upcomingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  upcomingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  upcomingIconImage: {
    width: 22,
    height: 22,
  },
  upcomingContent: {
    flex: 1,
    gap: 2,
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upcomingPlant: {
    fontSize: 16,
    fontWeight: "600",
  },
  upcomingTime: {
    fontSize: 13,
  },
  upcomingType: {
    fontSize: 14,
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  listContent: {
    gap: 0,
  },
  schedulesList: {
    gap: 12,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  schedulePlantInfo: {
    gap: 2,
  },
  schedulePlant: {
    fontSize: 18,
    fontWeight: "600",
  },
  scheduleType: {
    fontSize: 13,
  },
  scheduleMeta: {
    flexDirection: "row",
    gap: 16,
  },
  scheduleMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: {
    width: 16,
    height: 16,
    tintColor: "#9E9E9E",
  },
  metaText: {
    fontSize: 13,
  },
  scheduleTasks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  taskTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  taskTagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#1c4a22",
  },
  scheduleActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  scheduleActionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  scheduleActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1c4a22",
  },
  addScheduleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  addScheduleIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  addScheduleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
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
  syncButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#9C27B020",
    borderWidth: 1,
    borderColor: "#9C27B0",
  },
  syncButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9C27B0",
  },
});