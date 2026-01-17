import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { requestNotificationPermission, showNotification, formatNotificationMessage } from '@/lib/notifications';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { useAuthorArticleNotifications } from '@/hooks/useAuthorArticleNotifications';

/**
 * NotificationManager component
 * Handles push notification initialization and real-time notification listening
 */
export function NotificationManager() {
  const { user } = useUser();
  const { preferences } = useUserPreferences();
  
  // Check for new articles from followed authors
  useAuthorArticleNotifications();

  useEffect(() => {
    if (!user || !preferences.push_notifications) {
      return;
    }

    // Request notification permission when user enables push notifications
    requestNotificationPermission().then((granted) => {
      if (!granted) {
        logger.warn('Notification permission not granted');
      }
    });
  }, [user, preferences.push_notifications]);

  useEffect(() => {
    if (!user || !preferences.push_notifications) {
      return;
    }

    // Subscribe to real-time notifications
    const channel: RealtimeChannel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new as {
            type: string;
            title: string;
            body: string;
            url?: string;
            data?: Record<string, any>;
          };

          // Format notification without translation dependency
          const formatted = formatNotificationMessage(
            notification.type as any,
            {
              authorName: notification.data?.authorName || notification.data?.author_name,
              discussionTitle: notification.data?.discussionTitle,
              reactionType: notification.data?.reactionType,
              articleTitle: notification.data?.articleTitle,
              articleCount: notification.data?.article_count,
            }
          );

          // Show browser notification
          showNotification({
            type: notification.type as any,
            title: formatted.title || notification.title,
            body: formatted.body || notification.body,
            url: notification.url,
            icon: '/favicon.png',
            data: notification.data,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, preferences.push_notifications]);

  return null;
}

