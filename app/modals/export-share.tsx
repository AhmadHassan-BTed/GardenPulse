import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
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

  const rewardedRef = useRef<any>(null);
  const [rewardedLoaded, setRewardedLoaded] = useState(false);
  const [adUnlockedPDF, setAdUnlockedPDF] = useState(false);

  useEffect(() => {
    let hasAdMob = false;
    if (Platform.OS !== 'web') {
      try {
        const { TurboModuleRegistry } = require('react-native');
        hasAdMob = TurboModuleRegistry.get('RNGoogleMobileAdsModule') != null;
      } catch (e) {
        hasAdMob = false;
      }
    }

    if (!hasAdMob) {
      return;
    }

    try {
      const { RewardedAd, RewardedAdEventType, TestIds } = require('react-native-google-mobile-ads');
      const adUnitId = process.env.EXPO_PUBLIC_ADMOB_REWARDED_ANDROID || TestIds.REWARDED;

      const rewarded = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setRewardedLoaded(true);
      });

      const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        setAdUnlockedPDF(true);
        Alert.alert('Unlocked!', 'Thank you for supporting us! PDF export has been unlocked for this session.', [
          { text: 'Generate PDF', onPress: () => {
            Alert.alert('Export Successful', 'PDF generated successfully.', [{ text: 'OK', onPress: () => router.back() }]);
          }}
        ]);
      });

      const unsubscribeError = rewarded.addAdEventListener(RewardedAdEventType.ERROR, (error: any) => {
        console.warn('AdMob Rewarded failed to load:', error);
        setRewardedLoaded(false);
      });

      rewardedRef.current = rewarded;
      rewarded.load();

      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeError();
      };
    } catch (e) {
      console.error('Failed to setup AdMob Rewarded:', e);
    }
  }, []);

  if (!isHydrated) {
    return null;
  }

  const handleSelectPNG = () => {
    Alert.alert('Export Successful', 'Image saved to gallery.', [{ text: 'OK', onPress: () => router.back() }]);
  };

  const handleShowRewardedAd = () => {
    if (rewardedLoaded && rewardedRef.current) {
      try {
        rewardedRef.current.show();
      } catch (err) {
        console.error('Failed to show Rewarded Ad:', err);
        Alert.alert('Error', 'Unable to play video ad. Please try again.');
      }
    } else {
      Alert.alert(
        'Ad Unavailable',
        'Could not load the sponsor video. Would you like to bypass and unlock it anyway?',
        [
          {
            text: 'Bypass & Unlock',
            onPress: () => {
              setAdUnlockedPDF(true);
              Alert.alert('Unlocked', 'PDF Export unlocked.', [
                { text: 'OK', onPress: () => Alert.alert('Export Successful', 'PDF generated successfully.', [{ text: 'OK', onPress: () => router.back() }]) }
              ]);
            }
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );
    }
  };

  const handleSelectPDF = () => {
    if (isSupporter || adUnlockedPDF) {
      Alert.alert('Export Successful', 'PDF generated successfully.', [{ text: 'OK', onPress: () => router.back() }]);
    } else {
      Alert.alert(
        'Unlock PDF Export',
        'PDF Export is a premium feature. Watch a quick sponsor video to unlock it for this session.',
        [
          {
            text: 'Watch Video Ad',
            onPress: handleShowRewardedAd,
          },
          {
            text: 'Become a Supporter',
            onPress: () => router.push('/modals/supporter-badge'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
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