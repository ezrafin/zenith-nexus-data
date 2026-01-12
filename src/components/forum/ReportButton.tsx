import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

interface ReportButtonProps {
  contentType: 'discussion' | 'reply';
  contentId: string;
  className?: string;
}

export function ReportButton({ contentType, contentId, className }: ReportButtonProps) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'forum' });
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reportReasons = [
    { value: 'spam', label: t('report.reasons.spam') },
    { value: 'harassment', label: t('report.reasons.harassment') },
    { value: 'misinformation', label: t('report.reasons.misinformation') },
    { value: 'inappropriate', label: t('report.reasons.inappropriate') },
    { value: 'copyright', label: t('report.reasons.copyright') },
    { value: 'other', label: t('report.reasons.other') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reason) {
      toast.error(t('report.pleaseSelectReason'));
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await (supabase
        .from('forum_reports' as any)
        .insert({
          user_id: user.id,
          target_type: contentType,
          target_id: contentId,
          reason,
          description: details,
        }) as any);

      if (error) throw error;

      toast.success(t('report.submitted'));
      setOpen(false);
      setReason('');
      setDetails('');
    } catch (error: any) {
      toast.error(error.message || t('report.failedToSubmit'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Flag className="h-4 w-4 mr-2" />
          {t('actions.report')}
        </Button>
      </DialogTrigger>
      <DialogContent closeAriaLabel={t('buttons.close')}>
        <DialogHeader>
          <DialogTitle>{t('report.title')}</DialogTitle>
          <DialogDescription>
            {t('report.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">{t('report.reasonLabel')}</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder={t('report.reasonPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {reportReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">{t('report.detailsLabel')}</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t('report.detailsPlaceholder')}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('report.cancel')}
            </Button>
            <Button type="submit" disabled={!reason || submitting}>
              {submitting ? t('report.submitting') : t('report.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
