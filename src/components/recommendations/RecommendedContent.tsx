import { useEffect, useState } from 'react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Link } from 'react-router-dom';
import { Newspaper, MessageSquare, FileText, Video, Sparkles } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface RecommendedContentProps {
  className?: string;
  limit?: number;
}

export function RecommendedContent({ className, limit = 5 }: RecommendedContentProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const { recommendations, loading } = useRecommendations();

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

  const getLink = (rec: { type: string; id: string }) => {
    switch (rec.type) {
      case 'forum':
        return `/forum/${rec.id}`;
      case 'article':
      case 'news':
        return `/news/${rec.id}`;
      case 'video':
        return `/video/${rec.id}`;
      case 'analytics':
        return `/analytics/${rec.id}`;
      default:
        return '#';
    }
  };

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{t('recommendedContent.title')}</h3>
        </div>
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">{t('recommendedContent.noRecommendations')}</p>
        <p className="text-xs text-muted-foreground mt-1">{t('recommendedContent.exploreContent')}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">{t('recommendedContent.title')}</h3>
      </div>
      {recommendations.slice(0, limit).map((rec) => (
        <Link
          key={`${rec.type}-${rec.id}`}
          to={getLink(rec)}
          className="block p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all group"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              {getIcon(rec.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {rec.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {rec.type === 'forum' ? t('recommendedContent.trendingDiscussion') : 
                 rec.type === 'news' ? t('recommendedContent.latestNews') : 
                 rec.reason}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

