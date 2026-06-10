import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import { SupporterBenefitsList } from '../../components/common/PremiumGuides';
import CustomButton from '../../components/common/CustomButton';
import CustomText from '../../components/common/CustomText';

export default function SupporterBadgeModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const handleUpgrade = () => {
    // Simulate buy Pro
    router.back();
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Become a Supporter" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.lg, alignItems: 'center' }}>
        <View style={styles.badgeRing}>
          <CustomText size="xxxl">💝</CustomText>
        </View>
 
        <CustomText variant="heading" size="xl" style={styles.title}>
          Support GardenPulse development
        </CustomText>
        <CustomText variant="body" size="base" style={styles.description}>
          Help us build the best local, offline-first grower app. Unlock exclusive tools while supporting free gardening access globally.
        </CustomText>

        <View style={styles.benefitsContainer}>
          <SupporterBenefitsList />
        </View>

        <View style={{ width: '100%', gap: Spacing.md, marginTop: Spacing.md }}>
          <CustomButton 
            label="Upgrade to Pro — $2.99 / Month" 
            onPress={handleUpgrade} 
          />
          <CustomButton 
            label="Restore Purchase" 
            variant="ghost" 
            onPress={() => router.back()} 
          />
          <CustomButton 
            label="Maybe Later" 
            variant="secondary" 
            onPress={() => router.back()} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  badgeRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.18)',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  benefitsContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
    marginVertical: 12,
  },
});