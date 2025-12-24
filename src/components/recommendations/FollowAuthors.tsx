import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { UserPlus, UserCheck, TrendingUp, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user/UserAvatar';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { authors as allAuthors, type AuthorProfile } from '@/data/authors';

interface Author {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  reputation: number;
  post_count: number;
  comment_count: number;
  is_following: boolean;
}

const mapAuthor = (profile: AuthorProfile): Author => ({
  id: profile.id,
  username: profile.username,
  display_name: profile.display_name,
  avatar_url: profile.avatar_url,
  bio: profile.bio,
  reputation: profile.reputation,
  post_count: profile.post_count,
  comment_count: profile.comment_count,
  is_following: false,
});

export function FollowAuthors({ className, limit = 5 }: { className?: string; limit?: number }) {
  const { user } = useUser();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const topAuthors = allAuthors.slice(0, limit).map(mapAuthor);
      setAuthors(topAuthors);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [user, limit]);

  const toggleFollow = async (authorId: string, currentStatus: boolean) => {
    if (!user) {
      toast.error('Please sign in to follow authors');
      return;
    }

    // Mock toggle - in real implementation would use Supabase
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId ? { ...author, is_following: !currentStatus } : author
      )
    );

    toast.success(currentStatus ? 'Unfollowed' : 'Following');
  };

  if (!user) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground mb-2">Sign in to follow authors</p>
        <Link to="/auth/login" className="text-primary hover:underline text-sm">
          Sign in
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Top Authors</h3>
        </div>
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (authors.length === 0) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <p className="text-muted-foreground">No authors found</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Top Authors</h3>
      </div>

      <div className="space-y-3">
        {authors.map((author) => {
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
            <div
              key={author.id}
              className="p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Link to={`/users/${author.id}`} className="flex-shrink-0">
                  <UserAvatar profile={profile} size="md" showReputation />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/users/${author.id}`} className="block">
                    <h4 className="font-medium text-sm hover:text-primary transition-colors">
                      {author.display_name || author.username || 'Anonymous'}
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
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {author.comment_count}
                    </span>
                  </div>
                </div>
                <Button
                  variant={author.is_following ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => toggleFollow(author.id, author.is_following)}
                  className="flex-shrink-0 self-center"
                >
                  {author.is_following ? (
                    <>
                      <UserCheck className="h-3 w-3 mr-1" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3 mr-1" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
