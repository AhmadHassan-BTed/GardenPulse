import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/layout/ThemeProvider';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import NotificationBell from '../../components/common/NotificationBell';
import IconButton from '../../components/common/IconButton';
import WeatherWidget from '../../components/common/WeatherWidget';
import ComebackBonusBanner from '../../components/common/ComebackBonusBanner';
import SectionHeader from '../../components/common/SectionHeader';
import HorizontalScrollRow from '../../components/common/HorizontalScrollRow';
import TaskCard, { TaskType } from '../../components/common/TaskCard';
import MetricDial from '../../components/common/MetricDial';
import PlantCard from '../../components/common/PlantCard';
import ContextualTipCard from '../../components/common/ContextualTipCard';
import BloomReportBanner from '../../components/common/BloomReportBanner';
import FAB from '../../components/common/FAB';
import ConfettiCelebration from '../../components/common/ConfettiCelebration';

interface DashboardTask {
  id: string;
  plantName: string;
  taskType: TaskType;
  isDone: boolean;
  plantImageUrl?: string;
}

interface DashboardPlant {
  id: string;
  name: string;
  nickname?: string;
  method: 'Soil' | 'Container' | 'Hydro' | 'Indoor';
  healthStatus: 'healthy' | 'warning' | 'critical';
  lastLoggedDays: number;
  imageUrl?: string;
}

const mockForecast = [
  { id: '1', dayLabel: 'Thu', icon: 'sun' as const, high: 24, low: 16 },
  { id: '2', dayLabel: 'Fri', icon: 'cloud' as const, high: 22, low: 14 },
  { id: '3', dayLabel: 'Sat', icon: 'cloud-rain' as const, high: 19, low: 12 },
];

const mockPlants: DashboardPlant[] = [
  { id: '1', name: 'Monstera Deliciosa', nickname: 'Spike', method: 'Indoor', healthStatus: 'healthy', lastLoggedDays: 2 },
  { id: '2', name: 'Tomato Plant', nickname: 'Juicy', method: 'Soil', healthStatus: 'warning', lastLoggedDays: 4 },
  { id: '3', name: 'Golden Pothos', nickname: 'Viny', method: 'Container', healthStatus: 'critical', lastLoggedDays: 6 },
];

export default function DashboardScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [showComeback, setShowComeback] = useState(true);
  const [tasks, setTasks] = useState<DashboardTask[]>([
    { id: '1', plantName: 'Monstera Deliciosa', taskType: 'Water', isDone: false },
    { id: '2', plantName: 'Tomato Plant', taskType: 'Feed', isDone: false },
    { id: '3', plantName: 'Golden Pothos', taskType: 'Prune', isDone: true },
  ]);

  const allTasksDone = tasks.length > 0 && tasks.every(t => t.isDone);

  const handleTaskDone = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isDone: true } : t));
  };

  const handleQuickLogFAB = () => {
    router.push('/modals/quick-log');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      {allTasksDone && <ConfettiCelebration />}

      <CustomHeader
        title="GardenPulse"
        rightNode={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <NotificationBell unreadCount={2} onPress={() => router.push('/modals/notification-prefs')} />
            <IconButton 
              name="settings" 
              size={20} 
              color={Colors.text.heading} 
              onPress={() => router.push('/(tabs)/profile/settings')} 
            />
          </View>
        }
      />

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl + 64 }}>
        {/* Weather Widget */}
        <WeatherWidget
          city="Berlin"
          zone="Zone 7b"
          currentTemp={22}
          conditionIcon="sun"
          humidity={65}
          uvIndex={5}
          rainChance={10}
          forecast={mockForecast}
          alertMessage="Rain tomorrow → skip watering today"
        />

        {/* Comeback Banner */}
        {showComeback && (
          <ComebackBonusBanner
            daysSince={4}
            ctaLabel="See What Needs Attention →"
            onPress={() => {
              setShowComeback(false);
              router.push('/(tabs)/garden');
            }}
          />
        )}

        {/* Today's Tasks */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader 
            title="Today in Your Garden" 
            actionLabel="See full schedule →"
            onActionPress={() => router.push('/(tabs)/tools/smart-scheduler')}
          />
          <HorizontalScrollRow>
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                plantName={task.plantName}
                taskType={task.taskType}
                isDone={task.isDone}
                onDonePress={() => handleTaskDone(task.id)}
              />
            ))}
          </HorizontalScrollRow>
        </View>

        {/* Garden Health Score */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader 
            title="Garden Health Score" 
            actionLabel="View Details →"
            onActionPress={() => router.push('/(tabs)/profile')}
          />
          <View style={{ 
            backgroundColor: Colors.surface.glass, 
            borderRadius: theme.Radius.lg, 
            borderWidth: 1, 
            borderColor: Colors.surface.glassBorder, 
            padding: Spacing.lg, 
            alignItems: 'center', 
            gap: Spacing.md 
          }}>
            <MetricDial value={84} size={110} label="Avg Health" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: Spacing.sm }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Moisture</Text>
                <Text style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT }}>68%</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Light</Text>
                <Text style={{ fontSize: Typography.sizes.sm, color: '#F59E0B' }}>Medium</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>pH Level</Text>
                <Text style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT }}>6.4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* My Plants */}
        <View style={{ gap: Spacing.sm }}>
          <SectionHeader 
            title="My Garden" 
            actionLabel="See All →"
            onActionPress={() => router.push('/(tabs)/garden')}
          />
          <HorizontalScrollRow>
            {mockPlants.map(plant => (
              <PlantCard
                key={plant.id}
                name={plant.name}
                nickname={plant.nickname}
                method={plant.method}
                healthStatus={plant.healthStatus}
                lastLoggedDays={plant.lastLoggedDays}
                onPress={() => router.push(`/(tabs)/garden/plant/${plant.id}`)}
                style={{ width: 220 }}
              />
            ))}
          </HorizontalScrollRow>
        </View>

        {/* Contextual Tip */}
        <ContextualTipCard
          title="💡 From your garden expert: Tomato Care: Reducing leaf curl during high heat"
          method="Soil"
          readTime="3 min read"
          onPress={() => router.push('/modals/tips')}
        />

        {/* Bloom Report */}
        <BloomReportBanner
          onPress={() => router.push('/modals/bloom-report')}
        />
      </View>

      {/* Floating Action Button */}
      <FAB onPress={handleQuickLogFAB} iconName="plus" />
    </ScreenWrapper>
  );
}