import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { OrganizationCard } from '@/components/OrganizationCard';
import { Pagination } from '@/components/Pagination';
import { organizations, organizationTypes, regions, sortByTrust, filterOrganizations, OrganizationType, Region } from '@/lib/organizations';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Award, ArrowUpDown, Globe, Search } from 'lucide-react';

type SortOption = 'combined' | 'community' | 'expert';
const ITEMS_PER_PAGE = 15;

export default function CompaniesPage() {
  const [selectedType, setSelectedType] = useState<OrganizationType | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('combined');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  const stats = useMemo(() => ({
    total: organizations.length,
    regulated: organizations.filter(org => org.regulated).length,
    avgCommunity: Math.round(organizations.reduce((sum, org) => sum + org.communityTrust, 0) / organizations.length),
    avgExpert: Math.round(organizations.reduce((sum, org) => sum + org.expertTrust, 0) / organizations.length),
  }), []);

  // Pagination
  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE);
  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTypeChange = (type: OrganizationType | 'all') => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleRegionChange = (region: Region | 'all') => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-lg mb-4">Financial Organizations</h1>
              <p className="body-md text-muted-foreground max-w-2xl">
                Over {organizations.length} brokers, hedge funds, banks, and exchanges from around the world, ranked by community and expert trust scores
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
              <div className="text-xs text-muted-foreground">Organizations</div>
            </div>
            <div className="premium-card p-4 text-center">
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.regulated}</div>
              <div className="text-xs text-muted-foreground">Regulated</div>
            </div>
            <div className="premium-card p-4 text-center">
              <Users className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgCommunity}</div>
              <div className="text-xs text-muted-foreground">Avg Community Trust</div>
            </div>
            <div className="premium-card p-4 text-center">
              <Award className="h-5 w-5 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgExpert}</div>
              <div className="text-xs text-muted-foreground">Avg Expert Trust</div>
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
                placeholder="Search by name, description, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
            {/* Type Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {organizationTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTypeChange(type.value)}
                  className="text-sm"
                >
                  {type.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto flex-wrap">
              {/* Region Filter */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedRegion} onValueChange={(v) => handleRegionChange(v as Region | 'all')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="combined">Combined Trust</SelectItem>
                    <SelectItem value="community">Community Trust</SelectItem>
                    <SelectItem value="expert">Expert Trust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {paginatedOrganizations.length} of {filteredOrganizations.length} organizations
          </div>

          {/* Organizations Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedOrganizations.map((org, index) => (
              <OrganizationCard key={org.id} organization={org} index={index} />
            ))}
          </div>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No organizations found for this filter.
            </div>
          )}

          {filteredOrganizations.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
