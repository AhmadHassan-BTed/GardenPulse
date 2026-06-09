// ─────────────────────────────────────────────────────────────────────────────
// ComponentShowcase.tsx — GardenPulse
// Drop this screen into your navigator (or swap it into App.tsx temporarily)
// to preview every component in one scrollable page.
//
// Path: components/ComponentShowcase.tsx
//   - Sits next to the components it previews
//   - Uses RELATIVE imports so it works regardless of tsconfig path aliases
//   - Re-exported from components/index.ts
//
// Theme-aware: all colors come from `useTheme()`. The <ThemeToggle /> at the
// top of the page flips the whole app between light and dark in real time.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from './layout/ThemeProvider';
import CustomButton      from './common/CustomButton';
import CustomInput       from './common/CustomInput';
import CustomCard        from './common/CustomCard';
import CustomSwitch      from './common/CustomSwitch';
import BottomSheetModal  from './common/BottomSheetModal';
import ThemeToggle       from './common/ThemeToggle';

// ── Section divider ───────────────────────────────────────────────────────────
const Section = ({ label, theme }: { label: string; theme: ReturnType<typeof useTheme> }) => (
  <View style={sectionStyles(theme).row}>
    <View style={sectionStyles(theme).line} />
    <Text style={sectionStyles(theme).label}>{label}</Text>
    <View style={sectionStyles(theme).line} />
  </View>
);

const sectionStyles = (theme: ReturnType<typeof useTheme>) => {
  const { Colors, Spacing, Typography } = theme;
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginVertical: Spacing.lg,
    },
    line: { flex: 1, height: 1, backgroundColor: Colors.border.subtle },
    label: {
      fontSize: Typography.sizes.xs,
      fontWeight: Typography.weights.semibold,
      color: Colors.green.DEFAULT,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
  });
};

// ── Main showcase ─────────────────────────────────────────────────────────────
export default function ComponentShowcase() {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const [inputValue,    setInputValue]    = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword,  setShowPassword]  = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [autoWater,     setAutoWater]     = useState(true);
  const [sheetVisible,  setSheetVisible]  = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: { flex: 1, backgroundColor: Colors.surface.base },
        scroll: { flex: 1 },
        container: { padding: Spacing.md, paddingBottom: 80 },

        pageHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: Spacing.lg,
        },
        headerText: { flex: 1 },
        appName: {
          fontSize: Typography.sizes.xxl,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          letterSpacing: 1,
        },
        pageSubtitle: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.regular,
          color: Colors.text.muted,
          marginTop: 4,
          letterSpacing: 0.8,
        },

        schemePill: {
          alignSelf: 'flex-start',
          marginTop: Spacing.sm,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: Colors.green.muted,
          backgroundColor: Colors.green.tint,
        },
        schemePillText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: Colors.green.deep,
          letterSpacing: 1,
          textTransform: 'uppercase',
        },

        spacer: { height: Spacing.sm },

        badge: {
          backgroundColor: Colors.green.tint,
          borderWidth: 1,
          borderColor: Colors.green.muted,
          borderRadius: 99,
          paddingHorizontal: 10,
          paddingVertical: 3,
        },
        badgeText: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.semibold,
          color: Colors.green.deep,
        },

        cardBody: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.regular,
          color: Colors.text.body,
          lineHeight: 20,
        },

        footerRow: { flexDirection: 'row', gap: Spacing.md, flexWrap: 'wrap' },
        footerStat: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          fontWeight: Typography.weights.medium,
        },

        switchRow: { paddingVertical: Spacing.sm + 2 },
        switchRowBordered: {
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
          marginTop: Spacing.xs,
          paddingTop: Spacing.md,
        },

        sheetActions: { paddingBottom: Spacing.md },
      }),
    [Colors, Spacing, Typography],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.surface.base}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page header ─────────────────────────────────────────────── */}
        <View style={styles.pageHeader}>
          <View style={styles.headerText}>
            <Text style={styles.appName}>GardenPulse</Text>
            <Text style={styles.pageSubtitle}>Component Library · v1.0</Text>
            <View style={styles.schemePill}>
              <Text style={styles.schemePillText}>
                {isDark ? 'Dark mode' : 'Light mode'}
              </Text>
            </View>
          </View>
          <ThemeToggle showLabel />
        </View>

        {/* ════════════════════════════════════════════════════════════
            BUTTONS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Buttons" theme={theme} />

        <CustomButton
          label="Start Growing"
          variant="primary"
          fullWidth
          onPress={() => setSheetVisible(true)}
        />

        <View style={styles.spacer} />

        <CustomButton
          label="View My Garden"
          variant="secondary"
          fullWidth
          onPress={() => {}}
        />

        <View style={styles.spacer} />

        <CustomButton
          label="Browse Plants"
          variant="ghost"
          fullWidth
          onPress={() => {}}
        />

        <View style={styles.spacer} />

        {/* IMPORTANT CTA: brand green */}
        <CustomButton
          label="Confirm Planting"
          variant="primary"
          fullWidth
          onPress={() => {}}
          style={{ backgroundColor: Colors.button.accentBg }}
          labelStyle={{ color: Colors.button.accentText }}
        />

        <View style={styles.spacer} />

        <CustomButton
          label="Connecting…"
          variant="primary"
          fullWidth
          isLoading
        />

        <View style={styles.spacer} />

        <CustomButton
          label="Premium Only"
          variant="primary"
          fullWidth
          isDisabled
        />

        {/* ════════════════════════════════════════════════════════════
            INPUTS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Inputs" theme={theme} />

        <CustomInput
          label="Plant nickname"
          value={inputValue}
          onChangeText={setInputValue}
          returnKeyType="next"
        />

        <CustomInput
          label="Password"
          value={passwordValue}
          onChangeText={setPasswordValue}
          secureTextEntry={!showPassword}
          rightIcon={
            <Text
              style={{
                color: Colors.text.body,
                fontSize: 11,
                fontWeight: Typography.weights.semibold,
              }}
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </Text>
          }
          onRightIconPress={() => setShowPassword(s => !s)}
        />

        <CustomInput
          label="Watering interval (days)"
          value="3"
          onChangeText={() => {}}
          error="Must be between 1 and 30"
          keyboardType="numeric"
        />

        <CustomInput
          label="Garden notes"
          value=""
          onChangeText={() => {}}
          helperText="Logged entries appear in your weekly Bloom Report"
          multiline
        />

        {/* ════════════════════════════════════════════════════════════
            CARDS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Cards" theme={theme} />

        <CustomCard
          title="Monstera Deliciosa"
          subtitle="Low-maintenance · Indirect light"
          headerRight={
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Healthy</Text>
            </View>
          }
          footer={
            <View style={styles.footerRow}>
              <Text style={styles.footerStat}>💧 3 days ago</Text>
              <Text style={styles.footerStat}>🌡 22 °C</Text>
              <Text style={styles.footerStat}>☀️  Medium</Text>
            </View>
          }
        >
          <Text style={styles.cardBody}>
            Your Monstera is thriving. Consider misting the leaves weekly to boost humidity during summer.
          </Text>
        </CustomCard>

        <View style={styles.spacer} />

        <CustomCard
          variant="accent"
          title="Rain forecast tomorrow"
          subtitle="Skip your watering schedule"
          onPress={() => {}}
        >
          <Text style={styles.cardBody}>
            OpenWeatherMap shows 14 mm of rain expected. Your outdoor beds are covered — enjoy a day off! 🌧
          </Text>
        </CustomCard>

        <View style={styles.spacer} />

        <CustomCard variant="minimal" title="AI Diagnosis" subtitle="Leaf scan · Just now">
          <Text style={styles.cardBody}>
            Slight yellowing detected on lower leaves — likely early nitrogen deficiency. Increase N in next feed cycle.
          </Text>
        </CustomCard>

        {/* ════════════════════════════════════════════════════════════
            SWITCHES
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Switches" theme={theme} />

        <CustomCard variant="minimal" padding={Spacing.md}>
          <View style={styles.switchRow}>
            <CustomSwitch
              value={notifications}
              onValueChange={setNotifications}
              label="Push notifications"
              description="Watering reminders and health alerts"
            />
          </View>

          <View style={[styles.switchRow, styles.switchRowBordered]}>
            <CustomSwitch
              value={weatherAlerts}
              onValueChange={setWeatherAlerts}
              label="Weather alerts"
              description="Frost, heatwave, and storm warnings"
            />
          </View>

          <View style={[styles.switchRow, styles.switchRowBordered]}>
            <CustomSwitch
              value={autoWater}
              onValueChange={setAutoWater}
              label="Smart watering"
              description="Adjusts schedule using live forecast"
            />
          </View>

          <View style={[styles.switchRow, styles.switchRowBordered]}>
            <CustomSwitch
              value={false}
              onValueChange={() => {}}
              label="Bluetooth sensors"
              description="Requires sensor hardware"
              isDisabled
            />
          </View>
        </CustomCard>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM SHEET
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Bottom Sheet" theme={theme} />

        <CustomButton
          label="Open Plant Actions Sheet"
          variant="secondary"
          fullWidth
          onPress={() => setSheetVisible(true)}
        />

        <BottomSheetModal
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          title="Monstera Deliciosa"
          subtitle="Last watered 3 days ago · Next check in 2 days"
        >
          <View style={styles.sheetActions}>
            <CustomButton
              label="💧  Log Watering"
              variant="primary"
              fullWidth
              onPress={() => setSheetVisible(false)}
            />
            <View style={styles.spacer} />
            <CustomButton
              label="📸  Scan Leaf"
              variant="secondary"
              fullWidth
              onPress={() => setSheetVisible(false)}
            />
            <View style={styles.spacer} />
            <CustomButton
              label="📊  View Analytics"
              variant="ghost"
              fullWidth
              onPress={() => setSheetVisible(false)}
            />
            <View style={styles.spacer} />
            <CustomButton
              label="🗑  Remove Plant"
              variant="ghost"
              fullWidth
              onPress={() => setSheetVisible(false)}
              labelStyle={{ color: Colors.text.error }}
            />
          </View>
        </BottomSheetModal>
      </ScrollView>
    </SafeAreaView>
  );
}
