// ─────────────────────────────────────────────────────────────────────────────
// PlantHeroImage.tsx — GardenPulse
// Full-width photo with photo count badge overlay + Add Photo button overlay.
// Used on SCR-03.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface PlantHeroImageProps {
  /** Image URI (null shows placeholder) */
  imageUrl?: string | null;
  /** Number of photos in the gallery */
  photoCount?: number;
  /** Press handler for the image area */
  onPress?: () => void;
  /** Press handler for the add photo button */
  onAddPhoto?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const PlantHeroImage: React.FC<PlantHeroImageProps> = ({
  imageUrl,
  photoCount = 0,
  onPress,
  onAddPhoto,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          height: 220,
          borderRadius: Radius.lg,
          overflow: 'hidden',
          backgroundColor: Colors.surface.subtle,
        },
        image: {
          width: '100%',
          height: '100%',
        },
        placeholder: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.surface.subtle,
        },
        placeholderText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          marginTop: Spacing.sm,
        },
        countBadge: {
          position: 'absolute',
          top: Spacing.sm,
          right: Spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.sm,
          paddingVertical: Spacing.xs,
        },
        countText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          color: '#FFFFFF',
        },
        addPhotoBtn: {
          position: 'absolute',
          bottom: Spacing.sm,
          right: Spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: Colors.green.DEFAULT,
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
        },
        addPhotoText: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.semibold,
          color: '#FFFFFF',
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress} style={StyleSheet.absoluteFill}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Feather name="camera" size={32} color={Colors.text.muted} />
            <Text style={styles.placeholderText}>No photo yet</Text>
          </View>
        )}
      </Pressable>

      {photoCount > 0 && (
        <View style={styles.countBadge}>
          <Feather name="image" size={12} color="#FFFFFF" />
          <Text style={styles.countText}>{photoCount}</Text>
        </View>
      )}

      {onAddPhoto && (
        <Pressable
          onPress={onAddPhoto}
          style={({ pressed }) => [
            styles.addPhotoBtn,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Feather name="plus" size={14} color="#FFFFFF" />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </Pressable>
      )}
    </View>
  );
};

export default PlantHeroImage;