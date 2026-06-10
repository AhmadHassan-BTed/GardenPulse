import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import CustomText from '../../components/common/CustomText';

export default function BatchModeSheet() {
  const router = useRouter();
  const theme = useTheme();
  const { Spacing } = theme;

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="Batch Mode"
        showBack={true}
        onBack={() => router.back()}
      />
      <View style={styles.container}>
        <CustomText variant="heading" size="xl" style={{ marginBottom: Spacing.sm }}>
          Batch Mode
        </CustomText>
        <CustomText variant="muted" size="base" style={{ textAlign: 'center' }}>
          Batch care logging for multiple plants
        </CustomText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
});