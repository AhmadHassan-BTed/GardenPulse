import { Stack } from "expo-router";
import { useTheme } from "../../../components/layout/ThemeProvider";

export default function ToolsLayout() {
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
      <Stack.Screen name="index" options={{ title: "Tools" }} />
      <Stack.Screen name="nutrient-calculator" options={{ title: "Nutrient Calculator" }} />
      <Stack.Screen name="leaf-diagnostics" options={{ title: "Leaf Diagnostics" }} />
      <Stack.Screen name="smart-scheduler" options={{ title: "Smart Scheduler" }} />
    </Stack>
  );
}