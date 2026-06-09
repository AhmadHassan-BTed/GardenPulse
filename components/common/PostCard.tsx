// ─────────────────────────────────────────────────────────────────────────────
// PostCard.tsx — GardenPulse
// Community feed post with avatar, text, optional image, and interaction actions.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import IconButton from './IconButton';

export interface PostCardProps {
  username: string;
  avatarUrl?: string;
  content: string;
  methodTag?: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  onReport: () => void;
  onImagePress?: () => void;
  style?: ViewStyle;
}

const PostCard: React.FC<PostCardProps> = ({
  username,
  avatarUrl,
  content,
  methodTag,
  imageUrl,
  likesCount,
  commentsCount,
  isLiked = false,
  isSaved = false,
  onLike,
  onComment,
  onSave,
  onReport,
  onImagePress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.surface.base,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: Spacing.sm,
        },
        userInfo: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        avatar: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
        },
        username: {
          fontSize: Typography.sizes.base,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        methodChip: {
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: Radius.sm,
        },
        methodText: {
          fontSize: 10,
          color: Colors.text.muted,
          textTransform: 'uppercase',
          fontWeight: Typography.weights.bold,
        },
        content: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          lineHeight: 22,
          marginBottom: Spacing.md,
        },
        imageContainer: {
          width: '100%',
          height: 200,
          borderRadius: Radius.md,
          overflow: 'hidden',
          marginBottom: Spacing.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        postImage: {
          width: '100%',
          height: '100%',
        },
        footer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        actionsLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.lg,
        },
        actionGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        actionText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require('../../assets/placeholder-avatar.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{username}</Text>
            {methodTag && (
              <View style={[styles.methodChip, { marginTop: 2, alignSelf: 'flex-start' }]}>
                <Text style={styles.methodText}>{methodTag}</Text>
              </View>
            )}
          </View>
        </View>
        <IconButton name="flag" size={18} color={Colors.text.muted} onPress={onReport} />
      </View>

      <Text style={styles.content}>{content}</Text>

      {imageUrl && (
        <Pressable onPress={onImagePress} style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.postImage} resizeMode="cover" />
        </Pressable>
      )}

      <View style={styles.footer}>
        <View style={styles.actionsLeft}>
          <Pressable style={styles.actionGroup} onPress={onLike} hitSlop={8}>
            <IconButton
              name="heart"
              size={20}
              color={isLiked ? Colors.text.error : Colors.text.muted}
              onPress={onLike}
            />
            <Text style={[styles.actionText, isLiked && { color: Colors.text.error }]}>
              {likesCount > 0 ? likesCount : ''}
            </Text>
          </Pressable>

          <Pressable style={styles.actionGroup} onPress={onComment} hitSlop={8}>
            <IconButton name="message-circle" size={20} color={Colors.text.muted} onPress={onComment} />
            <Text style={styles.actionText}>{commentsCount > 0 ? commentsCount : ''}</Text>
          </Pressable>
        </View>

        <IconButton
          name="bookmark"
          size={20}
          color={isSaved ? Colors.green.DEFAULT : Colors.text.muted}
          onPress={onSave}
        />
      </View>
    </View>
  );
};

export default PostCard;