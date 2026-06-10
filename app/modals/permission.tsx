import React from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import PermissionIllustration, { PermissionType } from '../../components/common/PermissionIllustration';
import CustomButton from '../../components/common/CustomButton';
import TextLink from '../../components/common/TextLink';

interface PermissionContent {
  title: string;
  description: string;
  reassurance: string;
  allowLabel: string;
}

const permissionData: Record<PermissionType, PermissionContent> = {
  location: {
    title: 'Before we ask...',
    description: 'GardenPulse uses location to give weather-aware care tips and detect your local planting zone.',
    reassurance: 'Location data is only stored locally and never shared publicly.',
    allowLabel: 'Allow Location',
  },
  camera: {
    title: 'Use your camera?',
    description: 'Required for Leaf Diagnostics to identify plant issues and recognize species directly on-device.',
    reassurance: 'Photos are analyzed locally and never uploaded to the cloud.',
    allowLabel: 'Allow Camera',
  },
  microphone: {
    title: 'Voice logging?',
    description: 'Enables hands-free logging. Talk to your garden journal to dictate care notes and activities.',
    reassurance: 'Speech-to-text is computed entirely on-device.',
    allowLabel: 'Allow Microphone',
  },
  notifications: {
    title: 'Stay on top of your garden?',
    description: 'Receive watering and feeding reminders, weekly bloom reports, and smart weather freeze alerts.',
    reassurance: 'Smart notifications are timed specifically to your active hours.',
    allowLabel: 'Allow Notifications',
  },
};

export default function PermissionModal() {
  const router = useRouter();
  const { type, next } = useLocalSearchParams<{ type?: PermissionType; next?: string }>();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const activeType: PermissionType = type || 'location';
  const info = permissionData[activeType] || permissionData.location;

  const handleAllow = () => {
    console.log(`Permission granted for: ${activeType}`);
    if (next) {
      router.replace(next as any);
    } else {
      router.back();
    }
  };

  const handleDismiss = () => {
    console.log(`Permission dismissed for: ${activeType}`);
    if (next) {
      router.replace(next as any);
    } else {
      router.back();
    }
  };

  const handleLearnPrivacy = () => {
    router.push('/(tabs)/profile/privacy');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        showBack={true}
        onBack={handleDismiss}
        transparent={true}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingVertical: Spacing.xl }}>
        <PermissionIllustration type={activeType} />

        <View style={{ gap: Spacing.sm, alignItems: 'center' }}>
          <Text style={{
            fontSize: Typography.sizes.lg,
            fontWeight: Typography.weights.bold,
            color: Colors.text.heading,
            textAlign: 'center',
          }}>
            {info.title}
          </Text>
          <Text style={{
            fontSize: Typography.sizes.base,
            color: Colors.text.body,
            textAlign: 'center',
            lineHeight: 22,
            paddingHorizontal: Spacing.md,
          }}>
            {info.description}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: Colors.surface.elevated,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.xs,
          borderRadius: theme.Radius.full,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
        }}>
          <Feather name="lock" size={12} color={Colors.text.muted} />
          <Text style={{
            fontSize: Typography.sizes.xs,
            color: Colors.text.muted,
          }}>
            {info.reassurance}
          </Text>
        </View>

        <View style={{ width: '100%', gap: Spacing.md, marginTop: Spacing.md, alignItems: 'center' }}>
          <CustomButton
            label={info.allowLabel}
            fullWidth={true}
            onPress={handleAllow}
          />
          <TextLink
            label="Not Now"
            onPress={handleDismiss}
            variant="muted"
            style={{ alignSelf: 'center' }}
          />
          <TextLink
            label="Learn more about privacy →"
            onPress={handleLearnPrivacy}
            variant="primary"
            style={{ alignSelf: 'center', marginTop: Spacing.xs }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}