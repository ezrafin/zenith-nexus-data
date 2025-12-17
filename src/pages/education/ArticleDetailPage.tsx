import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowLeft, Clock, Calendar, User, Award } from 'lucide-react';
import { getArticleById } from '@/data/educationArticles';
import { getEducationLearningPath, getEducationBasicArticlesPath, getEducationAdvancedArticlesPath } from '@/lib/educationRoutes';

export default function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articleId ? getArticleById(articleId) : undefined;

  if (!article) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <section className="container-wide section-spacing-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-4">Article Not Found</h1>
              <p className="body-lg text-muted-foreground mb-6">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <Link to={getEducationLearningPath()} className="btn-primary">
                Back to Learning Hub
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  const isAdvanced = article.type === 'advanced';
  const backLink = isAdvanced ? getEducationAdvancedArticlesPath() : getEducationBasicArticlesPath();
  const backLabel = isAdvanced ? 'Advanced Articles' : 'Basic Articles';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Expert':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Back link */}
          <Link 
            to={backLink} 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {backLabel}
          </Link>

          <article className="max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-secondary">{article.category}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyColor(article.difficulty)}`}>
                  {article.difficulty}
                </span>
              </div>

              <h1 className="heading-xl mb-4">{article.title}</h1>
              <p className="body-xl text-muted-foreground">{article.description}</p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-border">
                {isAdvanced && 'author' in article && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{article.author}</span>
                    <span className="text-sm text-muted-foreground">• {article.credentials}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                {isAdvanced && 'lastUpdated' in article && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{article.lastUpdated}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Content placeholder */}
            <div className="glass-card p-8 mb-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">
                  This is a placeholder for the full article content. In a production environment, 
                  this would contain the complete educational material with sections, examples, 
                  charts, and interactive elements.
                </p>
                
                <h2 className="text-xl font-semibold mt-6 mb-4">Key Takeaways</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Comprehensive coverage of {article.title.toLowerCase()}</li>
                  <li>• Practical examples and real-world applications</li>
                  <li>• Step-by-step guidance for implementation</li>
                  <li>• Common pitfalls to avoid</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">What You'll Learn</h2>
                <p className="text-muted-foreground">
                  {article.description} This article provides in-depth coverage suitable for 
                  {article.difficulty === 'Beginner' ? ' those new to investing' : 
                   article.difficulty === 'Intermediate' ? ' investors with some experience' :
                   article.difficulty === 'Advanced' ? ' experienced investors' : ' expert-level practitioners'}.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card p-6 text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="heading-sm mb-2">Continue Learning</h3>
              <p className="body-sm text-muted-foreground mb-4">
                Explore more articles to build your investment knowledge.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to={getEducationBasicArticlesPath()} className="btn-ghost">
                  Basic Articles
                </Link>
                <Link to={getEducationAdvancedArticlesPath()} className="btn-primary">
                  Advanced Articles
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </Layout>
  );
}
