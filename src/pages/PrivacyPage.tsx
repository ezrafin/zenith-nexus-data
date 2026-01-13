import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';

export default function PrivacyPage() {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy"
        description="Learn how INVESTOPATRONUS protects your privacy and handles your personal information. Understand our data collection, usage, and security practices."
      />
      <div className="pt-24 pb-16">
        <section className="container-narrow section-spacing-sm">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Legal</span>
            <h1 className="heading-xl mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: December 1, 2024</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="glass-card p-4 sm:p-6 md:p-8 text-content">
              <h2 className="heading-sm mb-4">1. Information We Collect</h2>
              <p className="body-md mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Contact information when you reach out to us</li>
                <li>Usage data and analytics about how you interact with our platform</li>
                <li>Device information and IP addresses for security purposes</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">2. How We Use Your Information</h2>
              <p className="body-md mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent security incidents</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">3. Information Sharing</h2>
              <p className="body-md">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law. We may share information with service providers who assist in operating our platform.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">4. Data Security</h2>
              <p className="body-md">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">5. Cookies and Tracking</h2>
              <p className="body-md mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. 
                You can manage your cookie preferences at any time through the cookie consent banner or by contacting us.
              </p>
              
              <h3 className="font-semibold text-base mb-3 mt-6">Types of Cookies We Use</h3>
              
              <div className="space-y-4 mb-4">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    These cookies are necessary for the website to function properly and cannot be disabled. 
                    They are usually set in response to actions made by you, such as setting your privacy preferences, 
                    logging in, or filling in forms.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><strong>Purpose:</strong> Authentication, session management, security</li>
                    <li><strong>Duration:</strong> Session or until logout</li>
                    <li><strong>Examples:</strong> Authentication tokens, session identifiers</li>
                  </ul>
                </div>

                <div className="border-l-2 border-secondary pl-4">
                  <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. We use Vercel Analytics for this purpose.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><strong>Purpose:</strong> Website analytics, performance monitoring, user behavior analysis</li>
                    <li><strong>Duration:</strong> Up to 2 years</li>
                    <li><strong>Examples:</strong> Vercel Analytics cookies</li>
                    <li><strong>Opt-out:</strong> You can disable these cookies through the cookie consent banner</li>
                  </ul>
                </div>

                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-semibold mb-2">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    These cookies allow our website to remember information that changes the way the website behaves 
                    or looks, such as your preferred language or region, theme preferences, and UI settings.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><strong>Purpose:</strong> Remember user preferences and settings</li>
                    <li><strong>Duration:</strong> Up to 1 year</li>
                    <li><strong>Examples:</strong> Theme preferences (light/dark mode), sidebar state, language settings</li>
                    <li><strong>Opt-out:</strong> You can disable these cookies through the cookie consent banner</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Managing Cookies:</strong> You can control and manage cookies in various ways. 
                  Please keep in mind that removing or blocking cookies can impact your user experience and 
                  parts of our website may no longer be fully accessible. Most browsers automatically accept 
                  cookies, but you can modify your browser settings to decline cookies if you prefer.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">6. Your Rights</h2>
              <p className="body-md mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">7. Contact Us</h2>
              <p className="body-md">
                If you have any questions about this Privacy Policy, please contact us at support@investopatronus.com.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
