import { motion } from 'framer-motion';
import { Clock, ExternalLink } from 'lucide-react';
import { NewsArticle } from '@/hooks/useNews';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAuthorAvatar } from '@/lib/api/utils';
import { LazyImage } from '@/components/ui/lazy-image';

interface NewsCardRealProps {
  article: NewsArticle;
  featured?: boolean;
  index?: number;
}

const marketLabels: Record<string, string> = {
  indices: 'Indices',
  stocks: 'Stocks',
  crypto: 'Crypto',
  commodities: 'Commodities',
  currencies: 'Currencies',
  political: 'Political',
  general: 'General',
};

const marketColors: Record<string, string> = {
  indices: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  stocks: 'bg-green-500/10 text-green-400 border-green-500/20',
  crypto: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  commodities: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  currencies: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  political: 'bg-red-500/10 text-red-400 border-red-500/20',
  general: 'bg-muted text-muted-foreground border-border',
};

// Market-specific images for news articles
const marketImages: Record<string, string[]> = {
  indices: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop',
  ],
  stocks: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=300&fit=crop',
  ],
  crypto: [
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop',
  ],
  commodities: [
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=600&h=300&fit=crop',
  ],
  currencies: [
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=300&fit=crop',
  ],
  political: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=300&fit=crop',
  ],
  general: [
    'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop',
  ],
};

const getMarketImage = (market: string, index: number): string => {
  const images = marketImages[market] || marketImages.general;
  return images[index % images.length];
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export function NewsCardReal({ article, featured = false, index = 0 }: NewsCardRealProps) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isBreakingNews = () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    return new Date(article.published_at) > twoHoursAgo;
  };

  // Use fallback image if no image_url or if it's potentially broken (like Guardian media which has CORS issues)
  const fallbackImage = getMarketImage(article.market, index);
  
  // Check if image URL is from sources known to have CORS issues
  const hasCorsProblem = article.image_url && (
    article.image_url.includes('media.guim.co.uk') ||
    article.image_url.includes('guardian') ||
    article.image_url.includes('static.guim')
  );
  
  // Always use fallback for problematic sources
  const imageUrl = (article.image_url && !hasCorsProblem) ? article.image_url : fallbackImage;

  // Priority loading for first 6 images (2 rows on desktop)
  const isPriority = index < 6;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <a
        href={article.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full premium-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Image */}
        <div className={`relative ${featured ? 'h-40 sm:h-52' : 'h-32 sm:h-40'} w-full overflow-hidden bg-muted`}>
          <LazyImage
            src={imageUrl}
            alt={article.title}
            aspectRatio="wide"
            fallback={fallbackImage}
            priority={isPriority}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={() => {
              // Image failed to load, LazyImage will show fallback
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className={`text-xs bg-background/80 backdrop-blur-sm ${marketColors[article.market] || marketColors.general}`}
            >
              {marketLabels[article.market] || article.market}
            </Badge>
            {isBreakingNews() && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                Breaking
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-snug ${
            featured ? 'text-lg sm:text-xl md:text-2xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
          }`}>
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className={`text-muted-foreground flex-1 leading-relaxed ${
              featured ? 'text-sm sm:text-base line-clamp-3' : 'text-xs sm:text-sm line-clamp-2'
            }`}>
              {article.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              {article.author && (
                <Avatar className="h-7 w-7 ring-2 ring-border/50">
                  <AvatarImage src={getAuthorAvatar(article.author)} alt={article.author} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {getInitials(article.author)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-medium">{article.source_name}</span>
                {article.author && (
                  <span className="text-xs text-muted-foreground">by {article.author}</span>
                )}
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read more
              <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
