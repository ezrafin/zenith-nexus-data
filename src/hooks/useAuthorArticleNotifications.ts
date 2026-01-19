import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';
import { authors } from '@/data/authors';

/**
 * Hook to check for new articles from followed authors and create notifications
 * Since articles are static files, we compare article counts to detect new articles
 */
export function useAuthorArticleNotifications() {
  const { user } = useUser();
  const { data: articles = [] } = useAnalytics({ type: undefined });
  const lastArticleCountRef = useRef<number>(0);

  useEffect(() => {
    const checkForNewArticles = async () => {
      if (!user || !articles.length) {
        return;
      }

      // Only check if article count has changed (to avoid duplicate checks)
      if (articles.length === lastArticleCountRef.current) {
        return;
      }
      
      lastArticleCountRef.current = articles.length;

      try {
        // Get all followed authors
        const { data: followedAuthors, error: followError } = await supabase
          .from('author_follows')
          .select('author_id, last_article_count')
          .eq('user_id', user.id);

        if (followError) {
          logger.error('Error fetching followed authors:', followError);
          return;
        }

        if (!followedAuthors || followedAuthors.length === 0) {
          return;
        }

        // Calculate current article counts per author
        const currentCounts: Record<string, number> = {};
        articles.forEach((article) => {
          if (article.author) {
            currentCounts[article.author] = (currentCounts[article.author] || 0) + 1;
          }
        });

        // Check each followed author for new articles
        for (const follow of followedAuthors) {
          const authorId = follow.author_id;
          const lastCount = follow.last_article_count || 0;
          
          // Find author by ID to get display name
          const author = authors.find((a) => a.id === authorId);
          if (!author) continue;

          // Get current count for this author (by display_name)
          const currentCount = currentCounts[author.display_name] || 0;

          if (currentCount > lastCount && lastCount > 0) {
            // New articles detected - create notification
            const newArticleCount = currentCount - lastCount;
            
            const { error: notifError } = await supabase
              .from('notifications')
              .insert({
                user_id: user.id,
                type: 'new_article_by_followed_author',
                title: 'New article published',
                body: `${author.display_name} published ${newArticleCount > 1 ? `${newArticleCount} new articles` : 'a new article'}`,
                url: '/analytics',
                data: {
                  author_id: authorId,
                  author_name: author.display_name,
                  article_count: newArticleCount,
                },
              });

            if (notifError) {
              logger.error('Error creating notification:', notifError);
            }

            // Update last_article_count
            const { error: updateError } = await supabase
              .from('author_follows')
              .update({ last_article_count: currentCount })
              .eq('user_id', user.id)
              .eq('author_id', authorId);

            if (updateError) {
              logger.error('Error updating article count:', updateError);
            }
          } else if (lastCount === 0 && currentCount > 0) {
            // First time checking - just update the count, don't notify
            const { error: updateError } = await supabase
              .from('author_follows')
              .update({ last_article_count: currentCount })
              .eq('user_id', user.id)
              .eq('author_id', authorId);

            if (updateError) {
              logger.error('Error updating article count:', updateError);
            }
          }
        }
      } catch (error) {
        logger.error('Error checking for new articles:', error);
      }
    };

    // Small delay to ensure articles are loaded
    const timeoutId = setTimeout(() => {
      checkForNewArticles();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, articles]);
}

