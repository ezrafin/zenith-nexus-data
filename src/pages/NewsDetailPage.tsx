import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchNewsById, fetchNews, NewsItem } from '@/lib/api/index';
import { BookmarkButton } from '@/components/content/BookmarkButton';
import { RelatedContent } from '@/components/content/RelatedContent';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { generateArticleSchema, generateOrganizationSchema } from '@/utils/structuredData';
import { Calendar, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
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
          
          // Load related news based on market
          const allNews = await fetchNews({ market: data.market });
          const related = allNews
            .filter(item => item.id !== id)
            .slice(0, 3);
          setRelatedNews(related);
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

  const articleUrl = `${window.location.origin}/news/${id}`;
  const articleImage = news.imageUrl || 'https://investopatronus.com/investo.png';
  const articleAuthor = news.source || 'Unknown';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.excerpt,
          url: articleUrl,
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          // Fallback to clipboard if share fails
          try {
            await navigator.clipboard.writeText(articleUrl);
            toast.success('Link copied to clipboard');
          } catch (clipboardError) {
            toast.error('Failed to copy link');
          }
        }
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(articleUrl);
        toast.success('Link copied to clipboard');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <Layout>
      <SEOHead
        title={news.title}
        description={news.excerpt}
        image={articleImage}
        type="article"
        author={articleAuthor}
        publishedTime={news.date}
      />
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateArticleSchema(
            news.title,
            news.excerpt,
            articleImage,
            news.date,
            articleAuthor,
            articleUrl
          ),
        ]}
      />
      <article className="section-spacing">
        <div className="container-narrow">
          <Breadcrumbs pageTitle={news.title} />

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
              <Button variant="outline" size="sm" onClick={handleShare}>
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
          {relatedNews.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <RelatedContent
                items={relatedNews.map(item => ({
                  type: 'news' as const,
                  id: item.id,
                  title: item.title,
                }))}
              />
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}