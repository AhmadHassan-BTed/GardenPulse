// ─────────────────────────────────────────────────────────────────────────────
// NutrientRecipeRow.tsx & PHRangeBand.tsx — GardenPulse
// Dependencies for the RecipeResultCard.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export const NutrientRecipeRow = ({ name, amount, unit, isWarning = false }: any) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: theme.Colors.border.subtle }}>
      <Text style={{ fontSize: theme.Typography.sizes.base, color: theme.Colors.text.heading, fontWeight: '500' }}>{name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: theme.Typography.sizes.base, color: isWarning ? theme.Colors.text.error : theme.Colors.text.body, fontWeight: '700' }}>{amount}</Text>
        <Text style={{ fontSize: theme.Typography.sizes.sm, color: theme.Colors.text.muted }}>{unit}</Text>
      </View>
    </View>
  );
};

export const PHRangeBand = ({ min, target, max }: any) => {
  const theme = useTheme();
  // Visual representation of a target pH range inside a broader 0-14 scale.
  // We map the 0-14 scale to percentages.
  const leftPercent = (min / 14) * 100;
  const widthPercent = ((max - min) / 14) * 100;
  const targetPercent = (target / 14) * 100;

  return (
    <View style={{ marginVertical: theme.Spacing.md }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: theme.Typography.sizes.xs, color: theme.Colors.text.muted }}>pH 0</Text>
        <Text style={{ fontSize: theme.Typography.sizes.sm, color: theme.Colors.text.heading, fontWeight: '700' }}>Target: {target}</Text>
        <Text style={{ fontSize: theme.Typography.sizes.xs, color: theme.Colors.text.muted }}>14</Text>
      </View>
      <View style={{ height: 8, backgroundColor: theme.Colors.surface.elevated, borderRadius: 4, position: 'relative' }}>
        <View style={{ position: 'absolute', left: `${leftPercent}%`, width: `${widthPercent}%`, height: '100%', backgroundColor: `${theme.Colors.green.DEFAULT}40`, borderRadius: 4 }} />
        <View style={{ position: 'absolute', left: `${targetPercent}%`, width: 4, height: 14, top: -3, marginLeft: -2, backgroundColor: theme.Colors.green.DEFAULT, borderRadius: 2 }} />
      </View>
    </View>
  );
};