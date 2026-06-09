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
  Easing,
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
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: color,
        opacity: 0.95,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        // Punch the right side out by overlaying a smaller offset disc that
        // matches the track — gives a true crescent shape.
        shadowColor: 'transparent',
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

  // ── Track + thumb geometry ────────────────────────────────────────────────
  // The track holds BOTH glyphs side by side, so its width is 2 * innerSize.
  // The thumb (size = innerSize) slides between them.
  const trackPadding = 4;
  const innerSize = size - 8;
  const trackWidth = 2 * innerSize + trackPadding * 2; // ≈ 80 for default 44
  const thumbRange = trackWidth - innerSize - trackPadding * 2; // distance the thumb travels

  // ── Animations ────────────────────────────────────────────────────────────
  // Thumb position: 0 = light (left/sun), 1 = dark (right/moon)
  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  // Background tint: smoothly cross-fade glassBg on scheme change
  const bgAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      // Thumb slide — uses the native driver for a smooth transform
      Animated.spring(anim, {
        toValue: isDark ? 1 : 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 260,
        mass: 0.7,
      }),
      // Background cross-fade — JS-driven because we tween a color
      Animated.timing(bgAnim, {
        toValue: isDark ? 1 : 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [isDark, anim, bgAnim]);

  // Spring-back on press: when the user taps, the thumb also gets a tiny
  // "tap-down" feedback scale animation.
  const pressAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      damping: 18,
      stiffness: 320,
      mass: 0.6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 14,
      stiffness: 220,
      mass: 0.5,
    }).start();
  };

  const thumbX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, thumbRange],
  });

  // Background color cross-fade
  const lightBg     = 'rgba(0,0,0,0.04)';
  const darkBg      = 'rgba(255,255,255,0.10)';
  const lightBorder = 'rgba(0,0,0,0.10)';
  const darkBorder  = 'rgba(255,255,255,0.18)';

  const trackBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [lightBg, darkBg],
  });
  const trackBorderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [lightBorder, darkBorder],
  });

  // Glyph colors
  const currentGlyphColor = Colors.green.DEFAULT;
  const idleGlyphColor    = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  // Thumb itself cross-fades between white and near-black for a stronger feel
  const thumbBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#0A0F0D'],
  });
  const thumbBorderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0.10)', 'rgba(255,255,255,0.10)'],
  });

  const trackStyle: ViewStyle = {
    width: variant === 'icon-only' ? size : trackWidth,
    height: size,
    borderRadius: Radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: trackPadding,
  };

  const glyphSlot = {
    width: innerSize,
    height: innerSize,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  // In pill + label mode we render the label next to the track
  const showText = showLabel && variant === 'pill';

  return (
    <Pressable
      onPress={toggleScheme}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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
      <Animated.View style={[trackStyle, { backgroundColor: trackBg, borderColor: trackBorderColor, borderWidth: 1 }]}>
        {/* Sun slot (left, absolute so it doesn't affect layout) */}
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'flex-start', justifyContent: 'center', paddingLeft: trackPadding }]}>
          <View style={glyphSlot}>
            <SunGlyph color={idleGlyphColor} />
          </View>
        </View>

        {/* Moon slot (right) */}
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'flex-end', justifyContent: 'center', paddingRight: trackPadding }]}>
          <View style={glyphSlot}>
            <MoonGlyph color={idleGlyphColor} />
          </View>
        </View>

        {/* Active thumb — slides between the two glyphs */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              transform: [
                { translateX: thumbX },
                { scale: pressAnim },
              ],
              backgroundColor: thumbBg,
              borderColor: thumbBorderColor,
            },
          ]}
        >
          {isDark
            ? <MoonGlyph color={currentGlyphColor} />
            : <SunGlyph  color={currentGlyphColor} />}
        </Animated.View>
      </Animated.View>

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
    left: 4,
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
