// ─────────────────────────────────────────────────────────────────────────────
// NotesInput.tsx — GardenPulse
// A multi-line text block specifically with an integrated voice microphone.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import IconButton from './IconButton';
import { useTheme } from '../layout/ThemeProvider';

export interface NotesInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onMicPress: () => void;
  isRecording?: boolean;
  containerStyle?: ViewStyle;
}

const NotesInput: React.FC<NotesInputProps> = ({
  label = 'Add a quick note...',
  value,
  onChangeText,
  onMicPress,
  isRecording = false,
  containerStyle,
}) => {
  const theme = useTheme();

  return (
    <CustomInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      containerStyle={containerStyle}
      rightIcon={
        <IconButton
          name={isRecording ? 'mic-off' : 'mic'}
          size={22}
          // Flash red if actively recording, otherwise standard icon color
          color={isRecording ? theme.Colors.text.error : theme.Colors.text.muted}
          onPress={onMicPress}
        />
      }
    />
  );
};

export default NotesInput;