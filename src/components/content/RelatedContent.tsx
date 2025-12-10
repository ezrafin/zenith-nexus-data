import { Link } from 'react-router-dom';
import { Newspaper, MessageSquare, FileText, Video, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedItem {
  type: 'article' | 'forum' | 'video' | 'analytics';
  id: string;
  title: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  className?: string;
}

export function RelatedContent({ items, className }: RelatedContentProps) {
  if (items.length === 0) return null;

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

  const getLink = (item: RelatedItem) => {
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

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-semibold text-lg mb-4">Related Content</h3>
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.id}`}
          to={getLink(item)}
          className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            {getIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </Link>
      ))}
    </div>
  );
}

