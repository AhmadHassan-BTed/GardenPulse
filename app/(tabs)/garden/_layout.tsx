import { Stack } from "expo-router";

export default function GardenLayout() {
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
      <Stack.Screen name="index" options={{ title: "My Garden" }} />
      <Stack.Screen name="plant/[id]" options={{ headerLargeTitle: false }} />
      <Stack.Screen name="reels" options={{ title: "Progress Reels" }} />
    </Stack>
  );
}