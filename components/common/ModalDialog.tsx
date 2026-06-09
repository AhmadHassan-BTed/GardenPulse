// ─────────────────────────────────────────────────────────────────────────────
// ModalDialog.tsx — GardenPulse
// Centered card layout for confirmations, permissions, and rewards.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';
import TextLink from './TextLink';

export interface ModalDialogProps {
  /** Visibility state */
  visible: boolean;
  /** Primary title text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Optional icon or illustration node placed above the title */
  iconNode?: React.ReactNode;
  /** Primary action button config */
  primaryAction: { label: string; onPress: () => void; color?: string };
  /** Secondary text link config (e.g., "Cancel", "Not Now") */
  secondaryAction?: { label: string; onPress: () => void };
  /** Function to close the modal (triggered via backdrop tap) */
  onClose?: () => void;
  /** Prevent closing when tapping outside the modal */
  disableBackdropPress?: boolean;
  /** Outer card style override */
  style?: ViewStyle;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  visible,
  title,
  description,
  iconNode,
  primaryAction,
  secondaryAction,
  onClose,
  disableBackdropPress = false,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        backdrop: {
          flex: 1,
          backgroundColor: Colors.surface.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: Spacing.lg,
        },
        card: {
          width: '100%',
          maxWidth: 340,
          backgroundColor: Colors.surface.base,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: Colors.surface.glassBorder,
          padding: Spacing.xl,
          alignItems: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
        iconWrapper: {
          marginBottom: Spacing.md,
        },
        title: {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          textAlign: 'center',
          marginBottom: Spacing.sm,
          letterSpacing: 0.2,
        },
        description: {
          fontSize: Typography.sizes.base,
          color: Colors.text.body,
          textAlign: 'center',
          marginBottom: Spacing.lg,
          lineHeight: 22,
        },
        actions: {
          width: '100%',
          gap: Spacing.md,
        },
      }),
    [Colors, Spacing, Radius, Typography]
  );

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => !disableBackdropPress && onClose && onClose()}
        />
        <View style={[styles.card, style]}>
          {iconNode && <View style={styles.iconWrapper}>{iconNode}</View>}
          
          <Text style={styles.title}>{title}</Text>
          
          {description && <Text style={styles.description}>{description}</Text>}
          
          <View style={styles.actions}>
            <CustomButton
              label={primaryAction.label}
              onPress={primaryAction.onPress}
              fullWidth
              style={primaryAction.color ? { backgroundColor: primaryAction.color } : {}}
            />
            {secondaryAction && (
              <TextLink
                label={secondaryAction.label}
                onPress={secondaryAction.onPress}
                variant="muted"
                style={{ alignSelf: 'center', marginTop: 4 }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDialog;