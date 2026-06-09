import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerLargeTitle: true,
        headerBlurEffect: "none",
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: "#1c4a22" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Community" }} />
      <Stack.Screen name="cluster/[id]" options={{ headerLargeTitle: false }} />
      <Stack.Screen name="local-map" options={{ title: "Local Grow Map" }} />
    </Stack>
  );
}