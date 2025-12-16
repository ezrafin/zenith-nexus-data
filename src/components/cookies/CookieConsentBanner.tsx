import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie, Settings } from 'lucide-react';
import { getCookieConsent, setCookieConsent, hasCookieConsent, type CookieCategory } from '@/lib/cookies';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CookieConsentBanner() {
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
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg">
        <div className="container-wide max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">We use cookies</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or 
                learn more in our{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCustomize}>
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRejectAll}>
                Reject All
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Essential Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div className="px-3 py-1 bg-muted rounded-md text-sm font-medium">
                  Always Active
                </div>
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">These cookies are used for:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic website functionality</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">These cookies are used for:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Website traffic analysis (Vercel Analytics)</li>
                  <li>Performance monitoring</li>
                  <li>Understanding user behavior</li>
                </ul>
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Preferences Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your settings and preferences for a better experience.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                <p className="mb-2">These cookies are used for:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>UI preferences (sidebar state, layout)</li>
                  <li>Language and regional settings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

