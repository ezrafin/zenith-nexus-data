import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export interface Recommendation {
  type: 'article' | 'forum' | 'video' | 'analytics';
  id: string;
  title: string;
  reason: string;
  score: number;
}

export function useRecommendations() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Mock recommendations
      setRecommendations([
        { type: 'article', id: '1', title: 'Understanding Real Returns vs Inflation', reason: 'Popular article', score: 95 },
        { type: 'forum', id: '2', title: 'Best Long-term Investment Strategies', reason: 'Trending discussion', score: 90 },
      ]);
    }
  }, [user]);

  return { recommendations, loading, refresh: () => {} };
}
