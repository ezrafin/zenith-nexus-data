import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, FileText, Clock } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';

interface ActivityItem {
  id: string;
  type: 'post' | 'reply';
  title: string;
  content?: string;
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
      // Get recent discussions
      const { data: postsData } = await supabase
        .from('forum_discussions')
        .select('id, title, created_at, author_name')
        .order('created_at', { ascending: false })
        .limit(10);

      // Get recent replies
      const { data: repliesData } = await supabase
        .from('forum_replies')
        .select('id, content, created_at, discussion_id, author_name')
        .order('created_at', { ascending: false })
        .limit(10);

      const activitiesList: ActivityItem[] = [];

      if (postsData) {
        postsData.forEach((post: any) => {
          activitiesList.push({
            id: post.id,
            type: 'post',
            title: post.title,
            user_name: post.author_name || 'Anonymous',
            user_avatar: '',
            created_at: post.created_at,
            link: `/forum/${post.id}`,
          });
        });
      }

      if (repliesData) {
        repliesData.forEach((reply: any) => {
          activitiesList.push({
            id: reply.id,
            type: 'reply',
            title: 'Replied to discussion',
            content: reply.content?.substring(0, 100),
            user_name: reply.author_name || 'Anonymous',
            user_avatar: '',
            created_at: reply.created_at,
            link: `/forum/${reply.discussion_id}`,
          });
        });
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
        <p className="text-muted-foreground mb-2">No activity yet</p>
        <p className="text-sm text-muted-foreground">
          Community activity will appear here
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
            key={`${activity.type}-${activity.id}`}
            to={activity.link}
            className="block p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{activity.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.type === 'post' ? 'created a discussion' : 'replied'}
                  </span>
                </div>
                <div className="font-medium text-sm mb-1 line-clamp-1">{activity.title}</div>
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
