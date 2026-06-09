// ─────────────────────────────────────────────────────────────────────────────
// CameraViewfinder.tsx — GardenPulse
// Overlay UI that sits on top of expo-camera for scanning and diagnostics.
// Handles safe layout, framing guides, flash toggles, and shutter.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../layout/ThemeProvider';

export interface CameraViewfinderProps {
  /** Mode changes the framing guide shape */
  mode: 'leaf' | 'barcode' | 'photo';
  /** Instruction text below the frame */
  instructionLabel?: string;
  /** Close button action */
  onClose: () => void;
  /** Flash toggle action */
  onToggleFlash: () => void;
  /** Is flash currently enabled? */
  isFlashOn: boolean;
  /** Shutter button action */
  onCapture: () => void;
  /** Optional gallery import fallback */
  onOpenGallery?: () => void;
}

const CameraViewfinder: React.FC<CameraViewfinderProps> = ({
  mode,
  instructionLabel,
  onClose,
  onToggleFlash,
  isFlashOn,
  onCapture,
  onOpenGallery,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { Colors, Spacing, Radius, Typography } = theme;

  // Pulse animation for the scanning frame border
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (mode === 'barcode' || mode === 'leaf') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [mode, pulseAnim]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'space-between',
          zIndex: 10,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Spacing.lg,
          paddingTop: Math.max(insets.top, Spacing.lg),
          paddingBottom: Spacing.md,
        },
        iconButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        centerArea: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        frame: {
          borderWidth: 2,
          borderColor: Colors.green.DEFAULT,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
        frameLeaf: {
          width: 200,
          height: 280,
          borderRadius: 100, // Elliptical leaf shape guide
          borderStyle: 'dashed',
        },
        frameBarcode: {
          width: 250,
          height: 250,
          borderRadius: Radius.lg,
        },
        instruction: {
          marginTop: Spacing.xl,
          color: '#FFFFFF',
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingHorizontal: Spacing.md,
          paddingVertical: 6,
          borderRadius: Radius.md,
          overflow: 'hidden',
        },
        footer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Spacing.xl,
          paddingBottom: Math.max(insets.bottom, Spacing.xl),
          paddingTop: Spacing.lg,
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        shutterRing: {
          width: 72,
          height: 72,
          borderRadius: 36,
          borderWidth: 4,
          borderColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
        },
        shutterButton: {
          width: 54,
          height: 54,
          borderRadius: 27,
          backgroundColor: '#FFFFFF',
        },
        sideButton: {
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [Colors, Spacing, Radius, Typography, insets]
  );

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Top Bar */}
      <View style={styles.header} pointerEvents="box-none">
        <Pressable onPress={onClose} style={styles.iconButton}>
          <Feather name="x" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={onToggleFlash} style={styles.iconButton}>
          <Feather name={isFlashOn ? 'zap' : 'zap-off'} size={24} color={isFlashOn ? Colors.green.DEFAULT : '#FFFFFF'} />
        </Pressable>
      </View>

      {/* Center Framing */}
      <View style={styles.centerArea} pointerEvents="none">
        {mode !== 'photo' && (
          <Animated.View
            style={[
              styles.frame,
              mode === 'leaf' ? styles.frameLeaf : styles.frameBarcode,
              { opacity: pulseAnim },
            ]}
          />
        )}
        {instructionLabel && <Text style={styles.instruction}>{instructionLabel}</Text>}
      </View>

      {/* Bottom Controls */}
      <View style={styles.footer} pointerEvents="box-none">
        <View style={styles.sideButton}>
          {onOpenGallery && (
            <Pressable onPress={onOpenGallery} style={styles.iconButton}>
              <Feather name="image" size={20} color="#FFFFFF" />
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={onCapture}
          style={({ pressed }) => [styles.shutterRing, pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }]}
        >
          <View style={styles.shutterButton} />
        </Pressable>

        <View style={styles.sideButton} />
      </View>
    </View>
  );
};

export default CameraViewfinder;