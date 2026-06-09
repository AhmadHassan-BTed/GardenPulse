// ─────────────────────────────────────────────────────────────────────────────
// SwipeableRow.tsx — GardenPulse
// Swipe-left-to-reveal action wrapper: Archive + Quick Log actions.
// Used in SCR-02 and SCR-07.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface SwipeableRowProps {
  /** The content to display before swiping */
  children: React.ReactNode;
  /** Callback when the user swipes to reveal actions */
  onReveal?: () => void;
  /** Callback for the archive action */
  onArchive?: () => void;
  /** Callback for the quick-log action */
  onQuickLog?: () => void;
  /** Outer style override */
  style?: ViewStyle;
}

const ACTION_WIDTH = 72;

const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  onArchive,
  onQuickLog,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const translateX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_, gestureState) => {
          const newVal = Math.min(0, Math.max(-ACTION_WIDTH * 2, gestureState.dx + lastOffset.current));
          translateX.setValue(newVal);
        },
        onPanResponderRelease: (_, gestureState) => {
          let finalValue = gestureState.dx + lastOffset.current;
          if (finalValue < -ACTION_WIDTH) {
            finalValue = -ACTION_WIDTH * 2;
          } else {
            finalValue = 0;
          }
          lastOffset.current = finalValue;
          Animated.spring(translateX, {
            toValue: finalValue,
            useNativeDriver: true,
          }).start();
        },
      }),
    [translateX],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          overflow: 'hidden',
        },
        actionsContainer: {
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          flexDirection: 'row',
        },
        actionButton: {
          width: ACTION_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          gap: Spacing.xs,
        },
        actionText: {
          fontSize: Typography.sizes.xs,
          color: '#FFFFFF',
          fontWeight: Typography.weights.medium,
        },
      }),
    [Colors, Spacing, Radius, Typography],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.actionsContainer}>
        <View
          style={[styles.actionButton, { backgroundColor: Colors.green.DEFAULT }]}
        >
          <Feather name="check-circle" size={18} color="#FFFFFF" />
          <Text style={styles.actionText}>Log</Text>
        </View>
        <View
          style={[styles.actionButton, { backgroundColor: Colors.text.error }]}
        >
          <Feather name="archive" size={18} color="#FFFFFF" />
          <Text style={styles.actionText}>Archive</Text>
        </View>
      </View>
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default SwipeableRow;