import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import { useAuthorFollow } from '@/hooks/useAuthorFollow';
import { motion, AnimatePresence } from 'framer-motion';
import { checkmarkAnimation, prefersReducedMotion, transitions } from '@/lib/animations';

interface AuthorFollowButtonProps {
  authorId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function AuthorFollowButton({ 
  authorId, 
  className, 
  variant = 'outline', 
  size = 'sm' 
}: AuthorFollowButtonProps) {
  const { user } = useUser();
  const { isFollowing, loading, toggleFollow } = useAuthorFollow(authorId);

  if (!user) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleFollow}
      disabled={loading}
      loading={loading}
      aria-label={isFollowing ? 'Unfollow author' : 'Follow author'}
      className={cn('relative overflow-visible', isFollowing && 'bg-primary/10', className)}
    >
      <AnimatePresence mode="wait">
        {isFollowing ? (
          <motion.div
            key="following"
            initial={prefersReducedMotion() ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion() ? {} : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion() ? {} : { opacity: 0, scale: 0.8 }}
            transition={transitions.fast}
            className="flex items-center"
          >
            <motion.div
              animate={!prefersReducedMotion() ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={transitions.fast}
            >
              <UserCheck className="mr-2 h-4 w-4" />
            </motion.div>
            Following
          </motion.div>
        ) : (
          <motion.div
            key="follow"
            initial={prefersReducedMotion() ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion() ? {} : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion() ? {} : { opacity: 0, scale: 0.8 }}
            transition={transitions.fast}
            className="flex items-center"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Follow
          </motion.div>
        )}
      </AnimatePresence>
      {isFollowing && !prefersReducedMotion() && (
        <motion.div
          className="absolute -top-1 -right-1"
          initial={checkmarkAnimation.initial}
          animate={checkmarkAnimation.animate}
          transition={checkmarkAnimation.transition}
        >
          <div className="w-2 h-2 bg-primary rounded-full" />
        </motion.div>
      )}
    </Button>
  );
}

