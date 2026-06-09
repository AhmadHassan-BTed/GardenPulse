
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
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';

// ── Surface colour used for both the field bg and the label chip bg ───────────
// Must be the same value so the floating label "cuts" the border cleanly.
const SURFACE = Colors.surface.elevated; // '#141414'

// ── Global CSS injection (web only, runs once at module load) ─────────────────
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const STYLE_ID = 'gpulse-input-reset-v4';
  if (!document.getElementById(STYLE_ID)) {
    const tag = document.createElement('style');
    tag.id = STYLE_ID;
    tag.textContent = `
      /*
       * GardenPulse — CustomInput web reset
       *
       * Target: every <input> / <textarea> stamped with data-gpulse-input.
       *
       * The critical line is color-scheme: light.
       * In dark mode the browser UA sheet sets color-scheme: light dark on
       * all form elements, causing their system colour "Field" to resolve to
       * white. !important on background-color alone cannot override a UA
       * system colour. Setting color-scheme: light forces the UA to resolve
       * "Field" to white-mode (which we then replace), and from that point
       * our background-color: transparent !important wins cleanly.
       */
      input[data-gpulse-input="true"],
      textarea[data-gpulse-input="true"] {
        color-scheme:       light !important;
        background-color:   transparent !important;
        outline:            none !important;
        outline-width:      0 !important;
        box-shadow:         none !important;
        border:             none !important;
        -webkit-appearance: none !important;
        appearance:         none !important;
        caret-color:        #4ADE80 !important;
        color:              #E2E8F0 !important;
      }
      input[data-gpulse-input="true"]:focus,
      textarea[data-gpulse-input="true"]:focus {
        color-scheme:     light !important;
        background-color: transparent !important;
        outline:          none !important;
        box-shadow:       none !important;
      }
      input[data-gpulse-input="true"]::selection,
      textarea[data-gpulse-input="true"]::selection {
        background-color: rgba(74, 222, 128, 0.28) !important;
      }
    `;
    document.head.appendChild(tag);
  }
}

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

// ── Layout ────────────────────────────────────────────────────────────────────
const FIELD_HEIGHT       = 56;
const LABEL_RESTING_TOP  = 18;   // vertically centred inside the field
const LABEL_FLOATING_TOP = -9;   // sits just above the top border
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
    const labelFontSize = anim.interpolate({
      inputRange:  [0, 1],
      outputRange: [Typography.sizes.base, Typography.sizes.xs],
    });
    // Color only — background is always SURFACE (static, never animated)
    const labelColor = error
      ? Colors.text.error
      : anim.interpolate({
          inputRange:  [0, 1],
          outputRange: [Colors.text.muted, Colors.green.DEFAULT],
        });

    // ── Border & glow ─────────────────────────────────────────────────────
    const borderColor = error
      ? Colors.border.error
      : isFocused
      ? Colors.border.focus
      : Colors.border.muted;

    const borderWidth = isFocused || !!error ? 1.5 : 1;

    const glowColor = error
      ? 'rgba(248,113,113,0.28)'
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
            Background is always SURFACE (#141414):
             • Resting inside the field: invisible (same colour as field bg)
             • Floating above:           masks the border line cleanly       */}
        <Animated.View
          style={[styles.labelSlot, { top: labelTop }]}
          pointerEvents="none"
        >
          <Animated.Text
            numberOfLines={1}
            style={{
              fontSize:          labelFontSize,
              fontWeight:        Typography.weights.medium,
              letterSpacing:     0.3,
              color:             labelColor as any,
              backgroundColor:   SURFACE,    // static — never animated
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
              selectionColor="rgba(74,222,128,0.38)"
              // Android 10+: green caret
              cursorColor={Colors.green.DEFAULT}
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
    left:     Spacing.md - 4,
    zIndex:   10,
  },

  field: {
    flexDirection:     'row',
    alignItems:        'center',
    minHeight:         FIELD_HEIGHT,
    borderRadius:      Radius.md,
    backgroundColor:   SURFACE,        // '#141414' — explicit opaque dark
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
    color:             Colors.text.body,        // '#E2E8F0'
    fontSize:          Typography.sizes.base,
    fontWeight:        Typography.weights.regular,
    paddingVertical:   0,
    paddingHorizontal: 0,
    margin:            0,
    minHeight:         FIELD_HEIGHT - 2,
    // Transparent: inherits the field's SURFACE visually.
    // On web the global CSS + color-scheme:light ensure this sticks.
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

  helperText: { color: Colors.text.muted },
  errorText:  { color: Colors.text.error, fontWeight: Typography.weights.medium },
});

export default CustomInput;