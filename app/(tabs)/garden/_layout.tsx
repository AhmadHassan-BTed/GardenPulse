import { Stack } from "expo-router";
import { useTheme } from "../../../components/layout/ThemeProvider";

export default function GardenLayout() {
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
      <Stack.Screen name="index" options={{ title: "My Garden" }} />
      <Stack.Screen name="plant/[id]" options={{ headerLargeTitle: false }} />
      <Stack.Screen name="reels" options={{ title: "Progress Reels" }} />
    </Stack>
  );
}