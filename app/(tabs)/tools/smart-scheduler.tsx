import React, { useState, useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import InScreenTabBar from '../../../components/common/InScreenTabBar';
import CalendarWeekStrip, { CalendarDayData } from '../../../components/common/CalendarWeekStrip';
import SunriseSunsetRow from '../../../components/common/SunriseSunsetRow';
import TaskCard from '../../../components/common/TaskCard';
import SmartControlsPanel from '../../../components/common/SmartControlsPanel';
import CustomReminderForm from '../../../components/common/CustomReminderForm';
import SectionHeader from '../../../components/common/SectionHeader';
import NavigationLinkRow from '../../../components/common/NavigationLinkRow';
import ConfettiCelebration from '../../../components/common/ConfettiCelebration';
import EmptyStateView from '../../../components/common/EmptyStateView';
import { useGardenStore } from '../../../store/useGardenStore';
import { TaskType } from '../../../components/common/TaskCard';
import CustomCard from '../../../components/common/CustomCard';
import CustomText from '../../../components/common/CustomText';

export default function SmartSchedulerScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;
  const isHydrated = useGardenStore((state) => state.isHydrated);
  const storeTasks = useGardenStore((state) => state.tasks);
  const storePlants = useGardenStore((state) => state.plants);
  const toggleTaskDone = useGardenStore((state) => state.toggleTaskDone);
  const addTask = useGardenStore((state) => state.addTask);

  const [activeTab, setActiveTab] = useState('Tasks');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCelebration, setShowCelebration] = useState(false);
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temp: number;
    humidity: number;
    condition: string;
    sunrise: string;
    sunset: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (active) {
            setWeatherData(null);
          }
          return;
        }

        let lat: number;
        let lon: number;
        try {
          const loc = await Location.getCurrentPositionAsync({});
          lat = loc.coords.latitude;
          lon = loc.coords.longitude;
        } catch (e) {
          console.warn('getCurrentPositionAsync failed:', e);
          if (active) {
            setWeatherData(null);
          }
          return;
        }

        if (!active) return;

        const { fetchLocalWeather } = require('../../../services/weather');
        const data = await fetchLocalWeather(lat, lon);
        if (active) {
          setWeatherData({
            city: data.locationName,
            temp: data.temp,
            humidity: data.humidity,
            condition: data.condition,
            sunrise: data.sunrise,
            sunset: data.sunset,
          });
        }
      } catch (error) {
        console.error('Failed to load local weather:', error);
        if (active) {
          setWeatherData(null);
        }
      }
    };

    loadWeather();
    return () => {
      active = false;
    };
  }, []);

  // Active unarchived plants to populate reminder selectors
  const activePlants = useMemo(() => {
    return (storePlants || [])
      .filter((p) => !p.isArchived)
      .map((p) => ({
        id: p.id,
        name: p.nickname || p.name,
      }));
  }, [storePlants]);

  // Tasks due on the selected date
  const selectedDateTasks = useMemo(() => {
    return (storeTasks || []).filter((t) => {
      const taskDate = new Date(t.dueDate);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [storeTasks, selectedDate]);

  // Calendar week strip days with dynamic task color dots
  const days = useMemo(() => {
    const today = new Date();
    const result: CalendarDayData[] = [];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      
      const dayTasks = (storeTasks || []).filter((t) => {
        const taskDate = new Date(t.dueDate);
        return (
          taskDate.getDate() === d.getDate() &&
          taskDate.getMonth() === d.getMonth() &&
          taskDate.getFullYear() === d.getFullYear() &&
          !t.isDone
        );
      });

      const taskColors = (dayTasks || []).map((t) => {
        if (t.taskType === 'Water') return Colors.info;
        if (t.taskType === 'Feed') return Colors.success;
        if (t.taskType === 'Prune') return Colors.warning;
        return Colors.purple;
      });

      result.push({
        date: d,
        label: dayLabels[d.getDay()],
        dayNumber: d.getDate(),
        isToday: i === 0,
        taskColors: Array.from(new Set(taskColors)),
      });
    }
    return result;
  }, [storeTasks, Colors]);

  if (!isHydrated) {
    return null;
  }

  const handleDonePress = (id: string) => {
    toggleTaskDone(id);
    
    // Check if remaining tasks for the day are complete
    const tasksAfterToggle = (selectedDateTasks || []).map((t) =>
      t.id === id ? { ...t, isDone: true } : t
    );
    
    if (tasksAfterToggle.length > 0 && tasksAfterToggle.every((t) => t.isDone)) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
    }
  };

  const handleAddReminder = (newTask: { plantId: string; plantName: string; taskType: TaskType; dueDate: string }) => {
    addTask(newTask);
    setActiveTab('Tasks');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader
        title="My Schedule"
        showBack={true}
        onBack={() => router.back()}
      />

      {showCelebration && <ConfettiCelebration />}

      <View style={{ gap: Spacing.lg, paddingBottom: Spacing.xl }}>
        {/* Calendar strip section */}
        <CalendarWeekStrip
          days={days}
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(d)}
        />

        {/* Real-time local weather context banner */}
        {weatherData ? (
          <CustomCard padding={Spacing.md} style={{ backgroundColor: `${Colors.green.DEFAULT}10`, marginBottom: Spacing.sm, alignItems: 'center' }}>
            <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.text.body, fontWeight: 'bold' }}>
              📍 {weatherData.city} — {weatherData.condition}, {weatherData.temp}°C ({weatherData.humidity}% humidity)
            </CustomText>
          </CustomCard>
        ) : (
          <CustomCard padding={Spacing.md} style={{ backgroundColor: `${Colors.text.error}10`, marginBottom: Spacing.sm, alignItems: 'center' }}>
            <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.text.body, fontWeight: 'bold' }}>
              ⚠️ Weather-aware alerts and insights are unavailable. Please enable location access.
            </CustomText>
          </CustomCard>
        )}

        {/* Sunrise / Sunset times for weather context */}
        <SunriseSunsetRow
          sunrise={weatherData?.sunrise || "—"}
          sunset={weatherData?.sunset || "—"}
        />

        {/* Tab switcher */}
        <InScreenTabBar
          tabs={['Tasks', 'Controls', 'Add Custom']}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'Tasks' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="Today's Care Schedule" />
            
            <View style={{ gap: Spacing.sm }}>
              {selectedDateTasks.length > 0 ? (
                (selectedDateTasks || []).map((task) => (
                  <TaskCard
                    key={task.id}
                    plantName={task.plantName}
                    plantImageUrl={storePlants.find((p) => p.id === task.plantId)?.imageUrl}
                    taskType={task.taskType}
                    isDone={task.isDone}
                    onDonePress={() => handleDonePress(task.id)}
                    style={{ width: '100%' }}
                  />
                ))
              ) : (
                <EmptyStateView
                  title="No tasks scheduled"
                  description="All care requirements are fully satisfied for this date."
                  iconName="check-circle"
                />
              )}
            </View>
          </View>
        )}

        {activeTab === 'Controls' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="Smart Calendar Rules" />
            <SmartControlsPanel />
          </View>
        )}

        {activeTab === 'Add Custom' && (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="Custom Reminders" />
            {activePlants.length > 0 ? (
              <CustomReminderForm plants={activePlants} onSave={handleAddReminder} />
            ) : (
              <EmptyStateView
                title="No active plants"
                description="Add a plant to your garden first so you can schedule custom reminders."
                iconName="plus-circle"
                actionLabel="Add a Plant"
                onActionPress={() => router.push('/modals/add-plant')}
              />
            )}
          </View>
        )}

        {/* Bottom configuration link */}
        <View style={{ marginTop: Spacing.md }}>
          <NavigationLinkRow
            label="Notification Preferences"
            value="Configure alerts"
            onPress={() => router.push('/modals/notification-prefs')}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}