import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { achievements, Achievement, getRarityColor } from '@/data/achievements';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AchievementList() {
  const { user } = useUser();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAchievements();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAchievements = async () => {
    if (!user) return;
    try {
      const { data, error } = await (supabase
        .from('user_achievements' as any)
        .select('achievement_id')
        .eq('user_id', user.id) as any);
      if (error) throw error;
      setUnlockedAchievements(data?.map((a: any) => a.achievement_id) || []);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-xs text-muted-foreground">Loading achievements...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {achievements.map((achievement) => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        return (
          <div
            key={achievement.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg border transition-all',
              isUnlocked
                ? 'border-primary/30 bg-primary/5 opacity-100'
                : 'border-border/50 bg-muted/30 opacity-50'
            )}
          >
            <div className={cn('text-2xl flex-shrink-0', !isUnlocked && 'grayscale opacity-60')}>
              {achievement.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4
                  className={cn(
                    'text-sm font-semibold truncate',
                    isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {achievement.name}
                </h4>
                {!isUnlocked && <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-medium', getRarityColor(achievement.rarity))}>
                  {achievement.rarity.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{achievement.points} pts</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

