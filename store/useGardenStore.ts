import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Plant, LogEntry, Task, UserProfile, Cluster, CommunityPost, SwapItem, Reel, CreatorGuide } from '../types';

interface GardenStoreState {
  plants: Plant[];
  logs: LogEntry[];
  tasks: Task[];
  userProfile: UserProfile;
  isHydrated: boolean;

  // Community
  clusters: Cluster[];
  posts: CommunityPost[];
  swaps: SwapItem[];
  successStats: { plantName: string; successRate: number; growerCount: number; trend: 'up' | 'flat' | 'down' }[];
  featuredWinner: { username: string; challengeName: string; methodTag: string; prizeLabel: string } | null;

  // Reels
  reels: Reel[];

  // Creator Studio
  creatorGuides: CreatorGuide[];

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

  // Cluster CRUD actions
  addCluster: (cluster: Omit<Cluster, 'id'>) => void;
  updateCluster: (id: string, updates: Partial<Cluster>) => void;
  deleteCluster: (id: string) => void;

  // Post CRUD actions
  addPost: (post: Omit<CommunityPost, 'id' | 'timestamp'>) => void;
  deletePost: (id: string) => void;

  // Swap CRUD actions
  addSwap: (swap: Omit<SwapItem, 'id'>) => void;
  deleteSwap: (id: string) => void;

  // Reel CRUD actions
  addReel: (reel: Omit<Reel, 'id'>) => void;
  updateReel: (id: string, updates: Partial<Reel>) => void;
  deleteReel: (id: string) => void;

  // Creator Guide CRUD actions
  addCreatorGuide: (guide: Omit<CreatorGuide, 'id'>) => void;
  updateCreatorGuide: (id: string, updates: Partial<CreatorGuide>) => void;
  deleteCreatorGuide: (id: string) => void;

  // Destructive actions
  clearAllData: () => Promise<void>;
}

// Production-clean initial profile — all zeroed out
const emptyUserProfile: UserProfile = {
  id: 'user-1',
  userId: undefined,
  name: '',
  growerTag: '',
  avatarUrl: undefined,
  isSupporter: false,
  streakCount: 0,
  longestStreak: 0,
  challengesWon: 0,
  lastUsedTool: undefined,
  referralCount: 0,
};

export const useGardenStore = create<GardenStoreState>()(
  persist(
    (set, get) => ({
      // All initial data starts empty — true blank slate
      plants: [],
      logs: [],
      tasks: [],
      userProfile: emptyUserProfile,
      isHydrated: false,
      clusters: [],
      posts: [],
      swaps: [],
      successStats: [],
      featuredWinner: null,
      reels: [],
      creatorGuides: [],

      setHydrated: (state) => set({ isHydrated: state }),

      // ─── User Profile actions ──────────────────────────────────────────
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

      // ─── Plant CRUD actions ────────────────────────────────────────────
      addPlant: async (plant) => {
        const userId = get().userProfile.userId;
        const plantId = `plant-${Date.now()}`;
        
        let imageUrl = plant.imageUrl;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (imageUrl && !imageUrl.startsWith('http') && userId && isFirebaseConfigured) {
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
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/plants`, id), archivedUpdates).catch((err: any) => {
            console.error('Failed to archive plant in Firestore:', err);
          });
        }
      },

      // ─── Log CRUD actions ─────────────────────────────────────────────
      addLogEntry: async (entry) => {
        const userId = get().userProfile.userId;
        const logId = `log-${Date.now()}`;
        const timestamp = new Date().toISOString();

        let imageUrl = entry.imageUrl;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (imageUrl && !imageUrl.startsWith('http') && userId && isFirebaseConfigured) {
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

        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/logs`, id)).catch((err: any) => {
            console.error('Failed to delete log entry from Firestore:', err);
          });
        }
      },

      // ─── Task CRUD actions ────────────────────────────────────────────
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured && updatedTask) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
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
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured && completedTaskIds.length > 0) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          completedTaskIds.forEach((id) => {
            deleteDoc(doc(firestore, `users/${userId}/tasks`, id)).catch((err: any) => {
              console.error(`Failed to delete completed task ${id} from Firestore:`, err);
            });
          });
        }
      },

      // ─── Cluster CRUD actions ─────────────────────────────────────────
      addCluster: (cluster) => {
        const clusterId = `cluster-${Date.now()}`;
        const newCluster: Cluster = { ...cluster, id: clusterId };
        set((state) => ({ clusters: [newCluster, ...state.clusters] }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/clusters`, clusterId), newCluster).catch((err: any) => {
            console.error('Failed to save cluster to Firestore:', err);
          });
        }
      },

      updateCluster: (id, updates) => {
        set((state) => ({
          clusters: state.clusters.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/clusters`, id), updates).catch((err: any) => {
            console.error('Failed to update cluster in Firestore:', err);
          });
        }
      },

      deleteCluster: (id) => {
        set((state) => ({
          clusters: state.clusters.filter((c) => c.id !== id),
          posts: state.posts.filter((p) => p.clusterId !== id),
          swaps: state.swaps.filter((s) => s.clusterId !== id),
        }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/clusters`, id)).catch((err: any) => {
            console.error('Failed to delete cluster from Firestore:', err);
          });
        }
      },

      // ─── Post CRUD actions ────────────────────────────────────────────
      addPost: (post) => {
        const postId = `post-${Date.now()}`;
        const newPost: CommunityPost = { ...post, id: postId, timestamp: new Date().toISOString() };
        set((state) => ({ posts: [newPost, ...state.posts] }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/posts`, postId), newPost).catch((err: any) => {
            console.error('Failed to save post to Firestore:', err);
          });
        }
      },

      deletePost: (id) => {
        set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/posts`, id)).catch((err: any) => {
            console.error('Failed to delete post from Firestore:', err);
          });
        }
      },

      // ─── Swap CRUD actions ────────────────────────────────────────────
      addSwap: (swap) => {
        const swapId = `swap-${Date.now()}`;
        const newSwap: SwapItem = { ...swap, id: swapId };
        set((state) => ({ swaps: [newSwap, ...state.swaps] }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/swaps`, swapId), newSwap).catch((err: any) => {
            console.error('Failed to save swap to Firestore:', err);
          });
        }
      },

      deleteSwap: (id) => {
        set((state) => ({ swaps: state.swaps.filter((s) => s.id !== id) }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/swaps`, id)).catch((err: any) => {
            console.error('Failed to delete swap from Firestore:', err);
          });
        }
      },

      // ─── Reel CRUD actions ────────────────────────────────────────────
      addReel: (reel) => {
        const reelId = `reel-${Date.now()}`;
        const newReel: Reel = { ...reel, id: reelId };
        set((state) => ({ reels: [newReel, ...state.reels] }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/reels`, reelId), newReel).catch((err: any) => {
            console.error('Failed to save reel to Firestore:', err);
          });
        }
      },

      updateReel: (id, updates) => {
        set((state) => ({
          reels: state.reels.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/reels`, id), updates).catch((err: any) => {
            console.error('Failed to update reel in Firestore:', err);
          });
        }
      },

      deleteReel: (id) => {
        set((state) => ({ reels: state.reels.filter((r) => r.id !== id) }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/reels`, id)).catch((err: any) => {
            console.error('Failed to delete reel from Firestore:', err);
          });
        }
      },

      // ─── Creator Guide CRUD actions ───────────────────────────────────
      addCreatorGuide: (guide) => {
        const guideId = `guide-${Date.now()}`;
        const newGuide: CreatorGuide = { ...guide, id: guideId };
        set((state) => ({ creatorGuides: [newGuide, ...state.creatorGuides] }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, setDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          setDoc(doc(firestore, `users/${userId}/guides`, guideId), newGuide).catch((err: any) => {
            console.error('Failed to save creator guide to Firestore:', err);
          });
        }
      },

      updateCreatorGuide: (id, updates) => {
        set((state) => ({
          creatorGuides: state.creatorGuides.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, updateDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          updateDoc(doc(firestore, `users/${userId}/guides`, id), updates).catch((err: any) => {
            console.error('Failed to update creator guide in Firestore:', err);
          });
        }
      },

      deleteCreatorGuide: (id) => {
        set((state) => ({ creatorGuides: state.creatorGuides.filter((g) => g.id !== id) }));

        const userId = get().userProfile.userId;
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          const { doc, deleteDoc } = require('firebase/firestore');
          const { firestore } = require('../services/firebase');
          deleteDoc(doc(firestore, `users/${userId}/guides`, id)).catch((err: any) => {
            console.error('Failed to delete creator guide from Firestore:', err);
          });
        }
      },

      // ─── Destructive actions ──────────────────────────────────────────
      clearAllData: async () => {
        const userId = get().userProfile.userId;

        // Clear local state
        set({
          plants: [],
          logs: [],
          tasks: [],
          clusters: [],
          posts: [],
          swaps: [],
          reels: [],
          creatorGuides: [],
          userProfile: emptyUserProfile,
        });

        // Clear AsyncStorage
        try {
          await AsyncStorage.removeItem('gardenpulse-state-store');
        } catch (err) {
          console.error('Failed to clear AsyncStorage:', err);
        }

        // Delete Firestore user document
        const { isFirebaseConfigured } = require('../services/firebase');
        if (userId && isFirebaseConfigured) {
          try {
            const { doc, deleteDoc } = require('firebase/firestore');
            const { firestore } = require('../services/firebase');
            await deleteDoc(doc(firestore, 'users', userId));
          } catch (err) {
            console.error('Failed to delete user document from Firestore:', err);
          }
        }
      }
    }),
    {
      name: 'gardenpulse-state-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
          
          // Trigger Firebase anonymous authentication if no userId is set
          if (!state.userProfile.userId) {
            try {
              const { signInAnonymously, isFirebaseConfigured } = require('../services/firebase');
              if (isFirebaseConfigured) {
                signInAnonymously()
                  .then((user: any) => {
                    state.updateProfile({ userId: user.uid });
                  })
                  .catch((err: any) => {
                    console.warn('Firebase anonymous sign in failed on hydration, falling back to local-mock-user-id:', err.message || err);
                    state.updateProfile({ userId: 'local-mock-user-id' });
                  });
              } else {
                state.updateProfile({ userId: 'local-mock-user-id' });
              }
            } catch (err) {
              console.warn('Failed to load Firebase service on hydration, falling back to local-mock-user-id:', err);
              state.updateProfile({ userId: 'local-mock-user-id' });
            }
          }
        }
      },
    }
  )
);
