import { Layout } from '@/components/layout/Layout';

export default function DisclaimerPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-narrow section-spacing-sm">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Legal</span>
            <h1 className="heading-xl mb-6">Investment Disclaimer</h1>
            <p className="text-sm text-muted-foreground">Last updated: December 1, 2024</p>
          </div>

          <div className="prose prose-invert max-w-none text-content">
            <div className="glass-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-l-4 border-primary">
              <p className="text-lg font-medium mb-0">
                The information provided on INVESTOPATRONUS is for educational and informational purposes only and should not be construed as financial advice.
              </p>
            </div>

            <h2 className="heading-sm mb-4">Not Financial Advice</h2>
            <p className="body-md mb-6">
              The content on this website, including but not limited to articles, analysis, data, charts, and opinions, does not constitute financial, investment, tax, or legal advice. All information is provided on an "as is" basis without any warranties of any kind.
            </p>

            <h2 className="heading-sm mb-4">No Guarantees</h2>
            <p className="body-md mb-6">
              Past performance is not indicative of future results. Investing in securities involves risks, and there is always the potential of losing money when you invest. Never invest money that you cannot afford to lose.
            </p>

            <h2 className="heading-sm mb-4">Do Your Own Research</h2>
            <p className="body-md mb-6">
              Before making any investment decisions, we strongly recommend that you:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 body-md">
              <li>Conduct your own independent research</li>
              <li>Consult with a qualified financial advisor</li>
              <li>Consider your own financial situation and risk tolerance</li>
              <li>Review the official documentation and filings of any investment</li>
            </ul>

            <h2 className="heading-sm mb-4">Third-Party Content</h2>
            <p className="body-md mb-6">
              Our website may contain links to third-party websites, content, or advertisements. We are not responsible for the accuracy, completeness, or reliability of any third-party content.
            </p>

            <h2 className="heading-sm mb-4">Data Accuracy</h2>
            <p className="body-md mb-6">
              While we strive to provide accurate and up-to-date information, we make no representations or warranties about the accuracy, reliability, completeness, or timeliness of any data displayed on our platform. Market data may be delayed and should not be relied upon for trading purposes.
            </p>

            <h2 className="heading-sm mb-4">Limitation of Liability</h2>
            <p className="body-md mb-6">
              INVESTOPATRONUS, its owners, employees, and affiliates shall not be liable for any losses, damages, or other liabilities arising from the use of information provided on this website or any investment decisions made based on such information.
            </p>

            <h2 className="heading-sm mb-4">Regulatory Compliance</h2>
            <p className="body-md mb-6">
              INVESTOPATRONUS is not a registered broker-dealer, investment advisor, or financial planner. We do not hold any licenses or registrations to provide financial advice in any jurisdiction.
            </p>

            <h2 className="heading-sm mb-4">Contact Us</h2>
            <p className="body-md">
              If you have any questions about this disclaimer, please contact us at support@investopatronus.com.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
