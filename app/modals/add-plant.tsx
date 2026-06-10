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

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [method, setMethod] = useState('soil');
  const [wateringFrequency, setWateringFrequency] = useState<RepeatInterval>('Weekly');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleSave = () => {
    // Save simulation
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
