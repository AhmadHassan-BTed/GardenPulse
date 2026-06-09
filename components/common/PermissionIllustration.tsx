// ─────────────────────────────────────────────────────────────────────────────
// PermissionIllustration.tsx — GardenPulse
// Context-specific illustrated icon: map-pin+leaf / camera+leaf / mic+waveform / bell+leaf[cite: 1].
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export type PermissionType = 'location' | 'camera' | 'microphone' | 'notifications';

export interface PermissionIllustrationProps {
  type: PermissionType;
  style?: ViewStyle;
}

const PermissionIllustration: React.FC<PermissionIllustrationProps> = ({ type, style }) => {
  const theme = useTheme();
  const { Colors, Radius } = theme;

  const iconMap: Record<PermissionType, { primary: keyof typeof Feather.glyphMap; modifier: keyof typeof Feather.glyphMap }> = {
    location: { primary: 'map-pin', modifier: 'wind' }, // using wind as a leaf substitute
    camera: { primary: 'camera', modifier: 'wind' },
    microphone: { primary: 'mic', modifier: 'activity' }, // waveform substitute
    notifications: { primary: 'bell', modifier: 'wind' },
  };

  const { primary, modifier } = iconMap[type];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 80,
          height: 80,
          borderRadius: Radius.full,
          backgroundColor: `${Colors.green.DEFAULT}20`,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        },
        modifierBadge: {
          position: 'absolute',
          bottom: 12,
          right: 12,
          backgroundColor: Colors.surface.base,
          borderRadius: Radius.full,
          padding: 2,
        },
      }),
    [Colors, Radius]
  );

  return (
    <View style={[styles.container, style]}>
      <Feather name={primary} size={36} color={Colors.green.DEFAULT} />
      <View style={styles.modifierBadge}>
        <Feather name={modifier} size={16} color={Colors.green.DEFAULT} />
      </View>
    </View>
  );
};

export default PermissionIllustration;