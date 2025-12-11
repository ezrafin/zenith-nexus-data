import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { NewsCard } from '@/components/NewsCard';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { MarketMiniTable } from '@/components/MarketMiniTable';
import { EmailSubscription } from '@/components/EmailSubscription';
import { RecommendedContent } from '@/components/recommendations/RecommendedContent';
import { TrendingContent } from '@/components/recommendations/TrendingContent';
import { FollowAuthors } from '@/components/recommendations/FollowAuthors';
import { ContentCollections } from '@/components/recommendations/ContentCollections';
import { MarketOverview } from '@/components/charts/MarketOverview';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { LastUpdated } from '@/components/LastUpdated';
import { useMarketData } from '@/hooks/useMarketData';
import { fetchNews, fetchAnalytics, NewsItem, AnalyticsArticle } from '@/lib/api';
import { ArrowRight, TrendingUp, BarChart3, Newspaper, Coins, Bitcoin, DollarSign } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Index() {
  const { user } = useUser();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsArticle[]>([]);
  const [contentLoading, setContentLoading] = useState(true);

  // Real market data hooks
  const { data: indices, loading: indicesLoading, lastUpdated: indicesUpdated, refresh: refreshIndices } = useMarketData({ type: 'indices', refreshInterval: 60000 });
  const { data: stocks, loading: stocksLoading, refresh: refreshStocks } = useMarketData({ type: 'stocks', refreshInterval: 60000 });
  const { data: crypto, loading: cryptoLoading, refresh: refreshCrypto } = useMarketData({ type: 'crypto', refreshInterval: 120000 });
  const { data: commodities, loading: commoditiesLoading, refresh: refreshCommodities } = useMarketData({ type: 'commodities', refreshInterval: 60000 });
  const { data: currencies, loading: currenciesLoading, refresh: refreshCurrencies } = useMarketData({ type: 'currencies', refreshInterval: 60000 });

  const marketLoading = indicesLoading || stocksLoading || cryptoLoading || commoditiesLoading || currenciesLoading;

  useEffect(() => {
    async function loadContent() {
      const [newsData, analyticsData] = await Promise.all([
        fetchNews(),
        fetchAnalytics(),
      ]);
      setNews(newsData);
      setAnalytics(analyticsData);
      setContentLoading(false);
    }
    loadContent();
  }, []);

  const refreshAllMarkets = () => {
    refreshIndices();
    refreshStocks();
    refreshCrypto();
    refreshCommodities();
    refreshCurrencies();
  };

  const marketBlocks = [
    { title: 'Indices', data: indices, href: '/markets/indices', icon: TrendingUp },
    { title: 'Stocks', data: stocks, href: '/markets/stocks', icon: BarChart3 },
    { title: 'Commodities', data: commodities, href: '/markets/commodities', icon: Coins },
    { title: 'Crypto', data: crypto, href: '/markets/crypto', icon: Bitcoin },
    { title: 'Currencies', data: currencies, href: '/markets/currencies', icon: DollarSign },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container-wide py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="live-dot" />
              Data updates in real-time
            </div>
            <h1 className="heading-hero mb-6">
              Your Guardian in
              <span className="block text-muted-foreground">Global Markets</span>
            </h1>
            <p className="body-xl max-w-2xl mb-10">
              Professional analytics and real-time data for informed investment decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/markets/indices" className="btn-primary">
                View Markets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/analytics" className="btn-outline">
                Read Analytics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Data */}
      <section className="section-spacing-sm section-gradient">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          >
            <div>
              <span className="badge-primary mb-4">Markets</span>
              <h2 className="heading-md">Real-Time Market Data</h2>
            </div>
            <div className="flex items-center gap-4">
              <LastUpdated timestamp={indicesUpdated} onRefresh={refreshAllMarkets} loading={marketLoading} />
              <Link to="/markets/indices" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                All Markets <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {marketLoading && indices.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} lines={6} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {marketBlocks.map((block) => (
                <MarketMiniTable key={block.href} title={block.title} data={block.data} href={block.href} icon={block.icon} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          >
            <div>
              <span className="badge-outline mb-4"><Newspaper className="h-3 w-3 mr-1" />News</span>
              <h2 className="heading-md">Latest News</h2>
            </div>
            <Link to="/news" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              All News <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {contentLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} lines={3} />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, 6).map((item, index) => (
                <NewsCard key={item.id} news={item} featured={index === 0} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Analytics */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          >
            <div>
              <span className="badge-outline mb-4"><BarChart3 className="h-3 w-3 mr-1" />Analytics</span>
              <h2 className="heading-md">Expert Insights</h2>
            </div>
            <Link to="/analytics" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              All Analytics <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {contentLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} lines={4} />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {analytics.slice(0, 4).map((article, index) => (
                <AnalyticsCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recommended Content & Market Overview */}
      {user && (
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
      )}

      <EmailSubscription />
    </Layout>
  );
}
