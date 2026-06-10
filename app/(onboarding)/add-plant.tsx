import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import OnboardingProgressBar from '../../components/common/OnboardingProgressBar';
import CustomHeader from '../../components/common/CustomHeader';
import SectionHeader from '../../components/common/SectionHeader';
import AutocompleteSearchInput from '../../components/common/AutocompleteSearchInput';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import Divider from '../../components/common/Divider';
import RadioGroup from '../../components/common/RadioGroup';
import ZoneBadge from '../../components/common/ZoneBadge';
import TextLink from '../../components/common/TextLink';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import { PlantBrowseGrid, SelectedPlantPreviewCard } from '../../components/common/OnboardingAndModals';

interface PlantSpecies {
  name: string;
  scientific: string;
  methodBadge: string;
}

const plantDatabase: PlantSpecies[] = [
  { name: 'Basil', scientific: 'Ocimum basilicum', methodBadge: 'Hydro' },
  { name: 'Tomato', scientific: 'Solanum lycopersicum', methodBadge: 'Soil' },
  { name: 'Monstera', scientific: 'Monstera deliciosa', methodBadge: 'Indoor' },
  { name: 'Snake Plant', scientific: 'Sansevieria trifasciata', methodBadge: 'Indoor' },
  { name: 'Pothos', scientific: 'Epipremnum aureum', methodBadge: 'Indoor' },
];

const categories = ['Herb', 'Vegetable', 'Fruit', 'Flower', 'Houseplant', 'Microgreen'];

const methodOptions = [
  { label: 'Soil', value: 'soil' },
  { label: 'Container', value: 'container' },
  { label: 'Hydro', value: 'hydro' },
  { label: 'Indoor', value: 'indoor' },
];

export default function AddPlantScreen() {
  const router = useRouter();
  const { method } = useLocalSearchParams<{ method?: string }>();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [searchValue, setSearchValue] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null);
  const [nickname, setNickname] = useState('');
  const [growingMethod, setGrowingMethod] = useState<string>(method || 'soil');
  const [startedDate, setStartedDate] = useState<Date>(new Date());

  const handleSelectPlant = (name: string) => {
    setSearchValue(name);
    const found = plantDatabase.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedPlant(found);
    } else {
      setSelectedPlant({
        name,
        scientific: 'Custom Plant',
        methodBadge: growingMethod.charAt(0).toUpperCase() + growingMethod.slice(1),
      });
    }
  };

  const handleScanLeaf = () => {
    router.push({
      pathname: '/modals/permission',
      params: { 
        type: 'camera', 
        next: `/(onboarding)/add-plant?method=${growingMethod}`
      }
    });
  };

  const handleContinue = () => {
    const finalName = nickname.trim() || searchValue.trim() || 'My First Plant';
    const finalType = selectedPlant ? selectedPlant.scientific : 'Custom Species';
    router.replace({
      pathname: '/(onboarding)/care-plan',
      params: {
        method: growingMethod,
        plantName: finalName,
        plantType: finalType,
        location: 'Indoor Balcony'
      }
    });
  };

  const handleSkip = () => {
    router.replace({
      pathname: '/(onboarding)/care-plan',
      params: {
        method: growingMethod,
        plantName: 'My First Plant',
        plantType: 'Unknown Species',
        location: 'Garden Bed'
      }
    });
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        showBack={true}
        onBack={() => router.replace('/(onboarding)/welcome')}
        transparent={true}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        <OnboardingProgressBar totalSteps={3} currentStep={2} />

        <View style={{ gap: Spacing.xs }}>
          <SectionHeader title="Add your first plant" titleStyle={{ fontSize: Typography.sizes.xl }} />
          <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, lineHeight: 20 }}>
            Search or scan a plant. This configures the initial care guides and calendars for your garden.
          </Text>
        </View>

        <View style={{ gap: Spacing.md }}>
          <AutocompleteSearchInput
            label="Plant Species"
            placeholder="e.g. Basil, Tomato, Monstera"
            value={searchValue}
            onChangeText={(text) => {
              setSearchValue(text);
              if (selectedPlant) setSelectedPlant(null);
            }}
            data={plantDatabase.map(p => p.name)}
            onSelect={handleSelectPlant}
          />

          <CustomButton
            label="Scan a leaf or seed packet"
            variant="secondary"
            onPress={handleScanLeaf}
            fullWidth={true}
          />
        </View>

        <Divider text="OR" />

        <View style={{ gap: Spacing.sm }}>
          <Text style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Browse Categories
          </Text>
          <PlantBrowseGrid categories={categories} />
        </View>

        {selectedPlant && (
          <SelectedPlantPreviewCard
            name={selectedPlant.name}
            scientific={selectedPlant.scientific}
            methodBadge={selectedPlant.methodBadge}
          />
        )}

        <View style={{ gap: Spacing.lg }}>
          <CustomInput
            label="Plant Nickname (optional)"
            placeholder="e.g. Spike, Greenie"
            value={nickname}
            onChangeText={setNickname}
          />

          <View style={{ gap: Spacing.sm }}>
            <Text style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Growing Method
            </Text>
            <RadioGroup
              options={methodOptions}
              selectedValue={growingMethod}
              onSelect={(val) => setGrowingMethod(val as string)}
              horizontal={true}
            />
          </View>

          <View style={{ gap: Spacing.sm }}>
            <Text style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Location & Climate
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
              <ZoneBadge zone="Zone 7b" location="Berlin" />
              <TextLink
                label="Enter location manually"
                onPress={() => console.log('Location edit')}
                variant="primary"
              />
            </View>
          </View>

          <CustomDateTimePicker
            label="Started growing on"
            value={startedDate}
            onChange={setStartedDate}
            mode="date"
          />
        </View>

        <View style={{ gap: Spacing.md, marginTop: Spacing.md, alignItems: 'center' }}>
          <CustomButton
            label="Continue"
            fullWidth={true}
            onPress={handleContinue}
            isDisabled={!searchValue && !selectedPlant}
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