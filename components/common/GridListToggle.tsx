// ─────────────────────────────────────────────────────────────────────────────
// GridListToggle.tsx — GardenPulse
// Icon pair to switch between 2-col grid and list view for SCR-02.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface GridListToggleProps {
  /** True if currently in grid view, False if list view */
  isGrid: boolean;
  /** Callback fired when toggled */
  onToggle: (toGrid: boolean) => void;
  /** Outer container style */
  style?: ViewStyle;
}

const GridListToggle: React.FC<GridListToggleProps> = ({ isGrid, onToggle, style }) => {
  const theme = useTheme();
  const { Colors, Radius } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.sm,
          padding: 4,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
        },
        button: {
          padding: 6,
          borderRadius: Radius.sm,
        },
        activeButton: {
          backgroundColor: Colors.surface.glass,
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
      }),
    [Colors, Radius]
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => onToggle(false)}
        style={[styles.button, !isGrid && styles.activeButton]}
        hitSlop={8}
      >
        <Feather 
          name="list" 
          size={18} 
          color={!isGrid ? Colors.text.heading : Colors.text.muted} 
        />
      </Pressable>
      
      <Pressable
        onPress={() => onToggle(true)}
        style={[styles.button, isGrid && styles.activeButton]}
        hitSlop={8}
      >
        <Feather 
          name="grid" 
          size={18} 
          color={isGrid ? Colors.text.heading : Colors.text.muted} 
        />
      </Pressable>
    </View>
  );
};

export default GridListToggle;