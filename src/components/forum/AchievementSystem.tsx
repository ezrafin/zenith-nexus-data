import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { achievements, Achievement, getRarityColor } from '@/data/achievements';
import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';
interface AchievementSystemProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}
export function AchievementSystem({
  open: controlledOpen,
  onOpenChange,
  trigger
}: AchievementSystemProps = {}) {
  const { t } = useTranslation({ namespace: 'forum' });
  const {
    user
  } = useUser();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange || (() => {}) : setInternalOpen;
  useEffect(() => {
    if (user) {
      loadAchievements();
    } else {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (open && user) {
      loadAchievements();
    }
  }, [open, user]);
  const loadAchievements = async () => {
    if (!user) return;
    try {
      const {
        data,
        error
      } = await (supabase.from('user_achievements' as any).select('achievement_id').eq('user_id', user.id) as any);
      if (error) throw error;
      setUnlockedAchievements(data?.map((a: any) => a.achievement_id) || []);
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
  return <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>}
      {!trigger && <DialogTrigger asChild>
          
        </DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('achievements.dialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('achievements.dialogDescription')}
          </DialogDescription>
        </DialogHeader>

        {loading ? <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {t('achievements.loading')}
            </p>
          </div> : <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">{t('achievements.tabsAll')}</TabsTrigger>
              <TabsTrigger value="forum">{t('achievements.tabsForum')}</TabsTrigger>
              <TabsTrigger value="content">{t('achievements.tabsContent')}</TabsTrigger>
              <TabsTrigger value="social">{t('achievements.tabsSocial')}</TabsTrigger>
              <TabsTrigger value="milestone">{t('achievements.tabsMilestone')}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <AchievementGrid achievements={achievements} unlocked={unlockedAchievements} />
            </TabsContent>

            {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => <TabsContent key={category} value={category} className="mt-4">
                <AchievementGrid achievements={categoryAchievements} unlocked={unlockedAchievements} />
              </TabsContent>)}
          </Tabs>}
      </DialogContent>
    </Dialog>;
}
function AchievementGrid({
  achievements,
  unlocked
}: {
  achievements: Achievement[];
  unlocked: string[];
}) {
  const { t } = useTranslation({ namespace: 'forum' });
  if (achievements.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="font-medium mb-2">
          {t('achievements.emptyCategory')}
        </p>
      </div>
    );
  }

  const hasUnlocked = achievements.some(a => unlocked.includes(a.id));

  return (
    <>
      {!hasUnlocked && unlocked.length === 0 && (
        <div className="text-center py-8 mb-4 text-muted-foreground border border-border/50 rounded-lg bg-muted/30">
          <Lock className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium mb-1">
            {t('achievements.noneUnlockedTitle')}
          </p>
          <p className="text-sm">
            {t('achievements.noneUnlockedDescription')}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map(achievement => {
      const isUnlocked = unlocked.includes(achievement.id);
      return <div key={achievement.id} className={cn('p-4 rounded-lg border transition-all', isUnlocked ? 'border-primary/30 bg-primary/5' : 'border-border/50 bg-muted/30 opacity-60')}>
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
                  <span className="text-xs text-muted-foreground">
                    {achievement.points} {t('achievements.pointsSuffix')}
                  </span>
                </div>
              </div>
            </div>
          </div>;
    })}
    </div>
    </>
  );
}