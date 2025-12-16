import { useState, useEffect } from 'react';
import { Sun, Moon, Circle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'desert';

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'desert', label: 'Desert', icon: Circle },
];

export function ThemeSwitcher() {
  const { preferences, updatePreferences } = useUserPreferences();
  const [currentTheme, setCurrentTheme] = useState<Theme>(preferences.theme || 'dark');

  useEffect(() => {
    // Apply theme to html element
    const html = document.documentElement;
    html.classList.remove('light', 'dark', 'desert');
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

  const currentThemeData = themes.find(t => t.value === currentTheme) || themes[1];
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

