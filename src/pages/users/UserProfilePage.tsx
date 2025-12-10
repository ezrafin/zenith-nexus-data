import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { UserAvatar } from '@/components/user/UserAvatar';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { FollowButton } from '@/components/social/FollowButton';
import { UserActivity } from '@/components/social/UserActivity';
import { AchievementSystem } from '@/components/forum/AchievementSystem';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { UserProfile } from '@/hooks/useAuth';
import { MessageSquare, TrendingUp, BookOpen, Mail, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';

export default function UserProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (userId) {
      loadProfile();
      loadFollowCounts();
    }
  }, [userId]);

  const loadProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowCounts = async () => {
    if (!userId) return;

    try {
      const [followersData, followingData] = await Promise.all([
        supabase
          .from('user_follows')
          .select('id', { count: 'exact', head: true })
          .eq('following_id', userId),
        supabase
          .from('user_follows')
          .select('id', { count: 'exact', head: true })
          .eq('follower_id', userId),
      ]);

      setFollowerCount(followersData.count || 0);
      setFollowingCount(followingData.count || 0);
    } catch (error) {
      console.error('Error loading follow counts:', error);
    }
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
              Return to forum
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
          {/* Profile Header */}
          <div className="premium-card p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <UserAvatar profile={profile} size="lg" showReputation />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="heading-md mb-2">
                      {profile.display_name || profile.username || 'Anonymous'}
                    </h1>
                    {profile.username && (
                      <p className="text-muted-foreground">@{profile.username}</p>
                    )}
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

