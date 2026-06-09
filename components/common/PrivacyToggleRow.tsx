// ─────────────────────────────────────────────────────────────────────────────
// PrivacyToggleRow.tsx — GardenPulse
// Icon + label + description + on/off toggle; used for granular data controls.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomSwitch from './CustomSwitch';

export interface PrivacyToggleRowProps {
  iconName: keyof typeof Feather.glyphMap;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

const PrivacyToggleRow: React.FC<PrivacyToggleRowProps> = ({
  iconName,
  label,
  description,
  value,
  onValueChange,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
        },
        iconWrapper: {
          marginRight: Spacing.md,
          alignSelf: 'flex-start',
          marginTop: 2, // Optical alignment with label text
        },
        switchWrapper: {
          flex: 1,
        },
      }),
    [Colors, Spacing]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        <Feather name={iconName} size={22} color={Colors.text.muted} />
      </View>
      
      {/* CustomSwitch natively handles the label and description layout on the left, 
          with the toggle pushed to the right, which perfectly fits this use case. */}
      <CustomSwitch
        value={value}
        onValueChange={onValueChange}
        label={label}
        description={description}
        style={styles.switchWrapper}
      />
    </View>
  );
};

export default PrivacyToggleRow;