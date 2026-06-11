// ─────────────────────────────────────────────────────────────────────────────
// ScreenWrapper.tsx — GardenPulse
// Global container to handle safe areas, keyboard avoidance, and scrolling.
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

export interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withPadding?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  edges?: Edge[];
  backgroundColor?: string;
}

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

  const staticContent = (
    <View style={[styles.innerWrapper, withPadding && styles.paddingBox, style]}>
      {children}
    </View>
  );

  const scrollContent = (
    <ScrollView
      style={[styles.innerWrapper, style]}
      contentContainerStyle={[
        styles.scrollContent,
        withPadding && styles.paddingBox,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled" // FIXED: Ensures tapping buttons works while keyboard is open
      keyboardDismissMode="on-drag" // ADDED: Better UX for forms
      bounces={true} 
    >
      {children}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.root} edges={edges}>
      <StatusBar style={isDark ? 'light' : 'dark'} translucent />

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? scrollContent : staticContent}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;