// ─────────────────────────────────────────────────────────────────────────────
// BottomNavigationBar.tsx — GardenPulse
// Glassmorphic floating tab bar.
// • iOS 26+  → @callstack/liquid-glass (real Apple Liquid Glass)
// • Android / older iOS → expo-blur BlurView fallback
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export default function BottomNavigationBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? insets.bottom : Spacing.md,
          left: Spacing.lg,
          right: Spacing.lg,
          height: 64,
          borderRadius: Radius.full,
          overflow: 'hidden',
          // Subtle shadow for depth
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.10,
          shadowRadius: 10,
        },
        liquidGlass: {
          flex: 1,
          borderRadius: Radius.full,
          overflow: 'hidden',
        },
        blur: {
          ...StyleSheet.absoluteFillObject,
        },
        tintOverlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: isDark
            ? 'rgba(10, 15, 13, 0.55)'
            : 'rgba(255, 255, 255, 0.45)',
        },
        borderOverlay: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: Radius.full,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(255, 255, 255, 0.6)',
        },
        content: {
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: Spacing.sm,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        tabButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
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
          top: -1,
          width: '35%',
          height: 3,
          backgroundColor: Colors.green.DEFAULT,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        },
      }),
    [Colors, Spacing, Radius, Typography, insets.bottom, isDark]
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

  // ── Tab content (shared between both glass backends) ──────────────────────
  const tabContent = (
    <View style={styles.content}>
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
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        const iconColor = isFocused ? Colors.green.DEFAULT : Colors.text.muted;

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
            {isFocused && <View style={styles.activeIndicator} />}
            <View style={styles.iconWrapper}>{renderIcon()}</View>
            <Text
              style={[styles.label, { color: iconColor, opacity: isFocused ? 1 : 0.7 }]}
              numberOfLines={1}
            >
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  // ── Render: Liquid Glass on iOS 26+, BlurView fallback elsewhere ──────────
  if (isLiquidGlassSupported) {
    return (
      <View style={styles.outer}>
        <LiquidGlassView
          style={styles.liquidGlass}
          effect="regular"
          colorScheme={isDark ? 'dark' : 'light'}
        >
          {tabContent}
        </LiquidGlassView>
      </View>
    );
  }

  // Fallback: expo-blur
  return (
    <View style={styles.outer}>
      <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={styles.blur} />
      <View style={styles.tintOverlay} />
      <View style={styles.borderOverlay} />
      {tabContent}
    </View>
  );
}