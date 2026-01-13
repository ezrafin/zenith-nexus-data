import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowLeft, Calendar, User, Award } from 'lucide-react';
import { getArticleById } from '@/data/educationArticles';
import { getEducationLearningPath, getEducationBasicArticlesPath, getEducationAdvancedArticlesPath } from '@/lib/educationRoutes';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { LegendaryBillSpawn } from '@/components/collectibles/LegendaryBillSpawn';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { SEOHead } from '@/components/seo/SEOHead';
import { useMemo } from 'react';

export default function ArticleDetailPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const { articleId } = useParams<{ articleId: string }>();
  const article = articleId ? getArticleById(articleId) : undefined;

  if (!article) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <section className="container-wide section-spacing-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-4">
                {t('articleDetail.notFoundTitle')}
              </h1>
              <p className="body-lg text-muted-foreground mb-6">
                {t('articleDetail.notFoundDescription')}
              </p>
              <Link to={getEducationLearningPath()} className="btn-primary">
                {t('articleDetail.notFoundBack')}
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  const isAdvanced = article.type === 'advanced';
  const backLink = isAdvanced ? getEducationAdvancedArticlesPath() : getEducationBasicArticlesPath();
  const backLabel = isAdvanced
    ? t('articleDetail.backToAdvanced')
    : t('articleDetail.backToBasic');

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

  const seoTitle = useMemo(() => {
    if (!article) return 'Article Not Found';
    return `${article.title} - Investment Guide | INVESTOPATRONUS`;
  }, [article]);

  const seoDescription = useMemo(() => {
    if (!article) return 'The article you are looking for does not exist.';
    const excerpt = article.content?.substring(0, 150) || article.title;
    return `${excerpt}... Learn more about investing and financial markets with INVESTOPATRONUS.`;
  }, [article]);

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
      />
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Back link */}
          <Link 
            to={backLink} 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
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
                {isAdvanced && 'lastUpdated' in article && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{article.lastUpdated}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            {article.content ? (
              <div className="glass-card p-8 mb-8">
                <div className="prose prose-invert max-w-none">
                  <MarkdownContent content={article.content} />
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 mb-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    {t('articleDetail.placeholderIntro')}
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 mb-4">
                    {t('articleDetail.keyTakeawaysTitle')}
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • {t('articleDetail.keyTakeawaysItem1', {
                        topic: article.title.toLowerCase(),
                      })}
                    </li>
                    <li>• {t('articleDetail.keyTakeawaysItem2')}</li>
                    <li>• {t('articleDetail.keyTakeawaysItem3')}</li>
                    <li>• {t('articleDetail.keyTakeawaysItem4')}</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-4">
                    {t('articleDetail.whatYoullLearnTitle')}
                  </h2>
                  <p className="text-muted-foreground">
                    {article.description}{' '}
                    {t('articleDetail.whatYoullLearnDescriptionPrefix')}{' '}
                    {article.difficulty === 'Beginner'
                      ? t('articleDetail.audienceBeginner')
                      : article.difficulty === 'Intermediate'
                      ? t('articleDetail.audienceIntermediate')
                      : article.difficulty === 'Advanced'
                      ? t('articleDetail.audienceAdvanced')
                      : t('articleDetail.audienceExpert')}
                    .
                  </p>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="glass-card p-6 text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="heading-sm mb-2">
                {t('articleDetail.continueLearningTitle')}
              </h3>
              <p className="body-sm text-muted-foreground mb-4">
                {t('articleDetail.continueLearningDescription')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to={getEducationBasicArticlesPath()} className="btn-ghost">
                  {t('articleDetail.continueLearningBasic')}
                </Link>
                <Link to={getEducationAdvancedArticlesPath()} className="btn-primary">
                  {t('articleDetail.continueLearningAdvanced')}
                </Link>
              </div>
            </div>
          </article>
          {articleId && (
            <LegendaryBillSpawn 
              articleId={articleId} 
              articleType={isAdvanced ? 'advanced_article' : 'basic_article'} 
            />
          )}
        </section>
      </div>
    </Layout>
  );
}
