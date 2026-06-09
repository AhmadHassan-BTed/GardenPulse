// ─────────────────────────────────────────────────────────────────────────────
// BatchActionBar.tsx — GardenPulse
// Bottom action bar in batch mode: Water All · Feed All · Log Entry · Archive.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../layout/ThemeProvider';

export interface BatchActionBarProps {
  selectedCount: number;
  onWaterAll: () => void;
  onFeedAll: () => void;
  onLogEntry: () => void;
  onArchive: () => void;
  style?: ViewStyle;
}

const BatchActionBar: React.FC<BatchActionBarProps> = ({
  selectedCount,
  onWaterAll,
  onFeedAll,
  onLogEntry,
  onArchive,
  style,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.surface.base,
          borderTopWidth: 1,
          borderTopColor: Colors.surface.glassBorder,
          paddingHorizontal: Spacing.md,
          paddingTop: Spacing.sm,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : Spacing.md,
          elevation: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: Spacing.sm,
        },
        countBadge: {
          backgroundColor: `${Colors.green.DEFAULT}20`,
          paddingHorizontal: Spacing.md,
          paddingVertical: 4,
          borderRadius: Radius.full,
        },
        countText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        actionsRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        actionButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Spacing.sm,
          gap: 4,
        },
        actionLabel: {
          fontSize: 10,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
      }),
    [Colors, Spacing, Radius, Typography, insets.bottom]
  );

  if (selectedCount === 0) return null;

  const ActionButton = ({ icon, label, onPress, color }: { icon: keyof typeof Feather.glyphMap, label: string, onPress: () => void, color?: string }) => (
    <Pressable style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.6 }]} onPress={onPress}>
      <Feather name={icon} size={20} color={color || Colors.text.heading} />
      <Text style={[styles.actionLabel, color && { color }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{selectedCount} Selected</Text>
        </View>
      </View>
      
      <View style={styles.actionsRow}>
        <ActionButton icon="droplet" label="Water All" color="#3B82F6" onPress={onWaterAll} />
        <ActionButton icon="battery-charging" label="Feed All" color={Colors.green.DEFAULT} onPress={onFeedAll} />
        <ActionButton icon="file-text" label="Log Entry" onPress={onLogEntry} />
        <ActionButton icon="archive" label="Archive" color={Colors.text.error} onPress={onArchive} />
      </View>
    </View>
  );
};

export default BatchActionBar;