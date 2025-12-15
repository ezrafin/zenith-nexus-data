import { Layout } from '@/components/layout/Layout';
import { EmailSubscription } from '@/components/EmailSubscription';
import { HeroSection, MarketDataSection, NewsSection, AnalyticsSection, PersonalizedContent } from '@/components/home';
import { useUser } from '@/context/UserContext';

export default function Index() {
  const { user } = useUser();

  return (
    <Layout>
      <HeroSection />
      <MarketDataSection />
      <NewsSection />
      <AnalyticsSection />
      {user && <PersonalizedContent />}
      <EmailSubscription />
    </Layout>
  );
}
