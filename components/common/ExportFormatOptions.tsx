// ─────────────────────────────────────────────────────────────────────────────
// ExportFormatOptions.tsx — GardenPulse
// Export options. PDF greys out with "Watch video to unlock" if locked.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface ExportFormatOptionsProps {
  isSupporter: boolean;
  onSelectPNG: () => void;
  onSelectPDF: () => void; // Trigger video prompt if not supporter
  onSelectText: () => void;
  style?: ViewStyle;
}

const ExportFormatOptions: React.FC<ExportFormatOptionsProps> = ({
  isSupporter,
  onSelectPNG,
  onSelectPDF,
  onSelectText,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: Spacing.sm,
          ...style,
        },
        optionBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          borderRadius: Radius.md,
          padding: Spacing.md,
        },
        iconBox: {
          width: 36,
          height: 36,
          borderRadius: Radius.sm,
          backgroundColor: Colors.surface.elevated,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: Spacing.md,
        },
        textContent: {
          flex: 1,
        },
        title: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        subtitle: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: 2,
        },
        lockedText: {
          color: Colors.green.DEFAULT,
          fontWeight: Typography.weights.bold,
        },
      }),
    [Colors, Spacing, Radius, Typography, style]
  );

  const OptionRow = ({ title, subtitle, icon, onPress, locked = false }: any) => (
    <Pressable style={({ pressed }) => [styles.optionBtn, pressed && { backgroundColor: Colors.surface.glass }]} onPress={onPress}>
      <View style={styles.iconBox}>
        <Feather name={icon} size={20} color={locked ? Colors.text.muted : Colors.green.DEFAULT} />
      </View>
      <View style={styles.textContent}>
        <Text style={[styles.title, locked && { color: Colors.text.muted }]}>{title}</Text>
        <Text style={styles.subtitle}>
          {locked ? (
            <Text style={styles.lockedText}><Feather name="play-circle" size={10} /> Watch video to unlock</Text>
          ) : (
            subtitle
          )}
        </Text>
      </View>
      {locked && <Feather name="lock" size={16} color={Colors.text.muted} />}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <OptionRow title="Save as Image (PNG)" subtitle="Best for sharing on social media" icon="image" onPress={onSelectPNG} />
      <OptionRow title="Export Document (PDF)" subtitle="High-quality printable format" icon="file-text" onPress={onSelectPDF} locked={!isSupporter} />
      <OptionRow title="Copy as Text" subtitle="Raw data clipboard copy" icon="clipboard" onPress={onSelectText} />
    </View>
  );
};

export default ExportFormatOptions;