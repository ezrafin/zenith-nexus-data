import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Mail, MapPin, Send, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BugReportForm } from '@/components/contact/BugReportForm';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

export default function ContactPage() {
  // Bill collection: info_page_visit
  const { CoinComponent } = usePageBillCollection({ billId: 'info_page_visit' });
  const { t } = useTranslation({ namespace: 'ui' });
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'contact',
          data: formData,
        },
      });

      if (error) throw error;

      toast.success(t('contactPage.toastSuccess'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(t('contactPage.toastError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBugReportClick = () => {
    if (!user) {
      toast.error(t('contactPage.bugReport.loginRequired'));
      return;
    }
    setIsBugReportOpen(true);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">{t('contactPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('contactPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('contactPage.heroSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contactPage.emailTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('contactPage.emailSupport')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contactPage.officeTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('contactPage.officeLine1')}</p>
                    <p className="text-sm text-muted-foreground">{t('contactPage.officeLine2')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bug className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{t('contactPage.techSupportTitle')}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{t('contactPage.techSupportDesc')}</p>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleBugReportClick}>
                      <Bug className="h-4 w-4 mr-2" />
                      {t('contactPage.reportBugButton')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <h2 className="heading-sm mb-6">{t('contactPage.formTitle')}</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contactPage.labelName')}</label>
                    <Input 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                      placeholder={t('contactPage.placeholderName')} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contactPage.labelEmail')}</label>
                    <Input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                      placeholder={t('contactPage.placeholderEmail')} 
                      required 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">{t('contactPage.labelSubject')}</label>
                  <Input 
                    value={formData.subject} 
                    onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                    placeholder={t('contactPage.placeholderSubject')} 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">{t('contactPage.labelMessage')}</label>
                  <Textarea 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                    placeholder={t('contactPage.placeholderMessage')} 
                    rows={6} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? t('contactPage.buttonSending') : t('contactPage.buttonSend')}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Dialog open={isBugReportOpen} onOpenChange={setIsBugReportOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('contactPage.bugReport.title')}</DialogTitle>
          </DialogHeader>
          <BugReportForm onClose={() => setIsBugReportOpen(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
