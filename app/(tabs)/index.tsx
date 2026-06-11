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
import EmptyStateView from '../../components/common/EmptyStateView';
import { WeatherData } from '../../services/weather';

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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (active) setWeatherError(true);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        if (!active) return;

        const { fetchLocalWeather } = require('../../services/weather');
        const data = await fetchLocalWeather(loc.coords.latitude, loc.coords.longitude);
        if (active) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Failed to load local weather:', error);
        if (active) setWeatherError(true);
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
    : null;

  // Compute moisture from logs — null if no data
  const moistureValues = logs.map(l => l.metrics?.moisture).filter((m): m is number => typeof m === 'number');
  const displayMoisture = moistureValues.length > 0 
    ? Math.round(moistureValues.reduce((s, x) => s + x, 0) / moistureValues.length) 
    : null;

  // Compute pH from logs — null if no data
  const phValues = logs.map(l => l.metrics?.ph).filter((p): p is number => typeof p === 'number');
  const displayPh = phValues.length > 0 
    ? (phValues.reduce((s, x) => s + x, 0) / phValues.length).toFixed(1) 
    : null;

  // Compute light level from plants
  const lightLevels = activePlants.map((p) => p.lightLevel).filter(Boolean);
  const displayLight = lightLevels.length > 0 
    ? lightLevels.sort((a, b) => lightLevels.filter((l) => l === b).length - lightLevels.filter((l) => l === a).length)[0]
    : null;

  const latestLog = logs[0];
  const daysSince = latestLog
    ? Math.max(0, Math.floor((Date.now() - new Date(latestLog.timestamp).getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  // Derive zone from first active plant or null
  const displayZone = activePlants.length > 0 ? activePlants[0].zone : null;

  const handleTaskDone = (id: string) => {
    toggleTaskDone(id);
  };

  const handleQuickLogFAB = () => {
    router.push('/modals/quick-log');
  };

  // Build contextual tip from plant data
  const contextualTip = activePlants.length > 0
    ? `💡 Care insight: Monitor ${activePlants[0].name} health — currently at ${activePlants[0].healthScore}%`
    : null;

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      {allTasksDone && <ConfettiCelebration />}

      <CustomHeader
        title="GardenPulse"
        rightNode={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <NotificationBell unreadCount={0} onPress={() => router.push('/modals/notification-prefs')} />
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
        {/* Weather Widget — live data or loading/error state */}
        {weatherData ? (
          <WeatherWidget
            city={weatherData.locationName}
            zone={displayZone || '—'}
            currentTemp={weatherData.temp}
            conditionIcon={conditionIconMap(weatherData.condition)}
            humidity={weatherData.humidity}
            uvIndex={weatherData.uvIndex}
            rainChance={weatherData.rainChance}
            forecast={weatherData.forecast}
            alertMessage={
              weatherData.condition.toLowerCase().includes('rain')
                ? 'Rain forecast → skip watering today'
                : weatherData.uvIndex >= 8
                  ? 'High UV index → provide shade for sensitive plants'
                  : undefined
            }
          />
        ) : (
          <View style={{ 
            backgroundColor: Colors.surface.glass, 
            borderRadius: theme.Radius.lg, 
            padding: Spacing.lg, 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.surface.glassBorder,
          }}>
            <CustomText style={{ color: Colors.text.muted, fontSize: Typography.sizes.sm }}>
              {weatherError ? '⚠️ Weather data unavailable — check location permissions' : '☁️ Loading weather data...'}
            </CustomText>
          </View>
        )}

        {/* Comeback Banner — only shown when there are actual days since last log */}
        {showComeback && daysSince !== null && daysSince > 0 && (
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
          {pendingTasks.length > 0 ? (
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
          ) : (
            <EmptyStateView
              title="No tasks today"
              description={activePlants.length > 0 ? "All care tasks are done. Great job!" : "Add your first plant to get started."}
              iconName="check-circle"
            />
          )}
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
            <MetricDial value={avgHealth ?? 0} size={110} label="Avg Health" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: Spacing.sm }}>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Moisture</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: displayMoisture !== null ? Colors.green.DEFAULT : Colors.text.muted }}>
                  {displayMoisture !== null ? `${displayMoisture}%` : '—'}
                </CustomText>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>Light</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: displayLight ? Colors.warning : Colors.text.muted }}>
                  {displayLight || '—'}
                </CustomText>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CustomText style={{ fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>pH Level</CustomText>
                <CustomText style={{ fontSize: Typography.sizes.sm, color: displayPh !== null ? Colors.green.DEFAULT : Colors.text.muted }}>
                  {displayPh ?? '—'}
                </CustomText>
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
          {activePlants.length > 0 ? (
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
          ) : (
            <EmptyStateView
              title="No plants yet"
              description="Start your garden by adding your first plant!"
              iconName="plus-circle"
              actionLabel="Add a Plant"
              onActionPress={() => router.push('/modals/add-plant')}
            />
          )}
        </View>

        {/* Contextual Tip — only shown when plants exist */}
        {contextualTip && (
          <ContextualTipCard
            title={contextualTip}
            method={activePlants[0]?.method}
            readTime="2 min read"
            onPress={() => router.push(`/modals/tips` as any)}
          />
        )}

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