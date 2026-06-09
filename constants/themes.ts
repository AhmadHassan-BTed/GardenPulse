export type ThemeScheme = 'light' | 'dark';

// ── Static tokens (shared by both schemes) ───────────────────────────────────
const Spacing = {
  xxs:  2,
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
} as const;

const Radius = {
  none: 0,
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  full: 9999,
} as const;

const Typography = {
  sizes: {
    xs:   11,
    sm:   13,
    base: 15,
    md:   17,
    lg:   20,
    xl:   24,
    xxl:  32,
    xxxl: 40,
  },
  weights: {
    regular:  '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
  },
  lineHeights: {
    tight:  1.2,
    normal: 1.4,
    loose:  1.6,
  },
} as const;

// ── LIGHT palette ─────────────────────────────────────────────────────────────
const lightColors = {
  scheme: 'light' as const,

  // Brand green — IMPORTANT / primary actions, accents, focus states
  green: {
    DEFAULT: '#16A34A',   // green-600 — main brand green
    deep:     '#15803D',  // green-700 — pressed / active
    muted:    '#22C55E',  // green-500 — secondary accents
    tint:     'rgba(22, 163, 74, 0.10)',
    glow:     'rgba(22, 163, 74, 0.20)',
  },

  // Text
  text: {
    heading: '#0A0F0D',          // near-black
    body:    '#1F2937',          // slate-800
    muted:   '#6B7280',          // slate-500
    error:   '#DC2626',          // red-600
    inverse: '#FFFFFF',          // text on dark / brand buttons
  },

  // Surfaces — clean light theme
  surface: {
    base:        '#FFFFFF',  // app background
    subtle:      '#F9FAFB',  // alternating rows / grouped content
    elevated:    '#F9FAFB',  // explicit opaque field surface (CustomInput)
    glass:       'rgba(0, 0, 0, 0.04)',       // very subtle panel fill
    glassBorder: 'rgba(0, 0, 0, 0.08)',       // hairline border on panels
    overlay:     'rgba(0, 0, 0, 0.45)',        // modal backdrop
  },

  // Buttons
  button: {
    primaryBg:     '#0A0F0D',
    primaryText:   '#FFFFFF',
    secondaryBg:   '#FFFFFF',
    secondaryText: '#0A0F0D',
    accentBg:      '#16A34A',
    accentText:    '#FFFFFF',
  },

  // Borders
  border: {
    subtle: 'rgba(0, 0, 0, 0.08)',
    muted:  'rgba(0, 0, 0, 0.16)',
    focus:  '#16A34A',
    error:  '#DC2626',
  },
} as const;

// ── DARK palette (glassmorphic, matching the Eco&Flora reference) ────────────
const darkColors = {
  scheme: 'dark' as const,

  // Brand green — same hue, softer glow so it doesn't punch through dark glass
  green: {
    DEFAULT: '#34D399',   // emerald-400 — pops on dark glass
    deep:     '#10B981',  // emerald-500
    muted:    '#22C55E',
    tint:     'rgba(52, 211, 153, 0.14)',
    glow:     'rgba(52, 211, 153, 0.28)',
  },

  // Text
  text: {
    heading: '#F3F4F6',          // near-white
    body:    '#E5E7EB',          // slate-200
    muted:   'rgba(229, 231, 235, 0.62)',
    error:   '#F87171',
    inverse: '#0A0F0D',
  },

  // Surfaces — dark glassmorphism
  surface: {
    base:        '#0A0F0D',  // app background
    subtle:      '#101715',  // slight elevation above base
    elevated:    '#141414',  // explicit opaque field surface (CustomInput)
    glass:       'rgba(255, 255, 255, 0.06)',  // glassmorphism panels
    glassBorder: 'rgba(255, 255, 255, 0.10)',  // hairline border on glass
    overlay:     'rgba(0, 0, 0, 0.62)',         // modal backdrop
  },

  // Buttons
  button: {
    primaryBg:     '#FFFFFF',  // flip: on dark, default CTA is white
    primaryText:   '#0A0F0D',
    secondaryBg:   'rgba(255, 255, 255, 0.06)',
    secondaryText: '#F3F4F6',
    accentBg:      '#34D399',  // important / brand CTA
    accentText:    '#0A0F0D',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.10)',
    muted:  'rgba(255, 255, 255, 0.18)',
    focus:  '#34D399',
    error:  '#F87171',
  },
} as const;

// STRUCTURAL type (not `typeof lightColors`) so both light and dark palettes
// satisfy it. If we used the inferred type, the `scheme: 'light'` literal
// would block the dark palette from being assignable.
export type ThemeColors = {
  readonly scheme: ThemeScheme;
  readonly green: {
    readonly DEFAULT: string;
    readonly deep:     string;
    readonly muted:    string;
    readonly tint:     string;
    readonly glow:     string;
  };
  readonly text: {
    readonly heading: string;
    readonly body:    string;
    readonly muted:   string;
    readonly error:   string;
    readonly inverse: string;
  };
  readonly surface: {
    readonly base:        string;
    readonly subtle:      string;
    readonly elevated:    string;
    readonly glass:       string;
    readonly glassBorder: string;
    readonly overlay:     string;
  };
  readonly button: {
    readonly primaryBg:     string;
    readonly primaryText:   string;
    readonly secondaryBg:   string;
    readonly secondaryText: string;
    readonly accentBg:      string;
    readonly accentText:    string;
  };
  readonly border: {
    readonly subtle: string;
    readonly muted:  string;
    readonly focus:  string;
    readonly error:  string;
  };
};

// ── Theme = Colors + static tokens ───────────────────────────────────────────
export interface AppTheme {
  scheme: ThemeScheme;
  Colors: ThemeColors;
  Spacing: typeof Spacing;
  Radius:  typeof Radius;
  Typography: typeof Typography;
}

const lightTheme: AppTheme = {
  scheme: 'light',
  Colors: lightColors,
  Spacing,
  Radius,
  Typography,
};

const darkTheme: AppTheme = {
  scheme: 'dark',
  Colors: darkColors,
  Spacing,
  Radius,
  Typography,
};

/** Pick the right theme based on a scheme string or current theme. */
export function getTheme(scheme: ThemeScheme | AppTheme): AppTheme {
  if (typeof scheme === 'object') return scheme;
  return scheme === 'dark' ? darkTheme : lightTheme;
}

export const lightThemeExport = lightTheme;
export const darkThemeExport  = darkTheme;
