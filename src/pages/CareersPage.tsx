import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { JobApplicationForm } from '@/components/careers/JobApplicationForm';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

const positions = [
  {
    title: 'Product Designer',
    location: 'Lugano',
    type: 'Full-time',
    descriptionKey: 'careersPage.posDesigner',
  },
];

export default function CareersPage() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Bill collection: info_page_visit
  usePageBillCollection({ billId: 'info_page_visit' });
  const [selectedPosition, setSelectedPosition] = useState('');

  const openApplicationForm = (position: string) => {
    setSelectedPosition(position);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">{t('careersPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('careersPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('careersPage.heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Open Positions */}
        <section className="container-wide section-spacing-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-lg">{t('careersPage.positionsTitle')}</h2>
          </div>
          <div className="grid gap-4">
            {positions.map((role) => (
              <div key={role.title} className="glass-card p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="heading-sm">{role.title}</div>
                    <div className="text-sm text-muted-foreground">{role.location}</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{role.location}</span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{role.type}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(role.descriptionKey)}
                </p>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                  <Briefcase className="h-4 w-4" />
                  {t('careersPage.typeLabel')}: {role.type}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">{t('careersPage.ctaTitle')}</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">{t('careersPage.ctaSubtitle')}</p>
            <Button size="lg" onClick={() => openApplicationForm('General Application')}>
              {t('careersPage.ctaButton')}
            </Button>
          </div>
        </section>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('careersPage.form.title')}</DialogTitle>
          </DialogHeader>
          <JobApplicationForm 
            position={selectedPosition} 
            onClose={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
