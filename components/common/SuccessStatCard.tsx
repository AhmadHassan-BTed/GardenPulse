// ─────────────────────────────────────────────────────────────────────────────
// SuccessStatCard.tsx — GardenPulse
// Plant name + success % + grower count + trending arrow.
// Used in the Local tab of the Community Hub.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface SuccessStatCardProps {
  plantName: string;
  successRate: number; // e.g., 87
  growerCount: number;
  trend?: 'up' | 'down' | 'flat';
  style?: ViewStyle;
}

const SuccessStatCard: React.FC<SuccessStatCardProps> = ({
  plantName,
  successRate,
  growerCount,
  trend = 'up',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 140, // Fixed width for horizontal scrolling
          marginRight: Spacing.md,
        },
        plantName: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.sm,
        },
        mainRow: {
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 4,
          marginBottom: Spacing.xs,
        },
        rateText: {
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
        },
        percentSymbol: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
        },
        growerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        growerText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Typography]
  );

  const trendIcon = trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'minus';
  const trendColor = trend === 'down' ? Colors.text.error : Colors.green.DEFAULT;

  return (
    <CustomCard variant="default" padding={Spacing.md} style={[styles.container, style]}>
      <Text style={styles.plantName} numberOfLines={1}>
        {plantName}
      </Text>
      
      <View style={styles.mainRow}>
        <Text style={[styles.rateText, { color: trendColor }]}>{successRate}</Text>
        <Text style={[styles.percentSymbol, { color: trendColor }]}>%</Text>
        <Feather name={trendIcon} size={16} color={trendColor} style={{ marginLeft: 4 }} />
      </View>
      
      <View style={styles.growerRow}>
        <Feather name="users" size={12} color={Colors.text.muted} />
        <Text style={styles.growerText}>{growerCount} local growers</Text>
      </View>
    </CustomCard>
  );
};

export default SuccessStatCard;