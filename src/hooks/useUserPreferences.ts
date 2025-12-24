import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

export type Theme = 'dark' | 'glacier' | 'harvest' | 'lavender' | 'brutalist' | 'obsidian' | 'orchid' | 'solar' | 'tide' | 'verdant';

export interface UserPreferences {
  theme: Theme;
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

function getLocalPreferences(userId?: string): UserPreferences | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const storageKey = userId ? `userPreferences_${userId}` : 'userPreferences';
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function setLocalPreferences(prefs: UserPreferences, userId?: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const storageKey = userId ? `userPreferences_${userId}` : 'userPreferences';
    localStorage.setItem(storageKey, JSON.stringify(prefs));
  } catch {
    // Ignore storage errors
  }
}

export function useUserPreferences() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Initialize from localStorage synchronously to avoid flash
    const localPrefs = getLocalPreferences(user?.id);
    return localPrefs ? { ...defaultPreferences, ...localPrefs } : defaultPreferences;
  });
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  // Load preferences on mount or user change
  useEffect(() => {
    isMounted.current = true;
    
    const loadPreferences = async () => {
      if (!user) {
        // Anonymous user - use local storage only
        const localPrefs = getLocalPreferences();
        if (isMounted.current) {
          if (localPrefs) {
            setPreferences({ ...defaultPreferences, ...localPrefs });
          }
          setLoading(false);
        }
        return;
      }

      try {
        // Try to fetch from database
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!isMounted.current) return;

        if (error) {
          console.error('Error fetching preferences:', error);
          // Fall back to local storage
          const localPrefs = getLocalPreferences(user.id);
          if (localPrefs) {
            setPreferences({ ...defaultPreferences, ...localPrefs });
          }
        } else if (data) {
          const dbPrefs: UserPreferences = {
            theme: data.theme as UserPreferences['theme'],
            default_markets: data.default_markets || defaultPreferences.default_markets,
            refresh_interval: data.refresh_interval || defaultPreferences.refresh_interval,
            email_notifications: data.email_notifications ?? defaultPreferences.email_notifications,
            push_notifications: data.push_notifications ?? defaultPreferences.push_notifications,
            preferred_topics: data.preferred_topics || defaultPreferences.preferred_topics,
            language: data.language || defaultPreferences.language,
          };
          setPreferences(dbPrefs);
          setLocalPreferences(dbPrefs, user.id);
        } else {
          // No database preferences, check local storage and sync
          const localPrefs = getLocalPreferences(user.id);
          const prefsToUse = localPrefs ? { ...defaultPreferences, ...localPrefs } : defaultPreferences;
          setPreferences(prefsToUse);
          
          // Save to database
          await supabase.from('user_preferences').upsert({
            user_id: user.id,
            ...prefsToUse,
          }, { onConflict: 'user_id' });
        }
      } catch (e) {
        console.error('Error loading preferences:', e);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    loadPreferences();

    return () => {
      isMounted.current = false;
    };
  }, [user?.id]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    // Always save to local storage
    setLocalPreferences(newPreferences, user?.id);

    // If logged in, sync to database
    if (user) {
      try {
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          ...newPreferences,
        }, { onConflict: 'user_id' });
      } catch (e) {
        console.error('Error saving preferences:', e);
      }
    }
  }, [preferences, user?.id]);

  return { preferences, loading, updatePreferences };
}
