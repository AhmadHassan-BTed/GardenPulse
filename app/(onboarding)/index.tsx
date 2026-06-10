import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import SplashLogo from '../../components/common/SplashLogo';

export default function SplashScreen() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.replace('/(onboarding)/welcome');
  };

  return (
    <ScreenWrapper scrollable={false} withPadding={false}>
      <SplashLogo onAnimationComplete={handleAnimationComplete} />
    </ScreenWrapper>
  );
}