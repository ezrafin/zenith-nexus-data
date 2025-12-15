import { memo } from 'react';
import { RecommendedContent } from '@/components/recommendations/RecommendedContent';
import { TrendingContent } from '@/components/recommendations/TrendingContent';
import { FollowAuthors } from '@/components/recommendations/FollowAuthors';
import { ContentCollections } from '@/components/recommendations/ContentCollections';
import { MarketOverview } from '@/components/charts/MarketOverview';

export const PersonalizedContent = memo(function PersonalizedContent() {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecommendedContent limit={6} />
            <TrendingContent limit={5} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <MarketOverview />
            <FollowAuthors limit={5} />
            <ContentCollections />
          </div>
        </div>
      </div>
    </section>
  );
});
