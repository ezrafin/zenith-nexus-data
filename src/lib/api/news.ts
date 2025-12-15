import type { NewsItem } from './types';

// Mock News Data
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'S&P 500 Reaches New All-Time High Amid Tech Rally',
    excerpt: 'Major indices surge as technology stocks lead the market higher, with the S&P 500 breaking through previous resistance levels.',
    content: 'The S&P 500 index reached a new all-time high today...',
    date: '2024-12-04',
    source: 'Market Watch',
    market: 'indices',
  },
];

export async function fetchNews(filters?: { market?: string; source?: string }): Promise<NewsItem[]> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(100);
    
    if (filters?.market && filters.market !== 'all') {
      query = query.eq('market', filters.market);
    }
    
    if (filters?.source) {
      query = query.eq('source_name', filters.source);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching news:', error);
      let result = [...mockNews];
      if (filters?.market && filters.market !== 'all') {
        result = result.filter(item => item.market === filters.market);
      }
      return result;
    }
    
    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || article.excerpt || '',
      date: article.published_at,
      source: article.source_name,
      market: (article.market as NewsItem['market']) || 'general',
      imageUrl: article.image_url || undefined,
    }));
  } catch (error) {
    console.error('Error in fetchNews:', error);
    let result = [...mockNews];
    if (filters?.market && filters.market !== 'all') {
      result = result.filter(item => item.market === filters.market);
    }
    return result;
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching news by id:', error);
      return mockNews.find(item => item.id === id) || null;
    }
    
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || data.excerpt || '',
      date: data.published_at,
      source: data.source_name,
      market: (data.market as NewsItem['market']) || 'general',
      imageUrl: data.image_url || undefined,
    };
  } catch (error) {
    console.error('Error in fetchNewsById:', error);
    return mockNews.find(item => item.id === id) || null;
  }
}
