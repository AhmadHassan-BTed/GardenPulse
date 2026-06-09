// ─────────────────────────────────────────────────────────────────────────────
// VideoPlayer.tsx — GardenPulse
// Full-screen player with auto-play, custom overlay, branding, and controls.
// Note: Requires `expo-av` (Run: npx expo install expo-av)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { Video, ResizeMode } from 'expo-av'; // Uncomment when installed
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../layout/ThemeProvider';

export interface VideoPlayerProps {
  videoUrl: string;
  plantName: string;
  methodTag: string;
  onClose: () => void;
  onShare: () => void;
  onDownload: () => void;
  style?: ViewStyle;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  plantName,
  methodTag,
  onClose,
  onShare,
  onDownload,
  style,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { Colors, Spacing, Radius, Typography } = theme;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000000',
          zIndex: 999,
          ...style,
        },
        videoElement: {
          ...StyleSheet.absoluteFillObject,
        },
        videoPlaceholder: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111',
        },
        overlayTop: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Spacing.lg,
          paddingTop: Math.max(insets.top, Spacing.lg),
          zIndex: 10,
        },
        overlayBottom: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: Spacing.lg,
          paddingBottom: Math.max(insets.bottom, Spacing.lg),
          paddingTop: Spacing.xl * 2, // Gradient space
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 10,
        },
        iconButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        infoStack: {
          flex: 1,
          marginRight: Spacing.lg,
        },
        plantName: {
          color: '#FFFFFF',
          fontSize: Typography.sizes.xl,
          fontWeight: Typography.weights.bold,
          marginBottom: 4,
          textShadowColor: 'rgba(0,0,0,0.5)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 4,
        },
        methodChip: {
          alignSelf: 'flex-start',
          backgroundColor: Colors.green.DEFAULT,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: Radius.sm,
          marginBottom: Spacing.sm,
        },
        methodText: {
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          textTransform: 'uppercase',
        },
        watermark: {
          color: 'rgba(255,255,255,0.7)',
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.bold,
        },
        actionStack: {
          gap: Spacing.md,
        },
        actionButton: {
          alignItems: 'center',
          gap: 4,
        },
        actionText: {
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: Typography.weights.bold,
        },
      }),
    [Colors, Spacing, Radius, Typography, insets, style]
  );

  return (
    <View style={styles.container}>
      {/* 
      <Video
        source={{ uri: videoUrl }}
        style={styles.videoElement}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        isMuted={isMuted}
        isLooping
      /> 
      */}
      <Pressable 
        style={styles.videoPlaceholder} 
        onPress={() => setIsPlaying(!isPlaying)}
      >
        <Feather name={isPlaying ? "pause-circle" : "play-circle"} size={64} color="rgba(255,255,255,0.3)" />
      </Pressable>

      <View style={styles.overlayTop} pointerEvents="box-none">
        <Pressable style={styles.iconButton} onPress={onClose}>
          <Feather name="x" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => setIsMuted(!isMuted)}>
          <Feather name={isMuted ? "volume-x" : "volume-2"} size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.overlayBottom} pointerEvents="box-none">
        <View style={styles.infoStack}>
          <View style={styles.methodChip}>
            <Text style={styles.methodText}>{methodTag}</Text>
          </View>
          <Text style={styles.plantName}>{plantName}</Text>
          <Text style={styles.watermark}>GardenPulse Timelapse</Text>
        </View>

        <View style={styles.actionStack}>
          <Pressable style={styles.actionButton} onPress={onDownload}>
            <View style={styles.iconButton}>
              <Feather name="download" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Save</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onShare}>
            <View style={styles.iconButton}>
              <Feather name="share-2" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default VideoPlayer;