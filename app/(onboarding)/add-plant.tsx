import React, { useState, useMemo } from 'react';
import { View, Alert, Keyboard, Modal, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // ADDED: The actual camera library
import { useTheme } from '../../components/layout/ThemeProvider';
import CustomText from '../../components/common/CustomText';
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
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import TextLink from '../../components/common/TextLink';
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
  { name: 'Sunflower', scientific: 'Helianthus annuus', methodBadge: 'Soil' },
  { name: 'Wheatgrass', scientific: 'Triticum aestivum', methodBadge: 'Hydro' },
];

const categories = ['Herb', 'Vegetable', 'Fruit', 'Flower', 'Houseplant', 'Microgreen'];

const categoryToPlantMap: Record<string, string> = {
  herb: 'Basil',
  vegetable: 'Tomato',
  fruit: 'Tomato',
  houseplant: 'Monstera',
  flower: 'Sunflower',
  microgreen: 'Wheatgrass',
};

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

  const [zone, setZone] = useState('Zone 7b');
  const [location, setLocation] = useState('Local');
  const [tempZone, setTempZone] = useState('Zone 7b');
  const [tempLocation, setTempLocation] = useState('Local');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalBackdrop: {
          flex: 1,
          backgroundColor: Colors.surface.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.lg,
        },
        modalCard: {
          width: '100%',
          maxWidth: 320,
          backgroundColor: Colors.surface.base,
          borderRadius: theme.Radius.xl,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.lg,
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        modalTitle: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: Spacing.md,
        },
        modalActions: {
          flexDirection: 'row',
          width: '100%',
          gap: Spacing.sm,
          marginTop: Spacing.md,
        },
        modalButton: {
          flex: 1,
          height: 44,
          borderRadius: theme.Radius.md,
          justifyContent: 'center',
          alignItems: 'center',
        },
        cancelButton: {
          borderWidth: 1,
          borderColor: Colors.border.muted,
        },
        saveButton: {
          elevation: 2,
        },
        disabledButton: {
          opacity: 0.5,
        },
        buttonText: {
          fontSize: Typography.sizes.sm,
        },
      }),
    [Colors, Spacing, Typography, theme.Radius]
  );

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

  // FIXED: Actually opens the camera instead of infinitely looping the router
  const handleScanLeaf = async () => {
    Keyboard.dismiss();
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Required', 'Please allow camera access to scan a seed packet or leaf.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        Alert.alert('Scan Successful', 'Image captured. AI analysis integration will process this image.');
        // Here is where you would pass this to the Gemini service.
      }
    } catch (error) {
      Alert.alert('Error', 'The camera failed to open.');
    }
  };

  const handleOpenLocationModal = () => {
    setTempZone(zone);
    setTempLocation(location);
    setShowLocationModal(true);
  };

  const handleSaveLocation = () => {
    setZone(tempZone);
    setLocation(tempLocation);
    setShowLocationModal(false);
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
        location: location
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
        location: location !== 'Local' ? location : 'Garden Bed'
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
          <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, lineHeight: 20 }}>
            Search or scan a plant. This configures the initial care guides and calendars for your garden.
          </CustomText>
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
          <CustomText style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Browse Categories
          </CustomText>
          <PlantBrowseGrid 
            categories={categories} 
            onSelectCategory={(cat) => {
              Keyboard.dismiss();
              const plantName = categoryToPlantMap[cat.toLowerCase()];
              if (plantName) {
                handleSelectPlant(plantName);
              }
            }}
          />
        </View>

        {selectedPlant ? (
          <SelectedPlantPreviewCard
            name={selectedPlant.name}
            scientific={selectedPlant.scientific}
            methodBadge={selectedPlant.methodBadge}
          />
        ) : (
          <View style={{ height: 72 }} />
        )}

        <View style={{ gap: Spacing.lg }}>
          <CustomInput
            label="Plant Nickname (optional)"
            placeholder="e.g. Spike, Greenie"
            value={nickname}
            onChangeText={setNickname}
          />

          <View style={{ gap: Spacing.sm }}>
            <CustomText style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Growing Method
            </CustomText>
            <RadioGroup
              options={methodOptions}
              selectedValue={growingMethod}
              onSelect={(val) => setGrowingMethod(val as string)}
              horizontal={true}
            />
          </View>

          <View style={{ gap: Spacing.sm }}>
            <CustomText style={{ fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.text.heading, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Location & Climate
            </CustomText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
              <ZoneBadge zone={zone} location={location} />
              <TextLink
                label="Enter location manually"
                onPress={handleOpenLocationModal}
                variant="primary"
                labelStyle={{ fontSize: Typography.sizes.sm }}
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
          <CustomButton
            label="Skip for now"
            onPress={handleSkip}
            variant="ghost"
          />
        </View>
      </View>

      {/* Manual Location Setup Modal */}
      {showLocationModal && (
        <Modal
          transparent={true}
          visible={showLocationModal}
          animationType="fade"
          onRequestClose={() => setShowLocationModal(false)}
        >
          <Pressable style={styles.modalBackdrop} onPress={() => setShowLocationModal(false)}>
            <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
              <CustomText style={styles.modalTitle}>
                Manual Location Setup
              </CustomText>
              
              <View style={{ width: '100%', gap: Spacing.md, marginTop: Spacing.sm }}>
                <CustomInput
                  label="Hardiness Zone"
                  placeholder="e.g. Zone 7b"
                  value={tempZone}
                  onChangeText={setTempZone}
                />
                
                <CustomInput
                  label="City / Region"
                  placeholder="e.g. Berlin"
                  value={tempLocation}
                  onChangeText={setTempLocation}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowLocationModal(false)}
                >
                  <CustomText style={[styles.buttonText, { color: Colors.text.muted }]}>Cancel</CustomText>
                </Pressable>
                <Pressable
                  style={[
                    styles.modalButton,
                    styles.saveButton,
                    { backgroundColor: Colors.green.DEFAULT },
                    (!tempZone.trim() || !tempLocation.trim()) && styles.disabledButton
                  ]}
                  disabled={!tempZone.trim() || !tempLocation.trim()}
                  onPress={handleSaveLocation}
                >
                  <CustomText style={[styles.buttonText, { color: '#FFF', fontWeight: '600' }]}>Save</CustomText>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </ScreenWrapper>
  );
}