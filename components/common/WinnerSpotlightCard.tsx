// ─────────────────────────────────────────────────────────────────────────────
// WinnerSpotlightCard.tsx — GardenPulse
// Past challenge winner: anonymised photo + method badge + prize + featured label.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

export interface WinnerSpotlightCardProps {
  username: string;
  avatarUrl?: string;
  photoUrl?: string;
  methodTag: string;
  prizeLabel: string;
  challengeName: string;
  style?: ViewStyle;
}

const WinnerSpotlightCard: React.FC<WinnerSpotlightCardProps> = ({
  username,
  avatarUrl,
  photoUrl,
  methodTag,
  prizeLabel,
  challengeName,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
          overflow: 'hidden',
        },
        imageArea: {
          height: 180,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          position: 'relative',
        },
        mainImage: {
          width: '100%',
          height: '100%',
        },
        featuredBadge: {
          position: 'absolute',
          top: Spacing.md,
          left: Spacing.md,
          backgroundColor: '#F59E0B', // Gold/Amber
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: Radius.sm,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        featuredText: {
          color: '#FFFFFF',
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
          textTransform: 'uppercase',
        },
        prizeBadge: {
          position: 'absolute',
          top: Spacing.md,
          right: Spacing.md,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: Radius.sm,
        },
        prizeText: {
          color: '#FFFFFF',
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
        },
        detailsArea: {
          padding: Spacing.md,
        },
        challengeName: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          marginBottom: Spacing.xs,
        },
        userRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        userInfo: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        avatar: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: isDark ? Colors.surface.glassBorder : '#E5E7EB',
        },
        username: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        methodChip: {
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: Radius.sm,
        },
        methodText: {
          fontSize: 10,
          color: Colors.text.muted,
          fontWeight: Typography.weights.bold,
          textTransform: 'uppercase',
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <CustomCard variant="default" padding={0} style={[styles.container, style]}>
      <View style={styles.imageArea}>
        <Image 
          source={photoUrl ? { uri: photoUrl } : require('../../assets/placeholder-plant.png')} 
          style={styles.mainImage} 
          resizeMode="cover" 
        />
        <View style={styles.featuredBadge}>
          <Feather name="star" size={12} color="#FFFFFF" />
          <Text style={styles.featuredText}>Featured Winner</Text>
        </View>
        <View style={styles.prizeBadge}>
          <Text style={styles.prizeText}> {prizeLabel}</Text>
        </View>
      </View>

      <View style={styles.detailsArea}>
        <Text style={styles.challengeName}>{challengeName}</Text>
        <View style={styles.userRow}>
          <View style={styles.userInfo}>
            <Image 
              source={avatarUrl ? { uri: avatarUrl } : require('../../assets/placeholder-avatar.png')} 
              style={styles.avatar} 
            />
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.methodChip}>
            <Text style={styles.methodText}>{methodTag}</Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default WinnerSpotlightCard;