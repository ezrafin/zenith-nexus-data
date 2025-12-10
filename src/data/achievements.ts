export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: 'forum' | 'content' | 'social' | 'milestone';
}

export const achievements: Achievement[] = [
  // Forum Achievements
  {
    id: 'first_post',
    name: 'First Steps',
    description: 'Created your first forum discussion',
    icon: '📝',
    rarity: 'common',
    points: 10,
    category: 'forum',
  },
  {
    id: 'first_reply',
    name: 'Contributor',
    description: 'Posted your first reply',
    icon: '💬',
    rarity: 'common',
    points: 5,
    category: 'forum',
  },
  {
    id: 'helpful_answer',
    name: 'Helpful',
    description: 'Received 10 helpful reactions',
    icon: '👍',
    rarity: 'rare',
    points: 25,
    category: 'forum',
  },
  {
    id: 'insightful_post',
    name: 'Insightful',
    description: 'Received 10 insightful reactions',
    icon: '💡',
    rarity: 'rare',
    points: 30,
    category: 'forum',
  },
  {
    id: 'hundred_likes',
    name: 'Popular',
    description: 'Received 100 likes on your posts',
    icon: '⭐',
    rarity: 'epic',
    points: 50,
    category: 'forum',
  },
  {
    id: 'expert_analyst',
    name: 'Expert Analyst',
    description: 'Reached 500 reputation points',
    icon: '🎓',
    rarity: 'epic',
    points: 100,
    category: 'milestone',
  },
  {
    id: 'top_contributor',
    name: 'Top Contributor',
    description: 'Made 100 posts or replies',
    icon: '🏆',
    rarity: 'epic',
    points: 75,
    category: 'forum',
  },
  {
    id: 'guru',
    name: 'Guru',
    description: 'Reached 1000 reputation points',
    icon: '👑',
    rarity: 'legendary',
    points: 200,
    category: 'milestone',
  },
  {
    id: 'week_streak',
    name: 'Dedicated',
    description: '7-day activity streak',
    icon: '🔥',
    rarity: 'rare',
    points: 20,
    category: 'social',
  },
  {
    id: 'month_streak',
    name: 'Committed',
    description: '30-day activity streak',
    icon: '💪',
    rarity: 'epic',
    points: 100,
    category: 'social',
  },
  // Content Achievements
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 50 articles',
    icon: '📚',
    rarity: 'rare',
    points: 30,
    category: 'content',
  },
  {
    id: 'watchlist_master',
    name: 'Watchlist Master',
    description: 'Created 5 watchlists',
    icon: '👀',
    rarity: 'common',
    points: 15,
    category: 'content',
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return achievements.filter((a) => a.category === category);
}

export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-500';
    case 'rare':
      return 'text-blue-500';
    case 'epic':
      return 'text-purple-500';
    case 'legendary':
      return 'text-amber-500';
    default:
      return 'text-gray-500';
  }
}

