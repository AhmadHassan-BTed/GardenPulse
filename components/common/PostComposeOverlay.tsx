// ─────────────────────────────────────────────────────────────────────────────
// PostComposeOverlay.tsx — GardenPulse
// Inline compose: text field, camera attach, tag plants, method chip.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, TextInput, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

export interface PostComposeOverlayProps {
  userAvatarUrl?: string;
  onSubmit: (content: string, hasPhoto: boolean) => void;
  style?: ViewStyle;
}

const PostComposeOverlay: React.FC<PostComposeOverlayProps> = ({
  userAvatarUrl,
  onSubmit,
  style,
}) => {
  const [content, setContent] = useState('');
  const [hasPhotoAttached, setHasPhotoAttached] = useState(false);
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          borderRadius: Radius.lg,
          padding: Spacing.md,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          ...style,
        },
        inputRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: Spacing.sm,
          marginBottom: Spacing.sm,
        },
        avatar: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: isDark ? Colors.surface.elevated : '#E5E7EB',
        },
        input: {
          flex: 1,
          minHeight: 60,
          fontSize: Typography.sizes.base,
          color: Colors.text.heading,
          textAlignVertical: 'top',
          paddingTop: 8,
        },
        photoPreviewBox: {
          marginLeft: 44, // Align with text input (avatar width + gap)
          height: 120,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
          borderRadius: Radius.md,
          marginBottom: Spacing.sm,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        },
        removePhotoBtn: {
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 12,
          padding: 4,
        },
        actionsRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          paddingTop: Spacing.sm,
        },
        accessories: {
          flexDirection: 'row',
          gap: Spacing.md,
          paddingLeft: 44, // Align with text input
        },
        iconBtn: {
          padding: 4,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark, style]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Image 
          source={userAvatarUrl ? { uri: userAvatarUrl } : require('../../assets/placeholder-avatar.png')} 
          style={styles.avatar} 
        />
        <TextInput
          style={styles.input}
          placeholder="Share an update or ask a question..."
          placeholderTextColor={Colors.text.muted}
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      {hasPhotoAttached && (
        <View style={styles.photoPreviewBox}>
          <Feather name="image" size={32} color={Colors.text.muted} />
          <Pressable style={styles.removePhotoBtn} onPress={() => setHasPhotoAttached(false)}>
            <Feather name="x" size={14} color="#FFF" />
          </Pressable>
        </View>
      )}

      <View style={styles.actionsRow}>
        <View style={styles.accessories}>
          <Pressable style={styles.iconBtn} onPress={() => setHasPhotoAttached(true)}>
            <Feather name="camera" size={20} color={Colors.green.DEFAULT} />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Feather name="hash" size={20} color={Colors.text.muted} />
          </Pressable>
        </View>
        
        <CustomButton 
          label="Post" 
          onPress={() => {
            onSubmit(content, hasPhotoAttached);
            setContent('');
            setHasPhotoAttached(false);
          }} 
          isDisabled={content.trim() === '' && !hasPhotoAttached}
          style={{ minHeight: 36, paddingVertical: 0, paddingHorizontal: 20 }}
        />
      </View>
    </View>
  );
};

export default PostComposeOverlay;