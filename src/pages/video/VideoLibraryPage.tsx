import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoFilters } from '@/components/video/VideoFilters';
import { videos, videoCategories } from '@/data/videoLibrary';
import { Video, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && video.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel && video.level !== selectedLevel) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some(tag => video.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedTags]);

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Видеотека</span>
            <h1 className="heading-xl mb-6">Видео библиотека</h1>
            <p className="body-xl">
              Образовательные видео по инвестированию, анализу рынков и финансовой грамотности. 
              Изучайте в удобном темпе.
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <VideoFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedLevel={selectedLevel}
                  setSelectedLevel={setSelectedLevel}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />

                {/* Hint Box */}
                <div className="glass-card p-4 mt-6 border-l-4 border-primary">
                  <h4 className="font-medium text-sm mb-2">💡 Рекомендация</h4>
                  <p className="text-xs text-muted-foreground">
                    Начните с раздела "Банки vs Инвестиции" чтобы понять, 
                    какую реальную доходность приносят различные финансовые инструменты.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  {filteredVideos.length} видео
                </span>
              </div>

              {filteredVideos.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="heading-sm mb-2">Видео не найдены</h3>
                  <p className="body-sm">
                    Попробуйте изменить параметры фильтрации
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
