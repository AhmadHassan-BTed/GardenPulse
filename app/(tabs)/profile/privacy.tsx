import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import SectionHeader from '../../../components/common/SectionHeader';
import PrivacyToggleRow from '../../../components/common/PrivacyToggleRow';
import DataInventoryRow from '../../../components/common/DataInventoryRow';
import PendingExportStatusCard from '../../../components/common/PendingExportStatusCard';
import CustomButton from '../../../components/common/CustomButton';
import ModalDialog from '../../../components/common/ModalDialog';
import { useGardenStore } from '../../../store/useGardenStore';

export default function PrivacyDashboardScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storeLogs = useGardenStore((state) => state.logs);
  const storePlants = useGardenStore((state) => state.plants);

  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [communityVisibility, setCommunityVisibility] = useState(true);
  
  const [isExportPending, setIsExportPending] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // Compute live data inventory from store
  const logCount = useMemo(() => storeLogs.length, [storeLogs]);
  const voiceNoteCount = useMemo(() => storeLogs.filter((l) => l.hasVoiceNote).length, [storeLogs]);
  const lastLogDate = useMemo(() => {
    if (storeLogs.length === 0) return 'Never';
    const sorted = [...storeLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return new Date(sorted[0].timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [storeLogs]);

  // Estimated size based on data volume
  const logSizeEstimate = `${(logCount * 0.007).toFixed(1)} MB`;
  const voiceSizeEstimate = `${(voiceNoteCount * 1.3).toFixed(1)} MB`;

  if (!isHydrated) {
    return null;
  }

  const handleClear = (category: string) => {
    console.log(`Clear ${category}`);
  };

  const handleExport = (category: string) => {
    setIsExportPending(true);
  };

  const handleDeleteAll = (category: string) => {
    console.log(`Delete all ${category}`);
  };

  const handleRequestFullExport = () => {
    setIsExportPending(true);
  };

  const handleDeleteAccount = () => {
    setDeleteDialogVisible(false);
    // In production: clear store, wipe AsyncStorage, navigate to onboarding
    console.log('Full data deletion requested');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Privacy Dashboard" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        {isExportPending && <PendingExportStatusCard />}

        <SectionHeader title="Granular Data Controls" />
        <View style={{ backgroundColor: theme.Colors.surface.base, paddingHorizontal: Spacing.md, borderRadius: theme.Radius.md, borderWidth: 1, borderColor: theme.Colors.border.subtle }}>
          <PrivacyToggleRow
            iconName="bar-chart-2"
            label="Analytics & Usage"
            description="Share anonymous telemetry to help improve GardenPulse features."
            value={analytics}
            onValueChange={setAnalytics}
          />
          <PrivacyToggleRow
            iconName="alert-triangle"
            label="Crash Reporting"
            description="Send automated bug logs to diagnose device compatibility issues."
            value={crashReports}
            onValueChange={setCrashReports}
          />
          <PrivacyToggleRow
            iconName="target"
            label="Personalized Ads"
            description="Use internal interests to display more relevant grow kit suggestions."
            value={personalizedAds}
            onValueChange={setPersonalizedAds}
          />
          <PrivacyToggleRow
            iconName="map-pin"
            label="Grow Map Pin"
            description="Anonymously share aggregated success metrics in your regional area."
            value={locationSharing}
            onValueChange={setLocationSharing}
          />
          <PrivacyToggleRow
            iconName="eye"
            label="Community Visibility"
            description="Allow other growers in your clusters to view your grower rank and badges."
            value={communityVisibility}
            onValueChange={setCommunityVisibility}
          />
        </View>

        <SectionHeader title="Storage & Inventory" style={{ marginTop: Spacing.md }} />
        <View style={{ gap: Spacing.xs }}>
          <DataInventoryRow
            category="Soil & Water Log History"
            count={logCount}
            sizeEstimate={logSizeEstimate}
            lastUpdated={lastLogDate}
            onClear={() => handleClear('logs')}
            onExport={() => handleExport('logs')}
            onDeleteAll={() => handleDeleteAll('logs')}
          />
          <DataInventoryRow
            category="Diagnostics Leaf Photos"
            count={0}
            sizeEstimate="0 MB"
            lastUpdated="Never"
            onClear={() => handleClear('photos')}
            onExport={() => handleExport('photos')}
            onDeleteAll={() => handleDeleteAll('photos')}
          />
          <DataInventoryRow
            category="Voice Recording Clips"
            count={voiceNoteCount}
            sizeEstimate={voiceSizeEstimate}
            lastUpdated={lastLogDate}
            onClear={() => handleClear('voice')}
            onExport={() => handleExport('voice')}
            onDeleteAll={() => handleDeleteAll('voice')}
          />
        </View>

        <View style={{ gap: Spacing.md, marginTop: Spacing.lg }}>
          <CustomButton 
            label="Request Full Data Export" 
            onPress={handleRequestFullExport} 
            isDisabled={isExportPending}
          />
          <CustomButton 
            label="Request Account & Data Deletion" 
            variant="ghost"
            style={{ borderColor: theme.Colors.text.error, borderWidth: 1 }}
            labelStyle={{ color: theme.Colors.text.error }}
            onPress={() => setDeleteDialogVisible(true)} 
          />
        </View>

      </View>

      {/* Delete Confirmation Dialog */}
      <ModalDialog
        visible={deleteDialogVisible}
        title="Delete All Data?"
        description="This will permanently erase all your plants, care logs, voice notes, and profile data from this device. This action cannot be undone."
        primaryAction={{
          label: 'Delete Everything',
          onPress: handleDeleteAccount,
        }}
        secondaryAction={{
          label: 'Cancel',
          onPress: () => setDeleteDialogVisible(false),
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
