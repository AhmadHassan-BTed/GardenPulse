import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import ArticleBodyRenderer, { ArticleBlock } from '../../components/common/ArticleBodyRenderer';
import { RelatedArticlesRow } from '../../components/common/OnboardingAndModals';
import SectionHeader from '../../components/common/SectionHeader';

const mockArticleBlocks: ArticleBlock[] = [
  { id: '1', type: 'h2', content: 'Mastering Humidity for Rare Tropicals' },
  { id: '2', type: 'p', content: 'Many rare plants like Monstera Deliciosa, Alocasia, and Calathea native to tropical rain forests require elevated relative humidity (RH) above 60% to prevent dry, brown edges.' },
  { id: '3', type: 'h3', content: '1. Grouping Plants Together' },
  { id: '4', type: 'p', content: 'Plants release moisture through transpiration. Grouping them closely creates a humid microclimate in that zone, raising RH locally by 5-10%.' },
  { id: '5', type: 'h3', content: '2. Pebble Trays' },
  { id: '6', type: 'p', content: 'Fill a shallow tray with pebbles and add water until it sits just below the top of the stones. Place the plant container on top of the stones. The water will slowly evaporate around the leaves.' },
  { id: '7', type: 'ad' },
];

export default function TipsLibraryModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Botanical Guides" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <ArticleBodyRenderer blocks={mockArticleBlocks} />

        <SectionHeader title="Related Articles" style={{ marginTop: Spacing.md }} />
        <RelatedArticlesRow />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});