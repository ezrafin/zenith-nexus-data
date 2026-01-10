import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, FileText, Clock, Star } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { useFollowingList } from '@/hooks/useFollowingList';

interface ActivityItem {
  id: string;
  type: 'post' | 'reply' | 'evaluation';
  title: string;
  content?: string;
  user_name: string;
  user_id?: string;
  user_avatar: string;
  created_at: string;
  link: string;
}

export function ActivityFeed() {
  const { user } = useUser();
  const { followingIds } = useFollowingList();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadActivityFeed();
    } else {
      setLoading(false);
    }
  }, [user, followingIds]);

  const loadActivityFeed = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // If user has following, filter by following users, otherwise show all
      const shouldFilterByFollowing = followingIds.length > 0;

      const activitiesList: ActivityItem[] = [];

      // Get recent discussions from followed users
      let postsQuery = supabase
        .from('forum_discussions')
        .select('id, title, created_at, author_name, user_id')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(shouldFilterByFollowing ? 20 : 10);

      if (shouldFilterByFollowing) {
        postsQuery = postsQuery.in('user_id', followingIds);
      }

      const { data: postsData } = await postsQuery;

      if (postsData) {
        postsData.forEach((post: any) => {
          activitiesList.push({
            id: post.id,
            type: 'post',
            title: post.title,
            user_name: post.author_name || 'Anonymous',
            user_id: post.user_id,
            user_avatar: '',
            created_at: post.created_at,
            link: `/forum/${post.id}`,
          });
        });
      }

      // Get recent replies from followed users
      let repliesQuery = supabase
        .from('forum_replies')
        .select('id, content, created_at, discussion_id, author_name, user_id')
        .order('created_at', { ascending: false })
        .limit(shouldFilterByFollowing ? 20 : 10);

      if (shouldFilterByFollowing) {
        repliesQuery = repliesQuery.in('user_id', followingIds);
      }

      const { data: repliesData } = await repliesQuery;

      if (repliesData) {
        repliesData.forEach((reply: any) => {
          activitiesList.push({
            id: reply.id,
            type: 'reply',
            title: 'Replied to discussion',
            content: reply.content?.substring(0, 100),
            user_name: reply.author_name || 'Anonymous',
            user_id: reply.user_id,
            user_avatar: '',
            created_at: reply.created_at,
            link: `/forum/${reply.discussion_id}`,
          });
        });
      }

      // Get company evaluations from followed users
      if (shouldFilterByFollowing) {
        const { data: evaluationsData } = await supabase
          .from('company_evaluations')
          .select('id, company_slug, rating, comment, created_at, user_id')
          .in('user_id', followingIds)
          .order('created_at', { ascending: false })
          .limit(10);

        if (evaluationsData) {
          // Get user profiles for evaluations
          const userIds = [...new Set(evaluationsData.map(e => e.user_id))];
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, display_name')
            .in('id', userIds);

          const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

          evaluationsData.forEach((item: any) => {
            const profile = profileMap.get(item.user_id);
            activitiesList.push({
              id: item.id,
              type: 'evaluation',
              title: `Rated ${item.company_slug}`,
              content: item.comment || `Rating: ${item.rating}/100`,
              user_name: profile?.display_name || 'User',
              user_id: item.user_id,
              user_avatar: '',
              created_at: item.created_at,
              link: `/companies/${item.company_slug}`,
            });
          });
        }
      }

      // Sort by date
      activitiesList.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setActivities(activitiesList.slice(0, 15));
    } catch (error) {
      console.error('Error loading activity feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="premium-card p-6 text-center">
        <p className="text-muted-foreground mb-4">Sign in to see community activity</p>
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
        <p className="text-muted-foreground mb-2">No recent activity yet</p>
        <p className="text-sm text-muted-foreground">
          Community activity will appear here when discussions and replies are posted
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const Icon = activity.type === 'post' 
          ? FileText 
          : activity.type === 'evaluation' 
          ? Star 
          : MessageSquare;
        return (
          <Link
            key={`${activity.type}-${activity.id}`}
            to={activity.link}
            className="block p-2 sm:p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-xs sm:text-sm">{activity.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.type === 'post' 
                      ? 'created a discussion' 
                      : activity.type === 'evaluation'
                      ? 'rated a company'
                      : 'replied'}
                  </span>
                </div>
                <div className="font-medium text-xs sm:text-sm mb-1 line-clamp-1">{activity.title}</div>
                {activity.content && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1 sm:mb-2">
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
