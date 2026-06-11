import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import ToolCard from '../../../components/common/ToolCard';
import RecentlyUsedBanner from '../../../components/common/RecentlyUsedBanner';
import { SupporterBadgeBanner } from '../../../components/common/PremiumGuides';
import { useGardenStore } from '../../../store/useGardenStore';

const toolsMap: Record<string, { name: string; icon: any; path: string }> = {
  'nutrient-calculator': { name: 'Nutrient Calculator', icon: 'droplet', path: '/tools/nutrient-calculator' },
  'leaf-diagnostics': { name: 'Leaf Diagnostics', icon: 'camera', path: '/tools/leaf-diagnostics' },
  'smart-scheduler': { name: 'Smart Scheduler', icon: 'calendar', path: '/tools/smart-scheduler' },
  'qr-scanner': { name: 'QR Code Scanner', icon: 'maximize', path: '/modals/qr-scanner' },
};

export default function ToolsHubScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const userProfile = useGardenStore((state) => state.userProfile);
  const updateProfile = useGardenStore((state) => state.updateProfile);

  const lastUsedKey = userProfile.lastUsedTool || 'leaf-diagnostics';
  const lastUsed = toolsMap[lastUsedKey] || toolsMap['leaf-diagnostics'];

  const handleOpenTool = (key: string, path: string) => {
    updateProfile({ lastUsedTool: key });
    router.push(path as any);
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Garden Tools"
        showBack={false}
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Recently Used Tool */}
        <RecentlyUsedBanner
          toolName={lastUsed.name}
          icon={lastUsed.icon}
          onOpen={() => handleOpenTool(lastUsedKey, lastUsed.path)}
        />

        {/* Primary Tools Grid */}
        <View style={{ gap: Spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <ToolCard
              title="Nutrient Calculator"
              description="Calculate precise dosing for hydroponics, soil, and foliar sprays."
              iconName="droplet"
              onPress={() => handleOpenTool('nutrient-calculator', '/tools/nutrient-calculator')}
            />
            <ToolCard
              title="Leaf Diagnostics"
              description="On-device AI diagnosis for deficiencies, pests, and leaf diseases."
              iconName="camera"
              onPress={() => handleOpenTool('leaf-diagnostics', '/tools/leaf-diagnostics')}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <ToolCard
              title="Smart Scheduler"
              description="Weather-aware calendar and custom care alerts."
              iconName="calendar"
              onPress={() => handleOpenTool('smart-scheduler', '/tools/smart-scheduler')}
            />
            <ToolCard
              title="QR Code Scanner"
              description="Scan nutrient labels, seeds, or sensors to auto-fill tools."
              iconName="maximize"
              onPress={() => handleOpenTool('qr-scanner', '/modals/qr-scanner')}
            />
          </View>
        </View>

        {/* Pro features CTA banner */}
        <SupporterBadgeBanner
          onUpgrade={() => router.push('/modals/supporter-badge')}
        />
      </View>
    </ScreenWrapper>
  );
}