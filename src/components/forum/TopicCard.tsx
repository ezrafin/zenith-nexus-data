import { Link } from 'react-router-dom';
import { MessageCircle, Clock, Eye, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ForumTopic } from '@/lib/api/index';
import { AssetBadge } from './AssetBadge';
import { TopicStatusBadge } from './TopicStatusBadge';
import { formatRelativeTime } from '@/lib/utils/date';

interface TopicCardProps {
  topic: ForumTopic;
  categoryName?: string;
  index?: number;
  language?: string;
  showExcerpt?: boolean;
}

export function TopicCard({ topic, categoryName, index = 0, language = 'en', showExcerpt = true }: TopicCardProps) {
  const isNew = new Date(topic.date).getTime() > Date.now() - 24 * 60 * 60 * 1000;
  const isHot = topic.replies > 10 || topic.views > 100;
  const excerpt = topic.content ? topic.content.substring(0, 100).trim() + (topic.content.length > 100 ? '...' : '') : '';

  return (
    <Link
      to={`/forum/${topic.id}`}
      className={cn(
        'group flex flex-col md:flex-row items-start gap-4 p-4 md:p-6',
        'hover:bg-secondary/50 transition-all duration-200',
        'border-b border-border/60 last:border-b-0',
        'forum-topic-card',
        topic.is_pinned && 'bg-primary/5 border-l-4 border-l-primary'
      )}
    >
      {/* Author avatar */}
      <div className="flex-shrink-0">
        <img
          src={topic.authorAvatar}
          alt={topic.author}
          className="w-12 h-12 rounded-full bg-muted ring-2 ring-background group-hover:ring-primary/20 transition-all"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 w-full">
        {/* Title and Status */}
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-medium text-base md:text-lg group-hover:text-primary transition-colors flex-1 min-w-0">
            <span className="line-clamp-2">{topic.title}</span>
          </h3>
          <TopicStatusBadge
            isPinned={topic.is_pinned}
            isFeatured={topic.is_featured}
            isNew={isNew}
            isHot={isHot}
            className="flex-shrink-0"
          />
        </div>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{excerpt}</p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">{topic.author}</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3.5" />
            {formatRelativeTime(new Date(topic.lastActivity), language)}
          </span>
          {categoryName && (
            <>
              <span className="hidden sm:inline">•</span>
              <span className="badge-secondary text-[10px] px-2 py-0.5">{categoryName}</span>
            </>
          )}
          {topic.symbol && <AssetBadge symbol={topic.symbol} assetType={topic.asset_type} />}
        </div>

        {/* Mobile stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 sm:hidden">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="tabular-nums">{topic.replies}</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span className="tabular-nums">{topic.views}</span>
          </span>
          {topic.like_count !== undefined && topic.like_count > 0 && (
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="tabular-nums">{topic.like_count}</span>
            </span>
          )}
        </div>
      </div>

      {/* Desktop stats */}
      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span className="tabular-nums font-medium">{topic.replies}</span>
          </div>
          <span className="text-[10px]">replies</span>
        </div>
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            <span className="tabular-nums font-medium">{topic.views}</span>
          </div>
          <span className="text-[10px]">views</span>
        </div>
        {topic.like_count !== undefined && topic.like_count > 0 && (
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4" />
              <span className="tabular-nums font-medium">{topic.like_count}</span>
            </div>
            <span className="text-[10px]">likes</span>
          </div>
        )}
      </div>
    </Link>
  );
}

