// ─────────────────────────────────────────────────────────────────────────────
// OnboardingProgressBar.tsx — GardenPulse
// Pill-style progress indicator with filled/unfilled segments.
// Used exclusively during the ONB-1 → ONB-4 flow.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface OnboardingProgressBarProps {
  /** The total number of steps in the flow (e.g., 3) */
  totalSteps: number;
  /** The current active step (1-indexed) */
  currentStep: number;
  /** Outer container style */
  style?: ViewStyle;
}

const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({
  totalSteps,
  currentStep,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: Spacing.sm,
          paddingVertical: Spacing.md,
        },
        segment: {
          height: 6,
          flex: 1,
          maxWidth: 40,
          borderRadius: Radius.full,
        },
        activeSegment: {
          backgroundColor: Colors.green.DEFAULT,
        },
        inactiveSegment: {
          backgroundColor: Colors.surface.glassBorder,
        },
      }),
    [Colors, Spacing, Radius]
  );

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        
        return (
          <View
            key={index}
            style={[
              styles.segment,
              isActive ? styles.activeSegment : styles.inactiveSegment,
            ]}
          />
        );
      })}
    </View>
  );
};

export default OnboardingProgressBar;