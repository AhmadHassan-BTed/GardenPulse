import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import GrowMapView, { MapMarkerData } from '../../../components/common/GrowMapView';
import MapLayerToggleSheet from '../../../components/common/MapLayerToggleSheet';
import { MapClusterPopupCard, PrivacyFooter } from '../../../components/common/InsightAndMapCards';
import BottomSheetModal from '../../../components/common/BottomSheetModal';

const mockMarkers: MapMarkerData[] = [
  { id: '1', coordinate: { latitude: 40.7128, longitude: -74.0060 }, successRate: 94, plantName: 'Monstera Deliciosa' },
  { id: '2', coordinate: { latitude: 40.7282, longitude: -73.7949 }, successRate: 88, plantName: 'Fiddle Leaf Fig' },
  { id: '3', coordinate: { latitude: 40.7589, longitude: -73.9851 }, successRate: 92, plantName: 'Sweet Basil' },
  { id: '4', coordinate: { latitude: 40.7178, longitude: -74.0431 }, successRate: 85, plantName: 'Roma Tomato' },
  { id: '5', coordinate: { latitude: 40.7440, longitude: -74.0323 }, successRate: 79, plantName: 'Rainbow Chard' },
];

const plantTips: Record<string, string> = {
  'Monstera Deliciosa': 'Prefers bright indirect light. Water when the top 2 inches of soil are dry. Mist leaves occasionally.',
  'Fiddle Leaf Fig': 'Requires consistent bright light. Rotate the plant weekly to ensure even growth. Avoid drafts.',
  'Sweet Basil': 'Keep soil moist and feed with balanced liquid fertilizer. Pinch off flowers to encourage leaf production.',
  'Roma Tomato': 'Needs at least 6-8 hours of direct sun. Use heavy tomato cage or trellis. Keep watering consistent to prevent rot.',
  'Rainbow Chard': 'Harvest outer leaves regularly. Prefers cool temperatures but tolerates light frost and heat well.',
};

export default function LocalGrowMapScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null);
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  const handleMarkerPress = (marker: MapMarkerData) => {
    setSelectedMarker(marker);
  };

  const handleLayerToggle = () => {
    setIsLayersOpen(true);
  };

  const handleGrowPlant = () => {
    setSelectedMarker(null);
    router.push('/modals/add-plant');
  };

  return (
    <ScreenWrapper scrollable={false} withPadding={false}>
      <CustomHeader title="Local Grow Map" />
      
      <View style={styles.container}>
        <GrowMapView
          markers={mockMarkers}
          currentZone="6b"
          city="New York, NY"
          totalTracked={1248}
          popularPlant="Monstera Deliciosa"
          onMarkerPress={handleMarkerPress}
          onLayerTogglePress={handleLayerToggle}
          style={{ flex: 1 }}
        />
        <PrivacyFooter />
      </View>

      {/* Layer Toggle Sheet */}
      <BottomSheetModal
        visible={isLayersOpen}
        onClose={() => setIsLayersOpen(false)}
        title="Map Settings"
      >
        <MapLayerToggleSheet />
      </BottomSheetModal>

      {/* Selected Marker Popup / Info Sheet */}
      <BottomSheetModal
        visible={selectedMarker !== null}
        onClose={() => setSelectedMarker(null)}
        title="Grow Insight"
      >
        {selectedMarker && (
          <MapClusterPopupCard
            cropName={selectedMarker.plantName}
            stats={`Average Success Rate: ${selectedMarker.successRate}%`}
            tip={plantTips[selectedMarker.plantName] || 'Grows best with standard care.'}
            onGrow={handleGrowPlant}
          />
        )}
      </BottomSheetModal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
