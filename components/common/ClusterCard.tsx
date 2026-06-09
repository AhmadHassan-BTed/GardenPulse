// ─────────────────────────────────────────────────────────────────────────────
// ClusterCard.tsx — GardenPulse
// Community cluster list item.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';

export interface ClusterCardProps {
  name: string;
  memberCount: number;
  method: string;
  hasRecentActivity?: boolean;
  isJoined?: boolean;
  onJoinPress: () => void;
  onPress: () => void;
  style?: ViewStyle;
}

const ClusterCard: React.FC<ClusterCardProps> = ({
  name,
  memberCount,
  method,
  hasRecentActivity = false,
  isJoined = false,
  onJoinPress,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardOverride: {
          marginBottom: Spacing.md,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: Spacing.sm,
        },
        nameContainer: {
          flex: 1,
          marginRight: Spacing.sm,
        },
        name: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 4,
        },
        activityDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: Colors.green.DEFAULT,
          position: 'absolute',
          right: -12,
          top: 6,
        },
        statsRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.md,
        },
        stat: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        statText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
        },
        methodChip: {
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: Radius.sm,
        },
        methodText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          color: Colors.text.body,
          textTransform: 'uppercase',
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard variant="default" onPress={onPress} padding={Spacing.md} style={[styles.cardOverride, style]}>
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <View style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            {hasRecentActivity && <View style={styles.activityDot} />}
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Feather name="users" size={14} color={Colors.text.muted} />
              <Text style={styles.statText}>{memberCount}</Text>
            </View>
            <View style={styles.methodChip}>
              <Text style={styles.methodText}>{method}</Text>
            </View>
          </View>
        </View>
        <CustomButton
          label={isJoined ? 'Joined' : 'Join'}
          variant={isJoined ? 'secondary' : 'primary'}
          onPress={onJoinPress}
          style={{ minHeight: 36, paddingVertical: 0, paddingHorizontal: 16 }}
          labelStyle={{ fontSize: Typography.sizes.sm }}
        />
      </View>
    </CustomCard>
  );
};

export default ClusterCard;