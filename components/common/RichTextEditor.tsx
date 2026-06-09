// ─────────────────────────────────────────────────────────────────────────────
// RichTextEditor.tsx — GardenPulse
// Editor UI handling Toolbar + Text input area.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

export interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (text: string) => void;
  onInsertTemplate?: () => void;
  onInsertTip?: () => void;
  style?: ViewStyle;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  onInsertTemplate,
  onInsertTip,
  style,
}) => {
  const [content, setContent] = useState(initialValue);
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors.surface.base,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          borderRadius: Radius.lg,
          overflow: 'hidden',
          ...style,
        },
        toolbar: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: Spacing.sm,
          backgroundColor: isDark ? Colors.surface.elevated : '#F9FAFB',
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
          gap: 4,
        },
        toolbarBtn: {
          padding: 8,
          borderRadius: Radius.sm,
        },
        editorArea: {
          flex: 1,
          minHeight: 200,
          padding: Spacing.md,
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          textAlignVertical: 'top',
        },
        footer: {
          flexDirection: 'row',
          padding: Spacing.sm,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          gap: Spacing.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark, style]
  );

  const ToolbarIcon = ({ name }: { name: keyof typeof Feather.glyphMap }) => (
    <Pressable style={({ pressed }) => [styles.toolbarBtn, pressed && { backgroundColor: Colors.border.subtle }]}>
      <Feather name={name} size={18} color={Colors.text.heading} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <ToolbarIcon name="bold" />
        <ToolbarIcon name="italic" />
        <ToolbarIcon name="underline" />
        <View style={{ width: 1, height: 20, backgroundColor: Colors.border.muted, marginHorizontal: 4 }} />
        <ToolbarIcon name="list" />
        <ToolbarIcon name="image" />
        <ToolbarIcon name="link" />
      </View>

      <TextInput
        style={styles.editorArea}
        multiline
        placeholder="Start writing your guide here..."
        placeholderTextColor={Colors.text.muted}
        value={content}
        onChangeText={(txt) => {
          setContent(txt);
          onChange?.(txt);
        }}
      />

      <View style={styles.footer}>
        <CustomButton 
          label="+ Plant Template" 
          variant="secondary" 
          onPress={onInsertTemplate} 
          style={{ flex: 1, minHeight: 36 }} 
          labelStyle={{ fontSize: 12 }} 
        />
        <CustomButton 
          label="+ Highlight Tip" 
          variant="secondary" 
          onPress={onInsertTip} 
          style={{ flex: 1, minHeight: 36 }} 
          labelStyle={{ fontSize: 12 }} 
        />
      </View>
    </View>
  );
};

export default RichTextEditor;