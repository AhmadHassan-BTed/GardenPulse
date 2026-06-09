// ─────────────────────────────────────────────────────────────────────────────
// NotificationBell.tsx — GardenPulse
// Tappable bell icon with an unread badge count for the AppBar.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import IconButton from './IconButton';

export interface NotificationBellProps {
  /** The number of unread notifications. Badge hides if 0. */
  count: number;
  /** Press handler */
  onPress: () => void;
  /** Outer container style */
  style?: ViewStyle;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  count,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'relative',
        },
        badge: {
          position: 'absolute',
          top: -2,
          right: -2,
          backgroundColor: Colors.text.error, // Red draws immediate attention
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
          borderWidth: 2,
          borderColor: Colors.surface.base, // Cuts out a border from the bell behind it
        },
        badgeText: {
          color: '#FFFFFF',
          fontSize: 9,
          fontWeight: 'bold',
        },
      }),
    [Colors]
  );

  const displayCount = count > 99 ? '99+' : count;

  return (
    <View style={[styles.container, style]}>
      <IconButton name="bell" onPress={onPress} size={24} />
      
      {count > 0 && (
        <View style={styles.badge} pointerEvents="none">
          <Text style={styles.badgeText}>{displayCount}</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationBell;