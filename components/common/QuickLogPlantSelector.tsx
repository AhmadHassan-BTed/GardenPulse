// ─────────────────────────────────────────────────────────────────────────────
// QuickLogPlantSelector.tsx — GardenPulse
// Horizontal scroll of plant thumbnails; pre-fills if context provided.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import HorizontalScrollRow from './HorizontalScrollRow';

export interface CompactPlant {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface QuickLogPlantSelectorProps {
  plants: CompactPlant[];
  selectedId: string | null; // null represents "All Plants / General Garden"
  onSelect: (id: string | null) => void;
  style?: ViewStyle;
}

const QuickLogPlantSelector: React.FC<QuickLogPlantSelectorProps> = ({
  plants,
  selectedId,
  onSelect,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: Spacing.sm,
        },
        itemWrapper: {
          alignItems: 'center',
          width: 64, // Fixed width to ensure text wraps predictably
        },
        circleBox: {
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 6,
          borderWidth: 2,
          position: 'relative',
        },
        selectedBox: {
          borderColor: Colors.green.DEFAULT,
        },
        unselectedBox: {
          borderColor: 'transparent',
        },
        image: {
          width: '100%',
          height: '100%',
          borderRadius: 28,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        allPlantsIconWrapper: {
          width: '100%',
          height: '100%',
          borderRadius: 28,
          backgroundColor: isDark ? Colors.surface.glassBorder : '#E5E7EB',
          justifyContent: 'center',
          alignItems: 'center',
        },
        checkmarkBadge: {
          position: 'absolute',
          bottom: -2,
          right: -2,
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: 10,
          padding: 2,
          borderWidth: 2,
          borderColor: Colors.surface.base,
        },
        label: {
          fontSize: 10,
          fontWeight: Typography.weights.medium,
          color: Colors.text.heading,
          textAlign: 'center',
        },
        selectedLabel: {
          fontWeight: Typography.weights.bold,
          color: Colors.green.DEFAULT,
        },
      }),
    [Colors, Spacing, Typography, isDark]
  );

  return (
    <HorizontalScrollRow gap={Spacing.md} style={[styles.container, style]}>
      {/* "General Garden / All Plants" Option */}
      <Pressable style={styles.itemWrapper} onPress={() => onSelect(null)}>
        <View style={[styles.circleBox, selectedId === null ? styles.selectedBox : styles.unselectedBox]}>
          <View style={styles.allPlantsIconWrapper}>
            <Feather name="layers" size={24} color={Colors.text.muted} />
          </View>
          {selectedId === null && (
            <View style={styles.checkmarkBadge}>
              <Feather name="check" size={10} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={[styles.label, selectedId === null && styles.selectedLabel]} numberOfLines={2}>
          General
        </Text>
      </Pressable>

      {/* Individual Plants */}
      {plants.map((plant) => {
        const isSelected = selectedId === plant.id;
        
        return (
          <Pressable key={plant.id} style={styles.itemWrapper} onPress={() => onSelect(plant.id)}>
            <View style={[styles.circleBox, isSelected ? styles.selectedBox : styles.unselectedBox]}>
              <Image 
                source={plant.imageUrl ? { uri: plant.imageUrl } : require('../../assets/placeholder-plant.png')} 
                style={styles.image} 
              />
              {isSelected && (
                <View style={styles.checkmarkBadge}>
                  <Feather name="check" size={10} color="#FFFFFF" />
                </View>
              )}
            </View>
            <Text style={[styles.label, isSelected && styles.selectedLabel]} numberOfLines={2}>
              {plant.name}
            </Text>
          </Pressable>
        );
      })}
    </HorizontalScrollRow>
  );
};

export default QuickLogPlantSelector;