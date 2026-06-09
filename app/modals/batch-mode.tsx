import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

export default function BatchModeSheet() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1a1a1a" : "#F5F5F5" }]}>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Batch Mode</Text>
      <Text style={[styles.placeholder, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
        Batch care logging for multiple plants
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 16,
    textAlign: "center",
  },
});