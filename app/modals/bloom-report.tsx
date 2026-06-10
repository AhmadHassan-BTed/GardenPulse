import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import BloomStatsPillRow from '../../components/common/BloomStatsPillRow';
import BloomBestPlantCard from '../../components/common/BloomBestPlantCard';
import BloomWeatherInsight from '../../components/common/BloomWeatherInsight';
import BloomCemeteryAlert from '../../components/common/BloomCemeteryAlert';
import CustomButton from '../../components/common/CustomButton';
import SectionHeader from '../../components/common/SectionHeader';

export default function WeeklyBloomReportModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const handleShare = () => {
    router.push('/modals/export-share');
  };

  const handleCemeteryPress = () => {
    router.push('/profile/cemetery');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Weekly Bloom Report" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        <SectionHeader title="Your Weekly Stats" />
        <BloomStatsPillRow
          plantsLogged={8}
          logEntries={42}
          healthDelta={12}
          streak={23}
        />

        <SectionHeader title="Top Performer" style={{ marginTop: Spacing.sm }} />
        <BloomBestPlantCard
          plantName="Monstera Deliciosa"
          method="Soil Drench"
          healthDelta={15}
        />

        <SectionHeader title="Environmental Factor" style={{ marginTop: Spacing.sm }} />
        <BloomWeatherInsight
          insightText="A warm spell of 26°C with 65% humidity increased transpirational growth. High lighting conditions helped double the leaf size on indoor cultivars!"
        />

        <BloomCemeteryAlert
          count={1}
          onPress={handleCemeteryPress}
        />

        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton 
            label="Share Weekly Growth Report" 
            onPress={handleShare} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});