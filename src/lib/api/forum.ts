import { supabase } from '@/integrations/supabase/client';
import type { ForumCategory, ForumTopic, ForumComment } from './types';
import { getAuthorAvatar } from './utils';

/**
 * @deprecated Fallback-only mock data for development.
 * @fallback-only Used only when Supabase API fails in DEV mode.
 * @todo Remove after Supabase API is fully stabilized.
 * 
 * Dev-only mock forum data for local development. In production we rely on
 * real Supabase data and use mocks only in development builds.
 */
const mockForumCategories: ForumCategory[] = [
  { id: 'general', name: 'General Discussion', description: 'General topics about investing and markets', topicCount: 12, postCount: 150 },
  { id: 'stocks', name: 'Stock Analysis', description: 'Discuss individual stocks and equity analysis', topicCount: 8, postCount: 120 },
  { id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, and other digital assets', topicCount: 15, postCount: 200 },
  { id: 'etfs', name: 'ETFs & Funds', description: 'Exchange-traded funds and mutual funds discussion', topicCount: 5, postCount: 80 },
  { id: 'beginners', name: 'Beginner Questions', description: 'New to investing? Ask your questions here', topicCount: 20, postCount: 250 },
  { id: 'news', name: 'Market News', description: 'Discuss breaking market news and events', topicCount: 10, postCount: 130 },
  { id: 'other', name: 'Other', description: "Topics that don't fit into other categories", topicCount: 0, postCount: 0 },
];

/**
 * @deprecated Fallback-only mock data for development.
 * @fallback-only Used only when Supabase API fails in DEV mode.
 */
const mockForumTopics: ForumTopic[] = [
  { id: '1', categoryId: 'etfs', title: 'Best ETFs for Long-Term Investing in 2025', author: 'InvestorPro', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor', date: '2024-12-04', replies: 45, views: 1250, lastActivity: '2 hours ago' },
  { id: '2', categoryId: 'crypto', title: "Bitcoin $100K - What's Next?", author: 'CryptoKing', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto', date: '2024-12-03', replies: 128, views: 4500, lastActivity: '15 minutes ago' },
  { id: '3', categoryId: 'stocks', title: 'NVIDIA Q3 2024 Earnings Analysis', author: 'TechAnalyst', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', date: '2024-12-02', replies: 67, views: 2100, lastActivity: '1 hour ago' },
  { id: '4', categoryId: 'news', title: 'S&P 500 Year-End Forecast', author: 'MarketWatcher', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=market', date: '2024-12-01', replies: 89, views: 3200, lastActivity: '30 minutes ago' },
  { id: '5', categoryId: 'beginners', title: 'Dividend Strategies for Passive Income', author: 'DividendHunter', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dividend', date: '2024-11-30', replies: 156, views: 5600, lastActivity: '4 hours ago' },
];

/**
 * @deprecated Fallback-only mock data for development.
 * @fallback-only Used only when Supabase API fails in DEV mode.
 */
const mockForumComments: ForumComment[] = [
  { id: '1', topicId: '1', author: 'ValueInvestor', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=value', content: 'VOO and VTI remain the best choice for most investors. Low fees and broad diversification.', date: '2024-12-04 10:30', rating: 45 },
  { id: '2', topicId: '1', author: 'GrowthSeeker', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=growth', content: "Don't forget about QQQ for tech sector exposure. Excellent returns over the past years.", date: '2024-12-04 11:15', rating: 32 },
];

export async function fetchForumCategories(): Promise<ForumCategory[]> {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return (data || []).map(cat => ({
      id: cat.slug,
      name: cat.name,
      description: cat.description || '',
      topicCount: cat.topic_count || 0,
      postCount: 0,
    }));
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    if (import.meta.env.DEV) {
      return mockForumCategories;
    }
    return [];
  }
}

export async function fetchForumTopics(categoryId?: string): Promise<ForumTopic[]> {
  try {
    let query = supabase
      .from('forum_discussions')
      .select('*')
      .eq('hidden', false) // Filter out hidden discussions
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (categoryId) {
      query = query.eq('category', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return (data || []).map((topic: any) => ({
      id: topic.id,
      categoryId: topic.category,
      title: topic.title,
      content: topic.content,
      author: topic.author_name,
      authorId: topic.user_id,
      authorAvatar: getAuthorAvatar(topic.author_name),
      date: topic.created_at,
      replies: topic.reply_count || 0,
      views: topic.view_count || 0,
      lastActivity: topic.updated_at,
      like_count: topic.like_count,
      authorReputation: (topic as any).author_reputation ?? undefined,
      symbol: topic.symbol ?? undefined,
      asset_type: topic.asset_type ?? undefined,
    }));
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    if (import.meta.env.DEV) {
      if (categoryId) {
        return mockForumTopics.filter(t => t.categoryId === categoryId);
      }
      return mockForumTopics;
    }
    return [];
  }
}

export async function fetchForumComments(topicId: string): Promise<ForumComment[]> {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('discussion_id', topicId)
      .eq('hidden', false) // Filter out hidden replies
      .order('created_at');
    
    if (error) throw error;
    
    return (data || []).map((reply: any) => ({
      id: reply.id,
      topicId: reply.discussion_id,
      author: reply.author_name,
      authorId: reply.user_id,
      authorAvatar: getAuthorAvatar(reply.author_name),
      content: reply.content,
      date: reply.created_at,
      rating: reply.reaction_count ?? 0,
      authorReputation: (reply as any).author_reputation ?? undefined,
    }));
  } catch (error) {
    console.error('Error fetching forum comments:', error);
    if (import.meta.env.DEV) {
      return mockForumComments.filter(c => c.topicId === topicId);
    }
    return [];
  }
}

export async function fetchDiscussionsForWatchlist(userId: string): Promise<ForumTopic[]> {
  try {
    const { data, error } = await (supabase.rpc as any)('get_discussions_for_watchlist', {
      p_user_id: userId,
    });

    if (error) throw error;

    return ((data || []) as any[]).map((topic: any) => ({
      id: topic.id,
      categoryId: topic.category,
      title: topic.title,
      content: topic.content,
      author: topic.author_name,
      authorAvatar: getAuthorAvatar(topic.author_name),
      date: topic.created_at,
      replies: topic.reply_count || 0,
      views: topic.view_count || 0,
      lastActivity: topic.updated_at,
      like_count: topic.like_count,
      symbol: topic.symbol ?? undefined,
      asset_type: topic.asset_type ?? undefined,
    }));
  } catch (error) {
    console.error('Error fetching discussions for watchlist:', error);
    return [];
  }
}

export async function fetchTopicById(id: string): Promise<ForumTopic | null> {
  try {
    const { data, error } = await supabase
      .from('forum_discussions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      categoryId: data.category,
      title: data.title,
      content: data.content,
      author: data.author_name,
      authorAvatar: getAuthorAvatar(data.author_name),
      date: data.created_at,
      replies: data.reply_count || 0,
      views: data.view_count || 0,
      lastActivity: data.updated_at,
    };
  } catch (error) {
    console.error('Error fetching topic by id:', error);
    if (import.meta.env.DEV) {
      return mockForumTopics.find(topic => topic.id === id) || null;
    }
    return null;
  }
}
