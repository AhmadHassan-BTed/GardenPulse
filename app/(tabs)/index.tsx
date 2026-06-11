import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useTheme } from '../../components/layout/ThemeProvider';
import CustomText from '../../components/common/CustomText';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useGardenStore } from '../../store/useGardenStore';
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

const mockForecast = [
  { id: '1', dayLabel: 'Thu', icon: 'sun' as const, high: 24, low: 16 },
  { id: '2', dayLabel: 'Fri', icon: 'cloud' as const, high: 22, low: 14 },
  { id: '3', dayLabel: 'Sat', icon: 'cloud-rain' as const, high: 19, low: 12 },
];

export default function DashboardScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const isHydrated = useGardenStore((state) => state.isHydrated);
  const plants = useGardenStore((state) => state.plants);
  const logs = useGardenStore((state) => state.logs);
  const storeTasks = useGardenStore((state) => state.tasks);
  const toggleTaskDone = useGardenStore((state) => state.toggleTaskDone);
  const userProfile = useGardenStore((state) => state.userProfile);

  const [showComeback, setShowComeback] = useState(true);
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temp: number;
    humidity: number;
    condition: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({});
        if (!active) return;

        const { fetchLocalWeather } = require('../../services/weather');
        const data = await fetchLocalWeather(loc.coords.latitude, loc.coords.longitude);
        if (active) {
          setWeatherData({
            city: data.locationName,
            temp: data.temp,
            humidity: data.humidity,
            condition: data.condition,
          });
        }
      } catch (error) {
        console.error('Failed to load local weather:', error);
      }
    };

    loadWeather();
    return () => {
      active = false;
    };
  }, []);

  const conditionIconMap = (cond: string): any => {
    const c = cond.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) return 'cloud-rain';
    if (c.includes('thunder')) return 'cloud-lightning';
    if (c.includes('snow')) return 'cloud-snow';
    if (c.includes('cloud')) return 'cloud';
    if (c.includes('clear')) return 'sun';
    return 'sun';
  };

  if (!isHydrated) {
    return null;
  }

  const activePlants = plants.filter((p) => !p.isArchived);
  const pendingTasks = storeTasks.filter((t) => !t.isDone);
  const allTasksDone = storeTasks.length > 0 && storeTasks.every((t) => t.isDone);

  const avgHealth = activePlants.length > 0 
    ? Math.round(activePlants.reduce((sum, p) => sum + p.healthScore, 0) / activePlants.length)
    : 100;

  const avgMoisture = logs.map(l => l.metrics?.moisture).filter((m): m is number => typeof m === 'number');
  const displayMoisture = avgMoisture.length > 0 
    ? Math.round(avgMoisture.reduce((s, x) => s + x, 0) / avgMoisture.length) 
    : 68;

  const avgPh = logs.map(l => l.metrics?.ph).filter((p): p is number => typeof p === 'number');
  const displayPh = avgPh.length > 0 
    ? (avgPh.reduce((s, x) => s + x, 0) / avgPh.length).toFixed(1) 
    : '6.4';

  const latestLog = logs[0];
  const daysSince = latestLog
    ? Math.max(0, Math.floor((Date.now() - new Date(latestLog.timestamp).getTime()) / (1000 * 60 * 60 * 24)))
    : 4; // fallback to 4 if no logs

  const handleTaskDone = (id: string) => {
    toggleTaskDone(id);
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
          city={weatherData?.city || 'Berlin'}
          zone="Zone 7b"
          currentTemp={weatherData?.temp ?? 22}
          conditionIcon={conditionIconMap(weatherData?.condition || 'clear')}
          humidity={weatherData?.humidity ?? 65}
          uvIndex={5}
          rainChance={weatherData?.condition.toLowerCase().includes('rain') ? 90 : 10}
          forecast={mockForecast}
          alertMessage={
            weatherData?.condition.toLowerCase().includes('rain')
              ? 'Rain forecast → skip watering today'
              : 'Sunny/Clear conditions → monitor soil moisture'
          }
        />

        {/* Comeback Banner */}
        {showComeback && (
          <ComebackBonusBanner
            daysSince={daysSince}
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
            {pendingTasks.map(task => (
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
            <MetricDial value={avgHealth} size={110} label="Avg Health" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: Spacing.sm }}>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Moisture</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT }}>{displayMoisture}%</CustomText>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Light</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.warning }}>Medium</CustomText>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>pH Level</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.green.DEFAULT }}>{displayPh}</CustomText>
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
            {activePlants.map(plant => (
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
          onPress={() => router.push(`/modals/tips` as any)}
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