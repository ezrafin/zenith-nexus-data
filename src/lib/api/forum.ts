import { supabase } from '@/integrations/supabase/client';
import type { ForumCategory, ForumTopic, ForumComment } from './types';
import { getAuthorAvatar } from './utils';
import { logger } from '@/lib/logger';

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
    logger.error('Error fetching forum categories:', error);
    if (import.meta.env.DEV) {
      return mockForumCategories;
    }
    return [];
  }
}

export async function fetchForumTopics(categoryId?: string): Promise<ForumTopic[]> {
  try {
    // Join with profiles to get real avatar_url and display_name
    let query = supabase
      .from('forum_discussions')
      .select(`
        *,
        profile:profiles!forum_discussions_user_id_fkey(
          display_name,
          avatar_url,
          reputation_score
        )
      `)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (categoryId) {
      query = query.eq('category', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return (data || []).map((topic) => {
      // Type-safe access to profile and other fields
      const topicWithExtras = topic as typeof topic & {
        profile?: {
          display_name?: string;
          avatar_url?: string;
          reputation_score?: number;
        } | null;
        symbol?: string;
        asset_type?: string;
        like_count?: number;
      };
      
      // Use profile data if available, fallback to stored author_name
      const authorName = topicWithExtras.profile?.display_name || topic.author_name;
      const authorAvatar = topicWithExtras.profile?.avatar_url || getAuthorAvatar(topic.author_name);
      const authorReputation = topicWithExtras.profile?.reputation_score;
      
      return {
        id: topic.id,
        categoryId: topic.category,
        title: topic.title,
        content: topic.content,
        author: authorName,
        authorId: topic.user_id ?? undefined,
        authorAvatar: authorAvatar,
        date: topic.created_at,
        replies: topic.reply_count || 0,
        views: topic.view_count || 0,
        lastActivity: topic.updated_at,
        like_count: topicWithExtras.like_count ?? 0,
        authorReputation: authorReputation ?? undefined,
        symbol: topicWithExtras.symbol ?? undefined,
        asset_type: (topicWithExtras.asset_type as ForumTopic['asset_type']) ?? undefined,
      };
    });
  } catch (error) {
    logger.error('Error fetching forum topics:', error);
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
    // Join with profiles to get real avatar_url and display_name
    const { data, error } = await supabase
      .from('forum_replies')
      .select(`
        *,
        profile:profiles!forum_replies_user_id_fkey(
          display_name,
          avatar_url,
          reputation_score
        )
      `)
      .eq('discussion_id', topicId)
      .order('created_at');
    
    if (error) throw error;
    
    return (data || []).map((reply) => {
      // Type-safe access to profile and other fields
      const replyWithExtras = reply as typeof reply & {
        profile?: {
          display_name?: string;
          avatar_url?: string;
          reputation_score?: number;
        } | null;
        reaction_count?: number;
      };
      
      // Use profile data if available, fallback to stored author_name
      const authorName = replyWithExtras.profile?.display_name || reply.author_name;
      const authorAvatar = replyWithExtras.profile?.avatar_url || getAuthorAvatar(reply.author_name);
      const authorReputation = replyWithExtras.profile?.reputation_score;
      
      return {
        id: reply.id,
        topicId: reply.discussion_id,
        author: authorName,
        authorId: reply.user_id ?? undefined,
        authorAvatar: authorAvatar,
        content: reply.content,
        date: reply.created_at,
        rating: replyWithExtras.reaction_count ?? 0,
        authorReputation: authorReputation ?? undefined,
      };
    });
  } catch (error) {
    logger.error('Error fetching forum comments:', error);
    if (import.meta.env.DEV) {
      return mockForumComments.filter(c => c.topicId === topicId);
    }
    return [];
  }
}

export async function fetchDiscussionsForWatchlist(userId: string): Promise<ForumTopic[]> {
  try {
    // RPC functions may not be fully typed in Database types - fallback to direct query
    const { data: watchlistData } = await supabase
      .from('watchlists')
      .select('id')
      .eq('user_id', userId);
    
    if (!watchlistData || watchlistData.length === 0) return [];
    
    const watchlistIds = watchlistData.map(w => w.id);
    
    const { data: itemsData } = await supabase
      .from('watchlist_items')
      .select('symbol')
      .in('watchlist_id', watchlistIds);
    
    if (!itemsData || itemsData.length === 0) return [];
    
    const symbols = [...new Set(itemsData.map(i => i.symbol))];
    
    // Get discussions that mention these symbols in tags, with profile join
    const { data, error } = await supabase
      .from('forum_discussions')
      .select(`
        *,
        profile:profiles!forum_discussions_user_id_fkey(
          display_name,
          avatar_url,
          reputation_score
        )
      `)
      .overlaps('tags', symbols)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (error) throw error;

    return (data || []).map((topic) => {
      const topicWithProfile = topic as typeof topic & {
        profile?: {
          display_name?: string;
          avatar_url?: string;
          reputation_score?: number;
        } | null;
      };
      
      const authorName = topicWithProfile.profile?.display_name || topic.author_name;
      const authorAvatar = topicWithProfile.profile?.avatar_url || getAuthorAvatar(topic.author_name);
      
      return {
        id: topic.id,
        categoryId: topic.category,
        title: topic.title,
        content: topic.content || '',
        author: authorName,
        authorId: topic.user_id ?? undefined,
        authorAvatar: authorAvatar,
        date: topic.created_at,
        replies: topic.reply_count || 0,
        views: topic.view_count || 0,
        lastActivity: topic.updated_at,
        like_count: 0,
        authorReputation: topicWithProfile.profile?.reputation_score ?? undefined,
        symbol: undefined,
        asset_type: undefined,
      };
    });
  } catch (error) {
    logger.error('Error fetching discussions for watchlist:', error);
    return [];
  }
}

export async function fetchTopicById(id: string): Promise<ForumTopic | null> {
  try {
    // Join with profiles to get real avatar_url and display_name
    const { data, error } = await supabase
      .from('forum_discussions')
      .select(`
        *,
        profile:profiles!forum_discussions_user_id_fkey(
          display_name,
          avatar_url,
          reputation_score
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // Type-safe access to profile
    const dataWithProfile = data as typeof data & {
      profile?: {
        display_name?: string;
        avatar_url?: string;
        reputation_score?: number;
      } | null;
    };
    
    // Use profile data if available, fallback to stored author_name
    const authorName = dataWithProfile.profile?.display_name || data.author_name;
    const authorAvatar = dataWithProfile.profile?.avatar_url || getAuthorAvatar(data.author_name);
    const authorReputation = dataWithProfile.profile?.reputation_score;
    
    return {
      id: data.id,
      categoryId: data.category,
      title: data.title,
      content: data.content,
      author: authorName,
      authorId: data.user_id ?? undefined,
      authorAvatar: authorAvatar,
      date: data.created_at,
      replies: data.reply_count || 0,
      views: data.view_count || 0,
      lastActivity: data.updated_at,
      authorReputation: authorReputation ?? undefined,
    };
  } catch (error) {
    console.error('Error fetching topic by id:', error);
    if (import.meta.env.DEV) {
      return mockForumTopics.find(topic => topic.id === id) || null;
    }
    return null;
  }
}
