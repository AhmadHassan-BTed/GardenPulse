// ─────────────────────────────────────────────────────────────────────────────
// BottomSheetModal.tsx — GardenPulse
// Theme-aware bottom sheet that slides up from the bottom of the screen.
// - Animated translateY entry/exit (spring physics on open, timing on close)
// - Semi-transparent backdrop with fade — tap to dismiss
// - Drag handle indicator at the top of the sheet
// - Optional title + subtitle header
// - Snap-close on swipe-down (PanResponder gesture)
// - Full keyboard-avoidance via KeyboardAvoidingView
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const INITIAL_Y = SCREEN_HEIGHT;
const SNAP_THRESHOLD = 80;

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  sheetHeight?: number;
  sheetStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  hideHandle?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  closeOnBackdrop = true,
  sheetHeight,
  sheetStyle,
  backdropStyle,
  hideHandle = false,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, justifyContent: 'flex-end' },
        backdrop: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: Colors.surface.overlay,
        },
        sheet: {
          borderTopLeftRadius: Radius.xl,
          borderTopRightRadius: Radius.xl,
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          borderBottomWidth: 0,
          elevation: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.18,
          shadowRadius: 20,
          overflow: 'hidden',
        },
        autoSheet: { maxHeight: SCREEN_HEIGHT * 0.88 },
        handle: {
          alignSelf: 'center',
          width: 40,
          height: 4,
          borderRadius: Radius.full,
          backgroundColor: Colors.border.muted,
          marginTop: Spacing.md,
          marginBottom: Spacing.sm,
        },
        header: {
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.sm,
          paddingBottom: Spacing.md,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          letterSpacing: 0.2,
        },
        subtitle: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.regular,
          color: Colors.text.muted,
          marginTop: 4,
          lineHeight: 18,
        },
        divider: {
          height: 1,
          backgroundColor: Colors.border.subtle,
          marginHorizontal: Spacing.lg,
        },
        body: { padding: Spacing.lg },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  // translateY: 0 = fully visible, positive = off-screen below
  const translateY   = useRef(new Animated.Value(INITIAL_Y)).current;
  const backdropOpac = useRef(new Animated.Value(0)).current;

  const openSheet = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0, useNativeDriver: true,
        damping: 18, stiffness: 220, mass: 0.9,
      }),
      Animated.timing(backdropOpac, {
        toValue: 1, duration: 260, useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpac]);

  const closeSheet = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: INITIAL_Y, duration: 280, useNativeDriver: true,
        }),
        Animated.timing(backdropOpac, {
          toValue: 0, duration: 240, useNativeDriver: true,
        }),
      ]).start(() => callback?.());
    },
    [translateY, backdropOpac],
  );

  useEffect(() => {
    if (visible) {
      translateY.setValue(INITIAL_Y);
      openSheet();
    } else {
      closeSheet();
    }
  }, [visible, openSheet, closeSheet]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => dy > 8,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > SNAP_THRESHOLD || vy > 0.5) {
          closeSheet(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0, useNativeDriver: true,
            damping: 20, stiffness: 260,
          }).start();
        }
      },
    }),
  ).current;

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdrop) closeSheet(onClose);
  }, [closeOnBackdrop, closeSheet, onClose]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => closeSheet(onClose)}
    >
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpac }, backdropStyle]}
          pointerEvents={closeOnBackdrop ? 'auto' : 'none'}
        >
          <Pressable style={StyleSheet.absoluteFillObject} onPress={handleBackdropPress} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            sheetHeight ? { height: sheetHeight } : styles.autoSheet,
            { transform: [{ translateY }] },
            sheetStyle,
          ]}
          {...panResponder.panHandlers}
        >
          {!hideHandle && <View style={styles.handle} />}

          {(title || subtitle) && (
            <View style={styles.header}>
              {title    && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          )}
          {(title || subtitle) && <View style={styles.divider} />}

          <View style={styles.body}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomSheetModal;
