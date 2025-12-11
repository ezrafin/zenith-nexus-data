import { useUser } from '@/context/UserContext';

export function useReadingHistory() {
  const { user } = useUser();

  const addToHistory = async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number = 0
  ) => {
    if (!user) return;
    // Mock - would use Supabase in real implementation
    console.log('Added to history:', { contentType, contentId, progressPercent });
  };

  const updateProgress = async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number
  ) => {
    if (!user) return;
    // Mock - would use Supabase in real implementation
    console.log('Updated progress:', { contentType, contentId, progressPercent });
  };

  return { addToHistory, updateProgress };
}
