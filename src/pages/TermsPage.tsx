import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';

export default function TermsPage() {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service"
        description="Read the Terms of Service for INVESTOPATRONUS. Understand the rules, guidelines, and conditions for using our financial analytics platform and services."
      />
      <div className="pt-24 pb-16">
        <section className="container-narrow section-spacing-sm">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Legal</span>
            <h1 className="heading-xl mb-6">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: December 1, 2024</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="glass-card p-4 sm:p-6 md:p-8 text-content">
              <h2 className="heading-sm mb-4">1. Acceptance of Terms</h2>
              <p className="body-md">
                By accessing and using INVESTOPATRONUS, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">2. Description of Service</h2>
              <p className="body-md">
                INVESTOPATRONUS provides financial news, market data, analysis, and educational content. Our services are provided "as is" and we reserve the right to modify or discontinue any aspect of the service at any time.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">3. User Conduct</h2>
              <p className="body-md mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Reproduce, duplicate, or copy any content without permission</li>
                <li>Use automated systems to access the service</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">4. Intellectual Property</h2>
              <p className="body-md">
                All content on INVESTOPATRONUS, including text, graphics, logos, and software, is the property of INVESTOPATRONUS or its content suppliers and is protected by intellectual property laws. You may not use any content without our express written permission.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">5. Disclaimer of Warranties</h2>
              <p className="body-md">
                The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the service, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">6. Limitation of Liability</h2>
              <p className="body-md">
                In no event shall INVESTOPATRONUS be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">7. Changes to Terms</h2>
              <p className="body-md">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">8. Contact</h2>
              <p className="body-md">
                If you have any questions about these Terms of Service, please contact us at support@investopatronus.com.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
