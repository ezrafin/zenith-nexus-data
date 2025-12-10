import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { videoCategories, videoTags } from '@/data/videoLibrary';

interface VideoFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedLevel: string | null;
  setSelectedLevel: (level: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const levels = [
  { id: 'beginner', name: 'Начальный' },
  { id: 'intermediate', name: 'Средний' },
  { id: 'pro', name: 'Продвинутый' }
];

export function VideoFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedTags,
  setSelectedTags
}: VideoFiltersProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedLevel || selectedTags.length > 0;

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Поиск</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск видео..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-medium mb-2 block">Категории</label>
        <div className="space-y-1">
          {videoCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary/50 text-muted-foreground'
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id 
                  ? 'bg-primary-foreground/20' 
                  : 'bg-secondary'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div>
        <label className="text-sm font-medium mb-2 block">Уровень</label>
        <div className="flex flex-wrap gap-2">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedLevel === level.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm font-medium mb-2 block">Теги</label>
        <div className="flex flex-wrap gap-2">
          {videoTags.slice(0, 10).map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedTags.includes(tag) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
}
