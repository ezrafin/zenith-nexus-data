import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { NewsItem } from '@/lib/api/types';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
  index?: number;
}

const marketLabels: Record<string, string> = {
  indices: 'Indices',
  stocks: 'Stocks',
  crypto: 'Crypto',
  commodities: 'Commodities',
  currencies: 'Currencies',
  general: 'General',
};

export function NewsCard({ news, featured = false, index = 0 }: NewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Link
        to={`/news/${news.id}`}
        className="group block h-full premium-card p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="flex flex-col h-full">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-outline text-xs">
              {marketLabels[news.market] || news.market}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-semibold mb-3 group-hover:text-primary transition-colors leading-snug ${
            featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}>
            {news.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-muted-foreground flex-1 leading-relaxed ${
            featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
          }`}>
            {news.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <span className="text-xs text-muted-foreground">{news.source}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}