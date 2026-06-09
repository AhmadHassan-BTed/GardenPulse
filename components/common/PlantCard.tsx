// ─────────────────────────────────────────────────────────────────────────────
// PlantCard.tsx — GardenPulse
// Photo thumbnail + name + method badge + health dot + last logged.
// Supports both Grid (2-col vertical) and List (horizontal row) views.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import HealthDotIndicator, { HealthStatus } from './HealthDotIndicator';
import CustomCard from './CustomCard';

export interface PlantCardProps {
  name: string;
  nickname?: string;
  imageUrl?: string;
  method: 'Soil' | 'Container' | 'Hydro' | 'Indoor';
  healthStatus: HealthStatus;
  lastLoggedDays: number;
  isGrid?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  nickname,
  imageUrl,
  method,
  healthStatus,
  lastLoggedDays,
  isGrid = false,
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
          flex: isGrid ? 1 : 0,
          margin: isGrid ? Spacing.xs : 0,
          marginBottom: !isGrid ? Spacing.sm : Spacing.xs,
        },
        container: {
          flexDirection: isGrid ? 'column' : 'row',
          alignItems: isGrid ? 'stretch' : 'center',
          gap: Spacing.md,
        },
        image: {
          width: isGrid ? '100%' : 72,
          height: isGrid ? 120 : 72,
          borderRadius: Radius.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        infoContainer: {
          flex: 1,
          justifyContent: 'center',
          paddingVertical: isGrid ? Spacing.xs : 0,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 4,
        },
        titleWrapper: {
          flex: 1,
          marginRight: Spacing.sm,
        },
        name: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        nickname: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          marginTop: 2,
        },
        badgesRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Spacing.xs,
          gap: Spacing.sm,
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
        lastLogged: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
      }),
    [isGrid, Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard
      variant="default"
      padding={isGrid ? Spacing.sm : Spacing.md}
      onPress={onPress}
      style={[styles.cardOverride, style]}
    >
      <View style={styles.container}>
        <Image
          source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} // Replace with your actual local fallback
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrapper}>
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
              {nickname && (
                <Text style={styles.nickname} numberOfLines={1}>
                  "{nickname}"
                </Text>
              )}
            </View>
            <HealthDotIndicator status={healthStatus} />
          </View>
          
          <View style={styles.badgesRow}>
            <View style={styles.methodChip}>
              <Text style={styles.methodText}>{method}</Text>
            </View>
            <Text style={styles.lastLogged}>
              {lastLoggedDays === 0 ? 'Logged today' : `${lastLoggedDays}d ago`}
            </Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default PlantCard;