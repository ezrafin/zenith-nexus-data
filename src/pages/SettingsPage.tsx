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
import { Save, Bell, Globe, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const { user } = useUser();
  const { preferences, loading, updatePreferences } = useUserPreferences();
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
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to access settings.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
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
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences(localPrefs);
      
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
    setSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    if (!/\d/.test(newPassword)) {
      toast.error('New password must contain at least one number');
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      toast.error('New password must contain at least one special character');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
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
        toast.error('Current password is incorrect');
        setChangingPassword(false);
        return;
      }

      // Now update to new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">Settings</h1>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your activity
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
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications
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

            {/* Language */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={localPrefs.language}
                    onValueChange={(value) => setLocalPrefs({ ...localPrefs, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
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
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
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
                    Minimum 8 characters with at least one number and special character
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
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
                  {changingPassword ? 'Verifying & Changing...' : 'Change Password'}
                </Button>
              </form>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

