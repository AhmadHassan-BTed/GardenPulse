import { View, Text, StyleSheet } from "react-native"; import { useColorScheme } from "react-native";
export default function AddScheduleSheet() { const isDark = useColorScheme() === "dark";
  return (<View style={[styles.container, { backgroundColor: isDark ? "#1a1a1a" : "#F5F5F5" }]}><Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Add Schedule</Text><Text style={styles.placeholder}>Create a new care schedule</Text></View>);
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }, title: { fontSize: 24, fontWeight: "700", marginBottom: 8 }, placeholder: { fontSize: 16, textAlign: "center", color: "#9E9E9E" } });