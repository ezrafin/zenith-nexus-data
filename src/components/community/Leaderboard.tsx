import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { UserAvatar } from '@/components/user/UserAvatar';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocaleForLanguage } from '@/lib/i18n';

interface LeaderboardEntry {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  reputation_score: number;
  posts_count: number;
}

type LeaderboardType = 'reputation' | 'posts';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<LeaderboardType>('reputation');
  const { t, language } = useTranslation({ namespace: 'forum' });
  const locale = getLocaleForLanguage(language);

  useEffect(() => {
    loadLeaderboard();
  }, [type]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      let query = (supabase
        .from('profiles' as any)
        .select('id, username, display_name, avatar_url, reputation_score, posts_count') as any)
        .limit(100);

      switch (type) {
        case 'reputation':
          query = query.order('reputation_score', { ascending: false });
          break;
        case 'posts':
          query = query.order('posts_count', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-mono text-muted-foreground w-5 text-center">{rank}</span>;
  };

  const getValue = (entry: LeaderboardEntry) => {
    switch (type) {
      case 'reputation':
        return entry.reputation_score || 0;
      case 'posts':
        return entry.posts_count || 0;
      default:
        return 0;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'reputation':
        return t('leaderboard.labelReputation');
      case 'posts':
        return t('leaderboard.labelPosts');
      default:
        return '';
    }
  };

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {t('leaderboard.title')}
        </h2>
      </div>

      <Tabs value={type} onValueChange={(value) => setType(value as LeaderboardType)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="reputation">{t('leaderboard.tabReputation')}</TabsTrigger>
          <TabsTrigger value="posts">{t('leaderboard.tabPosts')}</TabsTrigger>
        </TabsList>

        <TabsContent value={type}>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} lines={1} />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium mb-2">
                {t('leaderboard.emptyTitle')}
              </p>
              <p className="text-sm">
                {t('leaderboard.emptyDescription')}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.slice(0, 10).map((entry, index) => {
                const rank = index + 1;
                const profile = {
                  id: entry.id,
                  username: entry.username,
                  display_name: entry.display_name,
                  avatar_url: entry.avatar_url,
                  reputation: entry.reputation_score || 0,
                  post_count: entry.posts_count || 0,
                  comment_count: 0,
                  bio: null,
                  privacy_level: 'public' as const,
                };

                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-6 sm:w-8 flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>
                    <UserAvatar profile={profile} size="sm" showReputation />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base truncate">
                        {entry.display_name || entry.username || t('leaderboard.anonymous')}
                      </div>
                      <ReputationBadge profile={profile} size="sm" showLevel={false} />
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-sm sm:text-base tabular-nums">
                        {getValue(entry).toLocaleString(locale)}
                      </div>
                      <div className="text-xs text-muted-foreground">{getLabel()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
