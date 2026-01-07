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
              
              {/* Coin Image */}
              <img 
                src="/coin.png"
                alt="Coin"
                className="w-full h-full object-contain"
              />
              {rarity === 'legendary' && (
                <div className="absolute -top-1 -right-1 text-lg">⭐</div>
              )}
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

