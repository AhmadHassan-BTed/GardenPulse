import React from 'react';
import { useRouter } from 'expo-router';
import InterstitialAdContainer from '../../components/common/InterstitialAdContainer';

export default function InterstitialAdModal() {
  const router = useRouter();

  return (
    <InterstitialAdContainer 
      visible={true} 
      onClose={() => router.back()} 
      countdownSeconds={5} 
    />
  );
}