import { Plant, LogEntry, Task, UserProfile, Cluster, CommunityPost, SwapItem, Reel, CreatorGuide } from '../types';

export const demoUserProfile: UserProfile = {
  id: 'demo-user',
  userId: 'demo-user-id',
  name: 'Jane Appleseed',
  growerTag: 'jane_grows',
  avatarUrl: undefined, // uses placeholder-avatar.png
  isSupporter: true,
  streakCount: 18,
  longestStreak: 45,
  challengesWon: 4,
  lastUsedTool: 'Smart Scheduler',
  referralCount: 5,
};

export const demoPlants: Plant[] = [
  {
    id: 'plant-demo-1',
    name: 'Monstera Deliciosa',
    nickname: 'Monty',
    method: 'Indoor',
    stage: 'Veg',
    dateAdded: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    zone: 'Zone 9a',
    containerSize: '12-inch Pot',
    healthScore: 95,
    healthStatus: 'healthy',
    lastLoggedDays: 0,
    lightLevel: 'Medium',
    isArchived: false,
  },
  {
    id: 'plant-demo-2',
    name: 'Sweet Basil',
    nickname: 'Pesto Prince',
    method: 'Container',
    stage: 'Bloom',
    dateAdded: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    zone: 'Zone 9a',
    containerSize: '6-inch Pot',
    healthScore: 88,
    healthStatus: 'healthy',
    lastLoggedDays: 1,
    lightLevel: 'High',
    isArchived: false,
  },
  {
    id: 'plant-demo-3',
    name: 'Cherry Tomatoes',
    nickname: 'Ruby Drops',
    method: 'Container',
    stage: 'Bloom',
    dateAdded: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString(),
    zone: 'Zone 9a',
    containerSize: '10-gallon Grow Bag',
    healthScore: 72,
    healthStatus: 'warning',
    lastLoggedDays: 2,
    lightLevel: 'High',
    isArchived: false,
  },
  {
    id: 'plant-demo-4',
    name: 'Golden Pothos',
    nickname: 'Ivy',
    method: 'Indoor',
    stage: 'Veg',
    dateAdded: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(),
    zone: 'Zone 9a',
    healthScore: 98,
    healthStatus: 'healthy',
    lastLoggedDays: 4,
    lightLevel: 'Low',
    isArchived: false,
  },
];

export const demoLogs: LogEntry[] = [
  {
    id: 'log-demo-1',
    plantId: 'plant-demo-1',
    timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    activities: ['Watered', 'Pruned'],
    metrics: { moisture: 65, temp: 22, ph: 6.2, ec: 1.2, uvIndex: 4 },
    notes: 'Pruned two yellowing bottom leaves. Soil moisture is perfect after watering. Added organic fertilizer.',
    hasVoiceNote: true,
  },
  {
    id: 'log-demo-2',
    plantId: 'plant-demo-2',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    activities: ['Check'],
    metrics: { moisture: 45, temp: 24, ph: 6.0, ec: 1.1, uvIndex: 5 },
    notes: 'Leaves are smelling great! Pinching off flowers to encourage bushy growth.',
    hasVoiceNote: false,
  },
];

export const demoTasks: Task[] = [
  {
    id: 'task-demo-1',
    plantId: 'plant-demo-1',
    plantName: 'Monstera Deliciosa',
    taskType: 'Water',
    dueDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
    isDone: false,
  },
  {
    id: 'task-demo-2',
    plantId: 'plant-demo-2',
    plantName: 'Sweet Basil',
    taskType: 'Harvest',
    dueDate: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    isDone: false,
  },
  {
    id: 'task-demo-3',
    plantId: 'plant-demo-3',
    plantName: 'Cherry Tomatoes',
    taskType: 'Feed',
    dueDate: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    isDone: false,
  },
  {
    id: 'task-demo-4',
    plantId: 'plant-demo-4',
    plantName: 'Golden Pothos',
    taskType: 'Check',
    dueDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    isDone: true,
    completedDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
];

export const demoClusters: Cluster[] = [
  {
    id: 'cluster-demo-1',
    name: 'Container Gardening Club',
    members: 142,
    method: 'Container',
    hasRecentActivity: true,
    isJoined: true,
    location: 'Metro Area',
    description: 'Share tips for growing vegetables, herbs, and flowers in pots, grow bags, and small spaces.',
  },
  {
    id: 'cluster-demo-2',
    name: 'Hydroponics & Aero Enthusiasts',
    members: 89,
    method: 'Hydro',
    hasRecentActivity: false,
    isJoined: false,
    location: 'Global',
    description: 'All things water-grown: DWC, NFT, aeroponics, nutrients, and DIY setups.',
  },
];

export const demoPosts: CommunityPost[] = [
  {
    id: 'post-demo-1',
    clusterId: 'cluster-demo-1',
    username: 'green_thumb_bob',
    content: 'Just harvested my first batch of pot-grown radishes! Super crispy. Used standard organic potting mix.',
    likesCount: 12,
    commentsCount: 3,
    methodTag: 'Container',
    isLiked: true,
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'post-demo-2',
    clusterId: 'cluster-demo-1',
    username: 'flora_explorer',
    content: 'Anyone else noticing early blight on tomato containers? Need suggestions on natural fungicides.',
    likesCount: 4,
    commentsCount: 8,
    methodTag: 'Container',
    isLiked: false,
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
];

export const demoSwaps: SwapItem[] = [
  {
    id: 'swap-demo-1',
    clusterId: 'cluster-demo-1',
    itemName: 'Heirloom Tomato Seedlings (x3)',
    type: 'Offer',
    location: 'Downtown (2.5 mi)',
  },
  {
    id: 'swap-demo-2',
    clusterId: 'cluster-demo-1',
    itemName: 'Variegated Monstera Albo Cutting',
    type: 'Request',
    location: 'North Heights (4.0 mi)',
  },
];

export const demoSuccessStats = [
  { plantName: 'Monstera Deliciosa', successRate: 94, growerCount: 320, trend: 'up' as const },
  { plantName: 'Sweet Basil', successRate: 88, growerCount: 510, trend: 'flat' as const },
  { plantName: 'Cherry Tomatoes', successRate: 76, growerCount: 420, trend: 'down' as const },
];

export const demoFeaturedWinner = {
  username: 'joshua_green',
  challengeName: 'Best Patio Harvest 2026',
  methodTag: 'Container',
  prizeLabel: 'Premium Golden Trowel',
};

export const demoReels: Reel[] = [
  {
    id: 'reel-demo-1',
    plantName: 'Monstera Deliciosa',
    dateRange: 'Jan - Jun',
    duration: '15s',
    methodTag: 'Indoor',
    views: 1240,
    likes: 340,
  },
  {
    id: 'reel-demo-2',
    plantName: 'Cherry Tomatoes',
    dateRange: 'Mar - Jun',
    duration: '12s',
    methodTag: 'Container',
    views: 850,
    likes: 195,
  },
];

export const demoCreatorGuides: CreatorGuide[] = [
  {
    id: 'guide-demo-1',
    title: 'Hydroponic Strawberry Farming in Small Spaces',
    status: 'Live',
    views: 3200,
    revenue: '$142.50',
  },
  {
    id: 'guide-demo-2',
    title: 'Propagating Rare Aroids: The Sphagnum Method',
    status: 'Draft',
    views: 0,
    revenue: '$0.00',
  },
];
