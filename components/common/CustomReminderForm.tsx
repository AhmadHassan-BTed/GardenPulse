import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import FilterChip from './FilterChip';
import { TaskType } from './TaskCard';

export interface CustomReminderFormProps {
  plants: { id: string; name: string }[];
  onSave: (task: { plantId: string; plantName: string; taskType: TaskType; dueDate: string }) => void;
}

const CustomReminderForm: React.FC<CustomReminderFormProps> = ({ plants, onSave }) => {
  const { Colors, Spacing, Typography } = useTheme();
  
  const [selectedPlantId, setSelectedPlantId] = useState<string>(plants[0]?.id || '');
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>('Check');

  const handleSave = () => {
    const selectedPlant = plants.find(p => p.id === selectedPlantId);
    if (!selectedPlant) return;
    onSave({
      plantId: selectedPlantId,
      plantName: selectedPlant.name,
      taskType: selectedTaskType,
      dueDate: new Date().toISOString(), // Due today
    });
  };

  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.sm }}>
        New Custom Reminder
      </Text>
      
      <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, marginBottom: 6 }}>
        Select Plant
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.sm }}>
        {plants.map(p => (
          <FilterChip 
            key={p.id} 
            label={p.name} 
            isSelected={selectedPlantId === p.id} 
            onPress={() => setSelectedPlantId(p.id)} 
          />
        ))}
      </View>

      <Text style={{ fontSize: Typography.sizes.sm, color: Colors.text.muted, marginBottom: 6, marginTop: Spacing.xs }}>
        Task Type
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.sm }}>
        {(['Water', 'Feed', 'Prune', 'Check'] as TaskType[]).map(t => (
          <FilterChip 
            key={t} 
            label={t} 
            isSelected={selectedTaskType === t} 
            onPress={() => setSelectedTaskType(t)} 
          />
        ))}
      </View>

      <CustomButton 
        label="Save Reminder" 
        onPress={handleSave} 
        isDisabled={!selectedPlantId}
        style={{ marginTop: Spacing.md }} 
      />
    </CustomCard>
  );
};

export default CustomReminderForm;
