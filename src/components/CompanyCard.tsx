import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { Company } from '@/lib/api/types';

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/companies/${company.slug}`}
        className="group block h-full premium-card p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="flex items-start gap-4 mb-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name} 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <Building2 className={`h-6 w-6 text-muted-foreground ${company.logo ? 'hidden' : ''}`} />
          </div>
          
          {/* Title & Sector */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
              {company.name}
            </h3>
            <span className="text-xs text-muted-foreground">{company.sector}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {company.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Cap: {company.marketCap}</span>
            <span>·</span>
            <span>{company.headquarters}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
}