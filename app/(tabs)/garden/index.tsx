import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { useGardenStore } from '../../../store/useGardenStore';
import IconButton from '../../../components/common/IconButton';
import FilterChip from '../../../components/common/FilterChip';
import CustomInput from '../../../components/common/CustomInput';
import GridListToggle from '../../../components/common/GridListToggle';
import PlantCard from '../../../components/common/PlantCard';
import EmptyStateView from '../../../components/common/EmptyStateView';
import Checkbox from '../../../components/common/Checkbox';
import FAB from '../../../components/common/FAB';
import BatchModeHeader from '../../../components/common/BatchModeHeader';
import BatchActionBar from '../../../components/common/BatchActionBar';
import { Plant } from '../../../types';

export default function PlantListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storePlants = useGardenStore((state) => state.plants);
  const updatePlant = useGardenStore((state) => state.updatePlant);
  const archivePlant = useGardenStore((state) => state.archivePlant);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isGrid, setIsGrid] = useState(false);
  
  // Batch Mode States
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isHydrated) {
    return null;
  }

  const activePlants = (storePlants || []).filter((p) => !p.isArchived);

  // Filter & Search Logic
  const filteredPlants = useMemo(() => {
    return activePlants.filter((plant) => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (plant.nickname && plant.nickname.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === 'All' || plant.method.toLowerCase() === activeFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [activePlants, searchQuery, activeFilter]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredPlants.length) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(filteredPlants.map(p => p.id)); // Select all shown
    }
  };

  const handleCancelBatch = () => {
    setIsBatchMode(false);
    setSelectedIds([]);
  };

  const handleBatchWater = () => {
    selectedIds.forEach((id) => {
      updatePlant(id, { lastLoggedDays: 0, healthStatus: 'healthy' });
    });
    handleCancelBatch();
  };

  const handleBatchFeed = () => {
    selectedIds.forEach((id) => {
      updatePlant(id, { lastLoggedDays: 0 });
    });
    handleCancelBatch();
  };

  const handleBatchLog = () => {
    router.push('/modals/quick-log');
    handleCancelBatch();
  };

  const handleBatchArchive = () => {
    selectedIds.forEach((id) => {
      archivePlant(id, 'Batch Archived');
    });
    handleCancelBatch();
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      {isBatchMode ? (
        <BatchModeHeader
          count={selectedIds.length}
          onSelectAll={handleSelectAll}
          onCancel={handleCancelBatch}
        />
      ) : (
        <CustomHeader
          title="My Garden"
          rightNode={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
              <IconButton
                name={isBatchMode ? "x" : "check-square"}
                size={20}
                color={Colors.text.heading}
                onPress={() => setIsBatchMode(!isBatchMode)}
              />
              <IconButton
                name="plus"
                size={20}
                color={Colors.text.heading}
                onPress={() => router.push('/modals/add-plant')}
              />
            </View>
          }
        />
      )}

      <View style={{ gap: Spacing.md, paddingBottom: Spacing.xl + 80 }}>
        {/* Filters and Search Row (only in normal mode) */}
        {!isBatchMode && (
          <View style={{ gap: Spacing.sm }}>
            <CustomInput
              label="Search your plants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
                {['All', 'Soil', 'Container', 'Hydro', 'Indoor'].map((f) => (
                  <FilterChip
                    key={f}
                    label={f}
                    isSelected={activeFilter === f}
                    onPress={() => setActiveFilter(f)}
                  />
                ))}
              </ScrollView>
              
              <GridListToggle isGrid={isGrid} onToggle={setIsGrid} style={{ marginLeft: Spacing.sm }} />
            </View>
          </View>
        )}

        {/* Plant Cards Layout */}
        {filteredPlants.length > 0 ? (
          <View style={isGrid ? { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs } : { gap: Spacing.sm }}>
            {(filteredPlants || []).map((plant) => (
              <View 
                key={plant.id} 
                style={[
                  { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
                  isGrid && { width: '48%' }
                ]}
              >
                {isBatchMode && (
                  <Checkbox
                    value={selectedIds.includes(plant.id)}
                    onValueChange={() => handleToggleSelect(plant.id)}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <PlantCard
                    name={plant.name}
                    nickname={plant.nickname}
                    method={plant.method}
                    healthStatus={plant.healthStatus}
                    lastLoggedDays={plant.lastLoggedDays}
                    isGrid={isGrid}
                    onPress={() => {
                      if (isBatchMode) {
                        handleToggleSelect(plant.id);
                      } else {
                        router.push(`/(tabs)/garden/plant/${plant.id}`);
                      }
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <EmptyStateView
            title={searchQuery ? "No search results" : "No plants yet"}
            description={searchQuery ? "Try searching for another species or nickname." : "Start building your garden by adding your first plant!"}
            iconName="heart"
            actionLabel="Add Your First Plant"
            onActionPress={() => router.push('/modals/add-plant')}
          />
        )}
      </View>

      {/* FAB - Trigger MOD-01 Quick Log Sheet */}
      {!isBatchMode && (
        <FAB onPress={() => router.push('/modals/quick-log')} iconName="plus" />
      )}

      {/* Floating Batch Mode Action Bar */}
      {isBatchMode && selectedIds.length > 0 && (
        <BatchActionBar
          selectedCount={selectedIds.length}
          onWaterAll={handleBatchWater}
          onFeedAll={handleBatchFeed}
          onLogEntry={handleBatchLog}
          onArchive={handleBatchArchive}
        />
      )}
    </ScreenWrapper>
  );
}