import { useState, useEffect } from 'react';
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
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Error loading preferences:', e);
      }
    }
    setLoading(false);
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  };

  return { preferences, loading, updatePreferences };
}
