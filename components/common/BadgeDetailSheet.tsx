// ─────────────────────────────────────────────────────────────────────────────
// BadgeDetailSheet.tsx — GardenPulse
// Bottom sheet displaying badge details, unlock criteria, and share action.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import BottomSheetModal from './BottomSheetModal'; // Assumes existence from previous index barrel
import CustomButton from './CustomButton';

export interface BadgeDetails {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  isEarned: boolean;
  earnedDate?: string;
  unlockCriteria: string;
  color?: string; // Hex color for the badge
}

export interface BadgeDetailSheetProps {
  visible: boolean;
  onClose: () => void;
  badge: BadgeDetails | null;
  onShare?: (badge: BadgeDetails) => void;
}

const BadgeDetailSheet: React.FC<BadgeDetailSheetProps> = ({
  visible,
  onClose,
  badge,
  onShare,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: {
          alignItems: 'center',
          paddingBottom: Spacing.xl,
        },
        iconContainer: {
          width: 96,
          height: 96,
          borderRadius: 48,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.lg,
          borderWidth: 3,
        },
        badgeName: {
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.xs,
          textAlign: 'center',
        },
        dateEarned: {
          fontSize: Typography.sizes.sm,
          color: Colors.green.DEFAULT,
          fontWeight: Typography.weights.medium,
          marginBottom: Spacing.lg,
        },
        lockedStatus: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
          marginBottom: Spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        descriptionBox: {
          backgroundColor: isDark ? Colors.surface.elevated : '#F9FAFB',
          padding: Spacing.md,
          borderRadius: Radius.md,
          width: '100%',
          marginBottom: Spacing.xl,
        },
        descriptionText: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: Spacing.md,
        },
        criteriaLabel: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          textTransform: 'uppercase',
          fontWeight: Typography.weights.bold,
          textAlign: 'center',
          marginBottom: 4,
        },
        criteriaText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.heading,
          textAlign: 'center',
        },
        actionArea: {
          width: '100%',
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  if (!badge) return null;

  const badgeColor = badge.color || Colors.green.DEFAULT;

  return (
    <BottomSheetModal visible={visible} onClose={onClose} title="Achievement">
      <View style={styles.content}>
        
        {/* Large Badge Icon */}
        <View 
          style={[
            styles.iconContainer,
            badge.isEarned 
              ? { borderColor: badgeColor, backgroundColor: `${badgeColor}15` }
              : { borderColor: Colors.border.muted, backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB' }
          ]}
        >
          <Feather 
            name={badge.icon} 
            size={42} 
            color={badge.isEarned ? badgeColor : Colors.text.muted} 
          />
        </View>

        {/* Title and Status */}
        <Text style={styles.badgeName}>{badge.name}</Text>
        
        {badge.isEarned ? (
          <Text style={styles.dateEarned}>Earned on {badge.earnedDate}</Text>
        ) : (
          <View style={styles.lockedStatus}>
            <Feather name="lock" size={14} color={Colors.text.muted} />
            <Text style={{ color: Colors.text.muted }}>Locked</Text>
          </View>
        )}

        {/* Description & Criteria */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{badge.description}</Text>
          <View>
            <Text style={styles.criteriaLabel}>How to unlock</Text>
            <Text style={styles.criteriaText}>{badge.unlockCriteria}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionArea}>
          {badge.isEarned ? (
            <CustomButton 
              label="Share Achievement" 
              leftIcon={<Feather name="share-2" size={16} color="white" />} 
              onPress={() => onShare && onShare(badge)} 
              fullWidth 
            />
          ) : (
            <CustomButton 
              label="Keep Growing" 
              variant="secondary" 
              onPress={onClose} 
              fullWidth 
            />
          )}
        </View>

      </View>
    </BottomSheetModal>
  );
};

export default BadgeDetailSheet;