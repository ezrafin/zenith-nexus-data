import { Layout } from '@/components/layout/Layout';
import { Leaderboard } from '@/components/community/Leaderboard';
import { RecommendedContent } from '@/components/recommendations/RecommendedContent';
import { TrendingContent } from '@/components/recommendations/TrendingContent';
import { FollowAuthors } from '@/components/recommendations/FollowAuthors';
import { ContentCollections } from '@/components/recommendations/ContentCollections';
import { ActivityFeed } from '@/components/social/ActivityFeed';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CommunityPage() {
  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide">
          {/* Hero */}
          <section className="border-b border-border mb-12">
            <div className="py-16 md:py-24">
              <span className="badge-outline mb-4">Community</span>
              <h1 className="heading-lg mb-4">Community Hub</h1>
              <p className="body-lg max-w-2xl text-muted-foreground">
                Connect with fellow investors, track your progress, and discover top contributors
              </p>
            </div>
          </section>

          <Tabs defaultValue="leaderboard" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="activity">Activity Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Leaderboard />
                </div>
                <div className="space-y-6">
                  <RecommendedContent limit={5} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="premium-card p-6">
                    <h2 className="font-heading font-semibold text-lg mb-6">Activity Feed</h2>
                    <ActivityFeed />
                  </div>
                </div>
                <div className="space-y-6">
                  <RecommendedContent limit={5} />
                  <TrendingContent limit={5} />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Recommendations Section */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div>
              <FollowAuthors limit={5} />
            </div>
            <div className="lg:col-span-2">
              <ContentCollections />
            </div>
          </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

