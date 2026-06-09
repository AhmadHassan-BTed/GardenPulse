// ─────────────────────────────────────────────────────────────────────────────
// NativeAdCard.tsx — GardenPulse
// Container for AdMob native ad units. Styled to match surrounding content cards
// but clearly marked with an "Ad" attribution badge to comply with policies.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface NativeAdCardProps {
  /** The actual AdMob UI component will be passed as children here */
  children: React.ReactNode;
  /** Outer container style */
  style?: ViewStyle;
}

const NativeAdCard: React.FC<NativeAdCardProps> = ({ children, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.md,
        },
        adBadge: {
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: Colors.green.DEFAULT,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderTopLeftRadius: Radius.lg - 1, // Matches card inner radius
          borderBottomRightRadius: Radius.sm,
          zIndex: 10,
        },
        adText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  return (
    <View style={[styles.container, style]}>
      <CustomCard padding={Spacing.md} style={{ position: 'relative' }}>
        <View style={styles.adBadge}>
          <Text style={styles.adText}>Ad</Text>
        </View>
        
        {/* Placeholder wrapper for the native ad view */}
        <View style={{ marginTop: Spacing.sm }}>
          {children}
        </View>
      </CustomCard>
    </View>
  );
};

export default NativeAdCard;