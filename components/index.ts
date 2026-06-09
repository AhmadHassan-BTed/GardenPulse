// ─────────────────────────────────────────────────────────────────────────────
// index.ts — GardenPulse Component Library
// Single import point for all reusable UI components.
//
// Usage:
//   import { CustomButton, CustomCard, Colors } from '@/components';
//   import { ComponentShowcase } from '@/components';
//
// File structure:
//   components/
//   ├── index.ts                  ← this file (barrel)
//   ├── ComponentShowcase.tsx     ← preview screen
//   ├── common/                   ← shared atomic components
//   │   ├── CustomButton.tsx
//   │   ├── CustomInput.tsx
//   │   ├── CustomCard.tsx
//   │   ├── CustomSwitch.tsx
//   │   ├── BottomSheetModal.tsx
//   │   └── ThemeToggle.tsx
//   └── layout/                   ← structural pieces (theme, nav, etc.)
//       └── ThemeProvider.tsx
//
// Design tokens live in constants/theme.ts and are re-exported here.
// Runtime theming lives in ThemeProvider (constants/themes.ts is the
// palette source).
// ─────────────────────────────────────────────────────────────────────────────

// ── Common components ────────────────────────────────────────────────────────
export { default as CustomButton  } from './common/CustomButton';
export type { CustomButtonProps   } from './common/CustomButton';

export { default as CustomInput   } from './common/CustomInput';
export type { CustomInputProps    } from './common/CustomInput';

export { default as CustomCard    } from './common/CustomCard';
export type { CustomCardProps     } from './common/CustomCard';

export { default as CustomSwitch  } from './common/CustomSwitch';
export type { CustomSwitchProps   } from './common/CustomSwitch';

export { default as BottomSheetModal } from './common/BottomSheetModal';
export type { BottomSheetModalProps  } from './common/BottomSheetModal';

export { default as ThemeToggle   } from './common/ThemeToggle';
export type { ThemeToggleProps    } from './common/ThemeToggle';

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
