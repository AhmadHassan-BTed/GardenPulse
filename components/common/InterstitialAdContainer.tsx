// ─────────────────────────────────────────────────────────────────────────────
// InterstitialAdContainer.tsx — GardenPulse
// Full-screen AdMob interstitial wrapper with delayed close button.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

export interface InterstitialAdContainerProps {
  visible: boolean;
  onClose: () => void;
  countdownSeconds?: number;
  /** Actual native ad component injected here */
  children?: React.ReactNode; 
}

const InterstitialAdContainer: React.FC<InterstitialAdContainerProps> = ({
  visible,
  onClose,
  countdownSeconds = 5,
  children,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!visible) {
      setTimeLeft(countdownSeconds);
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, timeLeft, countdownSeconds]);

  const canClose = timeLeft === 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalContainer: {
          flex: 1,
          backgroundColor: '#000000', // Ads usually look best on pure black
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: Spacing.md,
          zIndex: 10,
        },
        closeButtonWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.2)',
          paddingHorizontal: Spacing.md,
          paddingVertical: 8,
          borderRadius: 20,
        },
        closeText: {
          color: '#FFFFFF',
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          marginRight: canClose ? 6 : 0,
        },
        adContentArea: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        footer: {
          alignItems: 'center',
          paddingBottom: Spacing.lg,
        },
        attributionText: {
          color: 'rgba(255,255,255,0.5)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
      }),
    [Spacing, Typography, canClose]
  );

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.modalContainer}>
        
        {/* Header with Countdown / Close */}
        <View style={styles.header}>
          <Pressable 
            style={[styles.closeButtonWrapper, { opacity: canClose ? 1 : 0.8 }]} 
            onPress={() => canClose && onClose()}
            disabled={!canClose}
          >
            <Text style={styles.closeText}>
              {canClose ? 'Skip Ad' : `Reward in ${timeLeft}`}
            </Text>
            {canClose && <Feather name="x" size={16} color="#FFFFFF" />}
          </Pressable>
        </View>

        {/* Ad Content */}
        <View style={styles.adContentArea}>
          {children ? children : (
            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>AdMob Unit Placeholder</Text>
          )}
        </View>

        {/* Footer Attribution */}
        <View style={styles.footer}>
          <Text style={styles.attributionText}>Advertisement</Text>
        </View>

      </SafeAreaView>
    </Modal>
  );
};

export default InterstitialAdContainer;