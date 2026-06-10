import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import ToolCard from '../../../components/common/ToolCard';
import RecentlyUsedBanner from '../../../components/common/RecentlyUsedBanner';
import { SupporterBadgeBanner } from '../../../components/common/PremiumGuides';

export default function ToolsHubScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const handleOpenTool = (path: string) => {
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
          toolName="Leaf Diagnostics"
          icon="camera"
          onOpen={() => handleOpenTool('/tools/leaf-diagnostics')}
        />

        {/* Primary Tools Grid */}
        <View style={{ gap: Spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <ToolCard
              title="Nutrient Calculator"
              description="Calculate precise dosing for hydroponics, soil, and foliar sprays."
              iconName="droplet"
              onPress={() => handleOpenTool('/tools/nutrient-calculator')}
            />
            <ToolCard
              title="Leaf Diagnostics"
              description="On-device AI diagnosis for deficiencies, pests, and leaf diseases."
              iconName="camera"
              onPress={() => handleOpenTool('/tools/leaf-diagnostics')}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <ToolCard
              title="Smart Scheduler"
              description="Weather-aware calendar and custom care alerts."
              iconName="calendar"
              onPress={() => handleOpenTool('/tools/smart-scheduler')}
            />
            <ToolCard
              title="QR Code Scanner"
              description="Scan nutrient labels, seeds, or sensors to auto-fill tools."
              iconName="maximize"
              onPress={() => handleOpenTool('/modals/qr-scanner')}
            />
          </View>
        </View>

        {/* Pro features CTA banner */}
        <SupporterBadgeBanner
          onUpgrade={() => handleOpenTool('/modals/supporter-badge')}
        />
      </View>
    </ScreenWrapper>
  );
}