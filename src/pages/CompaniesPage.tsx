import { useState, useMemo, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { OrganizationCard } from '@/components/OrganizationCard';
import { Pagination } from '@/components/Pagination';
import { organizations, organizationTypes, regions, sortByTrust, filterOrganizations, OrganizationType, Region } from '@/lib/organizations';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Award, ArrowUpDown, Globe, Search } from 'lucide-react';
import { logger } from '@/lib/logger';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/seo/SEOHead';
import { useCompanyRatingsBatch } from '@/hooks/useCompanyRatingsBatch';

type SortOption = 'alphabetical' | 'combined' | 'community' | 'expert';
const ITEMS_PER_PAGE = 15;

export default function CompaniesPage() {
  const { t } = useTranslation({ namespace: 'ui' });
  // Bill collection: companies_page_visit
  const { CoinComponent } = usePageBillCollection({ billId: 'companies_page_visit' });
  const [selectedType, setSelectedType] = useState<OrganizationType | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('combined');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredOrganizations = useMemo(() => {
    let filtered = filterOrganizations(selectedType, selectedRegion);
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(query) ||
        org.description.toLowerCase().includes(query) ||
        org.headquarters.toLowerCase().includes(query)
      );
    }
    
    return sortByTrust(filtered, sortBy);
  }, [selectedType, selectedRegion, sortBy, searchQuery]);

  const [stats, setStats] = useState({
    total: organizations.length,
    regulated: organizations.filter(org => org.regulated).length,
    avgCommunity: 0,
    avgExpert: 0,
  });

  // Calculate average trust scores from real user evaluations in database
  useEffect(() => {
    async function calculateAverageTrust() {
      try {
        // Fetch all approved evaluations from database
        const { data: evaluations, error } = await supabase
          .from('company_evaluations')
          .select('rating, is_approved')
          .eq('is_approved', true);

        if (error) {
          logger.error('Error fetching evaluations:', error);
          // Fallback to static data if database query fails
          setStats({
            total: organizations.length,
            regulated: organizations.filter(org => org.regulated).length,
            avgCommunity: Math.round(organizations.reduce((sum, org) => sum + org.communityTrust, 0) / organizations.length),
            avgExpert: Math.round(organizations.reduce((sum, org) => sum + org.expertTrust, 0) / organizations.length),
          });
          return;
        }

        if (evaluations && evaluations.length > 0) {
          // Calculate average rating from user evaluations
          const avgRating = evaluations.reduce((sum, evaluation) => sum + evaluation.rating, 0) / evaluations.length;
          const roundedAvg = Math.round(avgRating);

          // Use the same average for both community and expert trust
          // (since database only has one rating field)
          // If you want separate values, you'd need to add community_trust and expert_trust fields to company_evaluations table
          setStats(prev => ({
            ...prev,
            avgCommunity: roundedAvg,
            avgExpert: roundedAvg,
          }));
        } else {
          // No evaluations yet, use static data as fallback
          setStats(prev => ({
            ...prev,
            avgCommunity: Math.round(organizations.reduce((sum, org) => sum + org.communityTrust, 0) / organizations.length),
            avgExpert: Math.round(organizations.reduce((sum, org) => sum + org.expertTrust, 0) / organizations.length),
          }));
        }
      } catch (error) {
        logger.error('Error calculating average trust:', error);
        // Fallback to static data on error
        setStats(prev => ({
          ...prev,
          avgCommunity: Math.round(organizations.reduce((sum, org) => sum + org.communityTrust, 0) / organizations.length),
          avgExpert: Math.round(organizations.reduce((sum, org) => sum + org.expertTrust, 0) / organizations.length),
        }));
      }
    }

    calculateAverageTrust();
  }, []);

  // Pagination
  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE);
  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Batch load ratings for all companies on current page
  const companySlugs = useMemo(
    () => paginatedOrganizations.map(org => org.id),
    [paginatedOrganizations]
  );
  const { ratings: companyRatings } = useCompanyRatingsBatch(companySlugs);

  const handleTypeChange = (type: OrganizationType | 'all') => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleRegionChange = (region: Region | 'all') => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section when page changes
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <Layout>
      <SEOHead
        title="Financial Organizations & Companies Directory"
        description="Explore trusted financial organizations, brokers, exchanges, and financial institutions. Find regulated companies with expert trust ratings and community reviews."
        keywords="financial companies, brokers, financial institutions, stock exchanges, regulated brokers, financial organizations, investment firms, trading platforms"
      />
      <section ref={sectionRef} className="section-spacing">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-lg mb-4">{t('companiesPage.title')}</h1>
              <p className="body-md text-muted-foreground max-w-2xl">
                {t('companiesPage.description', { count: organizations.length })}
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="premium-card p-4 text-center">
              <Building2 className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">{t('companiesPage.organizations')}</div>
            </div>
            <div className="premium-card p-4 text-center">
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.regulated}</div>
              <div className="text-xs text-muted-foreground">{t('companiesPage.regulated')}</div>
            </div>
            <div className="premium-card p-4 text-center">
              <Users className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgCommunity}</div>
              <div className="text-xs text-muted-foreground">{t('companiesPage.avgCommunityTrust')}</div>
            </div>
            <div className="premium-card p-4 text-center">
              <Award className="h-5 w-5 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgExpert}</div>
              <div className="text-xs text-muted-foreground">{t('companiesPage.avgExpertTrust')}</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('companiesPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* Type Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {organizationTypes.map((type) => {
                  const labelKey = type.value === 'all' 
                    ? 'companiesPage.allTypes'
                    : type.value === 'broker' ? 'companiesPage.brokers'
                    : type.value === 'hedge_fund' ? 'companiesPage.hedgeFunds'
                    : type.value === 'asset_manager' ? 'companiesPage.assetManagers'
                    : type.value === 'bank' ? 'companiesPage.banks'
                    : type.value === 'wealth_manager' ? 'companiesPage.wealthManagers'
                    : type.value === 'pension_fund' ? 'companiesPage.pensionFunds'
                    : type.value === 'exchange' ? 'companiesPage.exchange'
                    : 'companiesPage.allTypes';
                  return (
                    <Button
                      key={type.value}
                      variant={selectedType === type.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTypeChange(type.value)}
                      className="text-sm whitespace-nowrap"
                    >
                      {t(labelKey)}
                    </Button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Region Filter */}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedRegion} onValueChange={(v) => handleRegionChange(v as Region | 'all')}>
                    <SelectTrigger className="w-[160px] sm:w-[180px]">
                      <SelectValue placeholder={t('companiesPage.regionPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {regions.map((region) => {
                        const labelKey = region.value === 'all' 
                          ? 'companiesPage.allRegions'
                          : region.value === 'north_america' ? 'companiesPage.northAmerica'
                          : region.value === 'europe' ? 'companiesPage.europe'
                          : region.value === 'asia_pacific' ? 'companiesPage.asiaPacific'
                          : region.value === 'middle_east_africa' ? 'companiesPage.middleEastAfrica'
                          : region.value === 'latin_america' ? 'companiesPage.latinAmerica'
                          : 'companiesPage.global';
                        return (
                          <SelectItem key={region.value} value={region.value}>
                            {t(labelKey)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[160px] sm:w-[180px]">
                      <SelectValue placeholder={t('companiesPage.sortByPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="alphabetical">{t('companiesPage.alphabetical')}</SelectItem>
                      <SelectItem value="combined">{t('companiesPage.combinedTrust')}</SelectItem>
                      <SelectItem value="community">{t('companiesPage.communityTrust')}</SelectItem>
                      <SelectItem value="expert">{t('companiesPage.expertTrust')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            {t('companiesPage.showingResults', { current: paginatedOrganizations.length, total: filteredOrganizations.length })}
          </div>

          {/* Organizations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedOrganizations.map((org, index) => (
              <OrganizationCard 
                key={org.id} 
                organization={org} 
                index={index}
                ratingData={companyRatings[org.id]}
              />
            ))}
          </div>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {t('companiesPage.noOrganizationsFound')}
            </div>
          )}

          {filteredOrganizations.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
      {CoinComponent && <CoinComponent />}
    </Layout>
  );
}
