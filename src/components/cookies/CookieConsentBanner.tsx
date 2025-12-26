import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Cookie, Settings } from 'lucide-react';
import { getCookieConsent, setCookieConsent } from '@/lib/cookies';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

export function CookieConsentBanner() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if consent has been given
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load existing preferences
      setConsent({
        analytics: existingConsent.analytics,
        preferences: existingConsent.preferences,
      });
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent({
      analytics: true,
      preferences: true,
    });
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    setCookieConsent({
      analytics: false,
      preferences: false,
    });
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleCustomize = () => {
    const existingConsent = getCookieConsent();
    if (existingConsent) {
      setConsent({
        analytics: existingConsent.analytics,
        preferences: existingConsent.preferences,
      });
    }
    setShowSettings(true);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg">
        <div className="container-wide max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">
                  {t('cookieBanner.title')}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('cookieBanner.body').replace(
                  'Privacy Policy',
                  ''
                )}
                <a href="/privacy" className="text-primary hover:underline">
                  {t('cookieBanner.privacyLinkText')}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCustomize}>
                <Settings className="mr-2 h-4 w-4" />
                {t('cookieBanner.customize')}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRejectAll}>
                {t('cookieBanner.rejectAll')}
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                {t('cookieBanner.acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('cookieBanner.dialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('cookieBanner.dialogDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Essential Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {t('cookieBanner.essentialTitle')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('cookieBanner.essentialDescription')}
                  </p>
                </div>
                <div className="px-3 py-1 bg-muted rounded-md text-sm font-medium">
                  {t('cookieBanner.essentialAlwaysActive')}
                </div>
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">
                  {t('cookieBanner.essentialUsesIntro')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('cookieBanner.essentialUseAuth')}</li>
                  <li>{t('cookieBanner.essentialUseSecurity')}</li>
                  <li>{t('cookieBanner.essentialUseBasic')}</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {t('cookieBanner.analyticsTitle')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('cookieBanner.analyticsDescription')}
                  </p>
                </div>
                <Switch
                  checked={consent.analytics}
                  onCheckedChange={(checked) => setConsent({ ...consent, analytics: checked })}
                />
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">
                  {t('cookieBanner.analyticsUsesIntro')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('cookieBanner.analyticsUseTraffic')}</li>
                  <li>{t('cookieBanner.analyticsUsePerformance')}</li>
                  <li>{t('cookieBanner.analyticsUseBehavior')}</li>
                </ul>
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {t('cookieBanner.preferencesTitle')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('cookieBanner.preferencesDescription')}
                  </p>
                </div>
                <Switch
                  checked={consent.preferences}
                  onCheckedChange={(checked) => setConsent({ ...consent, preferences: checked })}
                />
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">
                  {t('cookieBanner.preferencesUsesIntro')}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('cookieBanner.preferencesUseTheme')}</li>
                  <li>{t('cookieBanner.preferencesUseUi')}</li>
                  <li>{t('cookieBanner.preferencesUseLanguage')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              {t('cookieBanner.cancel')}
            </Button>
            <Button onClick={handleSavePreferences}>
              {t('cookieBanner.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

