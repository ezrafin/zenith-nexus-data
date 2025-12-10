import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Save, Bell, Palette, Globe, RefreshCw, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const { user } = useUser();
  const { preferences, loading, updatePreferences } = useUserPreferences();
  const [saving, setSaving] = useState(false);
  const [localPrefs, setLocalPrefs] = useState(preferences);

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

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">Settings</h1>

          <div className="space-y-6">
            {/* Appearance */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={localPrefs.theme}
                    onValueChange={(value: 'light' | 'dark' | 'auto') =>
                      setLocalPrefs({ ...localPrefs, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Market Data Preferences */}
            <div className="premium-card p-6">
              <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Data
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Auto-refresh Interval (seconds)</Label>
                  <Select
                    value={(localPrefs.refresh_interval / 1000).toString()}
                    onValueChange={(value) =>
                      setLocalPrefs({ ...localPrefs, refresh_interval: parseInt(value) * 1000 })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="120">2 minutes</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

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

