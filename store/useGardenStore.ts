import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant, LogEntry, Task, UserProfile } from '../types';

interface GardenStoreState {
  plants: Plant[];
  logs: LogEntry[];
  tasks: Task[];
  userProfile: UserProfile;
  isHydrated: boolean;

  // Hydration helper
  setHydrated: (state: boolean) => void;

  // User Profile actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  incrementStreak: () => void;
  resetStreak: () => void;

  // Plant CRUD actions
  addPlant: (plant: Omit<Plant, 'id' | 'isArchived' | 'healthScore' | 'healthStatus' | 'lastLoggedDays'>) => void;
  updatePlant: (id: string, updates: Partial<Plant>) => void;
  deletePlant: (id: string) => void;
  archivePlant: (id: string, causeOfDeath: string) => void;

  // Log CRUD actions
  addLogEntry: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  updateLogEntry: (id: string, updates: Partial<LogEntry>) => void;
  deleteLogEntry: (id: string) => void;

  // Task CRUD actions
  addTask: (task: Omit<Task, 'id' | 'isDone'>) => void;
  toggleTaskDone: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;
}

const initialUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Ahmad Hassan',
  growerTag: 'green_thumb_berlin',
  avatarUrl: undefined,
  isSupporter: true,
  streakCount: 23,
  longestStreak: 45,
  challengesWon: 4,
};

const initialPlants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    nickname: 'Spike',
    method: 'Indoor',
    stage: 'Veg',
    dateAdded: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    zone: 'Zone 7b',
    containerSize: '10 Gallons',
    healthScore: 88,
    healthStatus: 'healthy',
    lastLoggedDays: 2,
    isArchived: false,
  },
  {
    id: '2',
    name: 'Snake Plant',
    nickname: 'Juicy',
    method: 'Indoor',
    stage: 'Veg',
    dateAdded: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    zone: 'Zone 7b',
    containerSize: '8 Inches',
    healthScore: 65,
    healthStatus: 'warning',
    lastLoggedDays: 4,
    isArchived: false,
  },
  {
    id: '3',
    name: 'Golden Pothos',
    nickname: 'Viny',
    method: 'Container',
    stage: 'Veg',
    dateAdded: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    zone: 'Zone 7b',
    containerSize: '3 Gallons',
    healthScore: 40,
    healthStatus: 'critical',
    lastLoggedDays: 6,
    isArchived: false,
  },
];

const initialLogs: LogEntry[] = [
  {
    id: 'l1',
    plantId: '1',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    activities: ['Pruning'],
    metrics: { ph: 5.9, ec: 1.6 },
    notes: 'Pruned one of the lowest leaves that showed heavy yellowing due to nitrogen deficiency. Adjusted nutrient dosage by +10%.',
    hasVoiceNote: true,
  },
  {
    id: 'l2',
    plantId: '1',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    activities: ['Watering', 'Feeding'],
    metrics: { ph: 6.0, ec: 1.5 },
    notes: 'Refilled the main reservoir. Plant looks healthy and new leaf is beginning to unfurl.',
    hasVoiceNote: false,
  },
];

const initialTasks: Task[] = [
  { id: 't1', plantId: '1', plantName: 'Monstera Deliciosa', taskType: 'Check', dueDate: new Date().toISOString(), isDone: false },
  { id: 't2', plantId: '1', plantName: 'Monstera Deliciosa', taskType: 'Feed', dueDate: new Date().toISOString(), isDone: false },
  { id: 't3', plantId: '1', plantName: 'Monstera Deliciosa', taskType: 'Prune', dueDate: new Date().toISOString(), isDone: true },
];

export const useGardenStore = create<GardenStoreState>()(
  persist(
    (set) => ({
      plants: initialPlants,
      logs: initialLogs,
      tasks: initialTasks,
      userProfile: initialUserProfile,
      isHydrated: false,

      setHydrated: (state) => set({ isHydrated: state }),

      // User Profile actions
      updateProfile: (updates) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),

      incrementStreak: () =>
        set((state) => {
          const nextStreak = state.userProfile.streakCount + 1;
          const nextLongest = Math.max(nextStreak, state.userProfile.longestStreak);
          return {
            userProfile: {
              ...state.userProfile,
              streakCount: nextStreak,
              longestStreak: nextLongest,
            },
          };
        }),

      resetStreak: () =>
        set((state) => ({
          userProfile: { ...state.userProfile, streakCount: 0 },
        })),

      // Plant CRUD actions
      addPlant: (plant) =>
        set((state) => {
          const newPlant: Plant = {
            ...plant,
            id: `plant-${Date.now()}`,
            healthScore: 100,
            healthStatus: 'healthy',
            lastLoggedDays: 0,
            isArchived: false,
          };
          return {
            plants: [newPlant, ...state.plants],
          };
        }),

      updatePlant: (id, updates) =>
        set((state) => ({
          plants: state.plants.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deletePlant: (id) =>
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
          logs: state.logs.filter((l) => l.plantId !== id),
          tasks: state.tasks.filter((t) => t.plantId !== id),
        })),

      archivePlant: (id, causeOfDeath) =>
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id
              ? {
                  ...p,
                  isArchived: true,
                  archivedDate: new Date().toISOString(),
                  causeOfDeath,
                  healthScore: 0,
                  healthStatus: 'critical',
                }
              : p
          ),
        })),

      // Log CRUD actions
      addLogEntry: (entry) =>
        set((state) => {
          const newLog: LogEntry = {
            ...entry,
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
          };
          // Automatically update the matching plant's lastLoggedDays to 0 when a log is added
          const updatedPlants = state.plants.map((p) =>
            p.id === entry.plantId ? { ...p, lastLoggedDays: 0 } : p
          );
          return {
            logs: [newLog, ...state.logs],
            plants: updatedPlants,
          };
        }),

      updateLogEntry: (id, updates) =>
        set((state) => ({
          logs: state.logs.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),

      deleteLogEntry: (id) =>
        set((state) => ({
          logs: state.logs.filter((l) => l.id !== id),
        })),

      // Task CRUD actions
      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            ...task,
            id: `task-${Date.now()}`,
            isDone: false,
          };
          return {
            tasks: [newTask, ...state.tasks],
          };
        }),

      toggleTaskDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, isDone: !t.isDone, completedDate: !t.isDone ? new Date().toISOString() : undefined }
              : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => !t.isDone),
        })),
    }),
    {
      name: 'gardenpulse-state-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
