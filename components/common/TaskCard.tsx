// ─────────────────────────────────────────────────────────────────────────────
// TaskCard.tsx — GardenPulse
// Plant thumbnail + name + task type chip + Done button.
// Designed for horizontal scrolling or vertical list feeds.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';

export type TaskType = 'Water' | 'Feed' | 'Prune' | 'Check' | 'Harvest';

export interface TaskCardProps {
  plantName: string;
  plantImageUrl?: string;
  taskType: TaskType;
  isDone?: boolean;
  onDonePress: () => void;
  style?: ViewStyle;
}

const TaskCard: React.FC<TaskCardProps> = ({
  plantName,
  plantImageUrl,
  taskType,
  isDone = false,
  onDonePress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const typeConfig: Record<TaskType, { color: string; icon: keyof typeof Feather.glyphMap }> = {
    Water:   { color: '#3B82F6', icon: 'droplet' }, // Blue
    Feed:    { color: Colors.green.DEFAULT, icon: 'battery-charging' },
    Prune:   { color: '#F59E0B', icon: 'scissors' }, // Amber
    Check:   { color: '#8B5CF6', icon: 'eye' }, // Purple
    Harvest: { color: '#EC4899', icon: 'shopping-bag' }, // Pink
  };

  const config = typeConfig[taskType];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardOverride: {
          width: 260, // Fixed width for horizontal scrolling
          marginRight: Spacing.md,
          opacity: isDone ? 0.6 : 1,
        },
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        thumbnail: {
          width: 48,
          height: 48,
          borderRadius: Radius.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        content: {
          flex: 1,
        },
        plantName: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          marginBottom: 4,
        },
        taskChip: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? `${config.color}20` : `${config.color}15`,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: Radius.sm,
          alignSelf: 'flex-start',
          gap: 4,
        },
        taskText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          color: config.color,
          textTransform: 'uppercase',
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark, config, isDone]
  );

  return (
    <CustomCard variant="default" padding={Spacing.md} style={[styles.cardOverride, style]}>
      <View style={styles.container}>
        <Image
          source={plantImageUrl ? { uri: plantImageUrl } : require('../../assets/placeholder-plant.png')}
          style={styles.thumbnail}
        />
        <View style={styles.content}>
          <Text style={styles.plantName} numberOfLines={1}>
            {plantName}
          </Text>
          <View style={styles.taskChip}>
            <Feather name={config.icon} size={10} color={config.color} />
            <Text style={styles.taskText}>{taskType}</Text>
          </View>
        </View>
        <CustomButton
          label={isDone ? 'Done' : 'Done ✓'}
          variant={isDone ? 'secondary' : 'primary'}
          onPress={onDonePress}
          isDisabled={isDone}
          style={{ minHeight: 36, paddingVertical: 0, paddingHorizontal: 12 }}
          labelStyle={{ fontSize: Typography.sizes.sm }}
        />
      </View>
    </CustomCard>
  );
};

export default TaskCard;