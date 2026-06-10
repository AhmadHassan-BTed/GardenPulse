import { Stack } from "expo-router";
import { useTheme } from "../../../components/layout/ThemeProvider";

export default function ProfileLayout() {
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
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Dashboard" }} />
      <Stack.Screen name="cemetery" options={{ title: "Cemetery Log" }} />
      <Stack.Screen name="creator-studio" options={{ title: "Creator Studio" }} />
      <Stack.Screen name="reels" options={{ title: "Progress Reels" }} />
    </Stack>
  );
}