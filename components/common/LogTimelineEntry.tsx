// ─────────────────────────────────────────────────────────────────────────────
// LogTimelineEntry.tsx — GardenPulse
// Single timeline row: thumbnail + timestamp + activity chips + metric values.
// Expandable to show full details, notes, and voice note playback.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, LayoutAnimation, ViewStyle, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import IconButton from './IconButton';

export interface TimelineActivity {
  id: string;
  label: string; // e.g., "Water", "Feed", "Prune"
  color: string;
}

export interface LogTimelineEntryProps {
  id: string;
  timestamp: string; // e.g., "Today, 10:30 AM" or "Oct 12, 2026"
  imageUrl?: string;
  activities: TimelineActivity[];
  metrics?: string[]; // e.g., ["pH 6.2", "Moisture 45%"]
  notes?: string;
  hasVoiceNote?: boolean;
  isLast?: boolean; // If true, hides the connecting timeline tail
  style?: ViewStyle;
}

const LogTimelineEntry: React.FC<LogTimelineEntryProps> = ({
  timestamp,
  imageUrl,
  activities,
  metrics,
  notes,
  hasVoiceNote,
  isLast = false,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const { Colors, Spacing, Radius, Typography } = theme;
  const isDark = theme.scheme === 'dark';

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          marginBottom: 0,
        },
        timelineColumn: {
          width: 40,
          alignItems: 'center',
        },
        dot: {
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: Colors.surface.base,
          borderWidth: 3,
          borderColor: Colors.green.DEFAULT,
          marginTop: 24, // Aligns with the card visual center
          zIndex: 2,
        },
        tail: {
          position: 'absolute',
          top: 40,
          bottom: -Spacing.lg, // <--- Change this from 0 to -Spacing.lg
          width: 2,
          backgroundColor: Colors.border.subtle,
          zIndex: 1,
        },
        contentColumn: {
          flex: 1,
          paddingBottom: Spacing.lg,
        },
        cardContent: {
          flexDirection: 'column',
          gap: Spacing.sm,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        timestamp: {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.bold,
          color: Colors.text.heading,
        },
        mainRow: {
          flexDirection: 'row',
          gap: Spacing.md,
        },
        thumbnail: {
          width: 64,
          height: 64,
          borderRadius: Radius.md,
          backgroundColor: isDark ? Colors.surface.elevated : '#F3F4F6',
        },
        infoStack: {
          flex: 1,
          justifyContent: 'center',
          gap: Spacing.xs,
        },
        chipRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 6,
        },
        activityChip: {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: Radius.sm,
        },
        activityText: {
          fontSize: 10,
          fontWeight: Typography.weights.bold,
          textTransform: 'uppercase',
        },
        metricsText: {
          fontSize: Typography.sizes.xs,
          color: Colors.text.muted,
          marginTop: 2,
        },
        expandedArea: {
          marginTop: Spacing.md,
          paddingTop: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: Colors.border.subtle,
        },
        expandedImage: {
          width: '100%',
          height: 200,
          borderRadius: Radius.md,
          marginBottom: Spacing.md,
        },
        notesBox: {
          backgroundColor: isDark ? Colors.surface.elevated : '#F9FAFB',
          padding: Spacing.md,
          borderRadius: Radius.md,
          marginBottom: hasVoiceNote ? Spacing.sm : 0,
        },
        notesText: {
          fontSize: Typography.sizes.sm,
          color: Colors.text.body,
          fontStyle: 'italic',
          lineHeight: 20,
        },
        voiceNoteCard: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${Colors.green.DEFAULT}15`,
          padding: Spacing.sm,
          borderRadius: Radius.full,
          gap: Spacing.sm,
        },
        voiceWaveformPlaceholder: {
          flex: 1,
          height: 24,
          opacity: 0.6,
        },
      }),
    [Colors, Spacing, Radius, Typography, isDark, hasVoiceNote]
  );

  return (
    <View style={[styles.container, style]}>
      {/* Vertical Timeline Axis */}
      <View style={styles.timelineColumn}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.tail} />}
      </View>

      {/* Entry Content */}
      <View style={styles.contentColumn}>
        <Pressable onPress={toggleExpand}>
          <CustomCard variant="default" padding={Spacing.md}>
            <View style={styles.cardContent}>
              <View style={styles.headerRow}>
                <Text style={styles.timestamp}>{timestamp}</Text>
                <Feather 
                  name={expanded ? 'chevron-up' : 'chevron-down'} 
                  size={18} 
                  color={Colors.text.muted} 
                />
              </View>

              <View style={styles.mainRow}>
                {imageUrl && !expanded && (
                  <Image source={{ uri: imageUrl }} style={styles.thumbnail} resizeMode="cover" />
                )}
                
                <View style={styles.infoStack}>
                  <View style={styles.chipRow}>
                    {activities.map((act) => (
                      <View key={act.id} style={[styles.activityChip, { backgroundColor: `${act.color}20` }]}>
                        <Text style={[styles.activityText, { color: act.color }]}>{act.label}</Text>
                      </View>
                    ))}
                  </View>
                  {metrics && metrics.length > 0 && (
                    <Text style={styles.metricsText}>{metrics.join(' • ')}</Text>
                  )}
                </View>
              </View>

              {/* Expanded Detail View */}
              {expanded && (
                <View style={styles.expandedArea}>
                  {imageUrl && (
                    <Image source={{ uri: imageUrl }} style={styles.expandedImage} resizeMode="cover" />
                  )}
                  {notes && (
                    <View style={styles.notesBox}>
                      <Text style={styles.notesText}>"{notes}"</Text>
                    </View>
                  )}
                  {hasVoiceNote && (
                    <View style={styles.voiceNoteCard}>
                      <IconButton 
                        name="play" 
                        size={16} 
                        color={Colors.green.DEFAULT} 
                        onPress={() => {
                          Alert.alert('Playback', 'Voice notes playback requires expo-av and native audio hardware permission.');
                        }} 
                        filled 
                      />
                      {/* Visual placeholder for an audio waveform */}
                      <Image 
                        source={require('../../assets/waveform-placeholder.png')} // Replace with your asset/SVG
                        style={styles.voiceWaveformPlaceholder}
                        resizeMode="stretch"
                      />
                      <Text style={{ fontSize: 12, color: Colors.green.DEFAULT, fontWeight: 'bold', marginRight: 12 }}>0:14</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </CustomCard>
        </Pressable>
      </View>
    </View>
  );
};

export default LogTimelineEntry;