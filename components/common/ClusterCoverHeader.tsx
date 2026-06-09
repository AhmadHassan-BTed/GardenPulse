// ─────────────────────────────────────────────────────────────────────────────
// ClusterCoverHeader.tsx — GardenPulse
// Cover image + member count + location + creation date + description + Join/Leave.
// Used on SCR-09 cluster detail.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ClusterCoverHeaderProps {
  /** Cover image URI (falls back to gradient) */
  coverImageUrl?: string;
  /** Cluster name */
  name: string;
  /** Number of members */
  memberCount: number;
  /** Location text */
  location: string;
  /** Creation date */
  createdAt: string;
  /** Description */
  description?: string;
  /** Whether the user has joined */
  isJoined?: boolean;
  /** Join/Leave toggle callback */
  onJoinToggle?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ClusterCoverHeader: React.FC<ClusterCoverHeaderProps> = ({
  coverImageUrl,
  name,
  memberCount,
  location,
  createdAt,
  description,
  isJoined = false,
  onJoinToggle,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderRadius: Radius.lg,
          overflow: 'hidden',
          backgroundColor: Colors.surface.subtle,
        },
        coverImage: {
          width: '100%',
          height: 160,
        },
        coverFallback: {
          width: '100%',
          height: 160,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          padding: Spacing.md,
          gap: Spacing.sm,
        },
        name: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        metaRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.md,
          flexWrap: 'wrap',
        },
        metaItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
        },
        metaText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        description: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
        joinButton: {
          alignSelf: 'flex-start',
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.sm,
          marginTop: Spacing.xs,
        },
        joinButtonActive: {
          backgroundColor: Colors.green.DEFAULT,
        },
        joinButtonInactive: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.green.DEFAULT,
        },
        joinButtonText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      {coverImageUrl ? (
        <Image source={{ uri: coverImageUrl }} style={styles.coverImage} resizeMode="cover" />
      ) : (
        <View style={styles.coverFallback}>
          <Feather name="grid" size={32} color={Colors.green.DEFAULT} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Feather name="users" size={12} color={Colors.text.muted} />
            <Text style={styles.metaText}>{memberCount} members</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="map-pin" size={12} color={Colors.text.muted} />
            <Text style={styles.metaText}>{location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="calendar" size={12} color={Colors.text.muted} />
            <Text style={styles.metaText}>{createdAt}</Text>
          </View>
        </View>
        {description && <Text style={styles.description}>{description}</Text>}
        <Pressable
          onPress={onJoinToggle}
          style={({ pressed }) => [
            styles.joinButton,
            isJoined ? styles.joinButtonActive : styles.joinButtonInactive,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text
            style={[
              styles.joinButtonText,
              { color: isJoined ? '#FFFFFF' : Colors.green.DEFAULT },
            ]}
          >
            {isJoined ? 'Joined ✓' : 'Join Cluster'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ClusterCoverHeader;