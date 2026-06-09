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
      <Stack.Screen name="tip/[id]" options={{ title: "Tip Article" }} />
      <Stack.Screen name="notification-prefs" options={{ title: "Notification Preferences" }} />
      <Stack.Screen name="bloom-report" options={{ title: "Weekly Bloom Report" }} />
      <Stack.Screen name="export-share" options={{ title: "Export & Share" }} />
      <Stack.Screen name="scan-history" options={{ title: "Scan History" }} />
      <Stack.Screen name="scan-result/[id]" options={{ title: "Scan Result" }} />
      <Stack.Screen name="issue-detail/[id]" options={{ title: "Issue Details" }} />
      <Stack.Screen name="challenge/[id]" options={{ title: "Challenge" }} />
      <Stack.Screen name="create-cluster" options={{ title: "Create Cluster" }} />
      <Stack.Screen name="create-post" options={{ title: "Create Post" }} />
      <Stack.Screen name="cluster/[id]" options={{ title: "Cluster Detail" }} />
      <Stack.Screen name="message/[id]" options={{ title: "Message" }} />
      <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
      <Stack.Screen name="add-memorial" options={{ title: "Add Memorial" }} />
      <Stack.Screen name="reel/[id]" options={{ title: "Progress Reel" }} />
      <Stack.Screen name="create-content/[id]" options={{ title: "Create Content" }} />
      <Stack.Screen name="edit-content/[id]" options={{ title: "Edit Content" }} />
      <Stack.Screen name="all-content" options={{ title: "All Content" }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
      <Stack.Screen name="connected-accounts" options={{ title: "Connected Accounts" }} />
      <Stack.Screen name="change-password" options={{ title: "Change Password" }} />
      <Stack.Screen name="delete-account" options={{ title: "Delete Account" }} />
      <Stack.Screen name="units" options={{ title: "Units & Region" }} />
      <Stack.Screen name="backup-restore" options={{ title: "Backup & Restore" }} />
      <Stack.Screen name="help-center" options={{ title: "Help Center" }} />
      <Stack.Screen name="contact-support" options={{ title: "Contact Support" }} />
      <Stack.Screen name="feedback" options={{ title: "Send Feedback" }} />
      <Stack.Screen name="rate-app" options={{ title: "Rate GardenPulse" }} />
      <Stack.Screen name="terms" options={{ title: "Terms of Service" }} />
      <Stack.Screen name="privacy-policy" options={{ title: "Privacy Policy" }} />
      <Stack.Screen name="licenses" options={{ title: "Open Source Licenses" }} />
      <Stack.Screen name="ad-preferences" options={{ title: "Ad Preferences" }} />
      <Stack.Screen name="export-data" options={{ title: "Export Data" }} />
      <Stack.Screen name="delete-data" options={{ title: "Delete Data" }} />
      <Stack.Screen name="data-retention" options={{ title: "Data Retention" }} />
      <Stack.Screen name="all-badges" options={{ title: "All Badges" }} />
      <Stack.Screen name="activity-history" options={{ title: "Activity History" }} />
    </Stack>
  );
}