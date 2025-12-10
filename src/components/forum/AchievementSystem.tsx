import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { achievements, Achievement, getRarityColor } from '@/data/achievements';
import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AchievementSystem() {
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
      const { data, error } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUnlockedAchievements(data?.map((a) => a.achievement_id) || []);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-medium">
            {unlockedAchievements.length} / {achievements.length}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Achievements</DialogTitle>
          <DialogDescription>
            Unlock achievements by participating in the community
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading achievements...</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="milestone">Milestone</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <AchievementGrid
                achievements={achievements}
                unlocked={unlockedAchievements}
              />
            </TabsContent>

            {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <AchievementGrid
                  achievements={categoryAchievements}
                  unlocked={unlockedAchievements}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AchievementGrid({ achievements, unlocked }: { achievements: Achievement[]; unlocked: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((achievement) => {
        const isUnlocked = unlocked.includes(achievement.id);
        return (
          <div
            key={achievement.id}
            className={cn(
              'p-4 rounded-lg border transition-all',
              isUnlocked
                ? 'border-primary/30 bg-primary/5'
                : 'border-border/50 bg-muted/30 opacity-60'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn('text-3xl', !isUnlocked && 'grayscale')}>
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={cn('font-semibold', isUnlocked ? 'text-foreground' : 'text-muted-foreground')}>
                    {achievement.name}
                  </h4>
                  {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-medium', getRarityColor(achievement.rarity))}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{achievement.points} pts</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

