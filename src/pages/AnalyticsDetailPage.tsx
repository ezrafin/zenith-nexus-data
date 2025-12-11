import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchAnalyticsBySlug, AnalyticsArticle } from '@/lib/api';
import { BookmarkButton } from '@/components/content/BookmarkButton';
import { RelatedContent } from '@/components/content/RelatedContent';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { useRelatedContent } from '@/hooks/useRelatedContent';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { generateArticleSchema, generateOrganizationSchema } from '@/utils/structuredData';
import { Calendar, Clock, User, Share2, ExternalLink, Tag, Building2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CompanyCard } from '@/components/CompanyCard';
import { fetchCompanies } from '@/lib/api';
import { toast } from 'sonner';

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
  const [relatedCompanies, setRelatedCompanies] = useState<any[]>([]);
  const { addToHistory } = useReadingHistory();
  
  // Fetch related content based on article type/category
  const { relatedItems } = useRelatedContent({
    contentType: 'analytics',
    contentId: slug || '',
    category: article?.type,
    limit: 4,
  });

  useEffect(() => {
    async function loadArticle() {
      if (slug) {
        const data = await fetchAnalyticsBySlug(slug);
        setArticle(data);
        setLoading(false);
        
        // Add to reading history
        if (data) {
          addToHistory('analytics', slug);
          
          // Load related companies if specified
          if (data.relatedCompanies && data.relatedCompanies.length > 0) {
            const companies = await fetchCompanies();
            const filtered = companies.filter(c => data.relatedCompanies?.includes(c.slug));
            setRelatedCompanies(filtered);
          }
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

  const articleUrl = `${window.location.origin}/analytics/${slug}`;
  const articleImage = article.imageUrl || 'https://investopatronus.com/og-image.png';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
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

          {/* Hero Image */}
          {article.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

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
              <Button variant="outline" size="sm" onClick={handleShare}>
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

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Excerpt */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          </div>

          {/* Structured Content Sections */}
          {article.sections && article.sections.length > 0 ? (
            <div className="space-y-8 mb-12">
              {article.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="heading-sm">{section.heading}</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-foreground leading-relaxed">{article.content}</p>
            </div>
          )}

          {/* Image Gallery */}
          {article.images && article.images.length > 0 && (
            <div className="mb-12">
              <h2 className="heading-sm mb-6 flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Gallery
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {article.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={`${article.title} - Image ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources and Links */}
          {article.resources && article.resources.length > 0 && (
            <div className="mb-12 p-6 rounded-xl border border-border bg-secondary/30">
              <h2 className="heading-sm mb-6 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Resources & Links
              </h2>
              <div className="space-y-3">
                {article.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {resource.title}
                      </div>
                      {resource.type && (
                        <div className="text-xs text-muted-foreground capitalize">{resource.type}</div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Companies */}
          {relatedCompanies.length > 0 && (
            <div className="mb-12">
              <h2 className="heading-sm mb-6 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Related Companies
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCompanies.map((company, index) => (
                  <CompanyCard key={company.slug} company={company} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Related Content */}
          {relatedItems.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <RelatedContent items={relatedItems} />
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}