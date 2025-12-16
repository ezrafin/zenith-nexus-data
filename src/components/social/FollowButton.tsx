import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useUserFollow } from '@/hooks/useUserFollow';

interface FollowButtonProps {
  userId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function FollowButton({ userId, className, variant = 'outline', size = 'sm' }: FollowButtonProps) {
  const { user } = useUser();
  const { isFollowing, loading, toggleFollow } = useUserFollow(userId);

  if (!user || user.id === userId) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleFollow}
      disabled={loading}
      className={cn(isFollowing && 'bg-primary/10', className)}
    >
      {isFollowing ? (
        <>
          <UserCheck className="mr-2 h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
}
