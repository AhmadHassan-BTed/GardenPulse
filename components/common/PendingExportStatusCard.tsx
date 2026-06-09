import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

const PendingExportStatusCard = () => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ backgroundColor: '#3B82F615', borderColor: '#3B82F640', borderWidth: 1, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 }}>
        <Feather name="loader" size={16} color="#3B82F6" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>Preparing Export...</Text>
      </View>
      <Text style={{ fontSize: 12, color: Colors.text.body, lineHeight: 18 }}>Your data export is being generated. We will notify you when it's ready to download (usually within 24 hours).</Text>
    </CustomCard>
  );
};

export default PendingExportStatusCard;
