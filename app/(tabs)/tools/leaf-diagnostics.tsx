import React, { useState, useRef } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import CameraViewfinder from '../../../components/common/CameraViewfinder';
import DiagnosisResultCard from '../../../components/common/DiagnosisResultCard';
import { DiagnosisHistoryRow, ScanningStateOverlay } from '../../../components/common/InsightAndMapCards';
import CustomButton from '../../../components/common/CustomButton';
import CustomCard from '../../../components/common/CustomCard';
import SectionHeader from '../../../components/common/SectionHeader';
import { ContextualTipCard } from '../../../components/common/InsightBanners';
import CustomText from '../../../components/common/CustomText';

const recentScansData = [
  { id: '1', date: 'Jun 8', plantName: 'Fiddle Leaf Fig', finding: 'Spider Mites Infestation', severity: 'high' as const },
  { id: '2', date: 'Jun 4', plantName: 'Sweet Basil', finding: 'Downy Mildew fungus', severity: 'medium' as const },
  { id: '3', date: 'May 29', plantName: 'Monstera Deliciosa', finding: 'Magnesium Deficiency', severity: 'low' as const },
];

const libraryIssues = [
  { title: 'Nitrogen Deficiency', tag: 'Nutrition', readTime: '5 min read', desc: 'Lower leaves yellowing, slow vegetative growth.' },
  { title: 'Root Rot (Overwatering)', tag: 'Watering', readTime: '6 min read', desc: 'Wilting, black mushy root system, stagnant smell.' },
  { title: 'Thrips & Spiders', tag: 'Pest Alert', readTime: '4 min read', desc: 'Silvery speckles, thin white webbing, sticky sap.' },
];

export default function LeafDiagnosticsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [viewState, setViewState] = useState<'default' | 'camera' | 'scanning' | 'result'>('default');
  const [flashOn, setFlashOn] = useState(false);
  const [selectedScan, setSelectedScan] = useState<any>(null);
  const [showTreatment, setShowTreatment] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleStartScan = async () => {
    if (!permission || !permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is required to analyze leaf diseases.');
        return;
      }
    }
    setViewState('camera');
  };

  const handleCapture = async () => {
    try {
      let base64: string | undefined;

      if (cameraRef.current) {
        setViewState('scanning');
        const options = { base64: true, quality: 0.5 };
        const photo = await cameraRef.current.takePictureAsync(options);
        base64 = photo?.base64 || undefined;
      } else {
        // Fallback placeholder base64 representing a healthy/deficient leaf if camera is not mounted
        base64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
        setViewState('scanning');
      }

      if (base64) {
        const { analyzeLeafDisease } = require('../../../services/gemini');
        const diagnosis = await analyzeLeafDisease(base64);
        setSelectedScan({
          plantName: 'Analyzed Leaf',
          confidence: Math.round(diagnosis.confidence * 100),
          issue: diagnosis.issue,
          severity: diagnosis.severity,
          explanation: diagnosis.explanation,
          treatmentSteps: diagnosis.treatmentSteps,
        });
        setShowTreatment(false);
        setViewState('result');
      } else {
        throw new Error('Could not capture leaf image data.');
      }
    } catch (error: any) {
      console.error('Leaf analysis failed:', error);
      Alert.alert('AI Diagnosis Failed', error.message || 'Unknown error. Please check your connection and API keys.');
      setViewState('default');
    }
  };

  const handleOpenGallery = async () => {
    try {
      const ImagePicker = require('expo-image-picker');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Gallery permission is required to select a leaf image.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        setViewState('scanning');
        const base64 = result.assets[0].base64;
        const { analyzeLeafDisease } = require('../../../services/gemini');
        const diagnosis = await analyzeLeafDisease(base64);
        setSelectedScan({
          plantName: 'Imported Leaf Image',
          confidence: Math.round(diagnosis.confidence * 100),
          issue: diagnosis.issue,
          severity: diagnosis.severity,
          explanation: diagnosis.explanation,
          treatmentSteps: diagnosis.treatmentSteps,
        });
        setShowTreatment(false);
        setViewState('result');
      }
    } catch (error: any) {
      console.error('Gallery analysis failed:', error);
      Alert.alert('AI Diagnosis Failed', error.message || 'Unknown error. Please check your connection and API keys.');
      setViewState('default');
    }
  };

  const handleSelectHistoryItem = (item: any) => {
    setSelectedScan({
      plantName: item.plantName,
      confidence: 89,
      issue: item.finding,
      severity: item.severity,
      explanation: `Historical scan data compiled on ${item.date}. Primary diagnosis identified ${item.finding} with high matching precision. Recommended treatments include isolated spraying and moisture balance monitoring.`,
      treatmentSteps: [
        'Isolate the plant to prevent spread.',
        'Prune affected leaves with sterile shears.',
        'Apply targeted spray treatment (neem oil or organic copper fungicide).',
        'Monitor watering schedules and environmental parameters.'
      ],
    });
    setShowTreatment(false);
    setViewState('result');
  };

  if (viewState === 'camera') {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          ref={cameraRef}
          enableTorch={flashOn}
        >
          <CameraViewfinder
            mode="leaf"
            instructionLabel="Align leaf within the dashed area"
            isFlashOn={flashOn}
            onToggleFlash={() => setFlashOn(!flashOn)}
            onClose={() => setViewState('default')}
            onCapture={handleCapture}
            onOpenGallery={handleOpenGallery}
          />
        </CameraView>
      </View>
    );
  }

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Leaf Diagnostics"
        showBack={viewState !== 'default'}
        onBack={() => setViewState('default')}
      />

      {viewState === 'scanning' && <ScanningStateOverlay />}

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {viewState === 'default' && (
          <>
            {/* Primary CTA */}
            <CustomCard padding={Spacing.lg} style={{ backgroundColor: `${Colors.green.DEFAULT}10`, borderStyle: 'dashed', borderWidth: 2, borderColor: Colors.green.DEFAULT, alignItems: 'center', gap: Spacing.md }}>
              <CustomText style={{ fontSize: Typography.sizes.base, color: Colors.text.body, textAlign: 'center', fontWeight: 'bold' }}>
                Suspect a deficiency or pest infestation?
              </CustomText>
              <CustomButton
                label="Scan Sick Leaf"
                leftIcon="camera"
                onPress={handleStartScan}
                fullWidth={true}
              />
            </CustomCard>

            {/* Diagnostics History list */}
            <View style={{ gap: Spacing.sm }}>
              <SectionHeader title="Recent Diagnoses" />
              {recentScansData.map((scan) => (
                <Pressable key={scan.id} onPress={() => handleSelectHistoryItem(scan)}>
                  <DiagnosisHistoryRow
                    date={scan.date}
                    plantName={scan.plantName}
                    finding={scan.finding}
                    severity={scan.severity}
                  />
                </Pressable>
              ))}
            </View>

            {/* Common Issues Library */}
            <View style={{ gap: Spacing.sm }}>
              <SectionHeader title="Common Issues Library" />
              {libraryIssues.map((issue, idx) => (
                <ContextualTipCard
                  key={idx}
                  title={`${issue.title}: ${issue.desc}`}
                  tag={issue.tag}
                  readTime={issue.readTime}
                  onPress={() => router.push(`/modals/tips` as any)}
                />
              ))}
            </View>
          </>
        )}

        {viewState === 'result' && selectedScan && (
          <View style={{ gap: Spacing.md }}>
            <DiagnosisResultCard
              plantId={selectedScan.plantName}
              confidence={selectedScan.confidence}
              issue={selectedScan.issue}
              severity={selectedScan.severity}
              explanation={selectedScan.explanation}
              onTreatIssue={() => {
                setShowTreatment(!showTreatment);
              }}
              onReadMore={() => {
                router.push(`/modals/tips` as any);
              }}
            />

            {showTreatment && selectedScan.treatmentSteps && (
              <CustomCard padding={Spacing.lg}>
                <SectionHeader title="Step-by-Step Treatment Protocol" />
                <View style={{ gap: Spacing.sm, marginTop: Spacing.md }}>
                  {selectedScan.treatmentSteps.map((step: string, index: number) => (
                    <View key={index} style={{ flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' }}>
                      <CustomText style={{ color: Colors.green.DEFAULT, fontWeight: 'bold', fontSize: Typography.sizes.base }}>
                        {index + 1}.
                      </CustomText>
                      <CustomText style={{ flex: 1, color: Colors.text.body, fontSize: Typography.sizes.base, lineHeight: 20 }}>
                        {step}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </CustomCard>
            )}

            <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
              <CustomButton
                label="Retake Scan"
                variant="secondary"
                onPress={handleStartScan}
                style={{ flex: 1 }}
              />
              <CustomButton
                label="Share Report"
                variant="secondary"
                onPress={() => router.push('/modals/export-share')}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}