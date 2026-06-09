// ─────────────────────────────────────────────────────────────────────────────
// VoiceInputButton.tsx — GardenPulse
// Mic icon button that triggers permission check then recording.
// Shows recording indicator + delete. Used in SCR-03, MOD-01, SCR-14.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export type VoiceInputState = 'idle' | 'recording' | 'processing';

export interface VoiceInputButtonProps {
  /** Current recording state */
  state?: VoiceInputState;
  /** Press handler — triggers recording or cancels */
  onPress?: () => void;
  /** Long press for cancel/delete */
  onLongPress?: () => void;
  /** Button size */
  size?: number;
  /** Outer style override */
  style?: ViewStyle;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  state = 'idle',
  onPress,
  onLongPress,
  size = 48,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const isRecording = state === 'recording';
  const isProcessing = state === 'processing';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        idleBg: {
          backgroundColor: Colors.surface.glass,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
        },
        recordingBg: {
          backgroundColor: Colors.text.error,
        },
        processingBg: {
          backgroundColor: Colors.green.tint,
          borderWidth: 1,
          borderColor: Colors.green.DEFAULT,
        },
        pulse: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: size / 2,
          backgroundColor: Colors.text.error,
          opacity: 0.3,
        },
        label: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
          marginTop: Spacing.xs,
          textAlign: 'center',
        },
      }),
    [Colors, Spacing, Radius, Typography, size],
  );

  const iconName = isRecording ? 'mic-off' : isProcessing ? 'loader' : 'mic';
  const iconColor = isRecording ? '#FFFFFF' : isProcessing ? Colors.green.DEFAULT : Colors.text.body;

  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.button,
          isRecording ? styles.recordingBg : isProcessing ? styles.processingBg : styles.idleBg,
          pressed && { opacity: 0.7 },
          style,
        ]}
      >
        {isRecording && <View style={styles.pulse} />}
        <Feather name={iconName} size={20} color={iconColor} />
      </Pressable>
      <Text style={styles.label}>
        {isRecording ? 'Tap to stop' : isProcessing ? 'Processing…' : 'Voice note'}
      </Text>
    </View>
  );
};

export default VoiceInputButton;