import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';

interface BugReportFormProps {
  onClose: () => void;
}

export function BugReportForm({ onClose }: BugReportFormProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const { user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    steps: '',
    expected: '',
    pageUrl: window.location.href,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(t('contactPage.bugReport.loginRequired'));
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'bug_report',
          data: {
            userId: user.id,
            userName: profile?.display_name || user.email,
            userEmail: user.email,
            description: formData.description,
            steps: formData.steps,
            expected: formData.expected,
            pageUrl: formData.pageUrl,
            browser: navigator.userAgent,
          },
        },
      });

      if (error) throw error;

      toast.success(t('contactPage.bugReport.success'));
      onClose();
    } catch (error) {
      console.error('Error submitting bug report:', error);
      toast.error(t('contactPage.bugReport.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">{t('contactPage.bugReport.description')} *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={t('contactPage.bugReport.descriptionPlaceholder')}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="steps">{t('contactPage.bugReport.steps')}</Label>
        <Textarea
          id="steps"
          value={formData.steps}
          onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
          placeholder={t('contactPage.bugReport.stepsPlaceholder')}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expected">{t('contactPage.bugReport.expected')}</Label>
        <Textarea
          id="expected"
          value={formData.expected}
          onChange={(e) => setFormData({ ...formData, expected: e.target.value })}
          placeholder={t('contactPage.bugReport.expectedPlaceholder')}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pageUrl">{t('contactPage.bugReport.pageUrl')}</Label>
        <Input
          id="pageUrl"
          value={formData.pageUrl}
          onChange={(e) => setFormData({ ...formData, pageUrl: e.target.value })}
          placeholder={t('contactPage.bugReport.pageUrlPlaceholder')}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 min-h-[44px]">
          {t('contactPage.bugReport.cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1 min-h-[44px]">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('contactPage.bugReport.submitting')}
            </>
          ) : (
            t('contactPage.bugReport.submit')
          )}
        </Button>
      </div>
    </form>
  );
}
