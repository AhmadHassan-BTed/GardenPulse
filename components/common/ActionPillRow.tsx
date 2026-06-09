// ─────────────────────────────────────────────────────────────────────────────
// ActionPillRow.tsx — GardenPulse
// Horizontal row of icon+label pill buttons (Log · Diagnose · Share · Archive).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import HorizontalScrollRow from './HorizontalScrollRow';

export interface ActionPill {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  isDestructive?: boolean;
}

export interface ActionPillRowProps {
  actions: ActionPill[];
  style?: ViewStyle;
}

const ActionPillRow: React.FC<ActionPillRowProps> = ({ actions, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: Spacing.sm,
        },
        pill: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.surface.glass,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          borderRadius: Radius.full,
          gap: Spacing.sm,
        },
        label: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        destructiveLabel: {
          color: Colors.text.error,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <HorizontalScrollRow gap={Spacing.sm} edgePadding style={[styles.container, style]}>
      {actions.map((action) => (
        <Pressable
          key={action.id}
          style={({ pressed }) => [
            styles.pill,
            action.isDestructive && { borderColor: `${Colors.text.error}40` },
            pressed && { opacity: 0.7, backgroundColor: Colors.surface.elevated },
          ]}
          onPress={action.onPress}
        >
          <Feather 
            name={action.icon} 
            size={16} 
            color={action.isDestructive ? Colors.text.error : Colors.green.DEFAULT} 
          />
          <Text style={[styles.label, action.isDestructive && styles.destructiveLabel]}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </HorizontalScrollRow>
  );
};

export default ActionPillRow;