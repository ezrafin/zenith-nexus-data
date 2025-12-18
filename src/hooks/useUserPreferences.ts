import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

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
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  // Fetch preferences from database for logged-in users
  const fetchFromDatabase = useCallback(async (userId: string): Promise<UserPreferences | null> => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching preferences from database:', error);
        return null;
      }

      if (data) {
        return {
          theme: data.theme as UserPreferences['theme'],
          default_markets: data.default_markets,
          refresh_interval: data.refresh_interval,
          email_notifications: data.email_notifications,
          push_notifications: data.push_notifications,
          preferred_topics: data.preferred_topics,
          language: data.language,
        };
      }
      return null;
    } catch (e) {
      console.error('Error fetching preferences:', e);
      return null;
    }
  }, []);

  // Save preferences to database
  const saveToDatabase = useCallback(async (userId: string, prefs: UserPreferences): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          theme: prefs.theme,
          default_markets: prefs.default_markets,
          refresh_interval: prefs.refresh_interval,
          email_notifications: prefs.email_notifications,
          push_notifications: prefs.push_notifications,
          preferred_topics: prefs.preferred_topics,
          language: prefs.language,
        }, {
          onConflict: 'user_id',
        });

      if (error) {
        console.error('Error saving preferences to database:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error saving preferences:', e);
      return false;
    }
  }, []);

  // Load preferences on mount or user change
  useEffect(() => {
    const loadPreferences = async () => {
      setLoading(true);

      if (user) {
        // Try to fetch from database first
        const dbPrefs = await fetchFromDatabase(user.id);
        
        if (dbPrefs) {
          setPreferences(dbPrefs);
          // Also update local storage for offline access
          setLocalPreferences(dbPrefs, user.id);
        } else {
          // No database preferences, check local storage
          const localPrefs = getLocalPreferences(user.id);
          if (localPrefs) {
            setPreferences(localPrefs);
            // Sync local preferences to database
            await saveToDatabase(user.id, localPrefs);
          } else {
            // Use defaults and save to database
            setPreferences(defaultPreferences);
            await saveToDatabase(user.id, defaultPreferences);
          }
        }
      } else {
        // Anonymous user - use local storage only
        const localPrefs = getLocalPreferences();
        if (localPrefs) {
          setPreferences({ ...defaultPreferences, ...localPrefs });
        } else {
          setPreferences(defaultPreferences);
        }
      }

      setLoading(false);
    };

    loadPreferences();
  }, [user, fetchFromDatabase, saveToDatabase]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    // Always save to local storage for offline access
    setLocalPreferences(newPreferences, user?.id);

    // If logged in, sync to database
    if (user) {
      await saveToDatabase(user.id, newPreferences);
    }
  }, [preferences, user, saveToDatabase]);

  return { preferences, loading, updatePreferences };
}
