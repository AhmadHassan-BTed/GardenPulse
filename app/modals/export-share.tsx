import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import ExportFormatOptions from '../../components/common/ExportFormatOptions';
import WatermarkToggleRow from '../../components/common/WatermarkToggleRow';
import CustomButton from '../../components/common/CustomButton';
import SectionHeader from '../../components/common/SectionHeader';
import { useGardenStore } from '../../store/useGardenStore';

export default function ExportShareModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const isSupporter = useGardenStore((state) => state.userProfile.isSupporter);

  if (!isHydrated) {
    return null;
  }

  const handleSelectPNG = () => {
    Alert.alert('Export Successful', 'Image saved to gallery.', [{ text: 'OK', onPress: () => router.back() }]);
  };

  const handleSelectPDF = () => {
    if (isSupporter) {
      Alert.alert('Export Successful', 'PDF generated successfully.', [{ text: 'OK', onPress: () => router.back() }]);
    } else {
      // Directs to rewarded video to unlock the feature
      router.push('/modals/rewarded-video');
    }
  };

  const handleSelectText = () => {
    Alert.alert('Copied', 'Raw log data copied to clipboard.', [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Export & Share" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        <SectionHeader title="Choose Format" />
        
        <ExportFormatOptions
          isSupporter={isSupporter}
          onSelectPNG={handleSelectPNG}
          onSelectPDF={handleSelectPDF}
          onSelectText={handleSelectText}
        />

        <View style={{ marginTop: Spacing.md }}>
          <WatermarkToggleRow isSupporter={isSupporter} />
        </View>

        {!isSupporter && (
          <View style={{ marginTop: Spacing.lg, gap: Spacing.sm }}>
            <CustomButton 
              label="Become a Supporter to unlock PDF" 
              variant="secondary"
              onPress={() => router.push('/modals/supporter-badge')} 
            />
          </View>
        )}

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});