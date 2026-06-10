import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import RewardedVideoPrompt from '../../components/common/RewardedVideoPrompt';

export default function RewardedVideoModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const handleWatch = () => {
    // Simulate watching ad
    router.back();
  };

  const handleDismiss = () => {
    router.back();
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Unlock Feature" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ marginTop: Spacing.lg }}>
        <RewardedVideoPrompt
          featureName="Premium PDF Export"
          durationLabel="~30 seconds"
          onWatchPress={handleWatch}
          onDismiss={handleDismiss}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});