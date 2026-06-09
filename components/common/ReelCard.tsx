// ─────────────────────────────────────────────────────────────────────────────
// ReelCard.tsx — GardenPulse
// 2-col grid card: video thumbnail + play overlay + plant name + date range.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import IconButton from './IconButton';

export interface ReelCardProps {
  plantName: string;
  thumbnailUrl?: string;
  dateRange: string;
  duration: string;
  onPlayPress: () => void;
  onSharePress: () => void;
  style?: ViewStyle;
}

const ReelCard: React.FC<ReelCardProps> = ({
  plantName,
  thumbnailUrl,
  dateRange,
  duration,
  onPlayPress,
  onSharePress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          margin: Spacing.xs,
          backgroundColor: Colors.surface.base,
          borderRadius: Radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
        },
        thumbnailArea: {
          height: 160,
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        },
        thumbnailImage: {
          width: '100%',
          height: '100%',
          position: 'absolute',
        },
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.2)', // Darken image slightly for contrast
        },
        playButton: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.25)',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.5)',
        },
        durationBadge: {
          position: 'absolute',
          bottom: Spacing.sm,
          right: Spacing.sm,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: Radius.sm,
        },
        durationText: {
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: Typography.weights.bold,
        },
        infoArea: {
          padding: Spacing.sm,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
          marginRight: Spacing.sm,
        },
        plantName: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 2,
        },
        dateRange: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPlayPress} style={styles.thumbnailArea}>
        <Image 
          source={thumbnailUrl ? { uri: thumbnailUrl } : require('../../assets/placeholder-plant.png')} 
          style={styles.thumbnailImage} 
          resizeMode="cover" 
        />
        <View style={styles.overlay} />
        <View style={styles.playButton}>
          <Feather name="play" size={20} color="#FFFFFF" style={{ marginLeft: 3 }} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </Pressable>
      
      <View style={styles.infoArea}>
        <View style={styles.textContainer}>
          <Text style={styles.plantName} numberOfLines={1}>{plantName}</Text>
          <Text style={styles.dateRange} numberOfLines={1}>{dateRange}</Text>
        </View>
        <IconButton name="share" size={18} color={Colors.text.muted} onPress={onSharePress} />
      </View>
    </View>
  );
};

export default ReelCard;