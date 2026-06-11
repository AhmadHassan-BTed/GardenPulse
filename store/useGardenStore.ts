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
  addPlant: (plant: Omit<Plant, 'id' | 'isArchived' | 'healthScore' | 'healthStatus' | 'lastLoggedDays'>) => Promise<void>;
  updatePlant: (id: string, updates: Partial<Plant>) => void;
  deletePlant: (id: string) => void;
  archivePlant: (id: string, causeOfDeath: string) => void;

  // Log CRUD actions
  addLogEntry: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => Promise<void>;
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
  userId: undefined,
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
    (set, get) => ({
      plants: initialPlants,
      logs: initialLogs,
      tasks: initialTasks,
      userProfile: initialUserProfile,
      isHydrated: false,

      setHydrated: (state) => set({ isHydrated: state }),

      // User Profile actions
      updateProfile: (updates) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, 'users', userId), updates, { merge: true }).catch((err: any) => {
            console.error('Failed to sync user profile updates to Firestore:', err);
          });
        }
      },

      incrementStreak: () =>
        set((state) => {
          const nextStreak = state.userProfile.streakCount + 1;
          const nextLongest = Math.max(nextStreak, state.userProfile.longestStreak);
          const nextProfile = {
            ...state.userProfile,
            streakCount: nextStreak,
            longestStreak: nextLongest,
          };
          // Sync streak asynchronously to Firestore
          const userId = state.userProfile.userId;
          if (userId) {
            const { doc, setDoc } = require('firebase/firestore');
            const { firestore } = require('../services/firebase');
            setDoc(doc(firestore, 'users', userId), { streakCount: nextStreak, longestStreak: nextLongest }, { merge: true }).catch((err: any) => {
              console.error('Failed to sync streak increment to Firestore:', err);
            });
          }
          return { userProfile: nextProfile };
        }),

      resetStreak: () =>
        set((state) => {
          const nextProfile = { ...state.userProfile, streakCount: 0 };
          // Sync streak reset asynchronously to Firestore
          const userId = state.userProfile.userId;
          if (userId) {
            const { doc, setDoc } = require('firebase/firestore');
            const { firestore } = require('../services/firebase');
            setDoc(doc(firestore, 'users', userId), { streakCount: 0 }, { merge: true }).catch((err: any) => {
              console.error('Failed to sync streak reset to Firestore:', err);
            });
          }
          return { userProfile: nextProfile };
        }),

      // Plant CRUD actions
      addPlant: async (plant) => {
        const userId = get().userProfile.userId;
        const plantId = `plant-${Date.now()}`;
        
        let imageUrl = plant.imageUrl;
        if (imageUrl && !imageUrl.startsWith('http') && userId) {
          try {
            const { uploadPlantImage } = require('../services/storage');
            imageUrl = await uploadPlantImage(imageUrl, `users/${userId}/plants/${plantId}.jpg`);
          } catch (error) {
            console.error('Failed to upload plant image:', error);
          }
        }

        const newPlant: Plant = {
          ...plant,
          id: plantId,
          imageUrl,
          healthScore: 100,
          healthStatus: 'healthy',
          lastLoggedDays: 0,
          isArchived: false,
        };

        // 1. Optimistic UI update
        set((state) => ({
          plants: [newPlant, ...state.plants],
        }));

        // 2. Async Firestore write
        if (userId) {
          try {
            const { doc, setDoc } = require('firebase/firestore');
            const { firestore } = require('../services/firebase');
            await setDoc(doc(firestore, `users/${userId}/plants`, plantId), newPlant);
          } catch (error) {
            console.error('Failed to write plant to Firestore:', error);
          }
        }
      },

      updatePlant: (id, updates) => {
        set((state) => ({
          plants: state.plants.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/plants`, id), updates).catch((err: any) => {
            console.error('Failed to update plant in Firestore:', err);
          });
        }
      },

      deletePlant: (id) => {
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
          logs: state.logs.filter((l) => l.plantId !== id),
          tasks: state.tasks.filter((t) => t.plantId !== id),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/plants`, id)).catch((err: any) => {
            console.error('Failed to delete plant from Firestore:', err);
          });
        }
      },

      archivePlant: (id, causeOfDeath) => {
        const archivedUpdates = {
          isArchived: true,
          archivedDate: new Date().toISOString(),
          causeOfDeath,
          healthScore: 0,
          healthStatus: 'critical' as const,
        };

        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id ? { ...p, ...archivedUpdates } : p
          ),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/plants`, id), archivedUpdates).catch((err: any) => {
            console.error('Failed to archive plant in Firestore:', err);
          });
        }
      },

      // Log CRUD actions
      addLogEntry: async (entry) => {
        const userId = get().userProfile.userId;
        const logId = `log-${Date.now()}`;
        const timestamp = new Date().toISOString();

        let imageUrl = entry.imageUrl;
        if (imageUrl && !imageUrl.startsWith('http') && userId) {
          try {
            const { uploadPlantImage } = require('../services/storage');
            imageUrl = await uploadPlantImage(imageUrl, `users/${userId}/logs/${logId}.jpg`);
          } catch (error) {
            console.error('Failed to upload log image:', error);
          }
        }

        const newLog: LogEntry = {
          ...entry,
          id: logId,
          timestamp,
          imageUrl,
        };

        set((state) => {
          const updatedPlants = state.plants.map((p) =>
            p.id === entry.plantId ? { ...p, lastLoggedDays: 0 } : p
          );
          return {
            logs: [newLog, ...state.logs],
            plants: updatedPlants,
          };
        });

        if (userId) {
          try {
            const { doc, setDoc, updateDoc } = require('firebase/firestore');
            const { firestore } = require('../services/firebase');
            await setDoc(doc(firestore, `users/${userId}/logs`, logId), newLog);
            await updateDoc(doc(firestore, `users/${userId}/plants`, entry.plantId), {
              lastLoggedDays: 0,
            });
          } catch (error) {
            console.error('Failed to save log entry to Firestore:', error);
          }
        }
      },

      updateLogEntry: (id, updates) => {
        set((state) => ({
          logs: state.logs.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/logs`, id), updates).catch((err: any) => {
            console.error('Failed to update log entry in Firestore:', err);
          });
        }
      },

      deleteLogEntry: (id) => {
        set((state) => ({
          logs: state.logs.filter((l) => l.id !== id),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/logs`, id)).catch((err: any) => {
            console.error('Failed to delete log entry from Firestore:', err);
          });
        }
      },

      // Task CRUD actions
      addTask: (task) => {
        const taskId = `task-${Date.now()}`;
        const newTask: Task = {
          ...task,
          id: taskId,
          isDone: false,
        };

        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/tasks`, taskId), newTask).catch((err: any) => {
            console.error('Failed to save task to Firestore:', err);
          });
        }
      },

      toggleTaskDone: (id) => {
        let updatedTask: Task | undefined;

        set((state) => {
          const updatedTasks = state.tasks.map((t) => {
            if (t.id === id) {
              updatedTask = {
                ...t,
                isDone: !t.isDone,
                completedDate: !t.isDone ? new Date().toISOString() : undefined,
              };
              return updatedTask;
            }
            return t;
          });
          return { tasks: updatedTasks };
        });

        const userId = get().userProfile.userId;
        if (userId && updatedTask) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/tasks`, id), {
            isDone: updatedTask.isDone,
            completedDate: updatedTask.completedDate || null,
          }).catch((err: any) => {
            console.error('Failed to update task done status in Firestore:', err);
          });
        }
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));

        const userId = get().userProfile.userId;
        if (userId) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/tasks`, id)).catch((err: any) => {
            console.error('Failed to delete task from Firestore:', err);
          });
        }
      },

      clearCompletedTasks: () => {
        let completedTaskIds: string[] = [];

        set((state) => {
          const completed = state.tasks.filter((t) => t.isDone);
          completedTaskIds = completed.map((t) => t.id);
          return {
            tasks: state.tasks.filter((t) => !t.isDone),
          };
        });

        const userId = get().userProfile.userId;
        if (userId && completedTaskIds.length > 0) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          completedTaskIds.forEach((id) => {
            deleteDoc(doc(firestore, `users/${userId}/tasks`, id)).catch((err: any) => {
              console.error(`Failed to delete completed task ${id} from Firestore:`, err);
            });
          });
        }
      },
    }),
    {
      name: 'gardenpulse-state-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
          
          // Trigger Firebase anonymous authentication if no userId is set
          if (!state.userProfile.userId) {
            const { signInAnonymously } = require('../services/firebase');
            signInAnonymously()
              .then((user: any) => {
                state.updateProfile({ userId: user.uid });
                console.log('Successfully authenticated with Firebase UID:', user.uid);
              })
              .catch((err: any) => {
                console.error('Failed to auto-sign in anonymously on hydration:', err);
              });
          }
        }
      },
    }
  )
);
