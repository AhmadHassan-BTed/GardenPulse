// ─────────────────────────────────────────────────────────────────────────────
// DiagnosisResultCard.tsx — GardenPulse
// Plant ID + confidence + issue + severity + explanation + actions + tip link.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import TextLink from './TextLink';
import SeverityIndicator, { SeverityLevel } from './SeverityIndicator';

export interface DiagnosisResultCardProps {
  plantId: string;
  confidence: number;
  issue: string;
  severity: SeverityLevel;
  explanation: string;
  onTreatIssue: () => void;
  onReadMore: () => void;
  style?: ViewStyle;
}

const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  plantId,
  confidence,
  issue,
  severity,
  explanation,
  onTreatIssue,
  onReadMore,
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
        header: {
          marginBottom: Spacing.md,
        },
        confidenceRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        },
        plantName: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          textTransform: 'uppercase',
          fontWeight: Typography.weights.bold,
          letterSpacing: 0.5,
        },
        confidenceText: {
          fontSize: Typography.sizes.xs,
          color: Colors.green.DEFAULT,
          fontWeight: Typography.weights.bold,
        },
        issueTitle: {
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.sm,
          marginTop: 2,
        },
        explanationBox: {
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.elevated : '#F9FAFB',
          padding: Spacing.md,
          borderRadius: theme.Radius.md,
          marginBottom: Spacing.lg,
        },
        explanationText: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          lineHeight: 22,
        },
        actions: {
          gap: Spacing.md,
        },
      }),
    [Colors, Spacing, Typography, theme.scheme, theme.Radius]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.confidenceRow}>
          <Text style={styles.plantName}>{plantId}</Text>
          <Text style={styles.confidenceText}>{confidence}% Match</Text>
        </View>
        <Text style={styles.issueTitle}>{issue}</Text>
        <SeverityIndicator level={severity} />
      </View>

      <View style={styles.explanationBox}>
        <Text style={styles.explanationText}>{explanation}</Text>
      </View>

      <View style={styles.actions}>
        <CustomButton label="View Treatment Plan" onPress={onTreatIssue} fullWidth />
        <TextLink label="Read detailed article →" onPress={onReadMore} variant="muted" style={{ alignSelf: 'center' }} />
      </View>
    </CustomCard>
  );
};

export default DiagnosisResultCard;