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
  lightLevel?: 'Low' | 'Medium' | 'High';
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
    uvIndex?: number;
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
  lastUsedTool?: string;
  referralCount?: number;
}

// ─── Community Types ─────────────────────────────────────────────────────────

export interface Cluster {
  id: string;
  name: string;
  members: number;
  method: string;
  hasRecentActivity?: boolean;
  isJoined: boolean;
  location?: string;
  createdAt?: string;
  description?: string;
}

export interface CommunityPost {
  id: string;
  clusterId: string;
  username: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  methodTag: string;
  isLiked?: boolean;
  timestamp?: string;
}

export interface SwapItem {
  id: string;
  clusterId: string;
  itemName: string;
  type: string;
  location: string;
}

// ─── Reels Types ─────────────────────────────────────────────────────────────

export interface Reel {
  id: string;
  plantId?: string;
  plantName: string;
  dateRange: string;
  duration: string;
  methodTag: string;
  views: number;
  likes: number;
  videoUrl?: string;
}

// ─── Creator Studio Types ────────────────────────────────────────────────────

export interface CreatorGuide {
  id: string;
  title: string;
  status: 'Live' | 'Draft';
  views: number;
  revenue: string;
  content?: string;
}
