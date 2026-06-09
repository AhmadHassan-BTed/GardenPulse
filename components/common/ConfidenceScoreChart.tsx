// ─────────────────────────────────────────────────────────────────────────────
// ConfidenceScoreChart.tsx — GardenPulse
// Horizontal bar list showing skill names and mastery levels (0-100).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface SkillScore {
  id: string;
  name: string;
  score: number; // 0 to 100
}

export interface ConfidenceScoreChartProps {
  title?: string;
  skills: SkillScore[];
  style?: ViewStyle;
}

const ConfidenceScoreChart: React.FC<ConfidenceScoreChartProps> = ({
  title = 'Grower Confidence',
  skills,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.md,
        },
        skillRow: {
          marginBottom: Spacing.sm,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 4,
        },
        skillName: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        skillScoreText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          fontWeight: Typography.weights.bold,
        },
        track: {
          height: 8,
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.glassBorder : '#E5E7EB',
          borderRadius: Radius.full,
          overflow: 'hidden',
        },
        fill: {
          height: '100%',
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
        },
      }),
    [Colors, Spacing, Radius, Typography, theme.scheme]
  );

  return (
    <CustomCard variant="default" padding={Spacing.lg} style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      
      {skills.map((skill) => {
        // Ensure score is bounded between 0 and 100
        const boundedScore = Math.max(0, Math.min(100, skill.score));
        
        return (
          <View key={skill.id} style={styles.skillRow}>
            <View style={styles.headerRow}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillScoreText}>{boundedScore}%</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${boundedScore}%` }]} />
            </View>
          </View>
        );
      })}
    </CustomCard>
  );
};

export default ConfidenceScoreChart;