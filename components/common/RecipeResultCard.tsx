// ─────────────────────────────────────────────────────────────────────────────
// RecipeResultCard.tsx — GardenPulse
// Full results card: nutrient rows + pH range band + EC/PPM label + warnings.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import SeverityIndicator from './SeverityIndicator';
import { NutrientRecipeRow, PHRangeBand } from './PHRangeBand'; // Imported from above

export interface RecipeNutrient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  isWarning?: boolean;
}

export interface RecipeResultCardProps {
  reservoirSize: string;
  nutrients: RecipeNutrient[];
  phMin: number;
  phTarget: number;
  phMax: number;
  ecValue: string; // e.g., "1.2 - 1.5 EC"
  warningText?: string;
  onSave: () => void;
  onSchedule: () => void;
  style?: ViewStyle;
}

const RecipeResultCard: React.FC<RecipeResultCardProps> = ({
  reservoirSize,
  nutrients,
  phMin,
  phTarget,
  phMax,
  ecValue,
  warningText,
  onSave,
  onSchedule,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: Spacing.md,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        resSize: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
        },
        metricsRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.elevated : '#F9FAFB',
          padding: Spacing.md,
          borderRadius: theme.Radius.md,
          marginBottom: Spacing.md,
          marginTop: Spacing.sm,
        },
        metricBox: {
          alignItems: 'center',
          flex: 1,
        },
        metricLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginBottom: 2,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        metricValue: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        actions: {
          flexDirection: 'row',
          gap: Spacing.md,
          marginTop: Spacing.lg,
        },
      }),
    [Colors, Spacing, Typography, theme.scheme, theme.Radius]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mix Recipe</Text>
        <Text style={styles.resSize}>For {reservoirSize}</Text>
      </View>

      {nutrients.map((n) => (
        <NutrientRecipeRow key={n.id} name={n.name} amount={n.amount} unit={n.unit} isWarning={n.isWarning} />
      ))}

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Target EC/PPM</Text>
          <Text style={styles.metricValue}>{ecValue}</Text>
        </View>
        <View style={{ width: 1, backgroundColor: Colors.border.muted }} />
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>pH Range</Text>
          <Text style={styles.metricValue}>{phMin} - {phMax}</Text>
        </View>
      </View>

      <PHRangeBand min={phMin} target={phTarget} max={phMax} />

      {warningText && (
        <View style={{ marginTop: Spacing.sm }}>
          <SeverityIndicator level="medium" label="Caution" />
          <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.body, marginTop: 4 }}>{warningText}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <CustomButton label="Save Recipe" variant="secondary" onPress={onSave} style={{ flex: 1 }} />
        <CustomButton label="Schedule Feed" onPress={onSchedule} style={{ flex: 1 }} />
      </View>
    </CustomCard>
  );
};

export default RecipeResultCard;