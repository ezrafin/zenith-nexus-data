import { motion } from 'framer-motion';
import { Building2, Shield, ShieldCheck, Users, Award, ExternalLink } from 'lucide-react';
import { Organization, OrganizationType } from '@/lib/organizations';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OrganizationCardProps {
  organization: Organization;
  index?: number;
}

const typeLabels: Record<OrganizationType, string> = {
  broker: 'Broker',
  hedge_fund: 'Hedge Fund',
  bank: 'Bank',
  exchange: 'Exchange',
  asset_manager: 'Asset Manager',
  fintech: 'Fintech',
  pension_fund: 'Pension Fund',
  wealth_manager: 'Wealth Manager',
};

const typeColors: Record<OrganizationType, string> = {
  broker: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  hedge_fund: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  bank: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  exchange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  asset_manager: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  fintech: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
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
  const combinedTrust = Math.round((organization.communityTrust + organization.expertTrust) / 2);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group premium-card p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Building2 className="h-6 w-6 text-muted-foreground" />
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
        </div>
        {organization.website && (
          <a 
            href={organization.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
