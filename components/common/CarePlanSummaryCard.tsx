// ─────────────────────────────────────────────────────────────────────────────
// CarePlanSummaryCard.tsx — GardenPulse
// Shows watering frequency + light requirement + next action chip + method tag.
// Used on ONB-4 plan preview.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface CarePlanSummaryCardProps {
  /** Plant common name */
  plantName: string;
  /** Watering frequency label (e.g., "Every 2 days") */
  wateringFrequency: string;
  /** Light requirement label (e.g., "Bright indirect") */
  lightRequirement: string;
  /** Next action description (e.g., "Water tomorrow") */
  nextAction?: string;
  /** Growing method tag (e.g., "Soil", "Hydroponic") */
  method: string;
  /** Outer style override */
  style?: ViewStyle;
}

const CarePlanSummaryCard: React.FC<CarePlanSummaryCardProps> = ({
  plantName,
  wateringFrequency,
  lightRequirement,
  nextAction,
  method,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          marginBottom: Spacing.sm,
        },
        methodBadge: {
          alignSelf: 'flex-start',
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: Spacing.xs,
          marginBottom: Spacing.md,
        },
        methodText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: Colors.green.DEFAULT,
        },
        infoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
          marginBottom: Spacing.sm,
        },
        infoIcon: {
          width: 28,
          height: 28,
          borderRadius: Radius.sm,
          backgroundColor: Colors.surface.subtle,
          justifyContent: 'center',
          alignItems: 'center',
        },
        infoText: {
          flex: 1,
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
        },
        infoLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        nextActionChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: Colors.green.tint,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          marginTop: Spacing.sm,
          alignSelf: 'flex-start',
        },
        nextActionText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.green.deep,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <CustomCard variant="accent" padding={Spacing.lg} style={style}>
      <Text style={styles.title}>{plantName} Care Plan</Text>

      <View style={styles.methodBadge}>
        <Text style={styles.methodText}>{method}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Feather name="droplet" size={14} color={Colors.green.DEFAULT} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>Watering</Text>
          <Text style={styles.infoText}>{wateringFrequency}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Feather name="sun" size={14} color="#F59E0B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>Light</Text>
          <Text style={styles.infoText}>{lightRequirement}</Text>
        </View>
      </View>

      {nextAction && (
        <View style={styles.nextActionChip}>
          <Feather name="arrow-right-circle" size={14} color={Colors.green.deep} />
          <Text style={styles.nextActionText}>{nextAction}</Text>
        </View>
      )}
    </CustomCard>
  );
};

export default CarePlanSummaryCard;