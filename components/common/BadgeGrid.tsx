// ─────────────────────────────────────────────────────────────────────────────
// BadgeGrid.tsx — GardenPulse
// Grid of earned (full colour) and locked (greyed + padlock) badges.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface BadgeItem {
  id: string;
  name: string;
  icon: keyof typeof Feather.glyphMap;
  isEarned: boolean;
  color?: string; // e.g. '#38BDF8' for water badges, defaults to brand green
}

export interface BadgeGridProps {
  badges: BadgeItem[];
  onBadgePress: (badge: BadgeItem) => void;
  style?: ViewStyle;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, onBadgePress, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Spacing.md,
          justifyContent: 'center', // Centers the row of badges
        },
        badgeWrapper: {
          alignItems: 'center',
          width: 80,
          marginBottom: Spacing.sm,
        },
        iconCircle: {
          width: 64,
          height: 64,
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.sm,
          position: 'relative',
        },
        earnedCircle: {
          borderWidth: 2,
        },
        lockedCircle: {
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          borderWidth: 2,
          borderColor: isDark ? Colors.surface.glassBorder : '#E5E7EB',
        },
        lockIcon: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: Colors.surface.base,
          borderRadius: 10,
          padding: 2,
        },
        badgeName: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
          textAlign: 'center',
          lineHeight: 14,
        },
        lockedName: {
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <View style={[styles.container, style]}>
      {badges.map((badge) => {
        const badgeColor = badge.color || Colors.green.DEFAULT;

        return (
          <Pressable 
            key={badge.id} 
            style={styles.badgeWrapper}
            onPress={() => onBadgePress(badge)}
          >
            <View 
              style={[
                styles.iconCircle, 
                badge.isEarned 
                  ? [styles.earnedCircle, { borderColor: badgeColor, backgroundColor: `${badgeColor}15` }] 
                  : styles.lockedCircle
              ]}
            >
              <Feather 
                name={badge.icon} 
                size={28} 
                color={badge.isEarned ? badgeColor : Colors.text.muted} 
              />
              {!badge.isEarned && (
                <View style={styles.lockIcon}>
                  <Feather name="lock" size={12} color={Colors.text.muted} />
                </View>
              )}
            </View>
            <Text 
              style={[styles.badgeName, !badge.isEarned && styles.lockedName]} 
              numberOfLines={2}
            >
              {badge.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BadgeGrid;