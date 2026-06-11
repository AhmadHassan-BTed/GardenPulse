// ─────────────────────────────────────────────────────────────────────────────
// index.ts — GardenPulse Data Models
// Strict TypeScript types for the offline-first Zustand state engine.
// ─────────────────────────────────────────────────────────────────────────────

export type GrowingMethod = 'Soil' | 'Container' | 'Hydro' | 'Indoor';
export type GrowingStage = 'Seedling' | 'Veg' | 'Bloom';
export type HealthStatus = 'healthy' | 'warning' | 'critical';
export type TaskType = 'Water' | 'Feed' | 'Prune' | 'Check' | 'Harvest';

export interface Plant {
  id: string;
  name: string;
  nickname?: string;
  method: GrowingMethod;
  stage: GrowingStage;
  dateAdded: string;
  zone: string;
  containerSize?: string;
  healthScore: number; // 0-100
  healthStatus: HealthStatus;
  lastLoggedDays: number;
  imageUrl?: string;
  isArchived: boolean;
  archivedDate?: string;
  causeOfDeath?: string;
}

export interface LogEntry {
  id: string;
  plantId: string;
  timestamp: string; // ISO String or readable date
  activities: string[]; // e.g. ["Watered", "Fed", "Pruned"]
  metrics?: {
    ph?: number;
    ec?: number;
    moisture?: number;
    temp?: number;
  };
  notes: string;
  hasVoiceNote: boolean;
  imageUrl?: string;
}

export interface Task {
  id: string;
  plantId: string;
  plantName: string;
  taskType: TaskType;
  dueDate: string; // ISO String
  isDone: boolean;
  completedDate?: string;
}

export interface UserProfile {
  id: string;
  userId?: string;
  name: string;
  growerTag: string;
  avatarUrl?: string;
  isSupporter: boolean;
  streakCount: number;
  longestStreak: number;
  challengesWon: number;
}
