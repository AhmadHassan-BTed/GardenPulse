// ─────────────────────────────────────────────────────────────────────────────
// MethodSelectionCard.tsx — GardenPulse
// Selectable card with an icon, title, description, and selection ring.
// Used for single-select methodology selection in ONB-2.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface MethodSelectionCardProps {
  /** Method name (e.g., "Soil / Raised Bed") */
  title: string;
  /** Brief description of the method */
  description: string;
  /** Feather icon name */
  iconName: keyof typeof Feather.glyphMap;
  /** Whether this specific card is currently chosen */
  isSelected: boolean;
  /** Press handler */
  onPress: () => void;
  /** Outer container style */
  style?: ViewStyle;
}

const MethodSelectionCard: React.FC<MethodSelectionCardProps> = ({
  title,
  description,
  iconName,
  isSelected,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: Spacing.lg,
          borderRadius: Radius.lg,
          backgroundColor: Colors.surface.glass,
          borderWidth: 2,
          borderColor: isSelected ? Colors.green.DEFAULT : Colors.surface.glassBorder,
          marginBottom: Spacing.md,
        },
        selectedGlow: {
          backgroundColor: theme.scheme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.05)',
          elevation: isSelected ? 4 : 0,
          shadowColor: Colors.green.DEFAULT,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        iconWrapper: {
          width: 48,
          height: 48,
          borderRadius: Radius.md,
          backgroundColor: isSelected ? Colors.green.DEFAULT : Colors.surface.elevated,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: Spacing.md,
        },
        textContainer: {
          flex: 1,
        },
        title: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 4,
          letterSpacing: 0.2,
        },
        description: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          lineHeight: 18,
        },
        selectionRing: {
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isSelected ? Colors.green.DEFAULT : Colors.border.muted,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: Spacing.md,
        },
        selectionDot: {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Radius, Typography, isSelected, theme.scheme]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.selectedGlow,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        style,
      ]}
    >
      <View style={styles.iconWrapper}>
        <Feather 
          name={iconName} 
          size={24} 
          color={isSelected ? '#FFFFFF' : Colors.text.heading} 
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.selectionRing}>
        {isSelected && <View style={styles.selectionDot} />}
      </View>
    </Pressable>
  );
};

export default MethodSelectionCard;