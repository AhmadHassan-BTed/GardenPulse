import { Stack } from "expo-router";

export default function ToolsLayout() {
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
      <Stack.Screen name="index" options={{ title: "Tools" }} />
      <Stack.Screen name="nutrient-calculator" options={{ title: "Nutrient Calculator" }} />
      <Stack.Screen name="leaf-diagnostics" options={{ title: "Leaf Diagnostics" }} />
      <Stack.Screen name="smart-scheduler" options={{ title: "Smart Scheduler" }} />
    </Stack>
  );
}