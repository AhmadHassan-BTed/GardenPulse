import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { SettingsSectionGroup, DangerZoneSection } from '../../../components/common/SettingsSectionGroup';
import NavigationLinkRow from '../../../components/common/NavigationLinkRow';
import CustomSwitch from '../../../components/common/CustomSwitch';
import ThemeToggle from '../../../components/common/ThemeToggle';
import UnitToggle, { UnitSystem } from '../../../components/common/UnitToggle';
import CustomText from '../../../components/common/CustomText';
import ModalDialog from '../../../components/common/ModalDialog';
import { useGardenStore } from '../../../store/useGardenStore';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const userProfile = useGardenStore((state) => state.userProfile);
  const updateProfile = useGardenStore((state) => state.updateProfile);

  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  if (!isHydrated) {
    return null;
  }

  const handleDeleteAccount = () => {
    setDeleteDialogVisible(false);
    // In production: clear all store data, reset AsyncStorage, navigate to onboarding
    console.log('Account deletion requested');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Settings" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        {/* Account Section */}
        <SettingsSectionGroup title="Account">
          <NavigationLinkRow 
            label="Edit Profile" 
            value={userProfile.name}
            onPress={() => console.log('Edit Profile')} 
          />
          <NavigationLinkRow 
            label="Grower Tag" 
            value={`@${userProfile.growerTag}`}
            onPress={() => console.log('Edit Tag')} 
          />
          <NavigationLinkRow 
            label="Supporter Status" 
            value={userProfile.isSupporter ? '✅ Active' : 'Free'}
            onPress={() => router.push('/modals/supporter-badge')} 
          />
        </SettingsSectionGroup>

        {/* Preferences Section */}
        <SettingsSectionGroup title="Preferences">
          <View style={styles.row}>
            <CustomText style={[styles.rowLabel, { color: Colors.text.heading, fontSize: Typography.sizes.base }]}>
              App Theme
            </CustomText>
            <ThemeToggle showLabel variant="pill" />
          </View>

          <View style={styles.row}>
            <CustomText style={[styles.rowLabel, { color: Colors.text.heading, fontSize: Typography.sizes.base }]}>
              Measurement Units
            </CustomText>
            <UnitToggle value={unitSystem} onChange={setUnitSystem} />
          </View>

          <View style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
            <CustomSwitch 
              label="Push Notifications" 
              description="Receive weekly reports & care alerts"
              value={notifications} 
              onValueChange={setNotifications} 
            />
          </View>

          <View style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
            <CustomSwitch 
              label="Auto Sync" 
              description="Keep logs backed up to the cloud"
              value={autoSync} 
              onValueChange={setAutoSync} 
            />
          </View>

          <View style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
            <CustomSwitch 
              label="Haptic Feedback" 
              description="Vibration cues on actions & scans"
              value={haptics} 
              onValueChange={setHaptics} 
            />
          </View>
        </SettingsSectionGroup>

        {/* App & Support Section */}
        <SettingsSectionGroup title="Support & Privacy">
          <NavigationLinkRow 
            label="Notification Preferences" 
            onPress={() => router.push('/modals/notification-prefs')} 
          />
          <NavigationLinkRow 
            label="Privacy Dashboard" 
            onPress={() => router.push('/profile/privacy')} 
          />
          <NavigationLinkRow 
            label="Help Center" 
            onPress={() => console.log('Help Center')} 
          />
          <NavigationLinkRow 
            label="Send Feedback" 
            onPress={() => console.log('Send Feedback')} 
          />
        </SettingsSectionGroup>

        {/* Danger Zone */}
        <DangerZoneSection>
          <NavigationLinkRow 
            label="Export All Data" 
            onPress={() => router.push('/modals/export-share')} 
          />
          <NavigationLinkRow 
            label="Delete Account & Data" 
            isDestructive={true}
            onPress={() => setDeleteDialogVisible(true)} 
          />
        </DangerZoneSection>

        {/* Version Display */}
        <View style={styles.versionContainer}>
          <CustomText style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>
            GardenPulse v1.0.0 (Build 26)
          </CustomText>
        </View>

      </View>

      {/* Delete Confirmation Dialog */}
      <ModalDialog
        visible={deleteDialogVisible}
        title="Delete Account?"
        description="This will permanently erase all your plants, logs, and profile data. This action cannot be undone."
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowLabel: {
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
});
