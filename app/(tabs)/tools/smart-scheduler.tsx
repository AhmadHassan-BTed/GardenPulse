import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import InScreenTabBar from '../../../components/common/InScreenTabBar';
import CalendarWeekStrip, { CalendarDayData } from '../../../components/common/CalendarWeekStrip';
import SunriseSunsetRow from '../../../components/common/SunriseSunsetRow';
import TaskCard, { TaskType } from '../../../components/common/TaskCard';
import SmartControlsPanel from '../../../components/common/SmartControlsPanel';
import CustomReminderForm from '../../../components/common/CustomReminderForm';
import SectionHeader from '../../../components/common/SectionHeader';
import NavigationLinkRow from '../../../components/common/NavigationLinkRow';
import ConfettiCelebration from '../../../components/common/ConfettiCelebration';

// Generate days for CalendarWeekStrip
const getMockDays = (Colors: any): CalendarDayData[] => {
  const today = new Date();
  const days: CalendarDayData[] = [];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = -3; i <= 3; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: dayLabels[d.getDay()],
      dayNumber: d.getDate(),
      isToday: i === 0,
      taskColors: i === 0 ? [Colors.info, Colors.success] : i === 1 ? [Colors.warning] : [],
    });
  }
  return days;
};

export default function SmartSchedulerScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [activeTab, setActiveTab] = useState('Tasks');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const days = React.useMemo(() => getMockDays(Colors), [Colors]);
  
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Sweet Basil', type: 'Water' as TaskType, done: false },
    { id: '2', name: 'Monstera Deliciosa', type: 'Feed' as TaskType, done: false },
    { id: '3', name: 'Fiddle Leaf Fig', type: 'Prune' as TaskType, done: true },
  ]);

  const [showCelebration, setShowCelebration] = useState(false);

  const handleDonePress = (id: string) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, done: true } : t);
      // If all tasks are completed, trigger celebration
      if (updated.every(t => t.done)) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2500);
      }
      return updated;
    });
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

        {/* Sunrise / Sunset times for weather context */}
        <SunriseSunsetRow
          sunrise="05:24 AM"
          sunset="09:12 PM"
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
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  plantName={task.name}
                  taskType={task.type}
                  isDone={task.done}
                  onDonePress={() => handleDonePress(task.id)}
                  style={{ width: '100%' }} // Override width for full page layout
                />
              ))}
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
            <CustomReminderForm />
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