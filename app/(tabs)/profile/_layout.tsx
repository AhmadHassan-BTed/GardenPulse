import { Stack } from "expo-router";

export default function ProfileLayout() {
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
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Dashboard" }} />
      <Stack.Screen name="cemetery" options={{ title: "Cemetery Log" }} />
      <Stack.Screen name="creator-studio" options={{ title: "Creator Studio" }} />
      <Stack.Screen name="reels" options={{ title: "Progress Reels" }} />
    </Stack>
  );
}