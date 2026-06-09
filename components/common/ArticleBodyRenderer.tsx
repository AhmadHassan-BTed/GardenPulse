// ─────────────────────────────────────────────────────────────────────────────
// ArticleBodyRenderer.tsx — GardenPulse
// Renders offline-cached rich text articles (headings, paragraphs, images, ads).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import NativeAdCard from './NativeAdCard'; // Reusing Phase 1 component

export type ArticleBlockType = 'h2' | 'h3' | 'p' | 'bullet' | 'image' | 'ad';

export interface ArticleBlock {
  id: string;
  type: ArticleBlockType;
  content?: string;
  url?: string; // For images
  caption?: string; // For images
}

export interface ArticleBodyRendererProps {
  blocks: ArticleBlock[];
  style?: ViewStyle;
}

const ArticleBodyRenderer: React.FC<ArticleBodyRendererProps> = ({ blocks, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: Spacing.md,
          ...style,
        },
        h2: {
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginTop: Spacing.lg,
          marginBottom: Spacing.sm,
          lineHeight: 32,
        },
        h3: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginTop: Spacing.md,
          marginBottom: Spacing.xs,
          lineHeight: 28,
        },
        p: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          lineHeight: 24,
          marginBottom: Spacing.md,
        },
        bulletRow: {
          flexDirection: 'row',
          marginBottom: Spacing.sm,
          paddingLeft: Spacing.sm,
        },
        bulletPoint: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          marginRight: Spacing.sm,
          lineHeight: 24,
        },
        imageContainer: {
          marginVertical: Spacing.md,
        },
        image: {
          width: '100%',
          height: 200,
          borderRadius: Radius.md,
          backgroundColor: Colors.surface.elevated,
        },
        caption: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          textAlign: 'center',
          marginTop: Spacing.xs,
          fontStyle: 'italic',
        },
      }),
    [Colors, Spacing, Radius, Typography, style]
  );

  return (
    <View style={styles.container}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'h2':
            return <Text key={block.id} style={styles.h2}>{block.content}</Text>;
          case 'h3':
            return <Text key={block.id} style={styles.h3}>{block.content}</Text>;
          case 'p':
            return <Text key={block.id} style={styles.p}>{block.content}</Text>;
          case 'bullet':
            return (
              <View key={block.id} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.p}>{block.content}</Text>
              </View>
            );
          case 'image':
            return (
              <View key={block.id} style={styles.imageContainer}>
                <Image source={{ uri: block.url }} style={styles.image} resizeMode="cover" />
                {block.caption && <Text style={styles.caption}>{block.caption}</Text>}
              </View>
            );
          case 'ad':
            return (
              <NativeAdCard key={block.id} style={{ marginVertical: Spacing.md }}>
                <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: Colors.text.muted }}>[Inline AdMob Render]</Text>
                </View>
              </NativeAdCard>
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

export default ArticleBodyRenderer;