// ─────────────────────────────────────────────────────────────────────────────
// ScreenWrapper.tsx — GardenPulse
// Global container to handle safe areas, keyboard avoidance, and scrolling.
//
// • Automatically manages notch padding via SafeAreaView.
// • Toggles seamlessly between a static View and a ScrollView.
// • Adjusts for the software keyboard on iOS/Android.
// • Inherits the global background colour to match your light/dark aesthetic.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../layout/ThemeProvider';

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface ScreenWrapperProps {
  /** The screen content */
  children: React.ReactNode;
  /** Set to true if the screen content needs to scroll */
  scrollable?: boolean;
  /** Automatically applies your theme's horizontal padding (Spacing.lg) */
  withPadding?: boolean;
  /** Override styles for the inner container */
  style?: ViewStyle;
  /** Override styles for the scrollable content container */
  contentContainerStyle?: ViewStyle;
  /** * Which safe area edges to protect. 
   * Default is top only, as bottom tabs usually handle their own bottom inset.
   */
  edges?: Edge[];
  /** Optional background colour override if you want to break from the theme */
  backgroundColor?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  withPadding = false,
  style,
  contentContainerStyle,
  edges = ['top', 'left', 'right'],
  backgroundColor,
}) => {
  const theme = useTheme();
  const { Colors, Spacing } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: backgroundColor || Colors.surface.base,
        },
        keyboardAvoiding: {
          flex: 1,
        },
        innerWrapper: {
          flex: 1,
        },
        scrollContent: {
          flexGrow: 1,
        },
        paddingBox: {
          paddingHorizontal: Spacing.lg,
        },
      }),
    [Colors, Spacing, backgroundColor]
  );

  // ── Static Layout ───────────────────────────────────────────────────────────
  const staticContent = (
    <View style={[styles.innerWrapper, withPadding && styles.paddingBox, style]}>
      {children}
    </View>
  );

  // ── Scrollable Layout ───────────────────────────────────────────────────────
  const scrollContent = (
    <ScrollView
      style={[styles.innerWrapper, style]}
      contentContainerStyle={[
        styles.scrollContent,
        withPadding && styles.paddingBox,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // Bounce effect works beautifully for modern UI, but can be disabled if needed
      bounces={true} 
    >
      {children}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.root} edges={edges}>
      {/* Automatically shifts status bar text colour based on your theme */}
      <StatusBar style={isDark ? 'light' : 'dark'} translucent />

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {scrollable ? scrollContent : staticContent}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;