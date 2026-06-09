// ─────────────────────────────────────────────────────────────────────────────
// HorizontalScrollRow.tsx — GardenPulse
// Swipeable layout wrapper for side-scrolling cards, chips, or task lists.
// Automatically handles item spacing (gap) and hides scroll indicators.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface HorizontalScrollRowProps {
  /** The child elements (cards, chips, etc.) to scroll horizontally */
  children: React.ReactNode;
  /** Custom gap size between items (defaults to Spacing.md) */
  gap?: number;
  /** Adds padding to the left and right edges of the scrollable content */
  edgePadding?: boolean;
  /** Outer container style */
  style?: ViewStyle;
  /** Inner scroll content style */
  contentContainerStyle?: ViewStyle;
  /** Whether to show the native horizontal scrollbar */
  showsScrollIndicator?: boolean;
}

const HorizontalScrollRow: React.FC<HorizontalScrollRowProps> = ({
  children,
  gap,
  edgePadding = false,
  style,
  contentContainerStyle,
  showsScrollIndicator = false,
}) => {
  const theme = useTheme();
  const { Spacing } = theme;

  const itemGap = gap ?? Spacing.md;
  const paddingAmount = edgePadding ? Spacing.lg : 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 0, // Prevents ScrollView from expanding infinitely
        },
        content: {
          alignItems: 'center',
          gap: itemGap,
          paddingHorizontal: paddingAmount,
        },
      }),
    [itemGap, paddingAmount]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showsScrollIndicator}
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      // Snappy scrolling behavior for mobile
      decelerationRate="fast"
      overScrollMode="never" // Cleaner Android edge behavior
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScrollRow;