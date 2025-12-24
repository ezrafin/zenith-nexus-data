import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Leaderboard } from '@/components/community/Leaderboard';
import { RecommendedContent } from '@/components/recommendations/RecommendedContent';
import { TrendingContent } from '@/components/recommendations/TrendingContent';
import { FollowAuthors } from '@/components/recommendations/FollowAuthors';
import { ActivityFeed } from '@/components/social/ActivityFeed';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

export default function CommunityPage() {
  const { t } = useTranslation({ namespace: 'ui' });

  return (
    <Layout>
      <SEOHead
        title="Community Hub — INVESTOPATRONUS"
        description="Explore top contributors and community activity for investors."
      />
      <div className="section-spacing">
        <div className="container-wide">
          {/* Hero */}
          <section className="border-b border-border mb-12">
            <div className="py-16 md:py-24">
              <span className="badge-outline mb-4">{t('communityPage.badge')}</span>
              <h1 className="heading-lg mb-4">{t('communityPage.heroTitle')}</h1>
              <p className="body-lg max-w-2xl text-muted-foreground">
                {t('communityPage.heroSubtitle')}
              </p>
            </div>
          </section>

          <Tabs defaultValue="leaderboard" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="leaderboard">{t('communityPage.tabLeaderboard')}</TabsTrigger>
              <TabsTrigger value="activity">{t('communityPage.tabActivity')}</TabsTrigger>
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
                    <h2 className="font-heading font-semibold text-lg mb-6">{t('communityPage.activityTitle')}</h2>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

