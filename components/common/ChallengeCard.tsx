// ─────────────────────────────────────────────────────────────────────────────
// ChallengeCard.tsx — GardenPulse
// Current weekly challenge card with countdown.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';

export interface ChallengeCardProps {
  title: string;
  countdownLabel: string; // e.g., "Ends in 2 days"
  entryCount: number;
  onSubmitPress: () => void;
  style?: ViewStyle;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  countdownLabel,
  entryCount,
  onSubmitPress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Spacing.sm,
          gap: Spacing.xs,
        },
        badgeText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.md,
          lineHeight: 24,
        },
        metaRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing.md,
        },
        metaItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        metaText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
        },
      }),
    [Colors, Spacing, Typography]
  );

  return (
    <CustomCard variant="accent" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Feather name="award" size={14} color={Colors.green.DEFAULT} />
        <Text style={styles.badgeText}>Weekly Challenge</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Feather name="clock" size={16} color={Colors.text.muted} />
          <Text style={styles.metaText}>{countdownLabel}</Text>
        </View>
        <View style={styles.metaItem}>
          <Feather name="image" size={16} color={Colors.text.muted} />
          <Text style={styles.metaText}>{entryCount} entries</Text>
        </View>
      </View>

      <CustomButton label="Submit Entry" onPress={onSubmitPress} fullWidth />
    </CustomCard>
  );
};

export default ChallengeCard;