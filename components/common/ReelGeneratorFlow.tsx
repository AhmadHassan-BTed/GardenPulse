// ─────────────────────────────────────────────────────────────────────────────
// ReelGeneratorFlow.tsx — GardenPulse
// Multi-step flow: Plant Selector -> Preview & Style -> Generating state.
// Contains internal sub-components PhotoPreviewStrip and OverlayStyleSelector.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import CustomHeader from './CustomHeader'; // Assumes you have this from Phase 1/Barrel

// --- Local Sub-components ---
const PhotoPreviewStrip = ({ photos, theme }: any) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: theme.Spacing.md }}>
    {photos.map((uri: string, idx: number) => (
      <View key={idx} style={{ width: 60, height: 80, borderRadius: theme.Radius.sm, backgroundColor: theme.Colors.surface.elevated, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name="image" size={20} color={theme.Colors.text.muted} />
      </View>
    ))}
  </ScrollView>
);

const OverlayStyleSelector = ({ selected, onSelect, theme }: any) => {
  const styles = ['Minimal', 'Metric Heavy', 'Date Only', 'None'];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: theme.Spacing.lg }}>
      {styles.map(s => (
        <CustomButton 
          key={s} 
          label={s} 
          variant={selected === s ? 'primary' : 'secondary'} 
          onPress={() => onSelect(s)} 
          style={{ flexGrow: 1, minHeight: 40 }} 
        />
      ))}
    </View>
  );
};
// ----------------------------

export interface ReelGeneratorFlowProps {
  onClose: () => void;
  onComplete: () => void;
  style?: ViewStyle;
}

const ReelGeneratorFlow: React.FC<ReelGeneratorFlowProps> = ({ onClose, onComplete, style }) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStyle, setSelectedStyle] = useState('Minimal');

  const handleNext = () => {
    if (step === 1) setStep(2);
    if (step === 2) {
      setStep(3);
      setTimeout(() => onComplete(), 2500); // Simulate generation delay
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors.surface.base,
          ...style,
        },
        content: {
          padding: Spacing.lg,
        },
        sectionTitle: {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginTop: Spacing.md,
          marginBottom: Spacing.sm,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.xl,
        },
        loadingText: {
          marginTop: Spacing.lg,
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        loadingSubText: {
          marginTop: Spacing.sm,
          fontSize: Typography.sizes.sm,
          color: Colors.text.muted,
          textAlign: 'center',
        },
      }),
    [Colors, Spacing, Typography, style]
  );

  if (step === 3) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.green.DEFAULT} />
          <Text style={styles.loadingText}>Generating Reel...</Text>
          <Text style={styles.loadingSubText}>Stitching 42 photos with growth metrics. This usually takes a few seconds.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader 
        title={step === 1 ? "Create Reel" : "Customize"} 
        showBack 
        onBack={step === 1 ? onClose : () => setStep(1)} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <CustomCard padding={Spacing.md}>
              <Text style={styles.sectionTitle}>Selected Plant</Text>
              <Text style={{ color: Colors.green.DEFAULT, fontWeight: 'bold' }}>Monstera Deliciosa</Text>
              <Text style={{ color: Colors.text.muted, fontSize: 12 }}>42 photos available</Text>
            </CustomCard>
            
            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl }}>
              <CustomButton 
                label="Start: Jan 1" 
                variant="secondary" 
                onPress={() => {
                  Alert.alert('Date Range', 'Automatic date range selection requires native platform modal integration.');
                }} 
                style={{ flex: 1 }} 
              />
              <CustomButton 
                label="End: Today" 
                variant="secondary" 
                onPress={() => {
                  Alert.alert('Date Range', 'Automatic date range selection requires native platform modal integration.');
                }} 
                style={{ flex: 1 }} 
              />
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.sectionTitle}>Sequence Preview</Text>
            <PhotoPreviewStrip photos={new Array(8).fill('')} theme={theme} />
            
            <Text style={styles.sectionTitle}>Overlay Style</Text>
            <OverlayStyleSelector selected={selectedStyle} onSelect={setSelectedStyle} theme={theme} />
          </>
        )}

        <CustomButton 
          label={step === 1 ? "Next Step" : "Generate Reel ✨"} 
          onPress={handleNext} 
          fullWidth 
          style={{ marginTop: Spacing.xl }}
        />
      </ScrollView>
    </View>
  );
};

export default ReelGeneratorFlow;