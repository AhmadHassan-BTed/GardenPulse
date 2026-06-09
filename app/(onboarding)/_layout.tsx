import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="welcome" options={{ title: "Get Started" }} />
      <Stack.Screen name="add-plant" options={{ title: "Add Plant" }} />
      <Stack.Screen name="care-plan" options={{ title: "Care Plan" }} />
    </Stack>
  );
}