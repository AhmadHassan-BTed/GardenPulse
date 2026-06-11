import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import QuickLogPlantSelector from '../../components/common/QuickLogPlantSelector';
import ActivityTypeChips, { StandardActivity } from '../../components/common/ActivityTypeChips';
import PhotoCaptureArea from '../../components/common/PhotoCaptureArea';
import MoodEmojiSlider from '../../components/common/MoodEmojiSlider';
import NotesInput from '../../components/common/NotesInput';
import MetricsQuickEntry from '../../components/common/MetricsQuickEntry';
import CustomButton from '../../components/common/CustomButton';
import SectionHeader from '../../components/common/SectionHeader';
import { useGardenStore } from '../../store/useGardenStore';

export default function QuickLogModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storePlants = useGardenStore((state) => state.plants);
  const addLogEntry = useGardenStore((state) => state.addLogEntry);

  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(
    (params.plantId as string) || null
  );
  const [selectedActivities, setSelectedActivities] = useState<StandardActivity[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hadVoiceNote, setHadVoiceNote] = useState(false);

  // Metrics state
  const [phValue, setPhValue] = useState(6.0);
  const [ecValue, setEcValue] = useState('');
  const [moistureValue, setMoistureValue] = useState('');
  const [tempValue, setTempValue] = useState('');

  if (!isHydrated) {
    return null;
  }

  const handleOpenCamera = async () => {
    try {
      const ImagePicker = require('expo-image-picker');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take a plant photo.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error: any) {
      console.error('Camera launch failed:', error);
      Alert.alert('Error', 'Failed to open camera: ' + (error.message || 'Unknown error'));
    }
  };

  const handleOpenGallery = async () => {
    try {
      const ImagePicker = require('expo-image-picker');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Gallery permission is required to select a plant photo.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error: any) {
      console.error('Gallery launch failed:', error);
      Alert.alert('Error', 'Failed to open gallery: ' + (error.message || 'Unknown error'));
    }
  };

  const activePlants = (storePlants || []).filter((p) => !p.isArchived).map((p) => ({
    id: p.id,
    name: p.nickname || p.name,
    imageUrl: p.imageUrl,
  }));

  const handleToggleActivity = (activity: StandardActivity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setHadVoiceNote(true);
      setTimeout(() => {
        setNotes((prev) => (prev ? prev + ' ' : '') + 'Simulated voice dictation transcription text.');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSave = () => {
    if (!selectedPlantId) return;
    addLogEntry({
      plantId: selectedPlantId,
      activities: selectedActivities,
      notes: notes,
      hasVoiceNote: hadVoiceNote,
      metrics: {
        ph: phValue,
        ec: ecValue ? parseFloat(ecValue) : undefined,
        moisture: moistureValue ? parseFloat(moistureValue) : undefined,
        temp: tempValue ? parseFloat(tempValue) : undefined,
      },
    });
    router.back();
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Quick Care Log" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        <SectionHeader title="Select Plant" />
        <QuickLogPlantSelector
          plants={activePlants}
          selectedId={selectedPlantId}
          onSelect={setSelectedPlantId}
        />

        <SectionHeader title="Activities Completed" style={{ marginTop: Spacing.sm }} />
        <ActivityTypeChips
          selectedActivities={selectedActivities}
          onToggleActivity={handleToggleActivity}
        />

        <SectionHeader title="Photos" style={{ marginTop: Spacing.sm }} />
        <PhotoCaptureArea
          capturedPhotoUri={photoUri || undefined}
          onOpenCamera={handleOpenCamera}
          onOpenGallery={handleOpenGallery}
          onClearPhoto={() => setPhotoUri(null)}
        />

        <MoodEmojiSlider
          value={mood}
          onChange={setMood}
        />

        <MetricsQuickEntry
          phValue={phValue}
          onPhChange={setPhValue}
          ecValue={ecValue}
          onEcChange={setEcValue}
          moistureValue={moistureValue}
          onMoistureChange={setMoistureValue}
          tempValue={tempValue}
          onTempChange={setTempValue}
        />

        <NotesInput
          label="Grower Notes"
          value={notes}
          onChangeText={setNotes}
          isRecording={isRecording}
          onMicPress={handleMicPress}
        />

        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton 
            label="Save Care Log" 
            onPress={handleSave} 
            isDisabled={selectedActivities.length === 0 || !selectedPlantId}
          />
        </View>

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
