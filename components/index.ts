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

export { default as ThemeToggle } from './common/ThemeToggle';
export type { ThemeToggleProps } from './common/ThemeToggle';

export { default as ZoneBadge } from './common/ZoneBadge';
export type { ZoneBadgeProps } from './common/ZoneBadge';

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