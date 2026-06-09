
import React, { useRef, useState, useCallback } from 'react';
import {
  Animated,
  TextInput,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Platform,
} from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  /** Floating label — animates above the field on focus/fill */
  label: string;
  /** Shows below the field in red; takes priority over helperText */
  error?: string;
  /** Hint text shown below the field when there is no error */
  helperText?: string;
  /** Left-inset icon node */
  leftIcon?: React.ReactNode;
  /** Right-inset icon node */
  rightIcon?: React.ReactNode;
  /** Fires when the right icon is pressed */
  onRightIconPress?: () => void;
  /** Outer wrapper style override */
  containerStyle?: ViewStyle;
  value?: string;
  onChangeText?: (text: string) => void;
}

// ── Layout constants ──────────────────────────────────────────────────────────
const FIELD_HEIGHT       = 56;
const LABEL_RESTING_TOP  = 18;   // vertically centred inside the field
const LABEL_FLOATING_TOP = -9;   // sits just above the top border
const LABEL_RESTING_X    = 0;    // small indent inside the field
const LABEL_FLOATING_X   = 4;    // tiny leftward shift when floating
const ANIM_MS            = 200;

// ── Component ─────────────────────────────────────────────────────────────────
const CustomInput = React.forwardRef<TextInput, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      value = '',
      onChangeText,
      onFocus,
      onBlur,
      multiline,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const isDark = theme.scheme === 'dark';

    // Light: transparent so there's no visible "grey box".
    // Dark: rgb(20,20,20) — opaque surface matching other dark components.
    const fieldSurface = isDark ? theme.Colors.surface.elevated : 'transparent';

    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    const anim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    const animateTo = useCallback(
      (toValue: number) =>
        Animated.timing(anim, {
          toValue,
          duration: ANIM_MS,
          useNativeDriver: false,
        }).start(),
      [anim],
    );

    const handleFocus = useCallback(
      (e: any) => { setIsFocused(true); animateTo(1); onFocus?.(e); },
      [animateTo, onFocus],
    );
    const handleBlur = useCallback(
      (e: any) => { setIsFocused(false); if (!value) animateTo(0); onBlur?.(e); },
      [animateTo, onBlur, value],
    );

    // ── Label interpolations ──────────────────────────────────────────────
    const labelTop = anim.interpolate({
      inputRange:  [0, 1],
      outputRange: [LABEL_RESTING_TOP, LABEL_FLOATING_TOP],
    });
    const labelLeft = anim.interpolate({
      inputRange:  [0, 1],
      outputRange: [LABEL_RESTING_X, LABEL_FLOATING_X],
    });
    const labelFontSize = anim.interpolate({
      inputRange:  [0, 1],
      outputRange: [Typography.sizes.base, Typography.sizes.xs],
    });

    // Color only — background is animated, not static.
    const labelColor = error
      ? theme.Colors.text.error
      : anim.interpolate({
          inputRange:  [0, 1],
          outputRange: [theme.Colors.text.muted, theme.Colors.green.DEFAULT],
        });

    // Light: always transparent (no grey box).
    // Dark: transparent at rest, fieldSurface when floating so the label
    // "cuts" through the top border cleanly.
    const labelBg = isDark
      ? anim.interpolate({
          inputRange:  [0, 1],
          outputRange: ['transparent', fieldSurface],
        })
      : 'transparent';

    // ── Border & glow ─────────────────────────────────────────────────────
    const borderColor = error
      ? theme.Colors.border.error
      : isFocused
      ? theme.Colors.border.focus
      : theme.Colors.border.muted;

    const borderWidth = isFocused || !!error ? 1.5 : 1;

    const glowColor = error
      ? 'rgba(248,113,113,0.28)'
      : isDark
      ? 'rgba(52,211,153,0.28)'
      : 'rgba(74,222,128,0.20)';

    // ── Web inline style safety net ───────────────────────────────────────
    // Applied in addition to the global CSS. RNW maps these to inline CSS
    // which has higher specificity than the injected <style> tag on some
    // builds — belt-and-suspenders.
    const webInputStyle: any =
      Platform.OS === 'web'
        ? {
            outlineWidth:    0,
            outlineStyle:    'none',
            backgroundColor: 'transparent',
            // colorScheme: 'light' — RNW doesn't support this style prop
            // directly, but the CSS injection above handles it.
          }
        : {};

    return (
      <View style={[styles.wrapper, containerStyle]}>

        {/* ── Floating label ──────────────────────────────────────────────
            Sibling of the field (not a child) → never clipped.
            Background is animated:
             • Resting (0): transparent — label sits in the field without
               covering the icon or typed text.
             • Floating (1): same colour as the field — masks the border
               line so the label appears to "cut" through it.              */}
        <Animated.View
          style={[
            styles.labelSlot,
            { top: labelTop, left: labelLeft },
          ]}
          pointerEvents="none"
        >
          <Animated.Text
            numberOfLines={1}
            style={{
              fontSize:          labelFontSize,
              fontWeight:        Typography.weights.medium,
              letterSpacing:     0.3,
              color:             labelColor as any,
              backgroundColor:   labelBg as any,
              paddingHorizontal: 4,
            }}
          >
            {label}
          </Animated.Text>
        </Animated.View>

        {/* ── Field container ─────────────────────────────────────────── */}
        <View
          style={[
            styles.field,
            {
              backgroundColor: fieldSurface,
              borderColor,
              borderWidth,
              shadowColor:   isFocused || !!error ? glowColor : 'transparent',
              shadowOffset:  { width: 0, height: 0 },
              shadowOpacity: isFocused || !!error ? 1 : 0,
              shadowRadius:  isFocused || !!error ? 10 : 0,
              elevation:     isFocused || !!error ? 4 : 0,
            },
          ]}
        >
          {leftIcon && <View style={styles.leftIconWrap}>{leftIcon}</View>}

          <View style={[styles.inputArea, multiline && styles.inputAreaMultiline]}>
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              multiline={multiline}
              // Android: remove system underline / focus rectangle
              underlineColorAndroid="transparent"
              // All platforms: brand-green text selection highlight
              selectionColor={isDark ? 'rgba(52,211,153,0.38)' : 'rgba(74,222,128,0.38)'}
              // Android 10+: green caret
              cursorColor={theme.Colors.green.DEFAULT}
              placeholderTextColor="transparent"
              // Web: data attribute lets our CSS selector apply !important
              // overrides including color-scheme: light to defeat UA dark-mode.
              // `dataSet` is a React Native Web-only prop; we cast the input
              // to `any` to apply it without breaking native type-checking.
              {...(Platform.OS === 'web'
                ? { dataSet: { gpulseInput: 'true' } }
                : {})}
              style={[
                styles.input,
                multiline && styles.inputMultiline,
                { color: theme.Colors.text.body },
                webInputStyle,
              ]}
              {...rest}
            />
          </View>

          {rightIcon && (
            <Pressable
              onPress={onRightIconPress}
              style={styles.rightIconWrap}
              hitSlop={8}
            >
              {rightIcon}
            </Pressable>
          )}
        </View>

        {(error || helperText) && (
          <Text style={[styles.subText, error ? styles.errorText : styles.helperText]}>
            {error ?? helperText}
          </Text>
        )}
      </View>
    );
  },
);

CustomInput.displayName = 'CustomInput';

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    paddingTop:   14,         // room for the floating label above the field
    marginBottom: Spacing.md,
  },

  labelSlot: {
    position: 'absolute',
    zIndex:   10,
  },

  field: {
    flexDirection:     'row',
    alignItems:        'center',
    minHeight:         FIELD_HEIGHT,
    borderRadius:      Radius.md,
    // Field bg is theme-aware — set inline above so light/dark both look right.
    paddingHorizontal: Spacing.md,
    overflow:          'hidden',
  },

  leftIconWrap: {
    marginRight:    Spacing.sm,
    justifyContent: 'center',
    alignItems:     'center',
  },

  rightIconWrap: {
    marginLeft:     Spacing.sm,
    justifyContent: 'center',
    alignItems:     'center',
  },

  inputArea: {
    flex:           1,
    justifyContent: 'center',
  },

  inputAreaMultiline: {
    paddingTop:    Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  input: {
    color:             Colors.text.body,  // overridden inline by theme
    fontSize:          Typography.sizes.base,
    fontWeight:        Typography.weights.regular,
    paddingVertical:   0,
    paddingHorizontal: 0,
    margin:            0,
    minHeight:         FIELD_HEIGHT - 2,
    backgroundColor:   'transparent',
  },

  inputMultiline: {
    minHeight:         100,
    textAlignVertical: 'top',
  },

  subText: {
    marginTop:  Spacing.xs,
    marginLeft: Spacing.xs,
    fontSize:   Typography.sizes.xs,
    lineHeight: 16,
  },

  helperText: { color: Colors.text.muted },  // overridden inline by theme
  errorText:  { color: Colors.text.error, fontWeight: Typography.weights.medium },
});

export default CustomInput;
