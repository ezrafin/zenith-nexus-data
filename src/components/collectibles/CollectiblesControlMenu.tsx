import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { useUser } from '@/context/UserContext';
import { X, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

export function CollectiblesControlMenu() {
  const { t } = useTranslation({ namespace: 'ui' });
  const { user } = useUser();
  const { progress, collectedBills, legendarySpawn, hasAllRegularBills, loading } = useCollectibleBills();
  const [open, setOpen] = useState(false);
  const [allBills, setAllBills] = useState<Array<{ bill_id: string; name: string; rarity: 'regular' | 'legendary' }>>([]);

  // Function to get translated bill name
  const getBillName = (billId: string, fallbackName: string): string => {
    const translationKey = `billCollection.billNames.${billId}`;
    const translated = t(translationKey);
    // If translation exists and is different from the key, use it; otherwise use fallback
    return translated !== translationKey ? translated : fallbackName;
  };

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
                'relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg overflow-visible',
                'hover:scale-105 transition-all duration-200 cursor-pointer',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
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
                className="absolute inset-0 rounded-full bg-primary/20"
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

              {/* Menu Image */}
              <motion.img 
                src="/menu.png"
                alt="Menu"
                className="w-full h-full object-contain relative z-10"
                whileTap={{ scale: 0.9 }}
              />

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

          <SheetContent closeAriaLabel={t('buttons.close')}
            side="right"
            className="w-full sm:w-[400px] md:w-[500px] overflow-y-auto"
          >
            {/* Добавляем SheetTitle и SheetDescription для доступности */}
            <SheetTitle className="sr-only">{t('billCollection.title')}</SheetTitle>
            <SheetDescription className="sr-only">
              {t('billCollection.subtitle')}
            </SheetDescription>

            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    {t('billCollection.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                    {t('billCollection.description')}
                  </p>
                </div>
              </div>

              {/* Progress Overview - Circular */}
              <div className="mb-6 flex flex-col items-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-4">
                  {/* Circular Progress Background */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      className="text-secondary"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      strokeLinecap="round"
                      className="text-emerald-500"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: progressPercent / 100 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      strokeDasharray={`${2 * Math.PI * 85}`}
                    />
                  </svg>
                  
                  {/* Center counter */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl md:text-4xl font-bold text-foreground">
                      {collectedCount}/{totalCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legendary Bill Status */}
              {hasAllRegularBills && legendarySpawn && !collectedBills.includes('legendary_hidden_treasure') && (
                <div className="mb-6 p-4 rounded-lg border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-900/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                        {t('billCollection.legendarySpawned')}
                      </div>
                      <div className="text-sm text-amber-800 dark:text-amber-300">
                        {t('billCollection.legendarySpawnedHint')}
                      </div>
                      {legendarySpawn && (
                        <div className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                          {t('billCollection.legendarySpawnedCheck', { articleType: legendarySpawn.articleType.replace('_', ' ') })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bills List */}
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">{t('billCollection.allBills')}</h3>
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
                        {/* Coin Icon */}
                        <div className="relative flex-shrink-0 w-10 h-10">
                          <img 
                            src="/coin.png"
                            alt="Coin"
                            className={cn(
                              'w-full h-full object-contain',
                              !isCollected && 'opacity-30 grayscale'
                            )}
                          />
                          {isLegendary && (
                            <div className="absolute -top-0.5 -right-0.5 text-xs">⭐</div>
                          )}
                        </div>

                        {/* Coin Info */}
                        <div className="flex-1 min-w-0">
                          <div
                            className={cn(
                              'font-medium text-sm',
                              isCollected ? 'text-foreground' : 'text-muted-foreground',
                              isLegendaryLocked && 'blur-sm'
                            )}
                          >
                            {getBillName(bill.bill_id, bill.name)}
                            {isLegendary && (
                              <span className="ml-2 text-xs text-amber-500">⭐ {t('billCollection.legendary')}</span>
                            )}
                          </div>
                          {isCollected && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                              ✓ {t('billCollection.collected')}
                            </div>
                          )}
                          {isLegendaryLocked && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {t('billCollection.collectAllRegularFirst')}
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

