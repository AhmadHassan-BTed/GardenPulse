import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "formSheet",
        sheetGrabberVisible: true,
        sheetAllowedDetents: [0.5, 0.9],
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="quick-log" options={{ title: "Quick Log" }} />
      <Stack.Screen name="add-plant" options={{ title: "Add Plant" }} />
      <Stack.Screen name="qr-scanner" options={{ presentation: "modal", title: "QR Scanner" }} />
      <Stack.Screen name="permission" options={{ presentation: "modal", title: "Permissions" }} />
      <Stack.Screen name="rewarded-video" options={{ presentation: "modal", title: "Rewarded Video" }} />
      <Stack.Screen name="interstitial-ad" options={{ presentation: "modal", title: "Advertisement" }} />
      <Stack.Screen name="supporter-badge" options={{ presentation: "modal", title: "Supporter" }} />
      <Stack.Screen name="batch-mode" options={{ title: "Batch Mode" }} />
      <Stack.Screen name="tips" options={{ title: "Tips Library" }} />
      <Stack.Screen name="notification-prefs" options={{ title: "Notification Preferences" }} />
      <Stack.Screen name="bloom-report" options={{ title: "Weekly Bloom Report" }} />
      <Stack.Screen name="export-share" options={{ title: "Export & Share" }} />
    </Stack>
  );
}