// ─────────────────────────────────────────────────────────────────────────────
// CrossMethodInsightCard.tsx — GardenPulse
// Conditional card comparing same species across methods.
// Shows growth delta message — used on SCR-03.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface CrossMethodInsightCardProps {
  /** Species name */
  species: string;
  /** Insight message (e.g., "Hydroponic grew 23% faster than soil") */
  message: string;
  /** Growth delta (e.g., +23) */
  delta?: number;
  /** Outer style override */
  style?: ViewStyle;
}

const CrossMethodInsightCard: React.FC<CrossMethodInsightCardProps> = ({
  species,
  message,
  delta,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 2,
          alignSelf: 'flex-start',
          marginBottom: Spacing.sm,
        },
        badgeText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: Colors.green.DEFAULT,
        },
        title: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          marginBottom: Spacing.xs,
        },
        message: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
        deltaBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          marginTop: Spacing.sm,
          alignSelf: 'flex-start',
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: Spacing.xs,
        },
        deltaText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: '#FFFFFF',
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <CustomCard variant="minimal" padding={Spacing.md} style={style}>
      <View style={styles.badge}>
        <Feather name="layers" size={12} color={Colors.green.DEFAULT} />
        <Text style={styles.badgeText}>Cross-Method Insight</Text>
      </View>
      <Text style={styles.title}>{species}</Text>
      <Text style={styles.message}>{message}</Text>
      {delta !== undefined && (
        <View style={styles.deltaBadge}>
          <Feather name="trending-up" size={12} color="#FFFFFF" />
          <Text style={styles.deltaText}>{delta > 0 ? '+' : ''}{delta}%</Text>
        </View>
      )}
    </CustomCard>
  );
};

export default CrossMethodInsightCard;