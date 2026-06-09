// ─────────────────────────────────────────────────────────────────────────────
// PhotoCaptureArea.tsx — GardenPulse
// Large tap-to-capture zone with camera icon + gallery import icon.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import IconButton from './IconButton';

export interface PhotoCaptureAreaProps {
  capturedPhotoUri?: string | null;
  onOpenCamera: () => void;
  onOpenGallery: () => void;
  onClearPhoto: () => void;
  style?: ViewStyle;
}

const PhotoCaptureArea: React.FC<PhotoCaptureAreaProps> = ({
  capturedPhotoUri,
  onOpenCamera,
  onOpenGallery,
  onClearPhoto,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          height: 180,
          borderRadius: Radius.lg,
          backgroundColor: theme.scheme === 'dark' ? Colors.surface.elevated : '#F3F4F6',
          borderWidth: 2,
          borderColor: Colors.border.subtle,
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginBottom: Spacing.md,
          ...style,
        },
        emptyState: {
          alignItems: 'center',
          gap: Spacing.sm,
        },
        label: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.medium,
          color: Colors.text.muted,
        },
        actionsRow: {
          flexDirection: 'row',
          gap: Spacing.lg,
          marginTop: Spacing.sm,
        },
        actionBtn: {
          alignItems: 'center',
          gap: 4,
        },
        actionText: {
          fontSize: Typography.sizes.xs,
          color: Colors.green.DEFAULT,
          fontWeight: Typography.weights.bold,
        },
        previewImage: {
          width: '100%',
          height: '100%',
        },
        clearBtn: {
          position: 'absolute',
          top: Spacing.sm,
          right: Spacing.sm,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 20,
          padding: 4,
        },
      }),
    [Colors, Spacing, Radius, Typography, theme.scheme, style]
  );

  if (capturedPhotoUri) {
    return (
      <View style={[styles.container, { borderStyle: 'solid', borderColor: 'transparent' }]}>
        <Image source={{ uri: capturedPhotoUri }} style={styles.previewImage} resizeMode="cover" />
        <Pressable style={styles.clearBtn} onPress={onClearPhoto}>
          <Feather name="x" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.emptyState}>
        <Feather name="camera" size={32} color={Colors.text.muted} />
        <Text style={styles.label}>Add a photo (Optional)</Text>
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={onOpenCamera} hitSlop={8}>
            <Text style={styles.actionText}>Take Photo</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onOpenGallery} hitSlop={8}>
            <Text style={styles.actionText}>Camera Roll</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PhotoCaptureArea;