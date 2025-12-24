import { useState, useEffect } from 'react';
import { 
  Moon, 
  Snowflake, 
  Wheat, 
  Flower2, 
  Hammer, 
  Mountain, 
  Sparkles, 
  Sun, 
  Waves, 
  TreeDeciduous 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserPreferences, type Theme } from '@/hooks/useUserPreferences';
import { cn } from '@/lib/utils';

export const themes: { value: Theme; label: string; icon: typeof Moon; color: string }[] = [
  { value: 'dark', label: 'Default', icon: Moon, color: 'bg-indigo-500' },
  { value: 'glacier', label: 'Glacier', icon: Snowflake, color: 'bg-cyan-400' },
  { value: 'harvest', label: 'Harvest', icon: Wheat, color: 'bg-orange-500' },
  { value: 'lavender', label: 'Lavender', icon: Flower2, color: 'bg-purple-400' },
  { value: 'brutalist', label: 'Brutalist', icon: Hammer, color: 'bg-red-600' },
  { value: 'obsidian', label: 'Obsidian', icon: Mountain, color: 'bg-slate-600' },
  { value: 'orchid', label: 'Orchid', icon: Sparkles, color: 'bg-pink-500' },
  { value: 'solar', label: 'Solar', icon: Sun, color: 'bg-yellow-400' },
  { value: 'tide', label: 'Tide', icon: Waves, color: 'bg-teal-500' },
  { value: 'verdant', label: 'Verdant', icon: TreeDeciduous, color: 'bg-green-500' },
];

// All theme class names for removal
export const ALL_THEME_CLASSES = themes.map(t => t.value);

export function ThemeSwitcher() {
  const { preferences, updatePreferences } = useUserPreferences();
  const [currentTheme, setCurrentTheme] = useState<Theme>(preferences.theme || 'dark');

  useEffect(() => {
    // Apply theme to html element
    const html = document.documentElement;
    ALL_THEME_CLASSES.forEach(cls => html.classList.remove(cls));
    html.classList.add(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Sync with preferences
    if (preferences.theme && preferences.theme !== currentTheme) {
      setCurrentTheme(preferences.theme);
    }
  }, [preferences.theme]);

  const handleThemeChange = async (theme: Theme) => {
    setCurrentTheme(theme);
    await updatePreferences({ theme });
  };

  const currentThemeData = themes.find(t => t.value === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label="Change theme"
        >
          <CurrentIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = currentTheme === theme.value;
          return (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                isActive && 'bg-secondary'
              )}
            >
              <div className={cn('w-3 h-3 rounded-full', theme.color)} />
              <Icon className="h-4 w-4" />
              <span>{theme.label}</span>
              {isActive && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
