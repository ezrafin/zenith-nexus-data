import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'desert';
  default_markets: string[];
  refresh_interval: number;
  email_notifications: boolean;
  push_notifications: boolean;
  preferred_topics: string[];
  language: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  default_markets: ['indices', 'stocks', 'crypto'],
  refresh_interval: 120000,
  email_notifications: false,
  push_notifications: false,
  preferred_topics: [],
  language: 'en',
};

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function useUserPreferences() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      if (!isLocalStorageAvailable()) {
        setLoading(false);
        return;
      }

      try {
        const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setPreferences({ ...defaultPreferences, ...parsed });
        }
      } catch (e) {
        console.error('Error loading preferences:', e);
        try {
          localStorage.removeItem('userPreferences');
        } catch {
          // Ignore cleanup errors
        }
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    if (isLocalStorageAvailable()) {
      try {
        const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
        localStorage.setItem(storageKey, JSON.stringify(newPreferences));
      } catch (e) {
        console.error('Error saving preferences to localStorage:', e);
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old data');
          try {
            const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
            localStorage.removeItem(storageKey);
            localStorage.setItem(storageKey, JSON.stringify(newPreferences));
          } catch {
            // Give up if still failing
          }
        }
      }
    }
  };

  return { preferences, loading, updatePreferences };
}
