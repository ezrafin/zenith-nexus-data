import { Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { EmailSubscription } from '@/components/EmailSubscription';
import { HeroSection, MarketDataSection, NewsSection, AnalyticsSection, PersonalizedContent } from '@/components/home';
import { useUser } from '@/context/UserContext';
import { SEOHead } from '@/components/seo/SEOHead';
import { SkeletonCard } from '@/components/ui/skeleton-card';

// Skeleton components for progressive loading
const MarketDataSkeleton = () => (
  <section className="section-spacing">
    <div className="container-wide">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} lines={3} />
        ))}
      </div>
    </div>
  </section>
);

const NewsSkeleton = () => (
  <section className="section-spacing">
    <div className="container-wide">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} lines={4} />
        ))}
      </div>
    </div>
  </section>
);

const AnalyticsSkeleton = () => (
  <section className="section-spacing bg-secondary/30">
    <div className="container-wide">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} lines={5} />
        ))}
      </div>
    </div>
  </section>
);

export default function Index() {
  const { user } = useUser();

  return (
    <Layout>
      <SEOHead
        title="Financial Markets Analytics & Investment Insights"
        description="Professional financial market analytics, real-time data, and expert insights for informed investment decisions. Access comprehensive market analysis, news, and educational resources."
        keywords="financial markets, stock market analysis, crypto trading, investment insights, market data, financial analytics, trading platform, investment education, market news, financial news, real-time market data, investment research"
        isHomepage={true}
      />
      {/* Hero section loads immediately - no Suspense needed */}
      <HeroSection />
      
      {/* Granular Suspense boundaries for data-heavy sections */}
      <Suspense fallback={<MarketDataSkeleton />}>
        <MarketDataSection />
      </Suspense>
      
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>
      
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsSection />
      </Suspense>
      
      {user && (
        <Suspense fallback={<div className="section-spacing"><div className="container-wide"><SkeletonCard lines={4} /></div></div>}>
          <PersonalizedContent />
        </Suspense>
      )}
      
      <EmailSubscription />
    </Layout>
  );
}
