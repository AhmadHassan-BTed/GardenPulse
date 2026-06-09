// ─────────────────────────────────────────────────────────────────────────────
// MetricsQuickEntry.tsx — GardenPulse
// Expandable optional row: pH slider + EC/PPM field + Moisture % + Temp.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomInput from './CustomInput';
import CustomSlider from './CustomSlider';

export interface MetricsQuickEntryProps {
  phValue: number;
  onPhChange: (val: number) => void;
  ecValue: string;
  onEcChange: (val: string) => void;
  moistureValue: string;
  onMoistureChange: (val: string) => void;
  tempValue: string;
  onTempChange: (val: string) => void;
  style?: ViewStyle;
}

const MetricsQuickEntry: React.FC<MetricsQuickEntryProps> = ({
  phValue,
  onPhChange,
  ecValue,
  onEcChange,
  moistureValue,
  onMoistureChange,
  tempValue,
  onTempChange,
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
          borderColor: Colors.surface.glassBorder,
          borderRadius: Radius.md,
          overflow: 'hidden',
          marginBottom: Spacing.md,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: Spacing.md,
          backgroundColor: expanded ? Colors.surface.glass : 'transparent',
        },
        headerLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        title: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
        },
        content: {
          padding: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          gap: Spacing.md,
        },
        row: {
          flexDirection: 'row',
          gap: Spacing.md,
        },
        inputWrapper: {
          flex: 1,
        },
      }),
    [Colors, Spacing, Radius, Typography, expanded]
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.header} onPress={toggleExpand}>
        <View style={styles.headerLeft}>
          <Feather name="bar-chart-2" size={18} color={Colors.text.muted} />
          <Text style={styles.title}>Log Optional Metrics</Text>
        </View>
        <Feather name={expanded ? "chevron-up" : "chevron-down"} size={20} color={Colors.text.muted} />
      </Pressable>

      {expanded && (
        <View style={styles.content}>
          <CustomSlider
            label="pH Level"
            value={phValue}
            onValueChange={onPhChange}
          />
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <CustomInput
                label="EC / PPM"
                value={ecValue}
                onChangeText={onEcChange}
                keyboardType="numeric"
                placeholder="e.g. 1.2"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInput
                label="Moisture %"
                value={moistureValue}
                onChangeText={onMoistureChange}
                keyboardType="numeric"
                placeholder="e.g. 45"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInput
                label="Temp"
                value={tempValue}
                onChangeText={onTempChange}
                keyboardType="numeric"
                placeholder="°C / °F"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MetricsQuickEntry;