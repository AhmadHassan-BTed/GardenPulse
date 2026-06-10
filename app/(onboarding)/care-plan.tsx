import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import OnboardingProgressBar from '../../components/common/OnboardingProgressBar';
import CustomHeader from '../../components/common/CustomHeader';
import SectionHeader from '../../components/common/SectionHeader';
import LocalContextCard from '../../components/common/LocalContextCard';
import MetricDial from '../../components/common/MetricDial';
import CustomButton from '../../components/common/CustomButton';
import TextLink from '../../components/common/TextLink';
import ConfettiCelebration from '../../components/common/ConfettiCelebration';
import { CarePlanSummaryCard, NotificationOptInRow } from '../../components/common/OnboardingAndModals';

export default function CarePlanScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const { method, plantName, plantType, location } = useLocalSearchParams<{
    method?: string;
    plantName?: string;
    plantType?: string;
    location?: string;
  }>();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Dynamic Care Plan based on the growing method passed from onboarding
  const activeMethod = method || 'soil';
  const getWateringFreq = (m: string) => {
    switch (m.toLowerCase()) {
      case 'hydroponic':
      case 'hydro':
        return 'Check reservoir level every 2 days';
      case 'indoor':
        return 'Water every 7–10 days';
      case 'container':
        return 'Water every 3–5 days';
      default:
        return 'Water every 5–7 days depending on rain';
    }
  };

  const waterFreq = getWateringFreq(activeMethod);
  const lightRequirement = activeMethod.toLowerCase() === 'indoor' ? 'Bright, indirect light' : 'Full sun / Partial shade';

  const handleStartGrowing = () => {
    setShowConfetti(true);
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleToggleNotifications = (val: boolean) => {
    setNotificationsEnabled(val);
    if (val) {
      router.push({
        pathname: '/modals/permission',
        params: { 
          type: 'notifications', 
          next: `/(onboarding)/care-plan?method=${activeMethod}&plantName=${plantName}&plantType=${plantType}&location=${location}` 
        }
      });
    }
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      {showConfetti && <ConfettiCelebration />}

      <CustomHeader
        showBack={true}
        onBack={() => router.replace({
          pathname: '/(onboarding)/add-plant',
          params: { method: activeMethod }
        })}
        transparent={true}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        <OnboardingProgressBar totalSteps={3} currentStep={3} />

        <View style={{ gap: Spacing.xs, alignItems: 'center' }}>
          <SectionHeader 
            title="Your care plan is ready!" 
            titleStyle={{ fontSize: Typography.sizes.xl, textAlign: 'center' }} 
          />
          <Text style={{ 
            fontSize: Typography.sizes.base, 
            color: Colors.text.muted, 
            textAlign: 'center', 
            lineHeight: 22 
          }}>
            We've customized a personalized growing routine for {plantName || 'your plant'}.
          </Text>
        </View>

        <LocalContextCard
          city={location || 'Berlin'}
          insight={`Growers in this region report a high success rate for ${plantType || 'this variety'} matching your setup.`}
          onPress={() => console.log('View Map pressed')}
        />

        <View style={{ gap: Spacing.md }}>
          <CarePlanSummaryCard
            method={activeMethod.toUpperCase()}
            light={lightRequirement}
            waterFreq={waterFreq}
          />

          <View style={{ 
            backgroundColor: Colors.surface.glass, 
            borderRadius: theme.Radius.lg, 
            borderWidth: 1, 
            borderColor: Colors.surface.glassBorder, 
            padding: Spacing.md, 
            alignItems: 'center', 
            gap: Spacing.sm 
          }}>
            <MetricDial value={50} size={100} label="Health Score" />
            <Text style={{ 
              fontSize: Typography.sizes.sm, 
              color: Colors.text.body, 
              textAlign: 'center', 
              lineHeight: 20 
            }}>
              This is your baseline Garden Health Score. We'll track your updates and logs to watch it grow!
            </Text>
          </View>
        </View>

        <View style={{ 
          backgroundColor: Colors.surface.glass, 
          borderRadius: theme.Radius.lg, 
          borderWidth: 1, 
          borderColor: Colors.surface.glassBorder, 
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.xs
        }}>
          <NotificationOptInRow
            isEnabled={notificationsEnabled}
            onToggle={handleToggleNotifications}
            plantName={plantName || 'your plant'}
          />
        </View>

        <View style={{ gap: Spacing.md, marginTop: Spacing.md, alignItems: 'center' }}>
          <CustomButton
            label="Start Growing 🌱"
            fullWidth={true}
            onPress={handleStartGrowing}
          />
          <TextLink
            label="Remind me later"
            onPress={() => router.replace('/(tabs)')}
            variant="muted"
            style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}