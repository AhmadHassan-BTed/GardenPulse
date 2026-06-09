// ─────────────────────────────────────────────────────────────────────────────
// ToolCard.tsx — GardenPulse
// 2-col grid card acting as an entry point for tools.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface ToolCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Feather.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  iconName,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardOverride: {
          flex: 1,
          margin: Spacing.xs,
          minHeight: 140,
        },
        container: {
          flex: 1,
          justifyContent: 'space-between',
        },
        iconWrapper: {
          width: 40,
          height: 40,
          borderRadius: Radius.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.sm,
        },
        title: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 4,
        },
        description: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          lineHeight: 16,
          marginBottom: Spacing.md,
        },
        footer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        openText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
          marginRight: 4,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard variant="default" padding={Spacing.md} onPress={onPress} style={[styles.cardOverride, style]}>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <Feather name={iconName} size={20} color={Colors.green.DEFAULT} />
          </View>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.openText}>Open</Text>
          <Feather name="arrow-right" size={14} color={Colors.green.DEFAULT} />
        </View>
      </View>
    </CustomCard>
  );
};

export default ToolCard;