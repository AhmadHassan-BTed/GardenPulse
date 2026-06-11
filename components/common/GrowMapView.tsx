// ─────────────────────────────────────────────────────────────────────────────
// GrowMapView.tsx — GardenPulse
// Interactive map with zone overlays, success dots, and cluster popups.
// Note: Requires `react-native-maps` (Run: npx expo install react-native-maps)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import MapView, { Marker, Polygon } from 'react-native-maps'; // Uncomment when installed
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import ZoneBadge from './ZoneBadge';

export interface MapMarkerData {
  id: string;
  coordinate: { latitude: number; longitude: number };
  successRate: number;
  plantName: string;
}

export interface GrowMapViewProps {
  markers: MapMarkerData[];
  currentZone: string;
  city: string;
  totalTracked: number;
  popularPlant: string;
  onMarkerPress: (marker: MapMarkerData) => void;
  onLayerTogglePress: () => void;
  style?: ViewStyle;
}

const GrowMapView: React.FC<GrowMapViewProps> = ({
  markers,
  currentZone,
  city,
  totalTracked,
  popularPlant,
  onMarkerPress,
  onLayerTogglePress,
  style,
}) => {
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          borderRadius: Radius.lg,
          overflow: 'hidden',
          backgroundColor: Colors.surface.elevated, // Fallback if map doesn't load
          ...style,
        },
        mapPlaceholder: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E5E7EB',
        },
        controlsOverlay: {
          position: 'absolute',
          top: Spacing.md,
          right: Spacing.md,
          gap: Spacing.sm,
        },
        iconButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: Colors.surface.base,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        statsStrip: {
          position: 'absolute',
          bottom: Spacing.md,
          left: Spacing.md,
          right: Spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        statsTextWrapper: {
          flex: 1,
          marginRight: Spacing.sm,
        },
        statsPrimary: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
          marginBottom: 2,
        },
        statsSecondary: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
        },
      }),
    [Colors, Spacing, Radius, Typography, style]
  );

  return (
    <View style={styles.container}>
      {/* 
        <MapView style={StyleSheet.absoluteFillObject} initialRegion={{...}}>
          {markers.map(m => (
            <Marker key={m.id} coordinate={m.coordinate} onPress={() => onMarkerPress(m)}>
               <View style={{ backgroundColor: Colors.green.DEFAULT, borderRadius: 10, padding: 4 }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>{m.successRate}%</Text>
               </View>
            </Marker>
          ))}
        </MapView>
      */}
      {city === 'Location Access Required' ? (
        <View style={styles.mapPlaceholder}>
          <Feather name="map-pin" size={48} color={Colors.text.muted} />
          <Text style={{ color: Colors.text.heading, fontWeight: 'bold', marginTop: 12 }}>Location Access Required</Text>
          <Text style={{ color: Colors.text.muted, marginTop: 4, textAlign: 'center', paddingHorizontal: Spacing.lg }}>
            Please enable location services in your device settings to view local growth data.
          </Text>
        </View>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Feather name="map" size={48} color={Colors.text.muted} />
          <Text style={{ color: Colors.text.muted, marginTop: 8 }}>Map View Active</Text>
        </View>
      )}

      {/* Floating Controls */}
      <View style={styles.controlsOverlay}>
        <Pressable style={styles.iconButton} onPress={onLayerTogglePress}>
          <Feather name="layers" size={20} color={Colors.text.heading} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Feather name="crosshair" size={20} color={Colors.text.heading} />
        </Pressable>
      </View>

      {/* Bottom Stats Strip (MapStatsStrip) */}
      {city !== 'Location Access Required' && (
        <CustomCard variant="default" padding={Spacing.md} style={styles.statsStrip}>
          <View style={styles.statsTextWrapper}>
            <Text style={styles.statsPrimary}>{totalTracked} plants tracked in {city}</Text>
            <Text style={styles.statsSecondary}>Most popular: {popularPlant}</Text>
          </View>
          <ZoneBadge zone={currentZone} style={{ backgroundColor: `${Colors.green.DEFAULT}15` }} />
        </CustomCard>
      )}
    </View>
  );
};

export default GrowMapView;