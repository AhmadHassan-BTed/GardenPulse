// ─────────────────────────────────────────────────────────────────────────────
// BottomNavigationBar.tsx — GardenPulse
// Theme-aware, floating custom tab bar designed for Expo Router.
// Plugs directly into the <Tabs tabBar={(props) => <BottomNavigationBar {...props} />} />
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export default function BottomNavigationBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? insets.bottom : Spacing.md,
          left: Spacing.lg,
          right: Spacing.lg,
          height: 64,
          flexDirection: 'row',
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.full,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          paddingHorizontal: Spacing.sm,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        tabButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative', // Necessary for absolute positioning of the indicator
        },
        iconWrapper: {
          marginBottom: 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
        label: {
          fontSize: 10,
          fontWeight: Typography.weights.medium,
          marginTop: 2,
        },
        activeIndicator: {
          position: 'absolute',
          top: -1, // Rests exactly on the top border of the tab bar
          width: '35%',
          height: 3,
          backgroundColor: Colors.green.DEFAULT,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        },
      }),
    [Colors, Spacing, Radius, Typography, insets.bottom]
  );

  // Fallback map guarantees an icon renders even if _layout.tsx is missing the tabBarIcon prop
  const getFallbackIcon = (routeName: string): keyof typeof Feather.glyphMap => {
    const name = routeName.toLowerCase();
    if (name.includes('home') || name === 'index') return 'home';
    if (name.includes('garden')) return 'command';
    if (name.includes('tool')) return 'grid';
    if (name.includes('community')) return 'globe';
    if (name.includes('profile')) return 'user';
    return 'circle';
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconColor = isFocused ? Colors.green.DEFAULT : Colors.text.muted;

        // Robust render function catches missing/malformed options
        const renderIcon = () => {
          if (typeof options.tabBarIcon === 'function') {
            return options.tabBarIcon({ focused: isFocused, color: iconColor, size: 22 });
          }
          return <Feather name={getFallbackIcon(route.name)} size={22} color={iconColor} />;
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            hitSlop={10}
          >
            {/* Replaced the confusing dot with a sleek top-bar line indicator */}
            {isFocused && <View style={styles.activeIndicator} />}
            
            <View style={styles.iconWrapper}>
              {renderIcon()}
            </View>
            
            <Text 
              style={[
                styles.label, 
                { color: iconColor, opacity: isFocused ? 1 : 0.7 }
              ]}
              numberOfLines={1}
            >
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}