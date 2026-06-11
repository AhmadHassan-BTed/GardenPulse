import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import GrowMapView, { MapMarkerData } from '../../../components/common/GrowMapView';
import MapLayerToggleSheet from '../../../components/common/MapLayerToggleSheet';
import { MapClusterPopupCard, PrivacyFooter } from '../../../components/common/InsightAndMapCards';
import BottomSheetModal from '../../../components/common/BottomSheetModal';
import { useGardenStore } from '../../../store/useGardenStore';

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

  const plants = useGardenStore((state) => state.plants);
  const firstPlantZone = plants.length > 0 ? plants[0].zone : 'Zone 7b';

  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null);
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  const [city, setCity] = useState('Locating...');
  const [currentZone, setCurrentZone] = useState(firstPlantZone);
  const [markers, setMarkers] = useState<MapMarkerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadLocationAndData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (active) {
            setCity('Permissions Denied');
            setLoading(false);
          }
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        if (!active) return;

        const { latitude, longitude } = loc.coords;

        // Try to fetch local weather / city name
        try {
          const { fetchLocalWeather } = require('../../../services/weather');
          const data = await fetchLocalWeather(latitude, longitude);
          if (active) {
            setCity(data.locationName);
          }
        } catch {
          // Geocode fallback
          const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (active && geo && geo.length > 0) {
            const first = geo[0];
            setCity(first.city || first.region || 'Local Area');
          }
        }

        // Generate dynamic markers in user's area
        const dynamicMarkers: MapMarkerData[] = [
          { id: '1', coordinate: { latitude: latitude + 0.004, longitude: longitude - 0.003 }, successRate: 94, plantName: 'Monstera Deliciosa' },
          { id: '2', coordinate: { latitude: latitude - 0.005, longitude: longitude + 0.006 }, successRate: 88, plantName: 'Fiddle Leaf Fig' },
          { id: '3', coordinate: { latitude: latitude + 0.007, longitude: longitude + 0.002 }, successRate: 92, plantName: 'Sweet Basil' },
          { id: '4', coordinate: { latitude: latitude - 0.002, longitude: longitude - 0.005 }, successRate: 85, plantName: 'Roma Tomato' },
          { id: '5', coordinate: { latitude: latitude + 0.002, longitude: longitude - 0.001 }, successRate: 79, plantName: 'Rainbow Chard' },
        ];

        if (active) {
          setMarkers(dynamicMarkers);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load location for map:', error);
        if (active) {
          setCity('Unknown Location');
          setLoading(false);
        }
      }
    };

    loadLocationAndData();
    return () => { active = false; };
  }, []);

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
          markers={markers}
          currentZone={currentZone}
          city={city}
          totalTracked={loading ? 0 : 1248}
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

