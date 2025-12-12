import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchCompanyBySlug, fetchCompanies, Company } from '@/lib/api';
import { organizations, Organization } from '@/lib/organizations';
import { CompanyCard } from '@/components/CompanyCard';
import { CompanyRating } from '@/components/companies/CompanyRating';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { generateOrganizationSchema } from '@/utils/structuredData';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Building2, MapPin, Users, Calendar, DollarSign } from 'lucide-react';

// Helper to convert Organization to Company format
function organizationToCompany(org: Organization): Company {
  return {
    slug: org.id,
    name: org.name,
    logo: org.logo,
    sector: org.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: org.description,
    founded: org.founded,
    headquarters: org.headquarters,
    employees: 'N/A',
    marketCap: org.aum || 'N/A',
    overview: org.description,
  };
}

export default function CompanyDetailPage() {
  const { slug } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [similarCompanies, setSimilarCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        // First try to find in organizations data
        const org = organizations.find(o => o.id === slug);
        
        let companyData: Company | null = null;
        if (org) {
          companyData = organizationToCompany(org);
        } else {
          // Fall back to legacy mock data
          companyData = await fetchCompanyBySlug(slug);
        }

        const companiesData = await fetchCompanies();
        
        setCompany(companyData);
        
        // For similar companies, find other organizations of same type
        if (org) {
          const similarOrgs = organizations
            .filter(o => o.id !== slug && o.type === org.type)
            .slice(0, 3)
            .map(organizationToCompany);
          setSimilarCompanies(similarOrgs);
        } else {
          setSimilarCompanies(
            companiesData
              .filter(c => c.slug !== slug && c.sector === companyData?.sector)
              .slice(0, 3)
          );
        }
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container-wide section-spacing">
          <div className="animate-pulse space-y-8">
            <div className="h-48 bg-muted rounded-xl" />
            <div className="grid md:grid-cols-3 gap-6">
              <SkeletonCard lines={4} />
              <SkeletonCard lines={4} />
              <SkeletonCard lines={4} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">Company not found</h1>
          <Link to="/companies" className="text-primary hover:underline">
            Return to companies
          </Link>
        </div>
      </Layout>
    );
  }

  const stats = [
    { label: 'Founded', value: company.founded, icon: Calendar },
    { label: 'Headquarters', value: company.headquarters, icon: MapPin },
    { label: 'Employees', value: company.employees, icon: Users },
    { label: 'Market Cap', value: company.marketCap, icon: DollarSign },
  ];

  return (
    <Layout>
      <SEOHead
        title={`${company.name} - Company Profile`}
        description={company.description || `Detailed information about ${company.name}`}
        type="website"
      />
      <StructuredData data={[generateOrganizationSchema()]} />
      {/* Hero Banner - Pantera Style */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-16 md:py-24">
          <Breadcrumbs pageTitle={company.name} />

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              ) : (
                <Building2 className="w-10 h-10 opacity-50" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="badge-primary bg-primary-foreground/10 text-primary-foreground">
                  {company.sector}
                </span>
              </div>
              <h1 className="heading-lg">{company.name}</h1>
              <p className="body-md text-primary-foreground/70 mt-2 max-w-2xl">
                {company.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-b border-border">
        <div className="container-wide py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 md:p-6 rounded-xl border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-xs md:text-sm">{stat.label}</span>
                </div>
                <p className="text-lg md:text-2xl font-heading font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <h2 className="heading-sm mb-6">Company Overview</h2>
          <div className="p-6 md:p-8 rounded-xl border border-border/60 bg-card">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {company.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Table */}
      <section className="section-spacing-sm bg-secondary/30">
        <div className="container-wide">
          <h2 className="heading-sm mb-6">Key Metrics</h2>
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">Market Capitalization</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-right">{company.marketCap}</td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">Sector</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-right">{company.sector}</td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">Number of Employees</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-right">{company.employees}</td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">Year Founded</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-right">{company.founded}</td>
                </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">Headquarters</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-right">{company.headquarters}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Community Evaluations */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <CompanyRating companySlug={slug || ''} />
        </div>
      </section>

      {/* Similar Companies */}
      {similarCompanies.length > 0 && (
        <section className="section-spacing-sm">
          <div className="container-wide">
            <h2 className="heading-sm mb-6">Similar Companies</h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {similarCompanies.map((comp, index) => (
                <CompanyCard key={comp.slug} company={comp} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
