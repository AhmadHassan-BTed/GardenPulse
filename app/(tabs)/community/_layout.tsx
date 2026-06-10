import { Stack } from "expo-router";
import { useTheme } from "../../../components/layout/ThemeProvider";

export default function CommunityLayout() {
  const theme = useTheme();
  const { Colors } = theme;

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerLargeTitle: true,
        headerBlurEffect: "none",
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: Colors.text.heading },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Community" }} />
      <Stack.Screen name="cluster/[id]" options={{ headerLargeTitle: false }} />
      <Stack.Screen name="local-map" options={{ title: "Local Grow Map" }} />
    </Stack>
  );
}