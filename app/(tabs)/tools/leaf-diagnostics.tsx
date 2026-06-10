import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
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

  const handleStartScan = () => {
    setViewState('camera');
  };

  const handleCapture = () => {
    setViewState('scanning');
    setTimeout(() => {
      setSelectedScan({
        plantName: 'Monstera Deliciosa',
        confidence: 93,
        issue: 'Nitrogen Deficiency',
        severity: 'medium' as const,
        explanation: 'The mature bottom leaves are yellowing from the tips inward, while veins remain faintly green. This signature pattern indicates Nitrogen depletion as the plant translocates mobile nitrogen to new upper foliage.',
      });
      setViewState('result');
    }, 1800);
  };

  const handleSelectHistoryItem = (item: any) => {
    setSelectedScan({
      plantName: item.plantName,
      confidence: 89,
      issue: item.finding,
      severity: item.severity,
      explanation: `Historical scan data compiled on ${item.date}. Primary diagnosis identified ${item.finding} with high matching precision. Recommended treatments include isolated spraying and moisture balance monitoring.`,
    });
    setViewState('result');
  };

  if (viewState === 'camera') {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 1)' }}>
        <CameraViewfinder
          mode="leaf"
          instructionLabel="Align leaf within the dashed area"
          isFlashOn={flashOn}
          onToggleFlash={() => setFlashOn(!flashOn)}
          onClose={() => setViewState('default')}
          onCapture={handleCapture}
          onOpenGallery={() => {
            alert('Gallery selection simulated!');
            handleCapture();
          }}
        />
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
                alert('Treatment protocols added to your scheduler task list.');
              }}
              onReadMore={() => {
                router.push(`/modals/tips` as any);
              }}
            />

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