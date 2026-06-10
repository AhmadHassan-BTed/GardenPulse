import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import CameraViewfinder from '../../components/common/CameraViewfinder';
import { QRSuccessCard } from '../../components/common/OnboardingAndModals';

export default function QRScannerModal() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  const [scannedProduct, setScannedProduct] = useState<any | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);

  const handleCapture = () => {
    // Simulate successful QR code detection
    setScannedProduct({
      name: 'FloraNova Bloom 4-8-7',
      brand: 'General Hydroponics',
      type: 'Liquid Fertilizer Concentrate',
    });
  };

  const handleScanAnother = () => {
    setScannedProduct(null);
  };

  return (
    <ScreenWrapper scrollable={false} withPadding={false}>
      <CustomHeader 
        title="QR Scanner" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={styles.container}>
        {scannedProduct ? (
          <View style={{ padding: Spacing.lg }}>
            <QRSuccessCard
              name={scannedProduct.name}
              brand={scannedProduct.brand}
              type={scannedProduct.type}
              onScanAnother={handleScanAnother}
            />
          </View>
        ) : (
          <CameraViewfinder
            mode="barcode"
            instructionLabel="Point your camera at a GardenPulse QR code or fertilizer label"
            onClose={() => router.back()}
            onToggleFlash={() => setIsFlashOn(!isFlashOn)}
            isFlashOn={isFlashOn}
            onCapture={handleCapture}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});