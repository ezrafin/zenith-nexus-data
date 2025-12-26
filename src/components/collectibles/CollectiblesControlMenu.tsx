import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { useUser } from '@/context/UserContext';
import { X, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

export function CollectiblesControlMenu() {
  const { user } = useUser();
  const { progress, collectedBills, legendarySpawn, hasAllRegularBills, loading } = useCollectibleBills();
  const [open, setOpen] = useState(false);
  const [allBills, setAllBills] = useState<Array<{ bill_id: string; name: string; rarity: 'regular' | 'legendary' }>>([]);

  // Load all bills
  useEffect(() => {
    const loadBills = async () => {
      const { data, error } = await supabase
        .from('collectible_bills')
        .select('bill_id, name, rarity')
        .order('rarity', { ascending: true })
        .order('bill_id', { ascending: true });

      if (!error && data) {
        setAllBills(data as Array<{ bill_id: string; name: string; rarity: 'regular' | 'legendary' }>);
      }
    };

    loadBills();
  }, []);

  if (!user || loading) {
    return null;
  }

  const collectedCount = progress.collected;
  const totalCount = progress.total;
  const progressPercent = (collectedCount / totalCount) * 100;

  return (
    <>
      {/* Fixed Button - Right side, 25% from top */}
      <motion.div
        className="fixed right-4 z-40"
        style={{ top: '25vh' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <motion.button
              className={cn(
                'relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 shadow-lg overflow-visible',
                'bg-gradient-to-br from-green-50 to-green-100 border-green-400 text-green-900',
                'dark:from-green-900/30 dark:to-green-800/30 dark:border-green-500 dark:text-green-200',
                'hover:scale-105 transition-all duration-200 cursor-pointer',
                'focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2',
                'active:scale-95'
              )}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ 
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            >
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400/20"
                initial={{ scale: 0, opacity: 0.6 }}
                whileTap={{
                  scale: 1.5,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              />

              {/* Bill Icon */}
              <motion.div 
                className="text-center font-bold text-lg md:text-xl relative z-10"
                whileTap={{ scale: 0.9 }}
              >
                <div className="text-[0.6em]">$</div>
                <div className="text-[0.8em]">100</div>
              </motion.div>

              {/* Progress Badge */}
              <motion.div
                className="absolute top-0 right-0 flex items-center justify-center min-w-[32px] h-7 px-2 rounded-full text-[10px] md:text-xs font-bold bg-primary text-primary-foreground border-2 border-background z-20 shadow-lg whitespace-nowrap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  transform: 'translate(30%, -30%)',
                }}
              >
                {collectedCount}/{totalCount}
              </motion.div>

            </motion.button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-[400px] md:w-[500px] overflow-y-auto"
          >
            {/* Добавляем SheetTitle и SheetDescription для доступности */}
            <SheetTitle className="sr-only">Bill Collection</SheetTitle>
            <SheetDescription className="sr-only">
              Collect all 42 $100 bills by exploring the platform. Track your progress and view collected bills.
            </SheetDescription>

            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Bill Collection
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Collect all 42 $100 bills!
                  </p>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {collectedCount} / {totalCount}
                  </span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {Math.round(progressPercent)}% complete
                </div>
              </div>

              {/* Legendary Bill Status */}
              {hasAllRegularBills && legendarySpawn && !collectedBills.includes('legendary_hidden_treasure') && (
                <div className="mb-6 p-4 rounded-lg border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-900/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                        Legendary Bill Spawned!
                      </div>
                      <div className="text-sm text-amber-800 dark:text-amber-300">
                        Visit an article page to find the legendary $100 bill.
                      </div>
                      {legendarySpawn && (
                        <div className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                          Hint: Check {legendarySpawn.articleType.replace('_', ' ')} articles
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bills List */}
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">All Bills</h3>
                <div className="space-y-2">
                  {allBills.map((bill) => {
                    const isCollected = collectedBills.includes(bill.bill_id);
                    const isLegendary = bill.rarity === 'legendary';
                    const isLegendaryLocked = isLegendary && !hasAllRegularBills;

                    return (
                      <div
                        key={bill.bill_id}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg border transition-colors',
                          isCollected
                            ? 'bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800'
                            : isLegendaryLocked
                            ? 'bg-muted/50 border-muted opacity-50'
                            : 'bg-card border-border hover:bg-secondary/50'
                        )}
                      >
                        {/* Bill Icon */}
                        <div
                          className={cn(
                            'flex-shrink-0 w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-xs',
                            isCollected
                              ? isLegendary
                                ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-400 text-amber-900 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-500 dark:text-amber-200'
                                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-400 text-green-900 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-500 dark:text-green-200'
                              : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                          )}
                        >
                          <div className="text-center leading-tight">
                            <div className="text-[0.5em]">$</div>
                            <div className="text-[0.7em]">100</div>
                          </div>
                          {isLegendary && (
                            <div className="absolute -top-0.5 -right-0.5 text-[0.4em]">⭐</div>
                          )}
                        </div>

                        {/* Bill Info */}
                        <div className="flex-1 min-w-0">
                          <div
                            className={cn(
                              'font-medium text-sm',
                              isCollected ? 'text-foreground' : 'text-muted-foreground',
                              isLegendaryLocked && 'blur-sm'
                            )}
                          >
                            {bill.name}
                            {isLegendary && (
                              <span className="ml-2 text-xs text-amber-500">⭐ Legendary</span>
                            )}
                          </div>
                          {isCollected && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                              ✓ Collected
                            </div>
                          )}
                          {isLegendaryLocked && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              Collect all 41 regular bills first
                            </div>
                          )}
                        </div>

                        {/* Status Icon */}
                        {isCollected && (
                          <div className="flex-shrink-0 text-green-500">
                            <Trophy className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
}

