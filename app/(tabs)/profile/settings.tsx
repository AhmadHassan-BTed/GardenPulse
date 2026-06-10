import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
            onPress={() => console.log('Edit Profile')} 
          />
          <NavigationLinkRow 
            label="Connected Accounts" 
            onPress={() => console.log('Connected Accounts')} 
          />
          <NavigationLinkRow 
            label="Change Password" 
            onPress={() => console.log('Change Password')} 
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
            label="Delete Account" 
            isDestructive={true}
            onPress={() => console.log('Delete Account')} 
          />
        </DangerZoneSection>

        {/* Version Display */}
        <View style={styles.versionContainer}>
          <CustomText style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>
            GardenPulse v1.0.0 (Build 26)
          </CustomText>
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
