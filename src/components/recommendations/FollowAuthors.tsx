import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { UserPlus, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user/UserAvatar';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { authors } from '@/data/authors';

interface Author {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  reputation: number;
  post_count: number;
  comment_count: number;
  is_following: boolean;
}

export function FollowAuthors({ className, limit = 5 }: { className?: string; limit?: number }) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const { data: articles = [], isLoading } = useAnalytics({ type: undefined });

  // Calculate article counts per author dynamically (same logic as AuthorsPage)
  const authorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((article) => {
      if (article.author) {
        counts[article.author] = (counts[article.author] || 0) + 1;
      }
    });
    return counts;
  }, [articles]);

  // Get top authors sorted by article count (from /authors page)
  const topAuthors = useMemo(() => {
    return authors
      .map((author) => ({
        id: author.id,
        username: author.username,
        display_name: author.display_name,
        avatar_url: author.avatar_url,
        bio: author.bio,
        reputation: author.reputation,
        post_count: authorCounts[author.display_name] || 0,
        comment_count: author.comment_count,
        is_following: false,
      }))
      .sort((a, b) => b.post_count - a.post_count) // Sort by article count descending
      .slice(0, limit); // Get top N
  }, [authorCounts, limit]);

  const loading = isLoading;

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{t('followAuthors.title')}</h3>
        </div>
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (topAuthors.length === 0) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">{t('followAuthors.noAuthorsFound')}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">{t('followAuthors.title')}</h3>
      </div>

      <div className="space-y-3">
        {topAuthors.map((author) => {
          const profile = {
            id: author.id,
            username: author.username,
            display_name: author.display_name,
            avatar_url: author.avatar_url,
            reputation: author.reputation,
            post_count: author.post_count,
            comment_count: author.comment_count,
            bio: author.bio,
            privacy_level: 'public' as const,
          };

          return (
            <AuthorCard
              key={author.id}
              author={author}
              profile={profile}
              showFollowButton={!!user}
            />
          );
        })}
      </div>
      
      {!user && (
        <div className="text-center pt-2">
          <Link to="/auth/login" className="text-primary hover:underline text-sm">
            {t('buttons.signIn')} {t('followAuthors.signInToFollow')}
          </Link>
        </div>
      )}
    </div>
  );
}

function AuthorCard({
  author,
  profile,
  showFollowButton,
}: {
  author: Author;
  profile: any;
  showFollowButton: boolean;
}) {
  const { t } = useTranslation({ namespace: 'ui' });

  return (
    <div className="p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-all">
      <div className="flex items-center gap-3">
        <Link to={`/users/${author.id}`} className="flex-shrink-0">
          <UserAvatar profile={profile} size="md" showReputation />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/users/${author.id}`} className="block">
            <h4 className="font-medium text-sm hover:text-primary transition-colors">
              {author.display_name || author.username || t('common.anonymous')}
            </h4>
          </Link>
          {author.bio && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {author.bio}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {author.post_count}
            </span>
          </div>
        </div>
        {showFollowButton && (
          <Link to={`/users/${author.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 self-center"
            >
              <UserPlus className="h-3 w-3 mr-1" />
              {t('followAuthors.viewProfile', 'View')}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}