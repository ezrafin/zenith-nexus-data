import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, FileText, TrendingUp, Clock } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';

interface ActivityItem {
  id: string;
  type: 'post' | 'reply' | 'reaction';
  title: string;
  content?: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  created_at: string;
  link: string;
}

export function ActivityFeed() {
  const { user } = useUser();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadActivityFeed();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadActivityFeed = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get users that current user follows
      const { data: followingData } = await supabase
        .from('user_follows')
        .select('following_id')
        .eq('follower_id', user.id);

      if (!followingData || followingData.length === 0) {
        setLoading(false);
        return;
      }

      const followingIds = followingData.map((f) => f.following_id);

      // Get recent posts from followed users
      const { data: postsData } = await supabase
        .from('forum_discussions')
        .select('id, title, created_at, user_id, user_profiles(username, display_name, avatar_url)')
        .in('user_id', followingIds)
        .order('created_at', { ascending: false })
        .limit(20);

      // Get recent replies from followed users
      const { data: repliesData } = await supabase
        .from('forum_replies')
        .select('id, content, created_at, discussion_id, user_id, user_profiles(username, display_name, avatar_url)')
        .in('user_id', followingIds)
        .order('created_at', { ascending: false })
        .limit(20);

      const activitiesList: ActivityItem[] = [];

      if (postsData) {
        postsData.forEach((post: any) => {
          const profile = post.user_profiles;
          activitiesList.push({
            id: post.id,
            type: 'post',
            title: post.title,
            user_id: post.user_id,
            user_name: profile?.display_name || profile?.username || 'Anonymous',
            user_avatar: profile?.avatar_url || '',
            created_at: post.created_at,
            link: `/forum/${post.id}`,
          });
        });
      }

      if (repliesData) {
        repliesData.forEach((reply: any) => {
          const profile = reply.user_profiles;
          activitiesList.push({
            id: reply.id,
            type: 'reply',
            title: 'Replied to discussion',
            content: reply.content.substring(0, 100),
            user_id: reply.user_id,
            user_name: profile?.display_name || profile?.username || 'Anonymous',
            user_avatar: profile?.avatar_url || '',
            created_at: reply.created_at,
            link: `/forum/${reply.discussion_id}`,
          });
        });
      }

      // Sort by date
      activitiesList.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setActivities(activitiesList.slice(0, 20));
    } catch (error) {
      console.error('Error loading activity feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="premium-card p-6 text-center">
        <p className="text-muted-foreground mb-4">Sign in to see activity from users you follow</p>
        <Link to="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="premium-card p-6 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground mb-2">No activity yet</p>
        <p className="text-sm text-muted-foreground">
          Follow users to see their activity here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const Icon = activity.type === 'post' ? FileText : MessageSquare;
        return (
          <Link
            key={activity.id}
            to={activity.link}
            className="block p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <img
                src={activity.user_avatar || '/placeholder-avatar.png'}
                alt={activity.user_name}
                className="w-8 h-8 rounded-full bg-muted"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{activity.user_name}</span>
                  <Icon className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="font-medium text-sm mb-1">{activity.title}</div>
                {activity.content && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {activity.content}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(activity.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

