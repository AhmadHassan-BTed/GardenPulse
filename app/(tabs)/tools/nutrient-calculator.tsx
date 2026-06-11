import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomInput from '../../../components/common/CustomInput';
import AutocompleteSearchInput from '../../../components/common/AutocompleteSearchInput';
import RadioGroup from '../../../components/common/RadioGroup';
import UnitToggle, { UnitSystem } from '../../../components/common/UnitToggle';
import FilterChip from '../../../components/common/FilterChip';
import CustomButton from '../../../components/common/CustomButton';
import RecipeResultCard, { RecipeNutrient } from '../../../components/common/RecipeResultCard';
import InterstitialAdContainer from '../../../components/common/InterstitialAdContainer';
import RewardedVideoPrompt from '../../../components/common/RewardedVideoPrompt';
import ModalDialog from '../../../components/common/ModalDialog';
import { ContextualTipCard } from '../../../components/common/InsightBanners';
import CustomText from '../../../components/common/CustomText';

const brands = [
  'General Hydroponics FloraSeries',
  'Biobizz Organic Grow & Bloom',
  'FoxFarm Trio (Grow Big, Tiger Bloom)',
  'Advanced Nutrients Sensi Grow',
  'Canna Coco A & B',
  'Plagron Alga Grow',
];

const presets = [
  { id: 'seedling', label: 'Seedling', ec: '0.8 EC', phMin: 5.5, phMax: 6.0, phTarget: 5.8, ratio: { a: 0.5, b: 0.2, c: 0.3, cal: 0.2 } },
  { id: 'veg', label: 'Vegetative', ec: '1.5 EC', phMin: 5.8, phMax: 6.2, phTarget: 6.0, ratio: { a: 1.5, b: 0.5, c: 1.0, cal: 0.5 } },
  { id: 'bloom', label: 'Bloom/Flower', ec: '2.2 EC', phMin: 5.8, phMax: 6.2, phTarget: 6.0, ratio: { a: 1.0, b: 2.0, c: 1.5, cal: 0.8 } },
  { id: 'flush', label: 'Flush/Ripen', ec: '0.3 EC', phMin: 5.5, phMax: 6.0, phTarget: 5.7, ratio: { a: 0.0, b: 0.0, c: 0.0, cal: 0.0 } },
];

export default function NutrientCalculatorScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [method, setMethod] = useState<string | number>('hydro');
  const [brand, setBrand] = useState('');
  const [volume, setVolume] = useState('10');
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [selectedPreset, setSelectedPreset] = useState('veg');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [adVisible, setAdVisible] = useState(false);
  const [rewardPromptVisible, setRewardPromptVisible] = useState(false);
  const [exportSuccessVisible, setExportSuccessVisible] = useState(false);

  const [adLoaded, setAdLoaded] = useState(false);
  const interstitialRef = useRef<any>(null);

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
      const { InterstitialAd, AdEventType, TestIds } = require('react-native-google-mobile-ads');
      const adUnitId = process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ANDROID || TestIds.INTERSTITIAL;
      
      const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setAdLoaded(true);
      });

      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        setAdLoaded(false);
        setShowResults(true);
        setIsLoading(false);
        interstitial.load();
      });

      const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.warn('AdMob Interstitial failed to load:', error);
        setAdLoaded(false);
      });

      interstitialRef.current = interstitial;
      interstitial.load();

      return () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeError();
      };
    } catch (e) {
      console.error('Failed to setup AdMob Interstitial:', e);
    }
  }, []);

  const activePreset = presets.find(p => p.id === selectedPreset) || presets[1];

  const handleGenerate = () => {
    setIsLoading(true);

    if (adLoaded && interstitialRef.current) {
      try {
        interstitialRef.current.show();
      } catch (err) {
        console.error('Failed to show Interstitial Ad, falling back:', err);
        setTimeout(() => {
          setIsLoading(false);
          setShowResults(true);
        }, 1500);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const handleAdClose = () => {
    setAdVisible(false);
    setShowResults(true);
  };

  const calculateNutrients = (): RecipeNutrient[] => {
    const vol = parseFloat(volume) || 10;
    const ratio = activePreset.ratio;
    
    return [
      { id: 'part-a', name: 'Grow Part A (Primary NPK)', amount: Math.round(vol * ratio.a * 10) / 10, unit: 'mL' },
      { id: 'part-b', name: 'Bloom Part B (Phosphorus Booster)', amount: Math.round(vol * ratio.b * 10) / 10, unit: 'mL' },
      { id: 'part-c', name: 'Micro Part C (Micronutrients)', amount: Math.round(vol * ratio.c * 10) / 10, unit: 'mL' },
      { id: 'calmag', name: 'Cal-Mag (Calcium & Magnesium)', amount: Math.round(vol * ratio.cal * 10) / 10, unit: 'mL', isWarning: activePreset.id === 'flush' },
    ];
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Recipe Calculator"
        showBack={true}
        onBack={() => router.back()}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Method Picker */}
        <View style={{ gap: Spacing.xs }}>
          <CustomText style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.muted, textTransform: 'uppercase' }}>
            Growing Method
          </CustomText>
          <RadioGroup
            horizontal={true}
            options={[
              { label: 'Hydroponics', value: 'hydro' },
              { label: 'Soil Drench', value: 'soil' },
              { label: 'Foliar Spray', value: 'foliar' },
            ]}
            selectedValue={method}
            onSelect={(val) => setMethod(val)}
          />
        </View>

        {/* Brand Search input */}
        <AutocompleteSearchInput
          label="Nutrient Brand"
          placeholder="e.g. FoxFarm, Biobizz..."
          value={brand}
          onChangeText={setBrand}
          data={brands}
          onSelect={(item) => setBrand(item)}
        />

        {/* Volume & Unit Section */}
        <View style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <CustomInput
              label="Water Reservoir Volume"
              placeholder="e.g. 10"
              value={volume}
              onChangeText={setVolume}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ paddingBottom: Spacing.sm }}>
            <UnitToggle
              value={unit}
              onChange={(sys) => setUnit(sys)}
              width={140}
            />
          </View>
        </View>

        {/* Growth Phase selection */}
        <View style={{ gap: Spacing.xs }}>
          <CustomText style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.muted, textTransform: 'uppercase' }}>
            Target Growth Stage
          </CustomText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            {presets.map((p) => (
              <FilterChip
                key={p.id}
                label={`${p.label} (${p.ec})`}
                isSelected={selectedPreset === p.id}
                onPress={() => setSelectedPreset(p.id)}
              />
            ))}
          </ScrollView>
        </View>

        <CustomButton
          label="Generate Mix Recipe"
          isLoading={isLoading}
          onPress={handleGenerate}
          fullWidth={true}
        />

        {showResults && (
          <View style={{ gap: Spacing.md, marginTop: Spacing.sm }}>
            <RecipeResultCard
              reservoirSize={`${volume} ${unit === 'metric' ? 'Liters' : 'Gallons'}`}
              nutrients={calculateNutrients()}
              phMin={activePreset.phMin}
              phTarget={activePreset.phTarget}
              phMax={activePreset.phMax}
              ecValue={activePreset.ec}
              warningText={activePreset.id === 'flush' ? 'Flush phase does not require Cal-Mag unless severe calcium deficiency is present.' : undefined}
              onSave={() => {
                alert('Mix Recipe saved successfully to your logs!');
              }}
              onSchedule={() => {
                router.push('/tools/smart-scheduler');
              }}
            />

            <CustomButton
              label="Export Premium PDF Recipe"
              variant="secondary"
              onPress={() => setRewardPromptVisible(true)}
              fullWidth={true}
              leftIcon="file-text"
            />
          </View>
        )}

        <View style={{ gap: Spacing.xs, marginTop: Spacing.sm }}>
          <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading }}>
            Pro Botanical Guides
          </CustomText>
          <ContextualTipCard
            title="Understanding Nutrient Lockout: Why pH Tuning Matters"
            tag="pH Management"
            readTime="4 min read"
            onPress={() => router.push(`/modals/tips` as any)}
          />
        </View>
      </View>

      {/* Interstitial Ad Simulation */}
      <InterstitialAdContainer
        visible={adVisible}
        onClose={handleAdClose}
        countdownSeconds={3}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl }}>
          <CustomText style={{ color: Colors.gold, fontSize: Typography.sizes.lg, fontWeight: 'bold', marginBottom: Spacing.sm }}>
            GrowMax Hydro Nutrients
          </CustomText>
          <CustomText style={{ color: Colors.text.inverse, textAlign: 'center', fontSize: Typography.sizes.sm }}>
            Maximize flower density and terpene profiles with our premium organic formula.
          </CustomText>
        </View>
      </InterstitialAdContainer>

      {/* Rewarded Video Prompt Modal */}
      <ModalDialog
        visible={rewardPromptVisible}
        title="Premium PDF Export"
        description="Watch a 15-second sponsor video to generate and download a clean, printable PDF of this mixing recipe."
        primaryAction={{
          label: 'Watch Video',
          onPress: () => {
            setRewardPromptVisible(false);
            // Simulate watching a video
            setTimeout(() => {
              setExportSuccessVisible(true);
            }, 1000);
          },
        }}
        secondaryAction={{
          label: 'Cancel',
          onPress: () => setRewardPromptVisible(false),
        }}
      />

      {/* Export Success Modal */}
      <ModalDialog
        visible={exportSuccessVisible}
        title="Export Complete"
        description="Your recipe PDF has been compiled successfully. Tapping below will prompt the sharing menu."
        primaryAction={{
          label: 'Share PDF',
          onPress: () => {
            setExportSuccessVisible(false);
            router.push('/modals/export-share');
          },
        }}
        secondaryAction={{
          label: 'Dismiss',
          onPress: () => setExportSuccessVisible(false),
        }}
      />
    </ScreenWrapper>
  );
}
