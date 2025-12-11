import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FollowButtonProps {
  userId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function FollowButton({ userId, className, variant = 'outline', size = 'sm' }: FollowButtonProps) {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (!user) {
      toast.error('Please sign in to follow users');
      return;
    }

    if (user.id === userId) {
      return;
    }

    setLoading(true);
    // Mock toggle - would use Supabase in real implementation
    setTimeout(() => {
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? 'Unfollowed' : 'Following');
      setLoading(false);
    }, 300);
  };

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
