import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  profile: UserProfile | null;
  size?: 'sm' | 'md' | 'lg';
  showReputation?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
};

const badgeSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function UserAvatar({ profile, size = 'md', showReputation = false, className }: UserAvatarProps) {
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 500) return { level: 'Guru', color: 'bg-amber-500' };
    if (reputation >= 100) return { level: 'Expert', color: 'bg-purple-500' };
    if (reputation >= 50) return { level: 'Active', color: 'bg-green-500' };
    if (reputation >= 10) return { level: 'Member', color: 'bg-blue-500' };
    return { level: 'Newbie', color: 'bg-muted' };
  };

  const reputationInfo = profile ? getReputationLevel(profile.reputation) : null;

  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || 'User'} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(profile?.display_name || profile?.username)}
        </AvatarFallback>
      </Avatar>
      {showReputation && reputationInfo && (
        <div
          className={cn(
            'absolute -bottom-1 -right-1 rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-bold',
            badgeSizes[size],
            reputationInfo.color
          )}
          title={`${reputationInfo.level} (${profile.reputation} reputation)`}
        >
          {profile.reputation >= 100 ? '★' : profile.reputation >= 50 ? '▲' : '•'}
        </div>
      )}
    </div>
  );
}

