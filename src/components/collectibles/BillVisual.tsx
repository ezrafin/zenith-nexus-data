import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BillVisualProps {
  billId: string;
  rarity: 'regular' | 'legendary';
  onCollect: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

export function BillVisual({
  billId,
  rarity,
  onCollect,
  className,
  size = 'md',
  position,
}: BillVisualProps) {
  const [isCollecting, setIsCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 md:w-12 md:h-12',
    md: 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20',
    lg: 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24',
  };

  const handleClick = () => {
    if (isCollecting || isCollected) return;
    
    setIsCollecting(true);
    onCollect();
    
    // After animation completes, mark as collected
    setTimeout(() => {
      setIsCollected(true);
    }, 800);
  };

  if (isCollected) {
    return null; // Don't render after collection
  }

  return (
    <AnimatePresence>
      {!isCollected && (
        <motion.div
          className={cn(
            'fixed z-40 cursor-pointer select-none',
            sizeClasses[size],
            className
          )}
          style={position}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -5, 0],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Bill Container */}
          <motion.div
            className="relative w-full h-full"
            animate={isCollecting ? {
              scale: [1, 1.2, 0.8, 0],
              rotate: [0, 15, -15, 0],
              opacity: [1, 1, 0.5, 0],
            } : {
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
          >
            {/* Bill SVG/Image */}
            <div className="relative w-full h-full">
              {/* Glow effect for legendary */}
              {rarity === 'legendary' && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-amber-400/30 blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
              
              {/* $100 Bill Design */}
              <div className={cn(
                'w-full h-full rounded-lg border-2 flex flex-col items-center justify-center font-bold text-xs md:text-sm lg:text-base',
                rarity === 'legendary' 
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-400 text-amber-900 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-500 dark:text-amber-200'
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-400 text-green-900 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-500 dark:text-green-200'
              )}>
                <div className="text-center leading-tight">
                  <div className="text-[0.6em] md:text-[0.7em] lg:text-[0.8em]">$</div>
                  <div className="text-[0.8em] md:text-[1em] lg:text-[1.2em]">100</div>
                </div>
                {rarity === 'legendary' && (
                  <div className="absolute -top-1 -right-1 text-[0.5em]">⭐</div>
                )}
              </div>
            </div>

            {/* Particle effects on click */}
            <AnimatePresence>
              {isCollecting && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [0, 1.5],
                        x: Math.cos((i * 2 * Math.PI) / 5) * 30,
                        y: Math.sin((i * 2 * Math.PI) / 5) * 30,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: 'easeOut',
                      }}
                    >
                      <span className="text-lg">✨</span>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

