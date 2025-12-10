import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

export function useReadingHistory() {
  const { user } = useUser();

  const addToHistory = async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number = 0
  ) => {
    if (!user) return;

    try {
      await supabase.from('user_reading_history').insert({
        user_id: user.id,
        content_type: contentType,
        content_id: contentId,
        progress_percent: progressPercent,
      });
    } catch (error) {
      // Ignore errors (e.g., duplicate entries)
      console.error('Error adding to reading history:', error);
    }
  };

  const updateProgress = async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number
  ) => {
    if (!user) return;

    try {
      await supabase
        .from('user_reading_history')
        .upsert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
          progress_percent: progressPercent,
        });
    } catch (error) {
      console.error('Error updating reading progress:', error);
    }
  };

  return {
    addToHistory,
    updateProgress,
  };
}

