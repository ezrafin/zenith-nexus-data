import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsCard } from '@/components/NewsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { fetchNews, NewsItem } from '@/lib/api/index';
import { ArrowRight, Newspaper } from 'lucide-react';

export const NewsSection = memo(function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews().then(data => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  return (
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

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} lines={3} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item, index) => (
              <NewsCard key={item.id} news={item} featured={true} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
