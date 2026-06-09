// ─────────────────────────────────────────────────────────────────────────────
// BottomNavigationBar.tsx — GardenPulse
// Theme-aware, floating custom tab bar designed for Expo Router.
// Plugs directly into the <Tabs tabBar={(props) => <BottomNavigationBar {...props} />} />
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
        },
        label: {
          fontSize: 10,
          fontWeight: Typography.weights.medium,
          marginTop: 4,
        },
        activeIndicator: {
          position: 'absolute',
          top: 6,
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Radius, Typography, insets.bottom]
  );

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

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            hitSlop={10}
          >
            {isFocused && <View style={styles.activeIndicator} />}
            
            {options.tabBarIcon && 
              options.tabBarIcon({ 
                focused: isFocused, 
                color: iconColor, 
                size: 22 
              })
            }
            
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