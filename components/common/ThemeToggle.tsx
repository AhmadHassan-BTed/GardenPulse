// ─────────────────────────────────────────────────────────────────────────────
// ThemeToggle.tsx — GardenPulse
// Glassmorphic pill button that switches between light and dark themes.
// Inspired by the Eco&Flora reference: soft, frosted, with a brand-green
// halo and a sun/moon glyph that slides on toggle.
//
// Usage:
//   <ThemeToggle />
//   <ThemeToggle showLabel />            // adds "Light" / "Dark" label
//   <ThemeToggle variant="icon-only" />  // just the icon
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useRef, useEffect } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme, useThemeController } from '../layout/ThemeProvider';

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface ThemeToggleProps {
  /** Optional size override (square dimension in pt). Default = 44 */
  size?: number;
  /** Show the "Light" / "Dark" text label next to the icon */
  showLabel?: boolean;
  /** Visual variant of the toggle */
  variant?: 'pill' | 'icon-only';
  style?: ViewStyle;
}

// ── Sun / Moon glyphs drawn in primitives (no extra deps) ─────────────────────
const SunGlyph = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 10, height: 10, borderRadius: 5,
        backgroundColor: color,
      }}
    />
    {[
      { top: 0,    left: 8  },
      { bottom: 0, left: 8  },
      { left: 0,   top: 8   },
      { right: 0,  top: 8   },
    ].map((pos, i) => (
      <View
        key={i}
        style={[
          StyleSheet.absoluteFillObject,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
        pointerEvents="none"
      >
        <View
          style={{
            position: 'absolute',
            width: 2, height: 2, borderRadius: 1,
            backgroundColor: color,
            ...pos,
          }}
        />
      </View>
    ))}
  </View>
);

const MoonGlyph = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 14, height: 14, borderRadius: 7,
        backgroundColor: color,
        opacity: 0.95,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: 1, top: 1,
        width: 11, height: 11, borderRadius: 6,
        backgroundColor: 'transparent',
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderColor: 'rgba(255,255,255,0.0)',
        // Use a simpler overlay: a slightly offset solid disk
      }}
      pointerEvents="none"
    />
    <View
      style={{
        position: 'absolute',
        right: 0, top: 0,
        width: 12, height: 12, borderRadius: 6,
        // Punch-out effect via background matching the track
      }}
    />
  </View>
);

// ── Component ─────────────────────────────────────────────────────────────────
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 44,
  showLabel = false,
  variant = 'pill',
  style,
}) => {
  const theme = useTheme();
  const { scheme, toggleScheme } = useThemeController();
  const isDark = scheme === 'dark';
  const { Colors, Spacing, Radius, Typography } = theme;

  // Animated thumb position (0 = light, 1 = dark)
  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  useEffect(() => {
    Animated.spring(anim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: false,
      damping: 16, stiffness: 220, mass: 0.7,
    }).start();
  }, [isDark, anim]);

  const innerSize = size - 8;
  const thumbX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, size - innerSize - 4],
  });

  // Glassmorphic background: subtle tinted fill + hairline border
  const glassBg = isDark
    ? 'rgba(255,255,255,0.10)'
    : 'rgba(0,0,0,0.04)';
  const glassBorder = isDark
    ? 'rgba(255,255,255,0.18)'
    : 'rgba(0,0,0,0.10)';

  // Sun = light side, moon = dark side. The glyph that matches the CURRENT
  // scheme sits on top and is colored brand green.
  const currentGlyphColor = Colors.green.DEFAULT;
  const idleGlyphColor    = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  const containerStyle: ViewStyle = {
    height: size,
    borderRadius: Radius.full,
    backgroundColor: glassBg,
    borderWidth: 1,
    borderColor: glassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
    ...(variant === 'icon-only'
      ? { width: size }
      : { minWidth: size }),
  };

  // In pill + label mode we render the label next to the track
  const showText = showLabel && variant === 'pill';

  return (
    <Pressable
      onPress={toggleScheme}
      accessibilityRole="switch"
      accessibilityLabel="Toggle theme"
      accessibilityState={{ checked: isDark }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
        },
        style,
      ]}
      hitSlop={8}
    >
      <View style={containerStyle}>
        {/* Idle glyphs (always visible, dimmed) */}
        <View style={{ width: innerSize, height: innerSize, alignItems: 'center', justifyContent: 'center' }}>
          <SunGlyph color={idleGlyphColor} />
        </View>
        <View style={{ width: innerSize, height: innerSize, alignItems: 'center', justifyContent: 'center' }}>
          <MoonGlyph color={idleGlyphColor} />
        </View>

        {/* Active thumb (the green-tinged orb) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              transform: [{ translateX: thumbX }],
              backgroundColor: isDark ? '#0A0F0D' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
            },
          ]}
        >
          {isDark
            ? <MoonGlyph color={currentGlyphColor} />
            : <SunGlyph  color={currentGlyphColor} />}
        </Animated.View>
      </View>

      {showText && (
        <Text
          style={{
            color: Colors.text.body,
            fontSize: Typography.sizes.sm,
            fontWeight: Typography.weights.semibold,
            letterSpacing: 0.3,
          }}
        >
          {isDark ? 'Dark' : 'Light'}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
  },
});

export default ThemeToggle;
