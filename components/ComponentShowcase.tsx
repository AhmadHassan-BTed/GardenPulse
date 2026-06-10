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
  Image,
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

// ── Additional Phase 1-4 Component Imports ────────────────────────────────────
import OnboardingProgressBar from './common/OnboardingProgressBar';
import MethodSelectionCard from './common/MethodSelectionCard';
import SplashLogo from './common/SplashLogo';
import HealthDotIndicator from './common/HealthDotIndicator';
import GridListToggle from './common/GridListToggle';
import GrowingStageChip from './common/GrowingStageChip';
import SeverityIndicator from './common/SeverityIndicator';
import UnitToggle from './common/UnitToggle';
import NativeAdCard from './common/NativeAdCard';
import NotificationBell from './common/NotificationBell';
import EmptyStateView from './common/EmptyStateView';
import PermissionIllustration from './common/PermissionIllustration';
import PermissionDeniedState from './common/PermissionDeniedState';
import PermissionDeniedBanner from './common/PermissionDeniedBanner';
import SmartAlertChip from './common/SmartAlertChip';
import RepeatSelector from './common/RepeatSelector';
import GuideStatusChip from './common/GuideStatusChip';
import PlantCard from './common/PlantCard';
import TaskCard from './common/TaskCard';
import ToolCard from './common/ToolCard';
import ClusterCard from './common/ClusterCard';
import ChallengeCard from './common/ChallengeCard';
import PostCard from './common/PostCard';
import SuccessStatCard from './common/SuccessStatCard';
import WinnerSpotlightCard from './common/WinnerSpotlightCard';
import ReelCard from './common/ReelCard';
import BadgeGrid from './common/BadgeGrid';
import StatsPillRow from './common/StatsPillRow';
import DataInventoryRow from './common/DataInventoryRow';
import PrivacyToggleRow from './common/PrivacyToggleRow';
import ForecastStrip from './common/ForecastStrip';
import WeatherWidget from './common/WeatherWidget';
import RecipeResultCard from './common/RecipeResultCard';
import DiagnosisResultCard from './common/DiagnosisResultCard';
import PlantInfoCard from './common/PlantInfoCard';
import MetricBreakdownRow from './common/MetricBreakdownRow';
import LogTimeline from './common/LogTimeline';
import CalendarWeekStrip from './common/CalendarWeekStrip';
import SmartControlsPanel from './common/SmartControlsPanel';
import CalendarMonthGrid from './common/CalendarMonthGrid';
import BloomStatsPillRow from './common/BloomStatsPillRow';
import BloomBestPlantCard from './common/BloomBestPlantCard';
import BadgeDetailSheet from './common/BadgeDetailSheet';
import ConfidenceScoreChart from './common/ConfidenceScoreChart';
import CalendarHeatmap from './common/CalendarHeatmap';
import ActionPillRow from './common/ActionPillRow';
import BatchActionBar from './common/BatchActionBar';
import InScreenTabBar from './common/InScreenTabBar';
import GrowMapView from './common/GrowMapView';
import VideoPlayer from './common/VideoPlayer';
import ReelGeneratorFlow from './common/ReelGeneratorFlow';
import RichTextEditor from './common/RichTextEditor';
import PostComposeOverlay from './common/PostComposeOverlay';
import RewardedVideoPrompt from './common/RewardedVideoPrompt';
import InterstitialAdContainer from './common/InterstitialAdContainer';
import QuickLogPlantSelector from './common/QuickLogPlantSelector';
import ActivityTypeChips, { StandardActivity } from './common/ActivityTypeChips';
import MetricsQuickEntry from './common/MetricsQuickEntry';
import ArticleBodyRenderer from './common/ArticleBodyRenderer';
import ExportFormatOptions from './common/ExportFormatOptions';
import PhotoCaptureArea from './common/PhotoCaptureArea';

import ConfettiCelebration from './common/ConfettiCelebration';
import SwipeableRowMock from './common/SwipeableRowMock';
import PlantHeroImage from './common/PlantHeroImage';
import VoiceInputButton from './common/VoiceInputButton';
import RecentlyUsedBanner from './common/RecentlyUsedBanner';
import SunriseSunsetRow from './common/SunriseSunsetRow';
import CustomReminderForm from './common/CustomReminderForm';
import MapLayerToggleSheet from './common/MapLayerToggleSheet';
import PendingExportStatusCard from './common/PendingExportStatusCard';
import WatermarkToggleRow from './common/WatermarkToggleRow';

import AvatarPicker from './common/AvatarPicker';
import ProfileHeaderCard from './common/ProfileHeaderCard';
import StreakDisplay from './common/StreakDisplay';
import NavigationLinkRow from './common/NavigationLinkRow';
import { SettingsSectionGroup, DangerZoneSection } from './common/SettingsSectionGroup';
import { ComebackBonusBanner, BloomReportBanner, PatternInsightCard, ContextualTipCard } from './common/InsightBanners';

import { CemeteryEntryCard } from './common/CemeteryComponents';
import { ClusterCoverHeader, MemberRow, SwapCard, CommentThread, FullScreenPhotoViewer } from './common/CommunityExtended';
import { PublishedGuideCard, RevenueBanner, SupporterBadgeBanner, SupporterBenefitsList, UnlockSuccessState, VideoProgressOverlay } from './common/PremiumGuides';

import { FontSelector, TextSizeSlider, LanguageSelector, DateFormatSelector } from './common/SettingsSelectors';
import { DiagnosisHistoryRow, LocalContextCard, ReferralBanner, MapClusterPopupCard, PrivacyFooter, ZoneGroupHeader, WeatherImpactBanner, CrossMethodInsightCard, ScanningStateOverlay } from './common/InsightAndMapCards';
import { CarePlanSummaryCard, NotificationOptInRow, PlantBrowseGrid, SelectedPlantPreviewCard, QRSuccessCard, RelatedArticlesRow, NotificationCategoryRow, LocationTagRow, AddToReelToggle } from './common/OnboardingAndModals';

// ── Section divider ────────/───────────────────────────────────────────────────
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

  // ── Additional State for Phase 1-4 Components ───────────────────────────────
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [isGridMode, setIsGridMode] = useState(true);
  const [repeatVal, setRepeatVal] = useState<any>('Weekly');
  const [activeTab, setActiveTab] = useState('Feed');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<StandardActivity[]>([]);
  const [privacyAnalytics, setPrivacyAnalytics] = useState(true);
  const [badgeSheetVisible, setBadgeSheetVisible] = useState(false);
  const [adVisible, setAdVisible] = useState(false);
  const [replaySplash, setReplaySplash] = useState(0);
  
  const [toggleState, setToggleState] = useState(true);

  const toggleActivity = (act: StandardActivity) => {
    setSelectedActivities(prev => prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]);
  };

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

        // Bottom nav bar mock container
        navMock: {
          height: 140,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.lg,
          // REMOVED overflow: 'hidden' to allow shadows to render
          justifyContent: 'flex-end',
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          zIndex: 10, // Ensure shadow casts over subsequent elements
        },

        // Batch Action Bar mock container
        batchMock: {
          height: 200, 
          borderRadius: Radius.lg, 
          borderWidth: 1, 
          borderColor: Colors.border.subtle, 
          // REMOVED overflow: 'hidden' to allow top shadow to render
          backgroundColor: Colors.surface.elevated,
          position: 'relative',
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


        <View style={[styles.miniScreen, { height: 300, justifyContent: 'center' }]}>
          <SplashLogo key={replaySplash} onAnimationComplete={() => {}} />
          <CustomButton 
            label="Replay Animation" 
            variant="ghost" 
            onPress={() => setReplaySplash(r => r + 1)} 
            style={{ position: 'absolute', bottom: 16, alignSelf: 'center' }} 
          />
        </View>
        <View style={styles.spacer} />

        <EmptyStateView 
          title="No plants yet" 
          description="Tap the + button to add your first plant to the garden." 
          actionLabel="Add Plant" 
          onActionPress={() => {}} 
        />
        <View style={styles.spacer} />
        
        <RepeatSelector value={repeatVal} onChange={setRepeatVal} />
        <View style={styles.spacer} />


        {/* ════════════════════════════════════════════════════════════
            NEW: ONBOARDING & ATOMS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="New Atoms & Identifiers" theme={theme} />
        
        <OnboardingProgressBar totalSteps={3} currentStep={2} />
        <View style={styles.spacer} />
        
        <MethodSelectionCard 
          title="Soil / Raised Bed" 
          description="Traditional outdoor or indoor container growing." 
          iconName="box" 
          isSelected={true} 
          onPress={() => {}} 
        />
        
        <View style={styles.centeredRow}>
          <GrowingStageChip stage="Seedling" />
          <GrowingStageChip stage="Veg" />
          <GrowingStageChip stage="Bloom" />
        </View>
        <View style={styles.spacer} />
        
        <View style={styles.centeredRow}>
          <SeverityIndicator level="low" />
          <SeverityIndicator level="medium" />
          <SeverityIndicator level="high" />
          <GuideStatusChip status="Under Review" />
        </View>
        <View style={styles.spacer} />
        
        <View style={styles.centeredRow}>
          <UnitToggle value={unitSystem} onChange={setUnitSystem} />
          <GridListToggle isGrid={isGridMode} onToggle={setIsGridMode} />
          <NotificationBell unreadCount={4} onPress={() => {}} />
        </View>

        {/* ════════════════════════════════════════════════════════════
            NEW: CARDS & COMMUNITY
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Cards & Community Feeds" theme={theme} />

        <InScreenTabBar tabs={['Feed', 'Local', 'Global']} activeTab={activeTab} onTabChange={setActiveTab} />
        <View style={styles.spacer} />

        <PlantCard 
          name="Tomato 'Moneymaker'" 
          method="Soil" 
          healthStatus="healthy" 
          lastLoggedDays={0} 
          isGrid={false} 
          onPress={() => {}} 
        />

        <HorizontalScrollRow gap={12}>
          <TaskCard plantName="Monstera" taskType="Water" onDonePress={() => {}} />
          <TaskCard plantName="Basil" taskType="Feed" onDonePress={() => {}} isDone />
        </HorizontalScrollRow>
        <View style={styles.spacer} />

        <HorizontalScrollRow gap={12}>
          <SuccessStatCard plantName="Cherry Tomatoes" successRate={87} growerCount={142} trend="up" />
          <SuccessStatCard plantName="Cilantro" successRate={42} growerCount={89} trend="down" />
        </HorizontalScrollRow>
        <View style={styles.spacer} />

        <PostCard 
          username="GreenThumb99" 
          content="Just transplanted my seedlings! They are loving the new LED setup. 🌱" 
          methodTag="Hydroponics" 
          likesCount={24} 
          commentsCount={3} 
          onLike={() => {}} onComment={() => {}} onSave={() => {}} onReport={() => {}} 
        />
        <View style={styles.spacer} />

        <ChallengeCard 
          title="First Ripe Tomato of the Season" 
          countdownLabel="Ends in 4 days" 
          entryCount={128} 
          onSubmitPress={() => {}} 
        />

        <View style={styles.rowWrap}>
          <ToolCard title="Nutrient Calculator" description="Mix the perfect feed" iconName="droplet" onPress={() => {}} />
          <ToolCard title="Plant Identifier" description="Scan to identify" iconName="camera" onPress={() => {}} />
        </View>
        <View style={styles.spacer} />

        <ClusterCard 
          name="Urban Balcony Growers" 
          memberCount={1250} 
          method="Container" 
          hasRecentActivity 
          isJoined={false} 
          onJoinPress={() => {}} 
          onPress={() => {}} 
        />
        <View style={styles.spacer} />

        <WinnerSpotlightCard 
          username="PlantMom88" 
          methodTag="Indoor" 
          prizeLabel="$50 Gift Card" 
          challengeName="Biggest Monstera Leaf" 
        />
        <View style={styles.spacer} />

        <HorizontalScrollRow gap={12}>
          <ReelCard plantName="Monstera" dateRange="Jan - Mar" duration="0:15" onPlayPress={() => {}} onSharePress={() => {}} style={{ width: 160 }} />
          <ReelCard plantName="Basil" dateRange="Seed to Harvest" duration="0:30" onPlayPress={() => {}} onSharePress={() => {}} style={{ width: 160 }} />
        </HorizontalScrollRow>
        <View style={styles.spacer} />

        <StatsPillRow plantsCount={12} logCount={340} streak={14} challengesWon={2} />
        <View style={styles.spacer} />

        <BadgeGrid badges={[
          { id: '1', name: 'Seed Starter', icon: 'sun', isEarned: true },
          { id: '2', name: 'Hydro Master', icon: 'droplet', isEarned: false },
          { id: '3', name: 'Pest Control', icon: 'shield', isEarned: true, color: '#F59E0B' },
          { id: '4', name: 'Social Bee', icon: 'users', isEarned: false },
        ]} onBadgePress={() => {}} />

        {/* ════════════════════════════════════════════════════════════
            NEW: DATA, FORMS & VISUALIZATIONS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Data & Visualizations" theme={theme} />

        <ConfidenceScoreChart 
          skills={[
            { id: '1', name: 'Watering Consistency', score: 85 },
            { id: '2', name: 'Pest Identification', score: 40 },
            { id: '3', name: 'Nutrient Mixing', score: 65 },
          ]} 
        />

        <WeatherWidget 
          city="Seattle" 
          zone="Zone 8b" 
          currentTemp={22} 
          conditionIcon="cloud" 
          humidity={65} 
          uvIndex={4} 
          rainChance={15} 
          forecast={[
            { id: '1', dayLabel: 'Mon', icon: 'cloud-rain', high: 18, low: 12 },
            { id: '2', dayLabel: 'Tue', icon: 'sun', high: 24, low: 14 },
            { id: '3', dayLabel: 'Wed', icon: 'sun', high: 26, low: 15 },
          ]} 
          alertMessage="Rain tomorrow → skip watering" 
        />

        <RecipeResultCard 
          reservoirSize="10 Litres" 
          nutrients={[
            { id: 'n1', name: 'FloraMicro', amount: 15, unit: 'ml' },
            { id: 'n2', name: 'FloraBloom', amount: 10, unit: 'ml' },
          ]} 
          phMin={5.8} phTarget={6.0} phMax={6.3} 
          ecValue="1.2 - 1.5 EC" 
          onSave={() => {}} onSchedule={() => {}} 
        />

        <View style={styles.spacer} />
        <CalendarWeekStrip 
          selectedDate={new Date()} 
          onSelectDate={() => {}} 
          days={[
            { date: new Date(), label: 'Mon', dayNumber: 12, isToday: true, taskColors: [Colors.green.DEFAULT, '#3B82F6'] },
            { date: new Date(), label: 'Tue', dayNumber: 13, isToday: false, taskColors: [] },
            { date: new Date(), label: 'Wed', dayNumber: 14, isToday: false, taskColors: ['#F59E0B'] },
          ]} 
        />

        <View style={styles.spacer} />
        
        <CalendarMonthGrid 
          selectedDate={new Date()} 
          onSelectDate={() => {}} 
          days={Array.from({ length: 35 }).map((_, i) => ({
            date: new Date(),
            dayNumber: (i % 30) + 1,
            isCurrentMonth: i >= 2 && i < 32,
            isToday: i === 15,
            taskColors: i % 3 === 0 ? [Colors.green.DEFAULT] : []
          }))}
        />
        <View style={styles.spacer} />
        
        <CalendarHeatmap 
          data={Array.from({ length: 30 }).map((_, i) => ({ 
            date: `Day ${i}`, 
            logCount: Math.floor(Math.random() * 4) 
          }))} 
        />

        <BloomStatsPillRow plantsLogged={8} logEntries={24} healthDelta={5} streak={12} />
        <View style={styles.spacer} />

        <BloomBestPlantCard plantName="Fiddle Leaf Fig" method="Indoor Container" healthDelta={15} />
        <View style={styles.spacer} />

        <PlantInfoCard commonName="Monstera" species="Monstera Deliciosa" method="Soil" stage="Veg" dateAdded="Oct 12, 2025" zone="Zone 8b" containerSize="10 Gallon" onEdit={() => {}} />
        <View style={styles.spacer} />

        <DiagnosisResultCard plantId="Monstera" confidence={92} issue="Nitrogen Deficiency" severity="medium" explanation="Yellowing of older leaves typically indicates a lack of mobile nutrients like Nitrogen." onTreatIssue={() => {}} onReadMore={() => {}} />
        <View style={styles.spacer} />

        <MetricBreakdownRow metrics={[
          { id: '1', name: 'Soil Moisture', value: '45%', status: 'warning', icon: 'droplet' },
          { id: '2', name: 'Light DLI', value: '12 mol', status: 'healthy', icon: 'sun' },
          { id: '3', name: 'pH Level', value: '6.2', status: 'healthy', icon: 'activity' },
          { id: '4', name: 'Temperature', value: '24°C', status: 'critical', icon: 'thermometer' },
        ]} />
        <View style={styles.spacer} />

        <LogTimeline entries={[
          { id: '1', timestamp: 'Today, 10:30 AM', activities: [{ id: 'a1', label: 'Water', color: '#3B82F6' }], metrics: ['Moisture 60%'] },
          { id: '2', timestamp: 'Yesterday, 9:00 AM', activities: [{ id: 'a2', label: 'Feed', color: Colors.green.DEFAULT }], notes: 'Added 5ml FloraGro', hasVoiceNote: true },
        ]} />

        {/* ════════════════════════════════════════════════════════════
            NEW: INTERACTIVE TOOLS & LOGGING
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Interactive Tools & Logging" theme={theme} />

        <QuickLogPlantSelector 
          selectedId={selectedPlantId} 
          onSelect={setSelectedPlantId} 
          plants={[
            { id: 'p1', name: 'Monstera' },
            { id: 'p2', name: 'Basil' },
          ]} 
        />

        <ActivityTypeChips 
          selectedActivities={selectedActivities} 
          onToggleActivity={toggleActivity} 
        />
        <View style={styles.spacer} />

        <PhotoCaptureArea 
          onOpenCamera={() => {}} 
          onOpenGallery={() => {}} 
          onClearPhoto={() => {}} 
        />

        <MetricsQuickEntry 
          phValue={6.0} onPhChange={() => {}} 
          ecValue="" onEcChange={() => {}} 
          moistureValue="" onMoistureChange={() => {}} 
          tempValue="" onTempChange={() => {}} 
        />

        <PostComposeOverlay onSubmit={() => {}} />

          <View style={styles.spacer} />
        <ActionPillRow actions={[
          { id: '1', label: 'Log', icon: 'edit-2', onPress: () => {} },
          { id: '2', label: 'Diagnose', icon: 'activity', onPress: () => {} },
          { id: '3', label: 'Share', icon: 'share', onPress: () => {} },
          { id: '4', label: 'Archive', icon: 'archive', onPress: () => {}, isDestructive: true },
        ]} />
        <View style={styles.spacer} />

        <SmartControlsPanel />
        <View style={styles.spacer} />

    
        {/* Batch Action Bar Mock */}
        <View style={styles.batchMock}>
          <View style={{ flex: 1, padding: Spacing.md }}>
            <Text style={{ color: Colors.text.muted }}>Select items to see batch actions...</Text>
          </View>
          {/* We pass a style override to remove the safe area padding just for the showcase */}
          <BatchActionBar 
            selectedCount={3} 
            onWaterAll={() => {}} 
            onFeedAll={() => {}} 
            onLogEntry={() => {}} 
            onArchive={() => {}} 
            style={{ paddingBottom: Spacing.md }} 
          />
        </View>

        {/* ════════════════════════════════════════════════════════════
            NEW: COMPLEX OVERLAYS & PERMISSIONS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Overlays & Permissions" theme={theme} />

        <PermissionDeniedBanner 
          permissionName="Camera" 
          onOpenSettings={() => {}} 
          onGalleryFallback={() => {}} 
        />

        <View style={styles.spacer} />
        <PermissionDeniedState 
          permissionType="camera" 
          onOpenSettings={() => {}} 
          onGalleryFallback={() => {}} 
        />

        <View style={styles.spacer} />

        <CustomButton label="Show Badge Sheet" onPress={() => setBadgeSheetVisible(true)} />
        <BadgeDetailSheet 
          visible={badgeSheetVisible} 
          onClose={() => setBadgeSheetVisible(false)} 
          badge={{ id: 'b1', name: 'Seed Starter', description: 'You successfully sprouted your first seed!', icon: 'sun', isEarned: true, earnedDate: 'Oct 12, 2026', unlockCriteria: 'Log a seedling stage plant.' }} 
        />
        
        <View style={styles.spacer} />
        <CustomButton label="Show AdMob Interstitial" variant="secondary" onPress={() => setAdVisible(true)} />
        <InterstitialAdContainer visible={adVisible} onClose={() => setAdVisible(false)} />
        
        <View style={styles.spacer} />
        <RewardedVideoPrompt featureName="PDF Export" onWatchPress={() => {}} onDismiss={() => {}} />

          {/* ════════════════════════════════════════════════════════════
            NEW: EDITORS, DATA & PRIVACY
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Editors, Data & Privacy" theme={theme} />

        <RichTextEditor />
        <View style={styles.spacer} />

        <ArticleBodyRenderer blocks={[
          { id: '1', type: 'h2', content: 'How to propagate Monstera' },
          { id: '2', type: 'p', content: 'Make sure to cut below the node using clean, sharp pruning shears.' },
          { id: '3', type: 'ad' },
          { id: '4', type: 'bullet', content: 'Place the cutting in water and wait for roots to develop.' },
        ]} />
        <View style={styles.spacer} />

        <ExportFormatOptions isSupporter={false} onSelectPNG={() => {}} onSelectPDF={() => {}} onSelectText={() => {}} />
        <View style={styles.spacer} />

        <DataInventoryRow category="Plant Logs" count={142} sizeEstimate="4.2 MB" lastUpdated="Today" onClear={() => {}} onExport={() => {}} />
        <DataInventoryRow category="Cemetery Archive" count={3} sizeEstimate="1.1 MB" lastUpdated="Oct 2024" onDeleteAll={() => {}} />
        <View style={styles.spacer} />

        <PrivacyToggleRow iconName="pie-chart" label="Share Analytics" description="Help improve GardenPulse with anonymous data" value={privacyAnalytics} onValueChange={setPrivacyAnalytics} />

        {/* ════════════════════════════════════════════════════════════
            NEW: MAP & VIDEO MOCKS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Map & Video Mocks" theme={theme} />

        <View style={{ height: 300, borderRadius: Radius.lg, overflow: 'hidden', marginBottom: Spacing.md }}>
          <GrowMapView 
            markers={[]} currentZone="Zone 8b" city="Seattle" 
            totalTracked={1240} popularPlant="Tomatoes" 
            onMarkerPress={() => {}} onLayerTogglePress={() => {}} 
          />
        </View>

        <View style={{ height: 300, borderRadius: Radius.lg, overflow: 'hidden', position: 'relative' }}>
          <VideoPlayer 
            videoUrl="" 
            plantName="Monstera Deliciosa" 
            methodTag="Soil" 
            onClose={() => {}} onShare={() => {}} onDownload={() => {}} 
          />
        </View>

        <View style={{ height: 400, borderRadius: Radius.lg, overflow: 'hidden', marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.border.subtle }}>
           <ReelGeneratorFlow onClose={() => {}} onComplete={() => {}} />
        </View>

        {/* ════════════════════════════════════════════════════════════
            NEW: PROFILE & SETTINGS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Profile & Settings" theme={theme} />
        
        <ProfileHeaderCard 
          name="Alex Garden" 
          growerTag="Urban Botanist" 
          onEditProfile={() => {}} 
          onAvatarPress={() => {}} 
        />
        <View style={styles.spacer} />

        <StreakDisplay currentStreak={14} longestStreak={28} />
        <View style={styles.spacer} />

        <SettingsSectionGroup title="Preferences">
          <NavigationLinkRow label="App Theme" value={isDark ? 'Dark' : 'Light'} onPress={() => {}} />
          <Divider />
          <NavigationLinkRow label="Units" value="Metric" onPress={() => {}} />
          <Divider />
          <NavigationLinkRow label="Notifications" onPress={() => {}} />
        </SettingsSectionGroup>

        <DangerZoneSection>
          <NavigationLinkRow label="Export My Data" onPress={() => {}} isDestructive />
          <Divider />
          <NavigationLinkRow label="Delete Account" onPress={() => {}} isDestructive />
        </DangerZoneSection>

        {/* ════════════════════════════════════════════════════════════
            NEW: BANNERS & INSIGHTS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Banners & Insights" theme={theme} />
        
        <ComebackBonusBanner onClaim={() => {}} />
        
        <BloomReportBanner onViewReport={() => {}} />
        
        <PatternInsightCard onAction={() => {}} />
        
        <ContextualTipCard 
          title="How to properly prune dead leaves without harming the stem" 
          tag="Maintenance" 
          readTime="2 min read" 
          onPress={() => {}} 
        />

        {/* ════════════════════════════════════════════════════════════
            NEW: CEMETERY SUITE
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Cemetery & Archives" theme={theme} />
        
        <CemeteryEntryCard 
          name="Fiddle Leaf Fig" 
          method="Indoor Container" 
          archivedDate="Oct 12, 2024" 
          onRestore={() => {}} 
          onDelete={() => {}} 
        />

        {/* ════════════════════════════════════════════════════════════
            NEW: COMMUNITY EXTENDED SUITE
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Community Extended" theme={theme} />

        <ClusterCoverHeader 
          title="Downtown Hydroponics" 
          location="New York, NY" 
          memberCount={432} 
          onJoin={() => {}} 
        />
        
        <CustomCard padding={0}>
          <MemberRow name="Alex Garden" joinedDate="Jan 2024" />
          <MemberRow name="GreenThumb99" joinedDate="Mar 2024" />
        </CustomCard>
        <View style={styles.spacer} />

        <SwapCard itemName="Monstera Albo Cuttings" type="Cutting" location="Seattle, WA" onExpressInterest={() => {}} />
        <SwapCard itemName="Extra Neem Oil" type="Tool" location="Portland, OR" onExpressInterest={() => {}} />
        <View style={styles.spacer} />

        <Text style={{ fontSize: Typography.sizes.sm, fontWeight: 'bold', color: Colors.text.heading }}>Post Comments</Text>
        <CommentThread />
        <View style={styles.spacer} />

        <FullScreenPhotoViewer onClose={() => {}} onLog={() => {}} />

        {/* ════════════════════════════════════════════════════════════
            NEW: GUIDES & PREMIUM SUITE
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Guides & Premium Features" theme={theme} />

        <RevenueBanner onLearnMore={() => {}} />
        
        <PublishedGuideCard title="Ultimate Guide to Pothos" status="Live" views="1.2k" revenue="$4.50" onEdit={() => {}} />
        <PublishedGuideCard title="DIY Hydro System" status="Under Review" views="0" revenue="$0.00" onEdit={() => {}} />
        <View style={styles.spacer} />

        <SupporterBadgeBanner onUpgrade={() => {}} />
        
        <CustomCard padding={Spacing.md}>
          <Text style={{ fontSize: Typography.sizes.md, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.md }}>Supporter Benefits</Text>
          <SupporterBenefitsList />
        </CustomCard>
        <View style={styles.spacer} />

        <UnlockSuccessState />
        <View style={styles.spacer} />

        <VideoProgressOverlay />

{/* ════════════════════════════════════════════════════════════
            NEW: ONBOARDING & SETUP CARDS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Setup & Onboarding" theme={theme} />
        
        <PlantBrowseGrid categories={['Herb', 'Veggie', 'Fruit', 'Flower', 'Indoor', 'Micro']} />
        
        <SelectedPlantPreviewCard name="Aloe Vera" scientific="Aloe barbadensis" methodBadge="Soil" />
        
        <CarePlanSummaryCard method="Indoor Container" light="Bright Indirect" waterFreq="Every 14 days" />
        
        <NotificationOptInRow plantName="Aloe Vera" isEnabled={toggleState} onToggle={setToggleState} />
        <View style={styles.spacer} />

        {/* ════════════════════════════════════════════════════════════
            NEW: MODAL & LOGGING SUB-COMPONENTS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Modal & Logging Subs" theme={theme} />
        
        <LocationTagRow zone="Zone 8b" onRemove={() => {}} />
        <AddToReelToggle enabled={toggleState} onToggle={setToggleState} />
        <QRSuccessCard name="FoxFarm Grow Big" brand="FoxFarm" type="Liquid Nutrient" onScanAnother={() => {}} />
        <NotificationCategoryRow icon="droplet" label="Watering Reminders" enabled={toggleState} onToggle={setToggleState} />
        <RelatedArticlesRow />
        <View style={styles.spacer} />

        {/* ════════════════════════════════════════════════════════════
            NEW: DIAGNOSTICS & INSIGHTS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Diagnostics & Insights" theme={theme} />

        <DiagnosisHistoryRow date="Oct 12" plantName="Monstera" finding="Nitrogen Deficiency" severity="medium" />
        <DiagnosisHistoryRow date="Sep 28" plantName="Basil" finding="Spider Mites" severity="high" />
        
        <WeatherImpactBanner message="Heavy rain expected. Outdoor watering disabled." />
        <CrossMethodInsightCard deltaMessage="Your Hydroponic Basil is growing 25% faster than your Soil Basil." />
        <View style={styles.spacer} />

        {/* ════════════════════════════════════════════════════════════
            NEW: COMMUNITY MAP EXTRAS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Community Map Extras" theme={theme} />

        <LocalContextCard city="Seattle" insightText="Growers in your area are seeing a 92% success rate with Kale this month." onMapPress={() => {}} />
        <ReferralBanner progress={1} total={3} onShare={() => {}} />
        <MapClusterPopupCard cropName="Cherry Tomatoes" stats="87% Success · 142 Growers" tip="Add calcium to prevent blossom end rot in this humidity." onGrow={() => {}} />
        <PrivacyFooter />
        <View style={styles.spacer} />

        {/* ════════════════════════════════════════════════════════════
            NEW: SETTINGS SELECTORS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Settings Selectors" theme={theme} />

        <CustomCard padding={Spacing.md}>
          <FontSelector />
          <Divider />
          <TextSizeSlider />
          <Divider />
          <LanguageSelector />
          <Divider />
          <DateFormatSelector />
        </CustomCard>
        <View style={styles.spacer} />

        {/* ════════════════════════════════════════════════════════════
            NEW: SCANNING OVERLAY MOCK
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="Scanning Overlay" theme={theme} />
        
        <View style={{ height: 300, borderRadius: Radius.lg, overflow: 'hidden', position: 'relative' }}>
          <Image source={require('../assets/placeholder-plant.png')} style={{ width: '100%', height: '100%' }} />
          <ScanningStateOverlay />
        </View>

        {/* ════════════════════════════════════════════════════════════
            THE FINAL 10: MISSING EXTRAS
        ═══════════════════════════════════════════════════════════════ */}
        <Section label="The Final 10 Extras" theme={theme} />
        
        <PlantHeroImage photoCount={42} onAddPhoto={() => {}} />

        {/* Note: Tap the card below to see the swipe-to-reveal mock */}
        <SwipeableRowMock onLog={() => {}} onArchive={() => {}}>
          <CustomCard padding={Spacing.md} style={{ elevation: 2 }}>
            <Text style={{ fontWeight: 'bold', color: Colors.text.heading }}>← Tap me to simulate swipe</Text>
            <Text style={{ color: Colors.text.muted }}>Reveals Log and Archive actions underneath.</Text>
          </CustomCard>
        </SwipeableRowMock>

        <RecentlyUsedBanner toolName="Nutrient Calculator" icon="droplet" onOpen={() => {}} />

        <SunriseSunsetRow sunrise="06:24 AM" sunset="08:12 PM" />

        <CustomReminderForm plants={[{ id: '1', name: 'Monstera' }]} onSave={() => {}} />

        <View style={{ borderWidth: 1, borderColor: Colors.border.subtle, borderRadius: Radius.lg, marginBottom: Spacing.md }}>
          <MapLayerToggleSheet />
        </View>

        <PendingExportStatusCard />

        <CustomCard padding={Spacing.md}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.md }}>Export Settings</Text>
          <WatermarkToggleRow isSupporter={false} />
        </CustomCard>

        <View style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
          <VoiceInputButton />
          <Text style={{ marginTop: Spacing.md, color: Colors.text.muted, fontWeight: 'bold' }}>Tap Mic to Test State</Text>
        </View>

        {/* Confetti renders an absolute overlay, so we wrap it in a mock screen block */}
        <View style={[styles.miniScreen, { height: 160, position: 'relative' }]}>
          <ConfettiCelebration />
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}
