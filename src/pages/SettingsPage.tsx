import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Bell, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

export default function SettingsPage() {
  // Bill collection: settings_visit
  usePageBillCollection({ billId: 'settings_visit' });
  const { user } = useUser();
  const { preferences, loading, updatePreferences } = useUserPreferences();
  const { t } = useTranslation({ namespace: 'ui' });
  const [saving, setSaving] = useState(false);
  const [localPrefs, setLocalPrefs] = useState(preferences);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">{t('settings.pleaseSignIn')}</h1>
            <p className="text-muted-foreground mb-6">{t('settings.needSignIn')}</p>
            <Link to="/auth/login">
              <Button>{t('buttons.signIn')}</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('settings.loadingSettings')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences(localPrefs);
      
      toast.success(t('settings.saveSuccess'));
    } catch (error) {
      toast.error(t('settings.saveError'));
    }
    setSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error(t('settings.errorCurrentPasswordRequired'));
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error(t('settings.errorPasswordsRequired'));
      return;
    }

    if (newPassword.length < 8) {
      toast.error(t('settings.errorPasswordTooShort'));
      return;
    }

    if (!/\d/.test(newPassword)) {
      toast.error(t('settings.errorPasswordNoNumber'));
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      toast.error(t('settings.errorPasswordNoSpecial'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('settings.errorPasswordsMismatch'));
      return;
    }

    setChangingPassword(true);
    try {
      // First verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        toast.error(t('settings.errorCurrentPasswordIncorrect'));
        setChangingPassword(false);
        return;
      }

      // Now update to new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success(t('settings.passwordChangeSuccess'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || t('settings.passwordChangeError'));
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">{t('settings.title')}</h1>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('settings.notifications')}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">{t('settings.emailNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.emailNotificationsDesc')}
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={localPrefs.email_notifications}
                    onCheckedChange={(checked) =>
                      setLocalPrefs({ ...localPrefs, email_notifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">{t('settings.pushNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.pushNotificationsDesc')}
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={localPrefs.push_notifications}
                    onCheckedChange={(checked) =>
                      setLocalPrefs({ ...localPrefs, push_notifications: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {t('settings.security')}
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('settings.currentPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder={t('settings.currentPassword')}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('settings.newPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t('settings.newPassword')}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('auth.passwordRequirements.containsNumber')}, {t('auth.passwordRequirements.containsSpecial')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('settings.confirmPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('settings.confirmPassword')}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={changingPassword} className="w-full md:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  {changingPassword ? t('settings.changingPassword') : t('settings.changePassword')}
                </Button>
              </form>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {saving ? t('settings.saving') : t('settings.saveSettings')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

