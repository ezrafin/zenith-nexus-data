import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, FileText, Clock } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/skeleton-card';

interface ActivityItem {
  id: string;
  type: 'post' | 'reply';
  title: string;
  content?: string;
  created_at: string;
  link: string;
}

export function UserActivity({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, [userId]);

  const loadActivity = async () => {
    setLoading(true);
    try {
      const { data: repliesData } = await supabase
        .from('forum_replies')
        .select('id, content, created_at, discussion_id, author_name')
        .eq('author_name', 'Anonymous')
        .order('created_at', { ascending: false })
        .limit(10);

      const activitiesList: ActivityItem[] = [];

      if (repliesData) {
        repliesData.forEach((reply: any) => {
          activitiesList.push({
            id: reply.id,
            type: 'reply',
            title: 'Replied to discussion',
            content: reply.content?.substring(0, 100),
            created_at: reply.created_at,
            link: `/forum/${reply.discussion_id}`,
          });
        });
      }

      setActivities(activitiesList.slice(0, 20));
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No activity yet</p>
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
              <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
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
