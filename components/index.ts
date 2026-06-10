// ─────────────────────────────────────────────────────────────────────────────
// index.ts — GardenPulse Component Library
// Single import point for all reusable UI components.
//
// Usage:
//   import { CustomButton, CustomCard, Colors } from '@/components';
//   import { ComponentShowcase } from '@/components';
//
// Design tokens live in constants/theme.ts and are re-exported here.
// Runtime theming lives in ThemeProvider (constants/theme.ts is the
// palette source).
// ─────────────────────────────────────────────────────────────────────────────

// ── Common components ────────────────────────────────────────────────────────
export { default as AutocompleteSearchInput } from './common/AutocompleteSearchInput';
export type { AutocompleteSearchInputProps } from './common/AutocompleteSearchInput';

export { default as BottomNavigationBar } from './common/BottomNavigationBar';

export { default as BottomSheetModal } from './common/BottomSheetModal';
export type { BottomSheetModalProps } from './common/BottomSheetModal';

export { default as CameraViewfinder } from './common/CameraViewfinder';
export type { CameraViewfinderProps } from './common/CameraViewfinder';

export { default as Checkbox } from './common/Checkbox';
export type { CheckboxProps } from './common/Checkbox';

export { default as CustomButton } from './common/CustomButton';
export type { CustomButtonProps } from './common/CustomButton';

export { default as CustomCard } from './common/CustomCard';
export type { CustomCardProps } from './common/CustomCard';

export { default as CustomDateTimePicker } from './common/CustomDateTimePicker';
export type { CustomDateTimePickerProps } from './common/CustomDateTimePicker';

export { default as CustomHeader } from './common/CustomHeader';
export type { CustomHeaderProps } from './common/CustomHeader';

export { default as CustomInput } from './common/CustomInput';
export type { CustomInputProps } from './common/CustomInput';

export { default as CustomSlider } from './common/CustomSlider';
export type { CustomSliderProps } from './common/CustomSlider';

export { default as CustomSwitch } from './common/CustomSwitch';
export type { CustomSwitchProps } from './common/CustomSwitch';

export { default as Divider } from './common/Divider';
export type { DividerProps } from './common/Divider';

export { default as FAB } from './common/FAB';
export type { FABProps } from './common/FAB';

export { default as FilterChip } from './common/FilterChip';
export type { FilterChipProps } from './common/FilterChip';

export { default as HorizontalScrollRow } from './common/HorizontalScrollRow';
export type { HorizontalScrollRowProps } from './common/HorizontalScrollRow';

export { default as IconButton } from './common/IconButton';
export type { IconButtonProps } from './common/IconButton';

export { default as MetricDial } from './common/MetricDial';
export type { MetricDialProps } from './common/MetricDial';

export { default as ModalDialog } from './common/ModalDialog';
export type { ModalDialogProps } from './common/ModalDialog';

export { default as NotesInput } from './common/NotesInput';
export type { NotesInputProps } from './common/NotesInput';

export { default as RadioGroup } from './common/RadioGroup';
export type { RadioGroupProps, RadioOption } from './common/RadioGroup';

export { default as ScreenWrapper } from './common/ScreenWrapper';
export type { ScreenWrapperProps } from './common/ScreenWrapper';

export { default as SectionHeader } from './common/SectionHeader';
export type { SectionHeaderProps } from './common/SectionHeader';

export { default as StatusBadge } from './common/StatusBadge';
export type { StatusBadgeProps, StatusType } from './common/StatusBadge';

export { default as TextLink } from './common/TextLink';
export type { TextLinkProps } from './common/TextLink';

export { default as CustomText } from './common/CustomText';
export type { CustomTextProps } from './common/CustomText';

export { default as ThemeToggle } from './common/ThemeToggle';
export type { ThemeToggleProps } from './common/ThemeToggle';

export { default as ZoneBadge } from './common/ZoneBadge';
export type { ZoneBadgeProps } from './common/ZoneBadge';

// ── New components (Phase 1–3) ───────────────────────────────────────────────
export { default as ActionPillRow } from './common/ActionPillRow';
export type { ActionPillRowProps } from './common/ActionPillRow';

export { default as BadgeDetailSheet } from './common/BadgeDetailSheet';
export type { BadgeDetailSheetProps } from './common/BadgeDetailSheet';

export { default as BadgeGrid } from './common/BadgeGrid';
export type { BadgeGridProps } from './common/BadgeGrid';

export { default as BatchActionBar } from './common/BatchActionBar';
export type { BatchActionBarProps } from './common/BatchActionBar';

export { default as BloomBestPlantCard } from './common/BloomBestPlantCard';
export type { BloomBestPlantCardProps } from './common/BloomBestPlantCard';

export { default as BloomStatsPillRow } from './common/BloomStatsPillRow';
export type { BloomStatsPillRowProps } from './common/BloomStatsPillRow';

export { default as CalendarHeatmap } from './common/CalendarHeatmap';
export type { CalendarHeatmapProps } from './common/CalendarHeatmap';

export { default as CalendarMonthGrid } from './common/CalendarMonthGrid';
export type { CalendarMonthGridProps } from './common/CalendarMonthGrid';

export { default as CalendarWeekStrip } from './common/CalendarWeekStrip';
export type { CalendarWeekStripProps } from './common/CalendarWeekStrip';

export { default as ChallengeCard } from './common/ChallengeCard';
export type { ChallengeCardProps } from './common/ChallengeCard';

export { default as ClusterCard } from './common/ClusterCard';
export type { ClusterCardProps } from './common/ClusterCard';

export { default as ConfidenceScoreChart } from './common/ConfidenceScoreChart';
export type { ConfidenceScoreChartProps } from './common/ConfidenceScoreChart';

export { default as DataInventoryRow } from './common/DataInventoryRow';
export type { DataInventoryRowProps } from './common/DataInventoryRow';

export { default as DiagnosisResultCard } from './common/DiagnosisResultCard';
export type { DiagnosisResultCardProps } from './common/DiagnosisResultCard';

export { default as EmptyStateView } from './common/EmptyStateView';
export type { EmptyStateViewProps } from './common/EmptyStateView';

export { default as ForecastStrip } from './common/ForecastStrip';
export type { ForecastStripProps } from './common/ForecastStrip';

export { default as GridListToggle } from './common/GridListToggle';
export type { GridListToggleProps } from './common/GridListToggle';

export { default as GrowingStageChip } from './common/GrowingStageChip';
export type { GrowingStageChipProps } from './common/GrowingStageChip';

export { default as GuideStatusChip } from './common/GuideStatusChip';
export type { GuideStatusChipProps } from './common/GuideStatusChip';

export { default as HealthDotIndicator } from './common/HealthDotIndicator';
export type { HealthDotIndicatorProps, HealthStatus } from './common/HealthDotIndicator';

export { default as InScreenTabBar } from './common/InScreenTabBar';
export type { InScreenTabBarProps } from './common/InScreenTabBar';

export { default as LogTimeline } from './common/LogTimeline';
export type { LogTimelineProps } from './common/LogTimeline';

export { default as LogTimelineEntry } from './common/LogTimelineEntry';
export type { LogTimelineEntryProps } from './common/LogTimelineEntry';

export { default as MethodSelectionCard } from './common/MethodSelectionCard';
export type { MethodSelectionCardProps } from './common/MethodSelectionCard';

export { default as MetricBreakdownRow } from './common/MetricBreakdownRow';
export type { MetricBreakdownRowProps } from './common/MetricBreakdownRow';

export { default as NativeAdCard } from './common/NativeAdCard';
export type { NativeAdCardProps } from './common/NativeAdCard';

export { default as NotificationBell } from './common/NotificationBell';
export type { NotificationBellProps } from './common/NotificationBell';

export { default as OnboardingProgressBar } from './common/OnboardingProgressBar';
export type { OnboardingProgressBarProps } from './common/OnboardingProgressBar';

export { default as PermissionDeniedBanner } from './common/PermissionDeniedBanner';
export type { PermissionDeniedBannerProps } from './common/PermissionDeniedBanner';

export { default as PermissionDeniedState } from './common/PermissionDeniedState';
export type { PermissionDeniedStateProps } from './common/PermissionDeniedState';

export { default as PermissionIllustration } from './common/PermissionIllustration';
export type { PermissionIllustrationProps } from './common/PermissionIllustration';

export { default as PlantCard } from './common/PlantCard';
export type { PlantCardProps } from './common/PlantCard';

export { default as PlantInfoCard } from './common/PlantInfoCard';
export type { PlantInfoCardProps } from './common/PlantInfoCard';

export { default as PostCard } from './common/PostCard';
export type { PostCardProps } from './common/PostCard';

export { default as PrivacyToggleRow } from './common/PrivacyToggleRow';
export type { PrivacyToggleRowProps } from './common/PrivacyToggleRow';

export { default as RecipeResultCard } from './common/RecipeResultCard';
export type { RecipeResultCardProps } from './common/RecipeResultCard';

export { default as ReelCard } from './common/ReelCard';
export type { ReelCardProps } from './common/ReelCard';

export { default as RepeatSelector } from './common/RepeatSelector';
export type { RepeatSelectorProps } from './common/RepeatSelector';

export { default as SeverityIndicator } from './common/SeverityIndicator';
export type { SeverityIndicatorProps, SeverityLevel } from './common/SeverityIndicator';

export { default as SmartAlertChip } from './common/SmartAlertChip';
export type { SmartAlertChipProps } from './common/SmartAlertChip';

export { default as SmartControlsPanel } from './common/SmartControlsPanel';
export type { SmartControlsPanelProps } from './common/SmartControlsPanel';

export { default as SplashLogo } from './common/SplashLogo';
export type { SplashLogoProps } from './common/SplashLogo';

export { default as StatsPillRow } from './common/StatsPillRow';
export type { StatsPillRowProps } from './common/StatsPillRow';

export { default as SuccessStatCard } from './common/SuccessStatCard';
export type { SuccessStatCardProps } from './common/SuccessStatCard';

export { default as TaskCard } from './common/TaskCard';
export type { TaskCardProps } from './common/TaskCard';

export { default as ToolCard } from './common/ToolCard';
export type { ToolCardProps } from './common/ToolCard';

export { default as UnitToggle } from './common/UnitToggle';
export type { UnitToggleProps } from './common/UnitToggle';

export { default as WeatherWidget } from './common/WeatherWidget';
export type { WeatherWidgetProps } from './common/WeatherWidget';

export { default as WinnerSpotlightCard } from './common/WinnerSpotlightCard';
export type { WinnerSpotlightCardProps } from './common/WinnerSpotlightCard';

// ── Newly built components ───────────────────────────────────────────────────
export { default as NotificationOptInRow } from './common/NotificationOptInRow';
export type { NotificationOptInRowProps } from './common/NotificationOptInRow';

export { default as CarePlanSummaryCard } from './common/CarePlanSummaryCard';
export type { CarePlanSummaryCardProps } from './common/CarePlanSummaryCard';

export { default as ContextualTipCard } from './common/ContextualTipCard';
export type { ContextualTipCardProps } from './common/ContextualTipCard';

export { default as BloomReportBanner } from './common/BloomReportBanner';
export type { BloomReportBannerProps } from './common/BloomReportBanner';

export { default as ComebackBonusBanner } from './common/ComebackBonusBanner';
export type { ComebackBonusBannerProps } from './common/ComebackBonusBanner';

export { default as ConfettiCelebration } from './common/ConfettiCelebration';

export { default as SwipeableRow } from './common/SwipeableRow';
export type { SwipeableRowProps } from './common/SwipeableRow';

export { default as ZoneGroupHeader } from './common/ZoneGroupHeader';
export type { ZoneGroupHeaderProps } from './common/ZoneGroupHeader';

export { default as PlantHeroImage } from './common/PlantHeroImage';

export { default as WeatherImpactBanner } from './common/WeatherImpactBanner';
export type { WeatherImpactBannerProps } from './common/WeatherImpactBanner';

export { default as CrossMethodInsightCard } from './common/CrossMethodInsightCard';
export type { CrossMethodInsightCardProps } from './common/CrossMethodInsightCard';

export { default as VoiceInputButton } from './common/VoiceInputButton';

export { default as RecentlyUsedBanner } from './common/RecentlyUsedBanner';

export { default as DiagnosisHistoryRow } from './common/DiagnosisHistoryRow';
export type { DiagnosisHistoryRowProps } from './common/DiagnosisHistoryRow';

export { default as SunriseSunsetRow } from './common/SunriseSunsetRow';

export { default as CustomReminderForm } from './common/CustomReminderForm';

export { default as LocalContextCard } from './common/LocalContextCard';
export type { LocalContextCardProps } from './common/LocalContextCard';

export { default as ReferralBanner } from './common/ReferralBanner';
export type { ReferralBannerProps } from './common/ReferralBanner';

export { default as ClusterCoverHeader } from './common/ClusterCoverHeader';
export type { ClusterCoverHeaderProps } from './common/ClusterCoverHeader';

// ── Layout / theming ─────────────────────────────────────────────────────────
export {
  ThemeProvider,
  useTheme,
  useThemeController,
} from './layout/ThemeProvider';

// ── Showcase screen ──────────────────────────────────────────────────────────
export { default as ComponentShowcase } from './ComponentShowcase';

// ── Design tokens (re-exported from constants/theme.ts) ──────────────────────
// These are STATIC LIGHT defaults — for runtime theming, use useTheme().
export { Colors, Spacing, Radius, Typography } from '../constants/theme';
export { getTheme, lightTheme, darkTheme } from '../constants/theme';
export type { AppTheme, ThemeScheme, ThemeColors } from '../constants/theme';