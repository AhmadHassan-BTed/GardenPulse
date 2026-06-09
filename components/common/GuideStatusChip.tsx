// ─────────────────────────────────────────────────────────────────────────────
// GuideStatusChip.tsx — GardenPulse
// Status chip: Under Review (amber) · Live (green) · Rejected (red) + rejection reason[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export type GuideStatus = 'Under Review' | 'Live' | 'Rejected';

export interface GuideStatusChipProps {
  status: GuideStatus;
  rejectionReason?: string;
  style?: ViewStyle;
}

const GuideStatusChip: React.FC<GuideStatusChipProps> = ({ status, rejectionReason, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const config: Record<GuideStatus, { color: string; icon: keyof typeof Feather.glyphMap }> = {
    'Under Review': { color: '#F59E0B', icon: 'clock' }, // Amber
    'Live': { color: Colors.green.DEFAULT, icon: 'check-circle' },
    'Rejected': { color: Colors.text.error, icon: 'x-circle' },
  };

  const { color, icon } = config[status];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          alignSelf: 'flex-start',
        },
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? `${color}15` : `${color}10`,
          borderWidth: 1,
          borderColor: isDark ? `${color}30` : `${color}25`,
          paddingHorizontal: Spacing.sm,
          paddingVertical: 4,
          borderRadius: Radius.md,
        },
        icon: {
          marginRight: 6,
        },
        text: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: color,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        reasonText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.error,
          marginTop: Spacing.xs,
          marginLeft: 2,
        },
      }),
    [color, isDark, Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.chip}>
        <Feather name={icon} size={12} color={color} style={styles.icon} />
        <Text style={styles.text}>{status}</Text>
      </View>
      {status === 'Rejected' && rejectionReason && (
        <Text style={styles.reasonText}>{rejectionReason}</Text>
      )}
    </View>
  );
};

export default GuideStatusChip;