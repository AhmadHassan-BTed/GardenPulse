// ─────────────────────────────────────────────────────────────────────────────
// ComponentShowcase.tsx — GardenPulse
// Drop this screen into your navigator (or swap it into App.tsx temporarily)
// to preview EVERY component in one scrollable page.
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
import { Feather } from '@expo/vector-icons';

import { useTheme } from './layout/ThemeProvider';

// ── All 27 common components ──────────────────────────────────────────────────
import AutocompleteSearchInput from './common/AutocompleteSearchInput';
import BottomNavigationBar from './common/BottomNavigationBar';
import BottomSheetModal from './common/BottomSheetModal';
import CameraViewfinder from './common/CameraViewfinder';
import Checkbox from './common/Checkbox';
import CustomButton from './common/CustomButton';
import CustomCard from './common/CustomCard';
import CustomDateTimePicker from './common/CustomDateTimePicker';
import CustomHeader from './common/CustomHeader';
import CustomInput from './common/CustomInput';
import CustomSlider from './common/CustomSlider';
import CustomSwitch from './common/CustomSwitch';
import Divider from './common/Divider';
import FAB from './common/FAB';
import FilterChip from './common/FilterChip';
import HorizontalScrollRow from './common/HorizontalScrollRow';
import IconButton from './common/IconButton';
import MetricDial from './common/MetricDial';
import ModalDialog from './common/ModalDialog';
import NotesInput from './common/NotesInput';
import RadioGroup from './common/RadioGroup';
import ScreenWrapper from './common/ScreenWrapper';
import SectionHeader from './common/SectionHeader';
import StatusBadge from './common/StatusBadge';
import TextLink from './common/TextLink';
import ThemeToggle from './common/ThemeToggle';
import ZoneBadge from './common/ZoneBadge';

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
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  // ── State for interactive components ──────────────────────────────────────
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [autoWater, setAutoWater] = useState(true);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [ticked, setTicked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  const [radioValue, setRadioValue] = useState<string | number>('indoor');
  const [sliderValue, setSliderValue] = useState(45);
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor' | 'herbs'>('all');
  const [flashOn, setFlashOn] = useState(false);

  const plantSuggestions = useMemo(
    () => [
      'Monstera Deliciosa',
      'Snake Plant',
      'Fiddle Leaf Fig',
      'Pothos',
      'Peace Lily',
      'Aloe Vera',
      'Spider Plant',
      'Rubber Plant',
    ],
    [],
  );

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
        rowWrap: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Spacing.sm,
          alignItems: 'center',
        },
        centeredRow: {
          flexDirection: 'row',
          gap: Spacing.lg,
          alignItems: 'center',
          flexWrap: 'wrap',
        },
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

        // Camera overlay mock — dark background so the viewfinder reads
        cameraMock: {
          height: 360,
          backgroundColor: '#0A0F0D',
          borderRadius: Radius.lg,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        },

        // Bottom nav bar mock container so the floating bar is visible
        navMock: {
          height: 140,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.lg,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        },

        // Mini "screen" used to showcase ScreenWrapper behaviour
        miniScreen: {
          height: 220,
          borderRadius: Radius.lg,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          overflow: 'hidden',
        },

        // Layout for the custom header demo
        headerMock: {
          borderRadius: Radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.border.subtle,
        },
      }),
    [Colors, Spacing, Radius, Typography],
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
            THEME TOGGLE
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Theme Toggle" theme={theme} />
        <View style={styles.centeredRow}>
          <ThemeToggle />
          <ThemeToggle showLabel />
          <ThemeToggle variant="icon-only" />
        </View>

        {/* ════════════════════════════════════════════════════════════
            CUSTOM HEADER
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Custom Header" theme={theme} />
        <View style={styles.headerMock}>
          <CustomHeader
            title="Plant Details"
            showBack
            onBack={() => {}}
            rightNode={
              <IconButton
                name="heart"
                size={20}
                onPress={() => {}}
                filled
              />
            }
          />
        </View>
        <View style={{ height: Spacing.sm }} />
        <View style={styles.headerMock}>
          <CustomHeader
            title="Transparent"
            transparent
            rightNode={
              <TextLink label="Edit" onPress={() => {}} />
            }
          />
        </View>

        {/* ════════════════════════════════════════════════════════════
            SECTION HEADER & TEXT LINKS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Section Header" theme={theme} />
        <SectionHeader
          title="Today's Tasks"
          actionLabel="See All →"
          onActionPress={() => {}}
        />
        <SectionHeader
          title="My Plants"
          actionLabel="Manage"
          onActionPress={() => {}}
        />

        <Section label="Text Links" theme={theme} />
        <View style={styles.centeredRow}>
          <TextLink label="Skip for now" onPress={() => {}} variant="muted" />
          <TextLink label="Learn more" onPress={() => {}} variant="primary" />
          <TextLink label="Delete plant" onPress={() => {}} variant="danger" />
        </View>

        {/* ════════════════════════════════════════════════════════════
            BUTTONS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Buttons" theme={theme} />

        <CustomButton
          label="Start Growing"
          variant="primary"
          fullWidth
          leftIcon={<Feather name="sun" size={18} color={Colors.button.primaryText} />}
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
            ICON BUTTONS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Icon Buttons" theme={theme} />
        <View style={styles.centeredRow}>
          <IconButton name="search" onPress={() => {}} />
          <IconButton name="settings" onPress={() => {}} />
          <IconButton name="bell" onPress={() => {}} />
          <IconButton name="heart" onPress={() => {}} />
          <IconButton name="share-2" onPress={() => {}} />
          <IconButton name="search" onPress={() => {}} filled />
          <IconButton name="settings" onPress={() => {}} filled />
          <IconButton name="trash-2" onPress={() => {}} color={Colors.text.error} />
        </View>

        {/* ════════════════════════════════════════════════════════════
            DIVIDERS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Dividers" theme={theme} />
        <Divider />
        <Divider text="OR" />
        <Divider text="Continue with email" />

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
            AUTOCOMPLETE SEARCH
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Autocomplete Search" theme={theme} />
        <AutocompleteSearchInput
          label="Search plants"
          value={autocompleteValue}
          onChangeText={setAutocompleteValue}
          onSelect={(item) => setAutocompleteValue(item)}
          data={plantSuggestions}
        />

        {/* ════════════════════════════════════════════════════════════
            NOTES INPUT
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Notes Input" theme={theme} />
        <NotesInput
          label="Voice-enabled note"
          value={notesValue}
          onChangeText={setNotesValue}
          isRecording={isRecording}
          onMicPress={() => setIsRecording(r => !r)}
        />

        {/* ════════════════════════════════════════════════════════════
            CHECKBOXES
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Checkboxes" theme={theme} />
        <View style={styles.centeredRow}>
          <Checkbox value={ticked} onValueChange={setTicked} label="Watered" />
          <Checkbox value={unchecked} onValueChange={setUnchecked} label="Fertilized" />
          <Checkbox value={false} onValueChange={() => {}} label="Disabled" isDisabled />
        </View>

        {/* ════════════════════════════════════════════════════════════
            RADIO GROUP
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Radio Group" theme={theme} />
        <RadioGroup
          options={[
            { label: 'Indoor', value: 'indoor' },
            { label: 'Outdoor', value: 'outdoor' },
            { label: 'Greenhouse', value: 'greenhouse' },
          ]}
          selectedValue={radioValue}
          onSelect={setRadioValue}
        />
        <View style={{ height: Spacing.sm }} />
        <RadioGroup
          horizontal
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'med' },
            { label: 'High', value: 'high' },
          ]}
          selectedValue="med"
          onSelect={() => {}}
        />

        {/* ════════════════════════════════════════════════════════════
            FILTER CHIPS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Filter Chips" theme={theme} />
        <View style={styles.rowWrap}>
          {(['all', 'indoor', 'outdoor', 'herbs'] as const).map((key) => (
            <FilterChip
              key={key}
              label={key[0].toUpperCase() + key.slice(1)}
              isSelected={filter === key}
              onPress={() => setFilter(key)}
            />
          ))}
        </View>

        {/* ════════════════════════════════════════════════════════════
            SLIDER
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Slider" theme={theme} />
        <CustomSlider
          label="Soil moisture"
          value={sliderValue}
          onValueChange={setSliderValue}
        />

        {/* ════════════════════════════════════════════════════════════
            DATE / TIME PICKER
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Date / Time Picker" theme={theme} />
        <CustomDateTimePicker
          label="Next watering"
          value={new Date()}
          mode="date"
          onChange={() => {}}
        />
        <CustomDateTimePicker
          label="Reminder time"
          value={new Date()}
          mode="time"
          onChange={() => {}}
        />

        {/* ════════════════════════════════════════════════════════════
            STATUS BADGES
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Status Badges" theme={theme} />
        <View style={styles.rowWrap}>
          <StatusBadge label="Healthy" status="success" />
          <StatusBadge label="Thirsty" status="warning" />
          <StatusBadge label="Dying" status="error" />
          <StatusBadge label="Unknown" status="neutral" />
          <StatusBadge label="Healthy" status="success" variant="dot" />
          <StatusBadge label="Thirsty" status="warning" variant="dot" />
        </View>

        {/* ════════════════════════════════════════════════════════════
            ZONE BADGE
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Zone Badge" theme={theme} />
        <View style={styles.rowWrap}>
          <ZoneBadge zone="Zone 7b" />
          <ZoneBadge zone="Zone 9a" location="Berlin" />
          <ZoneBadge zone="Zone 5b" location="Toronto" />
        </View>

        {/* ════════════════════════════════════════════════════════════
            METRIC DIAL
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Metric Dial" theme={theme} />
        <View style={styles.centeredRow}>
          <MetricDial value={92} label="Health" />
          <MetricDial value={65} label="Moisture" />
          <MetricDial value={32} label="Light" />
        </View>

        {/* ════════════════════════════════════════════════════════════
            HORIZONTAL SCROLL ROW
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Horizontal Scroll Row" theme={theme} />
        <HorizontalScrollRow edgePadding gap={12}>
          {['Monstera', 'Pothos', 'Aloe', 'Cactus', 'Basil', 'Mint'].map((name) => (
            <View
              key={name}
              style={{
                paddingVertical: Spacing.md,
                paddingHorizontal: Spacing.lg,
                backgroundColor: Colors.surface.glass,
                borderWidth: 1,
                borderColor: Colors.surface.glassBorder,
                borderRadius: Radius.lg,
              }}
            >
              <Text style={{ color: Colors.text.heading, fontWeight: Typography.weights.semibold }}>
                {name}
              </Text>
            </View>
          ))}
        </HorizontalScrollRow>

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
            SCREEN WRAPPER
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Screen Wrapper" theme={theme} />
        <View style={styles.miniScreen}>
          <ScreenWrapper scrollable withPadding>
            <View style={{ paddingVertical: Spacing.md }}>
              <Text style={{ color: Colors.text.heading, fontWeight: Typography.weights.semibold, marginBottom: Spacing.xs }}>
                Static + scrollable + padded
              </Text>
              <Text style={{ color: Colors.text.body, lineHeight: 20 }}>
                ScreenWrapper handles safe area, keyboard avoidance, and the theme background.
                It can swap between a View and a ScrollView.
              </Text>
            </View>
          </ScreenWrapper>
        </View>

        {/* ════════════════════════════════════════════════════════════
            FLOATING ACTION BUTTON
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Floating Action Button" theme={theme} />
        <View
          style={{
            height: 140,
            backgroundColor: Colors.surface.glass,
            borderRadius: Radius.lg,
            borderWidth: 1,
            borderColor: Colors.surface.glassBorder,
          }}
        >
          <FAB onPress={() => {}} iconName="plus" />
          <FAB onPress={() => {}} iconName="camera" style={{ right: Spacing.lg + 76 }} />
        </View>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM NAVIGATION BAR
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Bottom Navigation Bar" theme={theme} />
        <View style={styles.navMock}>
          <BottomNavigationBar
            state={{
              index: 0,
              routes: [
                { key: 'home',     name: 'home' },
                { key: 'garden',   name: 'garden' },
                { key: 'tools',    name: 'tools' },
                { key: 'profile',  name: 'profile' },
              ],
            } as any}
            insets={{ top: 0, right: 0, bottom: 0, left: 0 }}
            descriptors={
              {
                home:    { options: { title: 'Home',    tabBarAccessibilityLabel: 'Home tab' } },
                garden:  { options: { title: 'Garden',  tabBarAccessibilityLabel: 'Garden tab' } },
                tools:   { options: { title: 'Tools',   tabBarAccessibilityLabel: 'Tools tab' } },
                profile: { options: { title: 'Profile', tabBarAccessibilityLabel: 'Profile tab' } },
              } as any
            }
            navigation={{
              emit: () => ({ defaultPrevented: false }),
              navigate: () => {},
            } as any}
          />
        </View>

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

        {/* ════════════════════════════════════════════════════════════
            MODAL DIALOG
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Modal Dialog" theme={theme} />
        <CustomButton
          label="Open Confirmation Dialog"
          variant="secondary"
          fullWidth
          onPress={() => setDialogVisible(true)}
        />

        <ModalDialog
          visible={dialogVisible}
          title="Enable Smart Watering?"
          description="We'll adjust your schedule using local weather data. You can change this any time in Settings."
          iconNode={
            <Feather
              name="droplet"
              size={42}
              color={Colors.green.DEFAULT}
            />
          }
          primaryAction={{
            label: accepted ? 'Enabled ✓' : 'Enable',
            onPress: () => {
              setAccepted(true);
              setDialogVisible(false);
            },
          }}
          secondaryAction={{
            label: 'Not now',
            onPress: () => setDialogVisible(false),
          }}
          onClose={() => setDialogVisible(false)}
        />

        {/* ════════════════════════════════════════════════════════════
            CAMERA VIEWFINDER
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Camera Viewfinder" theme={theme} />
        <View style={styles.cameraMock}>
          <CameraViewfinder
            mode="leaf"
            instructionLabel="Frame the affected leaf"
            isFlashOn={flashOn}
            onToggleFlash={() => setFlashOn((v) => !v)}
            onClose={() => {}}
            onCapture={() => {}}
            onOpenGallery={() => {}}
          />
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}
