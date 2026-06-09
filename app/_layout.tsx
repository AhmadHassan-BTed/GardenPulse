// ─────────────────────────────────────────────────────────────────────────────
// app/(tabs)/_layout.tsx
// Usage implementation for your Expo Router
// ─────────────────────────────────────────────────────────────────────────────

import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNavigationBar from '@/components/common/BottomNavigationBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNavigationBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Hide the default background so our custom floating bar shines
        tabBarBackground: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: 'Garden',
          tabBarIcon: ({ color, size }) => <Feather name="command" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, size }) => <Feather name="grid" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Feather name="globe" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}