import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchAnalyticsBySlug, AnalyticsArticle } from '@/lib/api';
import { BookmarkButton } from '@/components/content/BookmarkButton';
import { RelatedContent } from '@/components/content/RelatedContent';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { generateArticleSchema, generateOrganizationSchema } from '@/utils/structuredData';
import { Calendar, Clock, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeLabels: Record<string, string> = {
  expert: 'Expert Opinion',
  markets: 'Markets',
  longterm: 'Long-term Analysis',
  technical: 'Technical Analysis',
};

export default function AnalyticsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<AnalyticsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToHistory } = useReadingHistory();

  useEffect(() => {
    async function loadArticle() {
      if (slug) {
        const data = await fetchAnalyticsBySlug(slug);
        setArticle(data);
        setLoading(false);
        
        // Add to reading history
        if (data) {
          addToHistory('analytics', slug);
        }
      }
    }

    loadArticle();
  }, [slug, addToHistory]);

  if (loading) {
    return (
      <Layout>
        <div className="container-narrow section-spacing">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/4 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">Article not found</h1>
          <Link to="/analytics" className="text-primary hover:underline">
            Return to analytics
          </Link>
        </div>
      </Layout>
    );
  }

  if (!article) return null;

  const articleUrl = `https://investopatronus.com/analytics/${slug}`;
  const articleImage = 'https://investopatronus.com/og-image.png';

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        image={articleImage}
        type="article"
        author={article.author}
        publishedTime={article.date}
      />
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateArticleSchema(
            article.title,
            article.excerpt,
            articleImage,
            article.date,
            article.author,
            articleUrl
          ),
        ]}
      />
      <article className="section-spacing">
        <div className="container-narrow">
          <Breadcrumbs pageTitle={article.title} />

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded bg-primary/10 text-primary">
              {typeLabels[article.type]}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="heading-lg flex-1">{article.title}</h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <BookmarkButton contentType="analytics" contentId={article.slug} />
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
            <p className="text-foreground leading-relaxed">{article.content}</p>
          </div>

          {/* Related Content */}
          <div className="mt-12 pt-8 border-t border-border">
            <RelatedContent
              items={[
                // Would fetch from API based on topic/tags
                { type: 'analytics', id: '1', title: 'Related analysis 1' },
                { type: 'analytics', id: '2', title: 'Related analysis 2' },
              ]}
            />
          </div>
        </div>
      </article>
    </Layout>
  );
}