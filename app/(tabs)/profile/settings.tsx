import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { SettingsSectionGroup, DangerZoneSection } from '../../../components/common/SettingsSectionGroup';
import NavigationLinkRow from '../../../components/common/NavigationLinkRow';
import CustomSwitch from '../../../components/common/CustomSwitch';
import ThemeToggle from '../../../components/common/ThemeToggle';
import UnitToggle, { UnitSystem } from '../../../components/common/UnitToggle';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

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
            onPress={() => router.push('/modals/edit-profile')} 
          />
          <NavigationLinkRow 
            label="Connected Accounts" 
            onPress={() => router.push('/modals/connected-accounts')} 
          />
          <NavigationLinkRow 
            label="Change Password" 
            onPress={() => router.push('/modals/change-password')} 
          />
        </SettingsSectionGroup>

        {/* Preferences Section */}
        <SettingsSectionGroup title="Preferences">
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: Colors.text.heading, fontSize: Typography.sizes.base }]}>
              App Theme
            </Text>
            <ThemeToggle showLabel variant="pill" />
          </View>

          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: Colors.text.heading, fontSize: Typography.sizes.base }]}>
              Measurement Units
            </Text>
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
            onPress={() => router.push('/modals/help-center')} 
          />
          <NavigationLinkRow 
            label="Send Feedback" 
            onPress={() => router.push('/modals/feedback')} 
          />
        </SettingsSectionGroup>

        {/* Danger Zone */}
        <DangerZoneSection>
          <NavigationLinkRow 
            label="Delete Account" 
            isDestructive={true}
            onPress={() => router.push('/modals/delete-account')} 
          />
        </DangerZoneSection>

        {/* Version Display */}
        <View style={styles.versionContainer}>
          <Text style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>
            GardenPulse v1.0.0 (Build 26)
          </Text>
        </View>

      </View>
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
