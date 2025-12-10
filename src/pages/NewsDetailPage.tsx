import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchNewsById, NewsItem } from '@/lib/api';
import { BookmarkButton } from '@/components/content/BookmarkButton';
import { RelatedContent } from '@/components/content/RelatedContent';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { Calendar, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const marketLabels: Record<string, string> = {
  indices: 'Indices',
  stocks: 'Stocks',
  crypto: 'Crypto',
  commodities: 'Commodities',
  currencies: 'Currencies',
  general: 'General',
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToHistory } = useReadingHistory();

  useEffect(() => {
    async function loadNews() {
      if (id) {
        const data = await fetchNewsById(id);
        setNews(data);
        setLoading(false);
        
        // Add to reading history
        if (data) {
          addToHistory('article', id);
        }
      }
    }

    loadNews();
  }, [id, addToHistory]);

  if (loading) {
    return (
      <Layout>
        <div className="container-narrow section-spacing">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/4 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="space-y-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">News not found</h1>
          <Link to="/news" className="text-primary hover:underline">
            Return to news
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="section-spacing">
        <div className="container-narrow">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded bg-secondary text-secondary-foreground">
              {marketLabels[news.market]}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(news.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="heading-lg flex-1">{news.title}</h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <BookmarkButton contentType="article" contentId={news.id} />
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <ExternalLink className="h-4 w-4" />
            Source: {news.source}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{news.excerpt}</p>
            <p className="text-foreground leading-relaxed">{news.content}</p>
          </div>

          {/* Related Content */}
          <div className="mt-12 pt-8 border-t border-border">
            <RelatedContent
              items={[
                // Would fetch from API based on market/tags
                { type: 'article', id: '1', title: 'Related article 1' },
                { type: 'article', id: '2', title: 'Related article 2' },
              ]}
            />
          </div>
        </div>
      </article>
    </Layout>
  );
}