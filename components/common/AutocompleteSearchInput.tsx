// ─────────────────────────────────────────────────────────────────────────────
// AutocompleteSearchInput.tsx — GardenPulse
// Wraps your existing CustomInput to provide a floating, absolute-positioned
// dropdown menu for plant database queries or other search filters.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ViewStyle, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomInput, { CustomInputProps } from './CustomInput';
import { useTheme } from '../layout/ThemeProvider';

export interface AutocompleteSearchInputProps extends CustomInputProps {
  /** Array of string suggestions */
  data: string[];
  /** Callback when a suggestion is tapped */
  onSelect: (item: string) => void;
  /** Max height of the dropdown menu */
  dropdownHeight?: number;
  /** Outer container style */
  containerStyle?: ViewStyle;
}

const AutocompleteSearchInput: React.FC<AutocompleteSearchInputProps> = ({
  data,
  onSelect,
  value = '',
  onChangeText,
  dropdownHeight = 200,
  containerStyle,
  ...rest
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const [isFocused, setIsFocused] = useState(false);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!value) return [];
    return data.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
  }, [data, value]);

  const showDropdown = isFocused && filteredData.length > 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'relative',
          zIndex: 100, // Ensure dropdown floats above other elements
          ...containerStyle,
        },
        dropdown: {
          position: 'absolute',
          top: 76, // Height of the input field + padding
          left: 0,
          right: 0,
          maxHeight: dropdownHeight,
          backgroundColor: Colors.surface.elevated,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          overflow: 'hidden',
          zIndex: 101,
        },
        item: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: Spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
        },
        itemText: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          marginLeft: Spacing.sm,
        },
      }),
    [Colors, Spacing, Radius, Typography, dropdownHeight, containerStyle]
  );

  return (
    <View style={styles.container}>
      <CustomInput
        value={value}
        onChangeText={onChangeText}
        onFocus={(e) => {
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
          }
          setIsFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
          }
          blurTimeoutRef.current = setTimeout(() => {
            setIsFocused(false);
            blurTimeoutRef.current = null;
          }, 150);
          rest.onBlur?.(e);
        }}
        leftIcon={<Feather name="search" size={20} color={Colors.text.muted} />}
        {...rest}
      />

      {showDropdown && (
        <View style={styles.dropdown}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {filteredData.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { backgroundColor: Colors.surface.glass },
                ]}
                onPress={() => {
                  onSelect(item);
                  Keyboard.dismiss();
                  setIsFocused(false);
                }}
              >
                <Feather name="corner-down-right" size={16} color={Colors.green.DEFAULT} />
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AutocompleteSearchInput;