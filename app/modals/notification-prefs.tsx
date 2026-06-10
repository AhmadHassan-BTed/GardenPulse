import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import NotificationOptInRow from '../../components/common/NotificationOptInRow';
import SectionHeader from '../../components/common/SectionHeader';
import CustomButton from '../../components/common/CustomButton';

export default function NotificationPrefsModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const [waterAlerts, setWaterAlerts] = useState(true);
  const [feedAlerts, setFeedAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [clusterAlerts, setClusterAlerts] = useState(true);

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Notification Prefs" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        
        <SectionHeader title="Plant Care Reminders" />
        <View style={{ gap: Spacing.sm }}>
          <NotificationOptInRow
            plantName="Daily Soil Watering Alerts"
            enabled={waterAlerts}
            onToggle={setWaterAlerts}
          />
          <NotificationOptInRow
            plantName="Nutrient Feed Cycles"
            enabled={feedAlerts}
            onToggle={setFeedAlerts}
          />
        </View>

        <SectionHeader title="System & Community" style={{ marginTop: Spacing.sm }} />
        <View style={{ gap: Spacing.sm }}>
          <NotificationOptInRow
            plantName="Local Weather & Frost Warnings"
            enabled={weatherAlerts}
            onToggle={setWeatherAlerts}
          />
          <NotificationOptInRow
            plantName="Grow Cluster Activity & Swaps"
            enabled={clusterAlerts}
            onToggle={setClusterAlerts}
          />
        </View>

        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton 
            label="Save Preferences" 
            onPress={() => router.back()} 
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});