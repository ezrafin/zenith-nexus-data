import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Plus, X, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobApplicationFormProps {
  position: string;
  onClose: () => void;
}

export function JobApplicationForm({ position, onClose }: JobApplicationFormProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [links, setLinks] = useState<string[]>(['']);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t('careersPage.form.fileTooLarge'));
        return;
      }
      setCvFile(file);
    }
  };

  const addLinkField = () => {
    if (links.length < 5) {
      setLinks([...links, '']);
    }
  };

  const removeLinkField = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let cvUrl = '';
      
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `cv-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(`cv/${fileName}`, cvFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('uploads')
          .getPublicUrl(`cv/${fileName}`);
        
        cvUrl = publicUrl;
      }

      const validLinks = links.filter(link => link.trim() !== '');

      const { error } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'job_application',
          data: {
            position,
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            cvUrl,
            links: validLinks,
          },
        },
      });

      if (error) throw error;

      toast.success(t('careersPage.form.success'));
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(t('careersPage.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">{t('careersPage.form.fullName')} *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder={t('careersPage.form.fullNamePlaceholder')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t('careersPage.form.phone')} *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={t('careersPage.form.phonePlaceholder')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('careersPage.form.email')}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={t('careersPage.form.emailPlaceholder')}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('careersPage.form.cv')} *</Label>
        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="glass-card p-4 border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center gap-2">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {cvFile ? cvFile.name : t('careersPage.form.cvPlaceholder')}
              </span>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">{t('careersPage.form.cvHint')}</p>
      </div>

      <div className="space-y-2">
        <Label>{t('careersPage.form.links')}</Label>
        <div className="space-y-2">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={link}
                onChange={(e) => updateLink(index, e.target.value)}
                placeholder={t('careersPage.form.linksPlaceholder')}
                type="url"
              />
              {links.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLinkField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {links.length < 5 && (
          <Button type="button" variant="outline" size="sm" onClick={addLinkField}>
            <Plus className="h-4 w-4 mr-2" />
            {t('careersPage.form.addLink')}
          </Button>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {t('careersPage.form.cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('careersPage.form.submitting')}
            </>
          ) : (
            t('careersPage.form.submit')
          )}
        </Button>
      </div>
    </form>
  );
}
