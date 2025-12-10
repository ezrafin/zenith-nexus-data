import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { videos } from '@/data/videoLibrary';
import { 
  Play, Clock, Calendar, ArrowLeft, CheckCircle, 
  HelpCircle, BookOpen, ExternalLink, Lightbulb 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const levelLabels = {
  beginner: 'Начальный',
  intermediate: 'Средний',
  pro: 'Продвинутый'
};

const formatLabels = {
  lecture: 'Лекция',
  case: 'Кейс',
  analysis: 'Анализ',
  discussion: 'Дискуссия'
};

export default function VideoDetailPage() {
  const { videoId } = useParams();
  const video = videos.find(v => v.id === videoId);

  if (!video) {
    return (
      <Layout>
        <div className="pt-24 pb-16 container-wide text-center">
          <h1 className="heading-lg mb-4">Видео не найдено</h1>
          <Link to="/video" className="btn-primary">
            Вернуться к видеотеке
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Back Link */}
          <Link 
            to="/video" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к видеотеке
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player Placeholder */}
              <div className="glass-card overflow-hidden">
                <div className="aspect-video relative bg-secondary">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary-foreground ml-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Видеоплеер будет доступен скоро
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="badge-primary">{formatLabels[video.format]}</span>
                  <span className="badge-secondary">{levelLabels[video.level]}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(video.publishedAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>

                <h1 className="heading-lg mb-4">{video.title}</h1>
                <p className="body-lg mb-6">{video.description}</p>

                <div className="flex flex-wrap gap-2">
                  {video.tags.map(tag => (
                    <span key={tag} className="text-sm bg-secondary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="glass-card p-6">
                <h2 className="heading-sm mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Ключевые выводы
                </h2>
                <ul className="space-y-3">
                  {video.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Self-Check Questions */}
              <div className="glass-card p-6">
                <h2 className="heading-sm mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Вопросы для самопроверки
                </h2>
                <div className="space-y-4">
                  {video.selfCheckQuestions.map((item, index) => (
                    <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                      <p className="font-medium mb-2">{index + 1}. {item.question}</p>
                      {item.hint && (
                        <details className="text-sm">
                          <summary className="text-primary cursor-pointer hover:underline">
                            Показать подсказку
                          </summary>
                          <p className="mt-2 text-muted-foreground pl-4 border-l-2 border-primary">
                            {item.hint}
                          </p>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Resources */}
              {video.resources.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Дополнительные материалы
                  </h3>
                  <ul className="space-y-2">
                    {video.resources.map((resource, index) => (
                      <li key={index}>
                        <Link 
                          to={resource.url}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {resource.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Forum Topics */}
              {video.relatedForumTopics.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Обсуждение на форуме</h3>
                  <ul className="space-y-2">
                    {video.relatedForumTopics.map((topic, index) => (
                      <li key={index}>
                        <Link 
                          to={`/forum`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          → {topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hint Box */}
              <div className="glass-card p-4 border-l-4 border-yellow-500">
                <h4 className="font-medium text-sm mb-2">💡 Совет</h4>
                <p className="text-xs text-muted-foreground">
                  При оценке любых финансовых предложений всегда рассчитывайте 
                  <strong> реальную доходность</strong> — номинальную ставку минус 
                  ожидаемую инфляцию. Это даст вам объективную картину.
                </p>
              </div>

              {/* Related Videos */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Похожие видео</h3>
                <div className="space-y-3">
                  {videos
                    .filter(v => v.id !== video.id && v.category === video.category)
                    .slice(0, 3)
                    .map(v => (
                      <Link 
                        key={v.id}
                        to={`/video/${v.id}`}
                        className="block p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <h4 className="text-sm font-medium line-clamp-2">{v.title}</h4>
                        <span className="text-xs text-muted-foreground">{v.duration}</span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
