import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  default_markets: string[];
  refresh_interval: number;
  preferred_topics: string[];
  language: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  default_markets: ['indices', 'stocks', 'crypto'],
  refresh_interval: 60000,
  preferred_topics: [],
  language: 'en',
};

export function useUserPreferences() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      if (!user) {
        // Fallback to localStorage for non-authenticated users
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // Remove old notification fields if present
            const { email_notifications, push_notifications, ...cleanPrefs } = parsed;
            setPreferences({ ...defaultPreferences, ...cleanPrefs });
          } catch (e) {
            console.error('Error loading preferences:', e);
          }
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw error;
        }

        if (data) {
          // Map database fields to preferences
          setPreferences({
            theme: (data.theme as 'light' | 'dark' | 'auto') || defaultPreferences.theme,
            default_markets: data.default_markets || defaultPreferences.default_markets,
            refresh_interval: data.refresh_interval || defaultPreferences.refresh_interval,
            preferred_topics: data.preferred_topics || defaultPreferences.preferred_topics,
            language: data.language || defaultPreferences.language,
          });
        } else {
          // Create default preferences in database
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert({
              user_id: user.id,
              ...defaultPreferences,
            });

          if (insertError) {
            console.error('Error creating preferences:', insertError);
          }
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        // Fallback to localStorage
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const { email_notifications, push_notifications, ...cleanPrefs } = parsed;
            setPreferences({ ...defaultPreferences, ...cleanPrefs });
          } catch (e) {
            console.error('Error parsing localStorage preferences:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    if (!user) {
      // Fallback to localStorage for non-authenticated users
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      return;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          theme: newPreferences.theme,
          default_markets: newPreferences.default_markets,
          refresh_interval: newPreferences.refresh_interval,
          preferred_topics: newPreferences.preferred_topics,
          language: newPreferences.language,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Also update localStorage as backup
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
      // Fallback to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      throw error;
    }
  };

  return { preferences, loading, updatePreferences };
}
