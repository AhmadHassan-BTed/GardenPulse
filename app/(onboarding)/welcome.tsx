import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import OnboardingProgressBar from '../../components/common/OnboardingProgressBar';
import CustomHeader from '../../components/common/CustomHeader';
import SectionHeader from '../../components/common/SectionHeader';
import MethodSelectionCard from '../../components/common/MethodSelectionCard';
import CustomButton from '../../components/common/CustomButton';
import TextLink from '../../components/common/TextLink';

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedMethod) return;
    router.push({
      pathname: '/modals/permission',
      params: { 
        type: 'location', 
        next: `/(onboarding)/add-plant?method=${selectedMethod}` 
      }
    });
  };

  const handleSkip = () => {
    router.push('/(onboarding)/add-plant');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        transparent
        rightNode={
          <TextLink
            label="Skip for now"
            onPress={handleSkip}
            variant="muted"
          />
        }
      />

      <View style={{ flex: 1, justifyContent: 'space-between', gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        <View style={{ gap: Spacing.lg }}>
          <OnboardingProgressBar totalSteps={3} currentStep={1} />
          
          <View style={{ gap: Spacing.xs, alignItems: 'center' }}>
            <SectionHeader 
              title="How do you grow?" 
              titleStyle={{ fontSize: Typography.sizes.xl, textAlign: 'center' }} 
            />
            <Text style={{ 
              fontSize: Typography.sizes.base, 
              color: Colors.text.muted, 
              textAlign: 'center', 
              lineHeight: 22 
            }}>
              Pick your primary method — you can mix later
            </Text>
          </View>

          <View style={{ gap: Spacing.md }}>
            <MethodSelectionCard
              title="Soil / Raised Bed"
              description="Vegetables, flowers, outdoor beds"
              iconName="layers"
              isSelected={selectedMethod === 'soil'}
              onPress={() => setSelectedMethod('soil')}
            />
            <MethodSelectionCard
              title="Container / Balcony"
              description="Potted plants, balconies, small spaces"
              iconName="package"
              isSelected={selectedMethod === 'container'}
              onPress={() => setSelectedMethod('container')}
            />
            <MethodSelectionCard
              title="Hydroponics"
              description="Soilless growing, nutrient reservoirs"
              iconName="droplet"
              isSelected={selectedMethod === 'hydroponic'}
              onPress={() => setSelectedMethod('hydroponic')}
            />
            <MethodSelectionCard
              title="Indoor Houseplants"
              description="Houseplants, low-light succulents"
              iconName="home"
              isSelected={selectedMethod === 'indoor'}
              onPress={() => setSelectedMethod('indoor')}
            />
          </View>
        </View>

        <View style={{ gap: Spacing.md, alignItems: 'center' }}>
          <CustomButton 
            label="Next →" 
            fullWidth 
            onPress={handleNext} 
            isDisabled={!selectedMethod} 
          />
          <TextLink 
            label="Skip for now" 
            onPress={handleSkip} 
            variant="muted" 
            style={{ alignSelf: 'center' }} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}