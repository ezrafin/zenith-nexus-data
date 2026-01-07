import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Article, getArticleUrl } from '@/data/educationArticles';
import { useTranslation } from '@/hooks/useTranslation';

interface ArticleCardProps {
  article: Article;
  isCompleted?: boolean;
  onToggleCompleted?: (id: string) => void;
}

export function ArticleCard({ article, isCompleted = false, onToggleCompleted }: ArticleCardProps) {
  const { t } = useTranslation({ namespace: 'education' });
  const isAdvanced = article.type === 'advanced';
  
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
    <article className={`glass-card p-6 flex flex-col h-full transition-colors ${
      isCompleted ? 'border-2 border-emerald-500' : ''
    }`}>
      {/* Header badges */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground font-medium">
          {article.category}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyColor(article.difficulty)}`}>
          {article.difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
        {article.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
        {article.description}
      </p>

      {/* Author info (only for advanced) */}
      {isAdvanced && 'author' in article && (
        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="font-medium text-foreground">{article.author}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{article.credentials}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{article.readTime}</span>
          {isAdvanced && 'lastUpdated' in article && (
            <span>{article.lastUpdated}</span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {onToggleCompleted && (
            <button
              type="button"
              onClick={() => onToggleCompleted(article.id)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isCompleted
                ? t('articleCard.unmark')
                : t('articleCard.markAsCompleted')}
            </button>
          )}
          <Link
            to={getArticleUrl(article)}
            className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            {t('articleCard.read')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
