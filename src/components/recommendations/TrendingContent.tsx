import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, MessageSquare, FileText, Newspaper, Video, Clock, Eye, ThumbsUp } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

interface TrendingItem {
  id: string;
  type: 'article' | 'forum' | 'video' | 'analytics' | 'news';
  title: string;
  views?: number;
  likes?: number;
  comments?: number;
  created_at: string;
  author?: string;
}

export function TrendingContent({ className, limit = 10 }: { className?: string; limit?: number }) {
  const { t } = useTranslation({ namespace: 'ui' });
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');

  useEffect(() => {
    loadTrending();
  }, [timeframe]);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const now = new Date();
      let startDate: Date;

      switch (timeframe) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setDate(now.getDate() - 30));
          break;
        default:
          startDate = new Date(now.setDate(now.getDate() - 7));
      }

      const trendingItems: TrendingItem[] = [];

      // Get trending forum discussions
      const { data: forumData } = await supabase
        .from('forum_discussions')
        .select('id, title, created_at, view_count, reply_count, author_name')
        .gte('created_at', startDate.toISOString())
        .order('view_count', { ascending: false })
        .limit(limit);

      if (forumData) {
        forumData.forEach((item: any) => {
          trendingItems.push({
            id: item.id,
            type: 'forum',
            title: item.title,
            views: item.view_count || 0,
            comments: item.reply_count || 0,
            created_at: item.created_at,
            author: item.author_name || 'Anonymous',
          });
        });
      }

      // Get trending news articles
      const { data: newsData } = await supabase
        .from('news_articles')
        .select('id, title, published_at, author')
        .gte('published_at', startDate.toISOString())
        .order('published_at', { ascending: false })
        .limit(limit);

      if (newsData) {
        newsData.forEach((item: any) => {
          trendingItems.push({
            id: item.id,
            type: 'news',
            title: item.title,
            created_at: item.published_at,
            author: item.author || 'Unknown',
          });
        });
      }

      // Sort by engagement score (views + comments)
      trendingItems.sort((a, b) => {
        const scoreA = (a.views || 0) + (a.likes || 0) * 2 + (a.comments || 0) * 1.5;
        const scoreB = (b.views || 0) + (b.likes || 0) * 2 + (b.comments || 0) * 1.5;
        return scoreB - scoreA;
      });

      setTrending(trendingItems.slice(0, limit));
    } catch (error) {
      console.error('Error loading trending content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      case 'forum':
        return <MessageSquare className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'analytics':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getLink = (item: TrendingItem) => {
    switch (item.type) {
      case 'forum':
        return `/forum/${item.id}`;
      case 'article':
      case 'news':
        return `/news/${item.id}`;
      case 'video':
        return `/video/${item.id}`;
      case 'analytics':
        return `/analytics/${item.id}`;
      default:
        return '#';
    }
  };

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{t('trendingContent.title')}</h3>
        </div>
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (trending.length === 0) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">{t('trendingContent.noTrendingContent')}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{t('trendingContent.title')}</h3>
        </div>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as 'today' | 'week' | 'month')}>
          <TabsList className="h-8">
            <TabsTrigger value="today" className="text-xs">{t('trendingContent.today')}</TabsTrigger>
            <TabsTrigger value="week" className="text-xs">{t('trendingContent.week')}</TabsTrigger>
            <TabsTrigger value="month" className="text-xs">{t('trendingContent.month')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {trending.map((item, index) => (
          <Link
            key={`${item.type}-${item.id}`}
            to={getLink(item)}
            className="block p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {getIcon(item.type)}
                </div>
                {index < 3 && (
                  <div className="mt-1 text-center">
                    <span className="text-xs font-bold text-primary">#{index + 1}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  {item.views !== undefined && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views}
                    </span>
                  )}
                  {item.likes !== undefined && (
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {item.likes}
                    </span>
                  )}
                  {item.author && (
                    <span className="truncate">{t('common.by')} {item.author}</span>
                  )}
                  <span className="flex items-center gap-1 ml-auto">
                    <Clock className="h-3 w-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
