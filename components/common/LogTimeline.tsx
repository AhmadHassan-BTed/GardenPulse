// ─────────────────────────────────────────────────────────────────────────────
// LogTimeline.tsx — GardenPulse
// Vertical timeline container rendering a list of LogTimelineEntry components.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LogTimelineEntry, { LogTimelineEntryProps } from './LogTimelineEntry';
import CustomButton from './CustomButton';
import { useTheme } from '../layout/ThemeProvider';

export interface LogTimelineProps {
  entries: LogTimelineEntryProps[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  style?: ViewStyle;
}

const LogTimeline: React.FC<LogTimelineProps> = ({
  entries,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={style}>
      {entries.map((entry, index) => (
        <LogTimelineEntry
          key={entry.id}
          {...entry}
          isLast={index === entries.length - 1 && !hasMore}
        />
      ))}
      
      {hasMore && (
        <View style={styles.loadMoreContainer}>
          <CustomButton 
            label="Load More" 
            variant="ghost" 
            onPress={onLoadMore} 
            isLoading={isLoadingMore}
            labelStyle={{ color: theme.Colors.green.DEFAULT }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadMoreContainer: {
    paddingLeft: 40, // Aligns with the content column of the timeline
    marginTop: 8,
  },
});

export default LogTimeline;