import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput, Modal, Pressable } from 'react-native';
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
import CustomButton from '../../../components/common/CustomButton';
import { useGardenStore } from '../../../store/useGardenStore';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const userProfile = useGardenStore((state) => state.userProfile);
  const updateProfile = useGardenStore((state) => state.updateProfile);
  const clearAllData = useGardenStore((state) => state.clearAllData);

  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editField, setEditField] = useState<'name' | 'growerTag' | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!isHydrated) {
    return null;
  }

  const handleDeleteAccount = async () => {
    setDeleteDialogVisible(false);
    try {
      await clearAllData();
      Alert.alert('Account & Data Deleted', 'All data has been successfully erased from this device and cloud sync.');
      router.replace('/(onboarding)');
    } catch (err: any) {
      console.error('Deletion failed:', err);
      Alert.alert('Error', 'Failed to erase data. Please try again.');
    }
  };

  const handleEditProfile = () => {
    setEditField('name');
    setEditValue(userProfile.name);
  };

  const handleEditTag = () => {
    setEditField('growerTag');
    setEditValue(userProfile.growerTag);
  };

  const handleSaveField = () => {
    if (editField === 'name') {
      updateProfile({ name: editValue });
    } else if (editField === 'growerTag') {
      const sanitized = editValue.replace(/\s+/g, '_').toLowerCase();
      updateProfile({ growerTag: sanitized });
    }
    setEditField(null);
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
            value={userProfile.name || 'Set Name'}
            onPress={handleEditProfile} 
          />
          <NavigationLinkRow 
            label="Grower Tag" 
            value={userProfile.growerTag ? `@${userProfile.growerTag}` : 'Set Tag'}
            onPress={handleEditTag} 
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
            onPress={() => Alert.alert('Help Center', 'Help articles will be available soon.')} 
          />
          <NavigationLinkRow 
            label="Send Feedback" 
            onPress={() => Alert.alert('Send Feedback', 'Feedback system is coming soon!')} 
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

      {/* Edit Profile Field Modal */}
      <Modal
        visible={editField !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEditField(null)}
      >
        <View style={{
          flex: 1,
          backgroundColor: Colors.surface.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.lg,
        }}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setEditField(null)} />
          <View style={{
            width: '100%',
            maxWidth: 340,
            backgroundColor: Colors.surface.base,
            borderRadius: theme.Radius.xl,
            borderWidth: 1,
            borderColor: Colors.surface.glassBorder,
            padding: Spacing.xl,
            gap: Spacing.md,
          }}>
            <CustomText style={{ fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>
              Edit {editField === 'name' ? 'Name' : 'Grower Tag'}
            </CustomText>
            <TextInput
              style={{
                backgroundColor: Colors.surface.glass,
                color: Colors.text.heading,
                borderRadius: theme.Radius.md,
                padding: Spacing.md,
                fontSize: Typography.sizes.base,
                borderWidth: 1,
                borderColor: Colors.border.subtle,
              }}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus={true}
              placeholder={editField === 'name' ? 'Enter your name' : 'Enter grower tag'}
              placeholderTextColor={Colors.text.muted}
            />
            <View style={{ flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm }}>
              <View style={{ flex: 1 }}>
                <CustomButton label="Cancel" onPress={() => setEditField(null)} variant="secondary" />
              </View>
              <View style={{ flex: 1 }}>
                <CustomButton label="Save" onPress={handleSaveField} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

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

