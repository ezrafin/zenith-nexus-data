import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { fetchAnalytics, AnalyticsArticle } from '@/lib/api/index';
import { ArrowRight, BarChart3 } from 'lucide-react';

export const AnalyticsSection = memo(function AnalyticsSection() {
  const [analytics, setAnalytics] = useState<AnalyticsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics().then(data => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  return (
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

        {loading ? (
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
  );
});
