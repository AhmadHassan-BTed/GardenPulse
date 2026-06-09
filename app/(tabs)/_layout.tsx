import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Stack } from "expo-router";
import { PlatformColor } from "react-native";

export default function TabsLayout() {
  return (
    <NativeTabs
      screenOptions={{
        inactiveColor: "#8E8E93",
        activeColor: "#4CAF50",
        indicatorStyle: { backgroundColor: "transparent" },
      }}
    >
      <NativeTabs.Trigger name="index" layout="split">
        <Icon sf="house.fill" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="garden" layout="split">
        <Icon sf="leaf.fill" />
        <Label>Garden</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="tools" layout="split">
        <Icon sf="wrench.and.screwdriver.fill" />
        <Label>Tools</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="community" layout="split">
        <Icon sf="person.3.fill" />
        <Label>Community</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="profile" layout="split">
        <Icon sf="person.circle.fill" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}