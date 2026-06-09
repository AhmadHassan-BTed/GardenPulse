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

// ── Prop Interface ────────────────────────────────────────────────────────────
export interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  value?: string;
  onChangeText?: (text: string) => void;
}

// ── Layout constants ──────────────────────────────────────────────────────────
const FIELD_HEIGHT       = 56;
const LABEL_RESTING_TOP  = 18;
const LABEL_FLOATING_TOP = -9;
const LABEL_RESTING_X    = 0;
const LABEL_FLOATING_X   = 4;
const ANIM_MS            = 200;

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
      outputRange: [theme.Typography.sizes.base, theme.Typography.sizes.xs],
    });

    const labelColor = error
      ? theme.Colors.text.error
      : anim.interpolate({
          inputRange:  [0, 1],
          outputRange: [theme.Colors.text.muted, theme.Colors.green.DEFAULT],
        });

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

    const webInputStyle: any =
      Platform.OS === 'web'
        ? { outlineWidth: 0, outlineStyle: 'none', backgroundColor: 'transparent' }
        : {};

    // ── THE FIX: Defeat Chrome/WebKit Autofill Background ─────────────────
    const WebAutofillHack = Platform.OS === 'web' ? (
      <style dangerouslySetInnerHTML={{
        __html: `
          [data-gpulseinput="true"]:-webkit-autofill,
          [data-gpulseinput="true"]:-webkit-autofill:hover, 
          [data-gpulseinput="true"]:-webkit-autofill:focus, 
          [data-gpulseinput="true"]:-webkit-autofill:active {
            -webkit-transition: background-color 9999s ease-in-out 0s;
            transition: background-color 9999s ease-in-out 0s;
            -webkit-text-fill-color: ${theme.Colors.text.body} !important;
          }
        `
      }} />
    ) : null;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {WebAutofillHack}

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
              fontWeight:        theme.Typography.weights.medium,
              letterSpacing:     0.3,
              color:             labelColor as any,
              backgroundColor:   labelBg as any,
              paddingHorizontal: 4,
            }}
          >
            {label}
          </Animated.Text>
        </Animated.View>

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
              underlineColorAndroid="transparent"
              selectionColor={isDark ? 'rgba(52,211,153,0.38)' : 'rgba(74,222,128,0.38)'}
              cursorColor={theme.Colors.green.DEFAULT}
              placeholderTextColor="transparent"
              {...(Platform.OS === 'web' ? { dataSet: { gpulseInput: 'true' } } : {})}
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
          <Text style={[styles.subText, error ? { color: theme.Colors.text.error, fontWeight: '500' } : { color: theme.Colors.text.muted }]}>
            {error ?? helperText}
          </Text>
        )}
      </View>
    );
  },
);

CustomInput.displayName = 'CustomInput';

const styles = StyleSheet.create({
  wrapper: { paddingTop: 14, marginBottom: 16 },
  labelSlot: { position: 'absolute', zIndex: 10 },
  field: { flexDirection: 'row', alignItems: 'center', minHeight: FIELD_HEIGHT, borderRadius: 12, paddingHorizontal: 16 },
  leftIconWrap: { marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  rightIconWrap: { marginLeft: 12, justifyContent: 'center', alignItems: 'center' },
  inputArea: { flex: 1, justifyContent: 'center' },
  inputAreaMultiline: { paddingTop: 12, paddingBottom: 12 },
  input: { fontSize: 16, paddingVertical: 0, paddingHorizontal: 0, margin: 0, minHeight: FIELD_HEIGHT - 2, backgroundColor: 'transparent' },
  inputMultiline: { minHeight: 100, textAlignVertical: 'top' },
  subText: { marginTop: 4, marginLeft: 4, fontSize: 12, lineHeight: 16 },
});

export default CustomInput;