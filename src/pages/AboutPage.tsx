import { Layout } from '@/components/layout/Layout';
import { Users, Target, Award, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Accuracy First',
    description: 'We are committed to providing the most accurate and timely financial data to help you make informed decisions.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Our platform is built by investors, for investors. We listen to our community and continuously improve.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from our analysis to our user experience.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We cover markets worldwide, providing you with a comprehensive view of the global financial landscape.',
  },
];


export default function AboutPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">About Us</span>
            <h1 className="heading-xl mb-6">Your Guardian in Global Markets</h1>
            <p className="body-xl">
              INVESTOPATRONUS was founded with a simple mission: to democratize access to professional-grade financial data and analysis for investors of all levels.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container-wide section-spacing-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Our Story</h2>
              <div className="space-y-4 body-lg">
                <p>
                  Founded in 2020, INVESTOPATRONUS emerged from a simple observation: individual investors deserve the same quality of financial data and analysis that institutional investors enjoy.
                </p>
                <p>
                  Our team of experienced financial analysts, data scientists, and software engineers work together to bring you real-time market data, comprehensive analysis, and educational resources.
                </p>
                <p>
                  Today, we serve thousands of investors worldwide, helping them navigate the complex world of financial markets with confidence.
                </p>
              </div>
            </div>
            <div className="glass-card p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Markets Covered</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Real-time Data</div>
                </div>
                <div className="text-center">
                  <div className="heading-xl text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-gradient section-spacing">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Our Values</h2>
              <p className="body-lg max-w-2xl mx-auto">
                These core values guide everything we do at INVESTOPATRONUS.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-xs mb-2">{value.title}</h3>
                  <p className="body-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
