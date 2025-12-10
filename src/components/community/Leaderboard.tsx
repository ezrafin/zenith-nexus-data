import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { UserAvatar } from '@/components/user/UserAvatar';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardEntry {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  reputation: number;
  post_count: number;
  comment_count: number;
}

type LeaderboardType = 'reputation' | 'posts' | 'comments' | 'helpful';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<LeaderboardType>('reputation');

  useEffect(() => {
    loadLeaderboard();
  }, [type]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('user_profiles')
        .select('id, username, display_name, avatar_url, reputation, post_count, comment_count')
        .not('reputation', 'is', null)
        .limit(100);

      switch (type) {
        case 'reputation':
          query = query.order('reputation', { ascending: false });
          break;
        case 'posts':
          query = query.order('post_count', { ascending: false });
          break;
        case 'comments':
          query = query.order('comment_count', { ascending: false });
          break;
        case 'helpful':
          // Would need to calculate from reactions
          query = query.order('reputation', { ascending: false });
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
        return entry.reputation;
      case 'posts':
        return entry.post_count;
      case 'comments':
        return entry.comment_count;
      case 'helpful':
        return entry.reputation; // Placeholder
      default:
        return 0;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'reputation':
        return 'Reputation';
      case 'posts':
        return 'Posts';
      case 'comments':
        return 'Comments';
      case 'helpful':
        return 'Helpful';
      default:
        return '';
    }
  };

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Leaderboard
        </h2>
      </div>

      <Tabs value={type} onValueChange={(value) => setType(value as LeaderboardType)}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="reputation">Reputation</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="helpful">Helpful</TabsTrigger>
        </TabsList>

        <TabsContent value={type}>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} lines={1} />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No data available
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.slice(0, 20).map((entry, index) => {
                const rank = index + 1;
                const profile = {
                  id: entry.id,
                  username: entry.username,
                  display_name: entry.display_name,
                  avatar_url: entry.avatar_url,
                  reputation: entry.reputation,
                  post_count: entry.post_count,
                  comment_count: entry.comment_count,
                  bio: null,
                  privacy_level: 'public' as const,
                };

                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(rank)}
                    </div>
                    <UserAvatar profile={profile} size="sm" showReputation />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {entry.display_name || entry.username || 'Anonymous'}
                      </div>
                      <ReputationBadge profile={profile} size="sm" showLevel={false} />
                    </div>
                    <div className="text-right">
                      <div className="font-semibold tabular-nums">{getValue(entry).toLocaleString()}</div>
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

