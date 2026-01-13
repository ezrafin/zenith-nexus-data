import { Layout } from '@/components/layout/Layout';
import { Target, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { SEOHead } from '@/components/seo/SEOHead';

export default function AdvertisePage() {
  const { t } = useTranslation({ namespace: 'ui' });

  const stats = [
    { value: '500K+', label: t('advertisePage.statsVisitors') },
    { value: '2.5M+', label: t('advertisePage.statsPageViews') },
    { value: '150K+', label: t('advertisePage.statsSubscribers') },
    { value: '85%', label: t('advertisePage.statsHnwi') },
  ];

  const adFormats = [
    {
      icon: Target,
      title: t('advertisePage.formatDisplayTitle'),
      description: t('advertisePage.formatDisplayDesc'),
      price: t('advertisePage.formatDisplayPrice'),
    },
    {
      icon: Users,
      title: t('advertisePage.formatSponsoredTitle'),
      description: t('advertisePage.formatSponsoredDesc'),
      price: t('advertisePage.formatSponsoredPrice'),
    },
    {
      icon: TrendingUp,
      title: t('advertisePage.formatNewsletterTitle'),
      description: t('advertisePage.formatNewsletterDesc'),
      price: t('advertisePage.formatNewsletterPrice'),
    },
    {
      icon: Zap,
      title: t('advertisePage.formatCustomTitle'),
      description: t('advertisePage.formatCustomDesc'),
      price: t('advertisePage.formatCustomPrice'),
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Advertising & Partnerships"
        description="Reach a highly engaged audience of investors and financial professionals. Discover advertising opportunities, sponsored content, and partnership programs with INVESTOPATRONUS."
      />
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">{t('advertisePage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('advertisePage.heroTitle')}</h1>
            <p className="body-xl">
              {t('advertisePage.heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container-wide section-spacing-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="heading-lg text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Formats */}
        <section className="section-gradient section-spacing">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">{t('advertisePage.solutionsTitle')}</h2>
              <p className="body-lg max-w-2xl mx-auto">
                {t('advertisePage.solutionsSubtitle')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {adFormats.map((format) => (
                <div key={format.title} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <format.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-xs mb-2">{format.title}</h3>
                  <p className="body-sm mb-4">{format.description}</p>
                  <p className="text-sm font-semibold text-primary">{format.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="container-wide section-spacing-sm">
          <div className="glass-card p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-lg mb-4">{t('advertisePage.audienceTitle')}</h2>
                <p className="body-lg mb-6">
                  {t('advertisePage.audienceSubtitle')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{t('advertisePage.audiencePoint1')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{t('advertisePage.audiencePoint2')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{t('advertisePage.audiencePoint3')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{t('advertisePage.audiencePoint4')}</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-block p-8 rounded-full bg-primary/10">
                  <Users className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">{t('advertisePage.ctaTitle')}</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              {t('advertisePage.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                {t('advertisePage.ctaDownload')}
              </Button>
              <Button size="lg" variant="outline">
                {t('advertisePage.ctaContact')} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
