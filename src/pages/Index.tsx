import { Layout } from '@/components/layout/Layout';
import { EmailSubscription } from '@/components/EmailSubscription';
import { HeroSection, MarketDataSection, NewsSection, AnalyticsSection, PersonalizedContent } from '@/components/home';
import { useUser } from '@/context/UserContext';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Index() {
  const { user } = useUser();

  return (
    <Layout>
      <SEOHead
        title="Financial Markets Analytics & Investment Insights"
        description="Professional financial market analytics, real-time data, and expert insights for informed investment decisions. Access comprehensive market analysis, news, and educational resources."
      />
      <HeroSection />
      <MarketDataSection />
      <NewsSection />
      <AnalyticsSection />
      {user && <PersonalizedContent />}
      <EmailSubscription />
    </Layout>
  );
}
