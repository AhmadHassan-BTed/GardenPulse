// ─────────────────────────────────────────────────────────────────────────────
// NotificationBell.tsx — GardenPulse
// Bell icon with unread badge count; tappable; lives in AppBar / SCR-01.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface NotificationBellProps {
  /** Number of unread notifications */
  unreadCount?: number;
  /** Press handler */
  onPress?: () => void;
  /** Icon size */
  size?: number;
  /** Outer style override */
  style?: ViewStyle;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  unreadCount = 0,
  onPress,
  size = 22,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 40,
          height: 40,
          borderRadius: Radius.sm,
          justifyContent: 'center',
          alignItems: 'center',
        },
        badge: {
          position: 'absolute',
          top: 4,
          right: 4,
          minWidth: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: Colors.text.error,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
        },
        badgeText: {
          fontSize: 9,
          fontWeight: '700',
          color: '#FFFFFF',
          lineHeight: 16,
          textAlign: 'center',
        },
      }),
    [Colors, Radius],
  );

  const displayCount = unreadCount > 99 ? '99+' : String(unreadCount);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.6 },
        style,
      ]}
    >
      <Feather name="bell" size={size} color={Colors.text.heading} />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {displayCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default NotificationBell;