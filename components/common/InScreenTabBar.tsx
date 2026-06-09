// ─────────────────────────────────────────────────────────────────────────────
// InScreenTabBar.tsx — GardenPulse
// Horizontal tab bar rendered inside a screen (not bottom nav).
// Used for sub-navigation within Community and Profile tabs.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface InScreenTabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  style?: ViewStyle;
}

const InScreenTabBar: React.FC<InScreenTabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
          width: '100%',
        },
        tabButton: {
          flex: 1,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        },
        tabText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.muted,
        },
        activeTabText: {
          color: Colors.green.DEFAULT,
        },
        activeIndicator: {
          position: 'absolute',
          bottom: -1, // Overlaps the bottom border exactly
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: Colors.green.DEFAULT,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      }),
    [Colors, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            style={styles.tabButton}
            onPress={() => onTabChange(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
};

export default InScreenTabBar;