// ─────────────────────────────────────────────────────────────────────────────
// BloomBestPlantCard.tsx — GardenPulse
// Highlight card showing the most improved/best performing plant of the week.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface BloomBestPlantCardProps {
  plantName: string;
  imageUrl?: string;
  method: string;
  healthDelta: number; // e.g., +15
  style?: ViewStyle;
}

const BloomBestPlantCard: React.FC<BloomBestPlantCardProps> = ({
  plantName,
  imageUrl,
  method,
  healthDelta,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        headerLabelRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginBottom: Spacing.md,
        },
        headerLabelText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: '#F59E0B', // Gold/Amber
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        contentRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.md,
        },
        thumbnail: {
          width: 72,
          height: 72,
          borderRadius: Radius.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        infoBox: {
          flex: 1,
        },
        plantName: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 4,
        },
        badgeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        methodChip: {
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: Radius.sm,
        },
        methodText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          color: Colors.text.body,
          textTransform: 'uppercase',
        },
        deltaBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${Colors.green.DEFAULT}20`,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: Radius.sm,
          gap: 2,
        },
        deltaText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  const displayDelta = healthDelta > 0 ? `+${healthDelta}` : healthDelta;

  return (
    <CustomCard variant="accent" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.headerLabelRow}>
        <Feather name="award" size={16} color="#F59E0B" />
        <Text style={styles.headerLabelText}>Star of the Week</Text>
      </View>

      <View style={styles.contentRow}>
        <Image
          source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')}
          style={styles.thumbnail}
        />
        <View style={styles.infoBox}>
          <Text style={styles.plantName}>{plantName}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.methodChip}>
              <Text style={styles.methodText}>{method}</Text>
            </View>
            <View style={styles.deltaBadge}>
              <Feather name="trending-up" size={12} color={Colors.green.DEFAULT} />
              <Text style={styles.deltaText}>{displayDelta} health</Text>
            </View>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default BloomBestPlantCard;