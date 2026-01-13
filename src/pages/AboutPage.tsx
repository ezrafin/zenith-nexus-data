import { Layout } from '@/components/layout/Layout';
import { Users, Target, Award, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

export default function AboutPage() {
  // Bill collection: info_page_visit
  const { CoinComponent } = usePageBillCollection({ billId: 'info_page_visit' });
  const { t } = useTranslation({ namespace: 'ui' });

  const values = [
    {
      icon: Target,
      title: t('aboutPage.valueAccuracyTitle'),
      description: t('aboutPage.valueAccuracyDesc'),
    },
    {
      icon: Users,
      title: t('aboutPage.valueCommunityTitle'),
      description: t('aboutPage.valueCommunityDesc'),
    },
    {
      icon: Award,
      title: t('aboutPage.valueExcellenceTitle'),
      description: t('aboutPage.valueExcellenceDesc'),
    },
    {
      icon: Globe,
      title: t('aboutPage.valueGlobalTitle'),
      description: t('aboutPage.valueGlobalDesc'),
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="About INVESTOPATRONUS - Your Guardian in Global Markets"
        description="Learn about INVESTOPATRONUS, a professional financial analytics platform providing real-time market data, expert insights, and comprehensive investment resources. Discover our mission, values, and commitment to empowering investors."
      />
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">{t('aboutPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('aboutPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('aboutPage.heroSubtitle')}
            </p>
          </div>
        </section>
        {/* Story */}
        <section className="container-wide section-spacing-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">{t('aboutPage.storyTitle')}</h2>
              <div className="space-y-4 body-lg">
                <p>{t('aboutPage.storyP1')}</p>
                <p>{t('aboutPage.storyP2')}</p>
                <p>{t('aboutPage.storyP3')}</p>
              </div>
            </div>
            <div className="glass-card p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">30K+</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.statsActiveUsers')}</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.statsMarketsCovered')}</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.statsRealTime')}</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.statsYearsExperience')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-gradient section-spacing">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">{t('aboutPage.valuesTitle')}</h2>
              <p className="body-lg max-w-2xl mx-auto">
                {t('aboutPage.valuesSubtitle')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-xs mb-2">{value.title}</h3>
                  <p className="body-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      {CoinComponent && <CoinComponent />}
    </Layout>
  );
}
