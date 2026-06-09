// ─────────────────────────────────────────────────────────────────────────────
// DataInventoryRow.tsx — GardenPulse
// Expandable row for Privacy Dashboard: data category + storage + actions.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, LayoutAnimation } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

export interface DataInventoryRowProps {
  category: string; // e.g., "Plant logs"
  lastUpdated?: string; // e.g., "Oct 12, 2023"
  sizeEstimate?: string; // e.g., "2.4 MB"
  count?: number; // e.g., 42 entries
  onClear?: () => void;
  onExport?: () => void;
  onDeleteAll?: () => void;
  style?: ViewStyle;
}

const DataInventoryRow: React.FC<DataInventoryRowProps> = ({
  category,
  lastUpdated,
  sizeEstimate,
  count,
  onClear,
  onExport,
  onDeleteAll,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          borderRadius: Radius.md,
          marginBottom: Spacing.sm,
          overflow: 'hidden',
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: Spacing.md,
        },
        headerLeft: {
          flex: 1,
        },
        title: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.semibold,
          color: Colors.text.heading,
          marginBottom: 2,
        },
        subtitle: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
        expandedArea: {
          paddingHorizontal: Spacing.md,
          paddingBottom: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          paddingTop: Spacing.md,
          gap: Spacing.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  // Construct subtitle string
  const subtitleParts = [];
  if (count !== undefined) subtitleParts.push(`${count} entries`);
  if (sizeEstimate) subtitleParts.push(sizeEstimate);
  if (lastUpdated) subtitleParts.push(`Last: ${lastUpdated}`);
  const subtitleText = subtitleParts.join(' · ');

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.headerRow} onPress={toggleExpand}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{category}</Text>
          {subtitleText ? <Text style={styles.subtitle}>{subtitleText}</Text> : null}
        </View>
        <Feather 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={Colors.text.muted} 
        />
      </Pressable>

      {expanded && (
        <View style={styles.expandedArea}>
          {onExport && (
            <CustomButton 
              label="Export Data" 
              variant="secondary" 
              onPress={onExport} 
            />
          )}
          {onClear && (
            <CustomButton 
              label="Clear History" 
              variant="secondary" 
              onPress={onClear} 
            />
          )}
          {onDeleteAll && (
            <CustomButton 
              label="Delete All" 
              onPress={onDeleteAll} 
              style={{ backgroundColor: Colors.text.error }} // Danger button override
            />
          )}
        </View>
      )}
    </View>
  );
};

export default DataInventoryRow;