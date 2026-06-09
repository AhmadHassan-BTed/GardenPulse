import { Redirect } from "expo-router";

// TODO: Replace with actual first-launch detection logic (e.g. AsyncStorage)
// For now, always redirect to onboarding flow
export default function RootIndex() {
  // TODO: Check AsyncStorage for "hasCompletedOnboarding"
  // If true: redirect to "/(tabs)"
  // If false/null: redirect to "/(onboarding)"
  // For previewing components in the browser, change this to:
  //   return <Redirect href="/showcase" />;
  return <Redirect href="/(onboarding)" />;
}
