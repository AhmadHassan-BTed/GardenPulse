// ─────────────────────────────────────────────────────────────────────────────
// GrowingStageChip.tsx — GardenPulse
// Visual identifier for a plant's current lifecycle stage.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export type GrowingStage = 'Seedling' | 'Veg' | 'Bloom' | 'Fruiting' | 'Dormant';

export interface GrowingStageChipProps {
  /** The stage to display */
  stage: GrowingStage;
  /** Outer container style */
  style?: ViewStyle;
}

const GrowingStageChip: React.FC<GrowingStageChipProps> = ({ stage, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  // Map each stage to an appropriate icon and distinct tint colour
  const stageConfig: Record<GrowingStage, { icon: keyof typeof Feather.glyphMap; color: string }> = {
    Seedling: { icon: 'sun', color: '#38BDF8' }, // Sky Blue
    Veg:      { icon: 'target', color: Colors.green.DEFAULT }, // Brand Green
    Bloom:    { icon: 'star', color: '#D946EF' }, // Fuchsia
    Fruiting: { icon: 'droplet', color: '#F43F5E' }, // Rose
    Dormant:  { icon: 'moon', color: Colors.text.muted }, // Grey
  };

  const { icon, color } = stageConfig[stage];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: isDark ? `${color}15` : `${color}10`, // Very subtle tint
          borderWidth: 1,
          borderColor: isDark ? `${color}30` : `${color}25`,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 4,
          borderRadius: Radius.md,
        },
        icon: {
          marginRight: 6,
        },
        label: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: color,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }),
    [color, isDark, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Feather name={icon} size={12} color={color} style={styles.icon} />
      <Text style={styles.label}>{stage}</Text>
    </View>
  );
};

export default GrowingStageChip;