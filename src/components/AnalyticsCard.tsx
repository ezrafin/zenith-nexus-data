import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { AnalyticsArticle } from '@/lib/api/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AnalyticsCardProps {
  article: AnalyticsArticle;
  variant?: 'default' | 'dark';
  index?: number;
}

const typeLabels: Record<string, string> = {
  expert: 'Expert Opinion',
  markets: 'Markets',
  longterm: 'Long-term Analysis',
  technical: 'Technical Analysis',
};

export function AnalyticsCard({ article, variant = 'default', index = 0 }: AnalyticsCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const isDark = variant === 'dark';

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/analytics/${article.slug}`}
        className={`group block h-full overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
          isDark
            ? 'bg-secondary/20 border-border/30 hover:bg-secondary/40 hover:border-border/50'
            : 'premium-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5'
        }`}
      >
        {/* Article Image */}
        {article.imageUrl && (
          <div className="relative h-40 w-full overflow-hidden bg-muted">
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <span className={`absolute bottom-3 left-3 badge-outline text-xs bg-background/80 backdrop-blur-sm ${isDark ? 'border-border/50 text-muted-foreground' : ''}`}>
              {typeLabels[article.type] || article.type}
            </span>
          </div>
        )}

        <div className="p-6 flex flex-col h-full">
          {/* Meta - only show if no image */}
          {!article.imageUrl && (
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge-outline text-xs ${isDark ? 'border-border/50 text-muted-foreground' : ''}`}>
                {typeLabels[article.type] || article.type}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground flex-1 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-border/50">
                <AvatarImage src={article.authorAvatar} alt={article.author} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {getInitials(article.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-medium">{article.author}</span>
                <span className="text-xs text-muted-foreground">{formattedDate} · {article.readTime}</span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
