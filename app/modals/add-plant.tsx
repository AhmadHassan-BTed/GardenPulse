import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import AutocompleteSearchInput from '../../components/common/AutocompleteSearchInput';
import PhotoCaptureArea from '../../components/common/PhotoCaptureArea';
import RadioGroup from '../../components/common/RadioGroup';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import SectionHeader from '../../components/common/SectionHeader';
import RepeatSelector, { RepeatInterval } from '../../components/common/RepeatSelector';
import { useGardenStore } from '../../store/useGardenStore';

const plantSuggestions = [
  'Monstera Deliciosa',
  'Fiddle Leaf Fig',
  'Snake Plant',
  'Spider Plant',
  'Pothos',
  'Sweet Basil',
  'Roma Tomato',
];

export default function AddPlantModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const addPlant = useGardenStore((state) => state.addPlant);
  const addTask = useGardenStore((state) => state.addTask);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [method, setMethod] = useState('soil');
  const [containerSize, setContainerSize] = useState('3 Gallons');
  const [zone, setZone] = useState('Zone 7b');
  const [wateringFrequency, setWateringFrequency] = useState<RepeatInterval>('Weekly');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  if (!isHydrated) {
    return null;
  }

  const handleSave = () => {
    const methodMapped = method === 'hydro' ? 'Hydro' : (method === 'coco' ? 'Container' : 'Soil');

    // 1. Add the plant
    addPlant({
      name: species.trim(),
      nickname: name.trim() || undefined,
      method: methodMapped,
      stage: 'Veg',
      dateAdded: new Date().toISOString(),
      zone: zone.trim() || 'Zone 7b',
      containerSize: method === 'coco' ? containerSize : undefined,
      imageUrl: photoUri || undefined,
    });

    // 2. Query store immediately to find the newly created plant (prepended in the plants array)
    const latestPlant = useGardenStore.getState().plants[0];
    if (latestPlant) {
      // Create initial Check task due today or tomorrow
      addTask({
        plantId: latestPlant.id,
        plantName: latestPlant.nickname || latestPlant.name,
        taskType: 'Check',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Due tomorrow
      });
    }

    router.back();
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Add New Plant" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <CustomInput
          label="Plant Nickname"
          placeholder="e.g. My Monstera"
          value={name}
          onChangeText={setName}
        />

        <AutocompleteSearchInput
          label="Species / Type"
          value={species}
          onChangeText={setSpecies}
          data={plantSuggestions}
          onSelect={setSpecies}
        />

        <SectionHeader title="Growing Method" />
        <RadioGroup
          options={[
            { label: 'Soil Drench', value: 'soil' },
            { label: 'Hydroponics', value: 'hydro' },
            { label: 'Coco Coir', value: 'coco' },
          ]}
          selectedValue={method}
          onSelect={(v) => setMethod(String(v))}
          horizontal={true}
        />

        {method === 'coco' && (
          <>
            <SectionHeader title="Container Size" style={{ marginTop: Spacing.sm }} />
            <RadioGroup
              options={[
                { label: '1 Gal', value: '1 Gallon' },
                { label: '3 Gal', value: '3 Gallons' },
                { label: '5 Gal', value: '5 Gallons' },
                { label: '10 Gal', value: '10 Gallons' },
              ]}
              selectedValue={containerSize}
              onSelect={(v) => setContainerSize(String(v))}
              horizontal={true}
            />
          </>
        )}

        <CustomInput
          label="Growing Zone"
          placeholder="e.g. Zone 7b"
          value={zone}
          onChangeText={setZone}
        />

        <SectionHeader title="Watering Schedule" style={{ marginTop: Spacing.sm }} />
        <RepeatSelector
          value={wateringFrequency}
          onChange={(v) => setWateringFrequency(v)}
        />

        <SectionHeader title="Plant Photo" style={{ marginTop: Spacing.sm }} />
        <PhotoCaptureArea
          capturedPhotoUri={photoUri || undefined}
          onOpenCamera={() => setPhotoUri('https://images.unsplash.com/photo-1545241047-6083a3684587?w=500')}
          onOpenGallery={() => setPhotoUri('https://images.unsplash.com/photo-1545241047-6083a3684587?w=500')}
          onClearPhoto={() => setPhotoUri(null)}
        />

        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton 
            label="Save Plant" 
            onPress={handleSave} 
            isDisabled={name.trim() === '' || species.trim() === ''}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
