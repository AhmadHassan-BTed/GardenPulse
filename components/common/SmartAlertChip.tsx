// ─────────────────────────────────────────────────────────────────────────────
// SmartAlertChip.tsx — GardenPulse
// Coloured chip with weather/care alert text (e.g., "Rain tomorrow → skip watering")[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface SmartAlertChipProps {
  message: string;
  iconName?: keyof typeof Feather.glyphMap;
  type?: 'info' | 'warning';
  style?: ViewStyle;
}

const SmartAlertChip: React.FC<SmartAlertChipProps> = ({
  message,
  iconName = 'cloud-rain',
  type = 'info',
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const baseColor = type === 'warning' ? '#F59E0B' : Colors.green.DEFAULT; // Amber or Green

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? `${baseColor}15` : `${baseColor}10`,
          borderWidth: 1,
          borderColor: isDark ? `${baseColor}30` : `${baseColor}25`,
          paddingHorizontal: Spacing.md,
          paddingVertical: 8,
          borderRadius: Radius.md,
          alignSelf: 'flex-start',
        },
        icon: {
          marginRight: Spacing.sm,
        },
        text: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: isDark ? Colors.text.heading : baseColor,
          letterSpacing: 0.1,
        },
      }),
    [baseColor, isDark, Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Feather name={iconName} size={16} color={baseColor} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default SmartAlertChip;