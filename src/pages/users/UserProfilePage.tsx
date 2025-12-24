import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { UserAvatar } from '@/components/user/UserAvatar';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { FollowButton } from '@/components/social/FollowButton';
import { UserActivity } from '@/components/social/UserActivity';
import { AchievementSystem } from '@/components/forum/AchievementSystem';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { UserProfile } from '@/hooks/useAuth';
import { MessageSquare, TrendingUp, BookOpen, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';

export default function UserProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useUser();
  
  // Bill collection: profile_own_visit or profile_other_visit
  const isOwnProfile = currentUser?.id === userId;
  const { collectBill } = useCollectibleBills();
  usePageBillCollection({ 
    billId: isOwnProfile ? 'profile_own_visit' : 'profile_other_visit' 
  });
  const { userId } = useParams();
  const { user: currentUser, profile: currentProfile } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [joinedAt, setJoinedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId, currentUser, currentProfile]);

  const loadFollowStats = async (targetUserId: string) => {
    const [{ count: followers }, { count: following }] = await Promise.all([
      supabase
        .from('user_follows' as any)
        .select('*', { count: 'exact', head: true })
        .eq('followed_id', targetUserId),
      supabase
        .from('user_follows' as any)
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', targetUserId),
    ]);

    setFollowerCount(followers || 0);
    setFollowingCount(following || 0);
  };

  const loadProfile = async () => {
    if (!userId) return;

    // Check if viewing own profile
    if (currentUser && currentUser.id === userId && currentProfile) {
      setProfile({
        id: currentUser.id,
        username: currentProfile.username || null,
        display_name: currentProfile.display_name || currentUser.email || 'User',
        bio: currentProfile.bio || null,
        avatar_url: currentProfile.avatar_url || null,
        reputation: currentProfile.reputation || 0,
        post_count: currentProfile.post_count || 0,
        comment_count: currentProfile.comment_count || 0,
        privacy_level: 'public',
      });
      // Fetch joined date from profiles table
      const { data: profileData } = await (supabase
        .from('profiles' as any)
        .select('joined_at')
        .eq('id', currentUser.id)
        .maybeSingle() as any);
      if (profileData?.joined_at) {
        setJoinedAt(profileData.joined_at);
      }
      await loadFollowStats(currentUser.id);
      setLoading(false);
      return;
    }

    // Load profile from database for other users
    try {
      const { data, error } = await (supabase
        .from('profiles' as any)
        .select('*')
        .eq('id', userId)
        .maybeSingle() as any);

      if (error) throw error;

      if (data) {
        setProfile({
          id: data.id,
          username: data.username || null,
          display_name: data.display_name || data.username || 'User',
          bio: data.bio || null,
          avatar_url: data.avatar_url || null,
          reputation: data.reputation_score || 0,
          post_count: data.posts_count || 0,
          comment_count: 0,
          privacy_level: 'public',
        });
        setJoinedAt(data.joined_at || data.created_at);
        await loadFollowStats(data.id);
      } else {
        // User not found in profiles
        setProfile({
          id: userId,
          username: null,
          display_name: 'Unknown User',
          bio: 'This user profile is not available',
          avatar_url: null,
          reputation: 0,
          post_count: 0,
          comment_count: 0,
          privacy_level: 'public',
        });
      }
      await loadFollowStats(userId);
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile({
        id: userId,
        username: null,
        display_name: 'Unknown User',
        bio: 'This user profile is not available',
        avatar_url: null,
        reputation: 0,
        post_count: 0,
        comment_count: 0,
        privacy_level: 'public',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatJoinedDate = (date: string | null): string => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-spacing">
          <div className="container-wide max-w-4xl">
            <SkeletonCard lines={4} />
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="section-spacing">
          <div className="container-wide max-w-4xl text-center">
            <h1 className="heading-lg mb-4">User not found</h1>
            <Link to="/forum" className="text-primary hover:underline">
              Back to forum
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs pageTitle={profile.display_name || profile.username || 'User profile'} />
          {/* Profile Header */}
          <div className="premium-card p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <UserAvatar profile={profile} size="lg" showReputation />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="heading-md mb-2">
                      {profile.display_name || 'Anonymous'}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Member since {formatJoinedDate(joinedAt)}
                    </p>
                  </div>
                  {!isOwnProfile && (
                    <FollowButton userId={userId!} />
                  )}
                </div>

                {profile.bio && (
                  <p className="text-muted-foreground mb-4">{profile.bio}</p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium">{profile.reputation}</span>
                    <span className="text-muted-foreground">Reputation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">{profile.post_count}</span>
                    <span className="text-muted-foreground">Posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium">{profile.comment_count}</span>
                    <span className="text-muted-foreground">Comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{followerCount}</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{followingCount}</span>
                    <span className="text-muted-foreground">Following</span>
                  </div>
                </div>

                <div className="mt-4">
                  <ReputationBadge profile={profile} size="md" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <div className="premium-card p-6">
                <h2 className="font-heading font-semibold text-lg mb-6">Recent Activity</h2>
                <UserActivity userId={userId!} />
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="premium-card p-6">
                <h2 className="font-heading font-semibold text-lg mb-6">Achievements</h2>
                {isOwnProfile ? (
                  <AchievementSystem />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Sign in to view achievements</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
