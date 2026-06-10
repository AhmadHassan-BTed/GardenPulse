import React, { useState } from 'react';
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

export default function PrivacyDashboardScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [communityVisibility, setCommunityVisibility] = useState(true);
  
  const [isExportPending, setIsExportPending] = useState(false);

  const handleClear = (category: string) => {
    // Clear simulation
  };

  const handleExport = (category: string) => {
    setIsExportPending(true);
  };

  const handleDeleteAll = (category: string) => {
    // Delete simulation
  };

  const handleRequestFullExport = () => {
    setIsExportPending(true);
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
            count={347}
            sizeEstimate="2.4 MB"
            lastUpdated="Jun 10, 2026"
            onClear={() => handleClear('logs')}
            onExport={() => handleExport('logs')}
            onDeleteAll={() => handleDeleteAll('logs')}
          />
          <DataInventoryRow
            category="Diagnostics Leaf Photos"
            count={48}
            sizeEstimate="34.2 MB"
            lastUpdated="Jun 8, 2026"
            onClear={() => handleClear('photos')}
            onExport={() => handleExport('photos')}
            onDeleteAll={() => handleDeleteAll('photos')}
          />
          <DataInventoryRow
            category="Voice Recording Clips"
            count={12}
            sizeEstimate="15.8 MB"
            lastUpdated="May 29, 2026"
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
            onPress={() => router.push('/modals/delete-account')} 
          />
        </View>

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
