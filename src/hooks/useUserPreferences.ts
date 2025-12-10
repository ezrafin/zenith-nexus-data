import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  default_markets: string[];
  refresh_interval: number;
  email_notifications: boolean;
  push_notifications: boolean;
  preferred_topics: string[];
  language: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  default_markets: ['indices', 'stocks', 'crypto'],
  refresh_interval: 60000,
  email_notifications: true,
  push_notifications: false,
  preferred_topics: [],
  language: 'en',
};

export function useUserPreferences() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPreferences();
    } else {
      // Load from localStorage for non-authenticated users
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        try {
          setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
        } catch (e) {
          console.error('Error loading preferences from localStorage:', e);
        }
      }
      setLoading(false);
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setPreferences({
          theme: data.theme || defaultPreferences.theme,
          default_markets: data.default_markets || defaultPreferences.default_markets,
          refresh_interval: data.refresh_interval || defaultPreferences.refresh_interval,
          email_notifications: data.email_notifications ?? defaultPreferences.email_notifications,
          push_notifications: data.push_notifications ?? defaultPreferences.push_notifications,
          preferred_topics: data.preferred_topics || defaultPreferences.preferred_topics,
          language: data.language || defaultPreferences.language,
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    if (user) {
      try {
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            ...newPreferences,
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      } catch (error) {
        console.error('Error updating preferences:', error);
        // Revert on error
        setPreferences(preferences);
        throw error;
      }
    } else {
      // Save to localStorage for non-authenticated users
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    }
  };

  return {
    preferences,
    loading,
    updatePreferences,
  };
}

