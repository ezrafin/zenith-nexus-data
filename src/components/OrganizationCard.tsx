import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Shield, ShieldCheck, Users, Award, ExternalLink, Star } from 'lucide-react';
import { Organization, OrganizationType } from '@/lib/organizations';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
interface OrganizationCardProps {
  organization: Organization;
  index?: number;
}

const typeLabels: Record<OrganizationType, string> = {
  broker: 'Broker',
  hedge_fund: 'Hedge Fund',
  bank: 'Bank',
  asset_manager: 'Asset Manager',
  pension_fund: 'Pension Fund',
  wealth_manager: 'Wealth Manager',
};

const typeColors: Record<OrganizationType, string> = {
  broker: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  hedge_fund: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  bank: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  asset_manager: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  pension_fund: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  wealth_manager: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
};

function getTrustColor(score: number): string {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 50) return 'text-orange-500';
  return 'text-red-500';
}

function getTrustBgColor(score: number): string {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 50) return 'bg-orange-500';
  return 'bg-red-500';
}

export function OrganizationCard({ organization, index = 0 }: OrganizationCardProps) {
  const { user } = useUser();
  const combinedTrust = Math.round((organization.communityTrust + organization.expertTrust) / 2);
  const [ratingCount, setRatingCount] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    async function loadRatingData() {
      try {
        // Get total rating count
        const { count, error: countError } = await supabase
          .from('company_evaluations')
          .select('*', { count: 'exact', head: true })
          .eq('company_slug', organization.id);

        if (countError) throw countError;
        setRatingCount(count || 0);

        // Get user's rating if logged in
        if (user) {
          const { data, error: userError } = await supabase
            .from('company_evaluations')
            .select('rating')
            .eq('company_slug', organization.id)
            .eq('user_id', user.id)
            .maybeSingle();

          if (userError) throw userError;
          setUserRating(data?.rating ?? null);
        } else {
          setUserRating(null);
        }
      } catch (error) {
        console.error('Error loading rating data:', error);
      }
    }

    loadRatingData();
  }, [organization.id, user]);
  
  return (
    <Link to={`/companies/${organization.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group premium-card p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/50">
          {organization.logo ? (
            <img 
              src={organization.logo} 
              alt={`${organization.name} logo`}
              className="w-8 h-8 object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <Building2 className={`h-6 w-6 text-muted-foreground ${organization.logo ? 'hidden' : ''}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base truncate">{organization.name}</h3>
            {organization.regulated && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Regulated by: {organization.regulators?.join(', ')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs ${typeColors[organization.type]}`}>
              {typeLabels[organization.type]}
            </Badge>
            {organization.aum && (
              <span className="text-xs text-muted-foreground">AUM: {organization.aum}</span>
            )}
          </div>
        </div>
        
        {/* Combined Trust Score Badge */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getTrustBgColor(combinedTrust)}/10`}>
          <span className={`text-lg font-bold ${getTrustColor(combinedTrust)}`}>{combinedTrust}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {organization.description}
      </p>

      {/* Trust Scores */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1.5 min-w-[100px]">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Community</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Based on user reviews and community feedback</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Progress value={organization.communityTrust} className="flex-1 h-2" />
          <span className={`text-xs font-medium w-8 text-right ${getTrustColor(organization.communityTrust)}`}>
            {organization.communityTrust}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1.5 min-w-[100px]">
                <Award className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Expert</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Based on expert analysis and ratings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Progress value={organization.expertTrust} className="flex-1 h-2" />
          <span className={`text-xs font-medium w-8 text-right ${getTrustColor(organization.expertTrust)}`}>
            {organization.expertTrust}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>Est. {organization.founded}</span>
          <span>·</span>
          <span>{organization.headquarters}</span>
          {ratingCount !== null && ratingCount > 0 && (
            <>
              <span>·</span>
              <span className="text-[10px]">Rated by {ratingCount} {ratingCount === 1 ? 'user' : 'users'}</span>
            </>
          )}
          {userRating !== null && (
            <>
              <span>·</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-primary fill-primary" />
                    <span className={`font-medium ${getTrustColor(userRating)}`}>
                      {userRating}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your rating for this company</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        {organization.website && (
          <a 
            href={organization.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      </motion.div>
    </Link>
  );
}
