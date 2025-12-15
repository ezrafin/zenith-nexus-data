import { supabase } from '@/integrations/supabase/client';
import type { ForumCategory, ForumTopic, ForumComment } from './types';
import { getAuthorAvatar } from './utils';

// Mock Forum Data
const mockForumCategories: ForumCategory[] = [
  { id: 'general', name: 'General Discussion', description: 'General topics about investing and markets', topicCount: 12, postCount: 150 },
  { id: 'stocks', name: 'Stock Analysis', description: 'Discuss individual stocks and equity analysis', topicCount: 8, postCount: 120 },
  { id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, and other digital assets', topicCount: 15, postCount: 200 },
  { id: 'etfs', name: 'ETFs & Funds', description: 'Exchange-traded funds and mutual funds discussion', topicCount: 5, postCount: 80 },
  { id: 'beginners', name: 'Beginner Questions', description: 'New to investing? Ask your questions here', topicCount: 20, postCount: 250 },
  { id: 'news', name: 'Market News', description: 'Discuss breaking market news and events', topicCount: 10, postCount: 130 },
  { id: 'other', name: 'Other', description: "Topics that don't fit into other categories", topicCount: 0, postCount: 0 },
];

const mockForumTopics: ForumTopic[] = [
  { id: '1', categoryId: 'etfs', title: 'Best ETFs for Long-Term Investing in 2025', author: 'InvestorPro', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor', date: '2024-12-04', replies: 45, views: 1250, lastActivity: '2 hours ago' },
  { id: '2', categoryId: 'crypto', title: "Bitcoin $100K - What's Next?", author: 'CryptoKing', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto', date: '2024-12-03', replies: 128, views: 4500, lastActivity: '15 minutes ago' },
  { id: '3', categoryId: 'stocks', title: 'NVIDIA Q3 2024 Earnings Analysis', author: 'TechAnalyst', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', date: '2024-12-02', replies: 67, views: 2100, lastActivity: '1 hour ago' },
  { id: '4', categoryId: 'news', title: 'S&P 500 Year-End Forecast', author: 'MarketWatcher', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=market', date: '2024-12-01', replies: 89, views: 3200, lastActivity: '30 minutes ago' },
  { id: '5', categoryId: 'beginners', title: 'Dividend Strategies for Passive Income', author: 'DividendHunter', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dividend', date: '2024-11-30', replies: 156, views: 5600, lastActivity: '4 hours ago' },
];

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
    return mockForumCategories;
  }
}

export async function fetchForumTopics(categoryId?: string): Promise<ForumTopic[]> {
  try {
    let query = supabase
      .from('forum_discussions')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (categoryId) {
      query = query.eq('category', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return (data || []).map(topic => ({
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
    }));
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    if (categoryId) {
      return mockForumTopics.filter(t => t.categoryId === categoryId);
    }
    return mockForumTopics;
  }
}

export async function fetchForumComments(topicId: string): Promise<ForumComment[]> {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('discussion_id', topicId)
      .order('created_at');
    
    if (error) throw error;
    
    return (data || []).map(reply => ({
      id: reply.id,
      topicId: reply.discussion_id,
      author: reply.author_name,
      authorAvatar: getAuthorAvatar(reply.author_name),
      content: reply.content,
      date: reply.created_at,
      rating: 0,
    }));
  } catch (error) {
    console.error('Error fetching forum comments:', error);
    return mockForumComments.filter(c => c.topicId === topicId);
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
    return mockForumTopics.find(topic => topic.id === id) || null;
  }
}
