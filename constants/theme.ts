// ─────────────────────────────────────────────────────────────────────────────
// constants/theme.ts — GardenPulse
// Re-export shim. The real palettes now live in `./themes.ts` and are
// selected at runtime by the `ThemeProvider`.
//
// Existing imports like:
//   import { Colors, Spacing, Radius, Typography } from '../../constants/theme';
// keep working as static LIGHT defaults, so non-themed code (and tests)
// don't break. New code should read these via the `useTheme()` hook instead.
// ─────────────────────────────────────────────────────────────────────────────

export {
  getTheme,
  lightThemeExport as lightTheme,
  darkThemeExport  as darkTheme,
} from './themes';

export type { AppTheme, ThemeScheme, ThemeColors } from './themes';

// Static LIGHT defaults (kept for back-compat with `import { Colors }`).
import { lightThemeExport } from './themes';

export const Colors       = lightThemeExport.Colors;
export const Spacing      = lightThemeExport.Spacing;
export const Radius       = lightThemeExport.Radius;
export const Typography   = lightThemeExport.Typography;

const theme = lightThemeExport;
export default theme;
