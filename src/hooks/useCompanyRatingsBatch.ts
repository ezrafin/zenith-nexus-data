import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { logger } from '@/lib/logger';

export interface CompanyRatingData {
  companySlug: string;
  ratingCount: number;
  userRating: number | null;
}

interface CompanyRatingsMap {
  [companySlug: string]: CompanyRatingData;
}

/**
 * Hook to batch-load rating data for multiple companies at once
 * This prevents N+1 query problems when displaying multiple company cards
 */
export function useCompanyRatingsBatch(companySlugs: string[]): {
  ratings: CompanyRatingsMap;
  isLoading: boolean;
  error: Error | null;
} {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery<CompanyRatingsMap, Error>({
    queryKey: ['companyRatingsBatch', companySlugs, user?.id],
    queryFn: async () => {
      if (companySlugs.length === 0) {
        return {};
      }

      const ratingsMap: CompanyRatingsMap = {};

      try {
        // Initialize all companies with default values
        companySlugs.forEach(slug => {
          ratingsMap[slug] = {
            companySlug: slug,
            ratingCount: 0,
            userRating: null,
          };
        });

        // Batch fetch metadata for all companies
        const { data: metadata, error: metadataError } = await supabase
          .from('companies_metadata')
          .select('company_slug, rating_count')
          .in('company_slug', companySlugs);

        if (metadataError) {
          logger.error('Error loading metadata batch:', metadataError);
          // Fallback to direct count queries if metadata fails
          const countPromises = companySlugs.map(async (slug) => {
            const { count, error: countError } = await supabase
              .from('company_evaluations')
              .select('*', { count: 'exact', head: true })
              .eq('company_slug', slug)
              .eq('is_approved', true);
            
            if (!countError && count !== null) {
              ratingsMap[slug].ratingCount = count;
            }
            return { slug, count: count || 0 };
          });

          await Promise.all(countPromises);
        } else {
          // Use metadata if available
          metadata?.forEach((meta) => {
            if (ratingsMap[meta.company_slug]) {
              ratingsMap[meta.company_slug].ratingCount = meta.rating_count || 0;
            }
          });
        }

        // Batch fetch user ratings if user is logged in
        if (user) {
          const { data: userRatings, error: userRatingsError } = await supabase
            .from('company_evaluations')
            .select('company_slug, rating')
            .in('company_slug', companySlugs)
            .eq('user_id', user.id);

          if (userRatingsError) {
            logger.error('Error loading user ratings batch:', userRatingsError);
          } else {
            userRatings?.forEach((rating) => {
              if (ratingsMap[rating.company_slug]) {
                ratingsMap[rating.company_slug].userRating = rating.rating;
              }
            });
          }
        }
      } catch (error) {
        logger.error('Error in useCompanyRatingsBatch:', error);
        throw error;
      }

      return ratingsMap;
    },
    enabled: companySlugs.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes - ratings don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    ratings: data || {},
    isLoading,
    error: error || null,
  };
}

