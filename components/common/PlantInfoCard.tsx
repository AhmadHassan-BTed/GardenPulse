// ─────────────────────────────────────────────────────────────────────────────
// PlantInfoCard.tsx — GardenPulse
// Species + common name + method badge + stage chip + zone + container size.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import GrowingStageChip, { GrowingStage } from './GrowingStageChip';
import ZoneBadge from './ZoneBadge';
import IconButton from './IconButton';

export interface PlantInfoCardProps {
  commonName: string;
  species: string;
  method: string;
  stage: GrowingStage;
  dateAdded: string;
  zone: string;
  containerSize?: string;
  onEdit: () => void;
  style?: ViewStyle;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({
  commonName,
  species,
  method,
  stage,
  dateAdded,
  zone,
  containerSize,
  onEdit,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: Spacing.md,
        },
        titleBox: {
          flex: 1,
        },
        commonName: {
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        species: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          fontStyle: 'italic',
          marginTop: 2,
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Spacing.md,
          marginTop: Spacing.sm,
        },
        gridItem: {
          width: '45%', // Two columns
          marginBottom: Spacing.sm,
        },
        gridLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginBottom: 4,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        methodChip: {
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: Radius.sm,
          alignSelf: 'flex-start',
        },
        methodText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.body,
          fontWeight: Typography.weights.bold,
          textTransform: 'uppercase',
        },
        valueText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.heading,
          fontWeight: Typography.weights.medium,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard padding={Spacing.lg} style={style}>
      <View style={styles.headerRow}>
        <View style={styles.titleBox}>
          <Text style={styles.commonName}>{commonName}</Text>
          <Text style={styles.species}>{species}</Text>
        </View>
        <IconButton name="edit-2" size={20} color={Colors.text.muted} onPress={onEdit} filled />
      </View>

      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Growing Method</Text>
          <View style={styles.methodChip}>
            <Text style={styles.methodText}>{method}</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Current Stage</Text>
          <GrowingStageChip stage={stage} />
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Planted / Added</Text>
          <Text style={styles.valueText}>
            <Feather name="calendar" size={12} color={Colors.text.muted} /> {dateAdded}
          </Text>
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Environment</Text>
          <ZoneBadge zone={zone} style={{ backgroundColor: 'transparent', paddingHorizontal: 0, borderWidth: 0 }} />
        </View>

        {containerSize && (
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Container Size</Text>
            <Text style={styles.valueText}>{containerSize}</Text>
          </View>
        )}
      </View>
    </CustomCard>
  );
};

export default PlantInfoCard;