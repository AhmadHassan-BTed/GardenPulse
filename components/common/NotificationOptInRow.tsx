// ─────────────────────────────────────────────────────────────────────────────
// NotificationOptInRow.tsx — GardenPulse
// Bell icon + "Get reminders for [plant name]" label + enable toggle in a row.
// Used in ONB-4 during onboarding opt-in flow.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomSwitch from './CustomSwitch';

export interface NotificationOptInRowProps {
  /** The plant name to reference in the reminder label */
  plantName: string;
  /** Whether notifications are currently enabled */
  enabled: boolean;
  /** Toggle callback */
  onToggle: (value: boolean) => void;
  /** Outer style override */
  style?: ViewStyle;
}

const NotificationOptInRow: React.FC<NotificationOptInRowProps> = ({
  plantName,
  enabled,
  onToggle,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.surface.glass,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.md,
          gap: Spacing.md,
        },
        iconContainer: {
          width: 36,
          height: 36,
          borderRadius: Radius.sm,
          backgroundColor: Colors.green.tint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
        },
        label: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.body,
          lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.row, style]}>
      <View style={styles.iconContainer}>
        <Feather name="bell" size={18} color={Colors.green.DEFAULT} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label} numberOfLines={2}>
          Get reminders for {plantName}
        </Text>
      </View>
      <CustomSwitch value={enabled} onValueChange={onToggle} />
    </View>
  );
};

export default NotificationOptInRow;