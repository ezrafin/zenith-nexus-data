import { Layout } from '@/components/layout/Layout';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const benefits = ['Competitive salary and equity', 'Remote-first culture', 'Unlimited PTO', 'Health, dental, and vision insurance', 'Professional development budget', '401(k) matching', 'Home office stipend', 'Wellness programs'];
const openPositions = [{
  title: 'Senior Financial Analyst',
  department: 'Research',
  location: 'Remote / New York',
  type: 'Full-time',
  description: 'Join our research team to provide in-depth market analysis and insights.'
}, {
  title: 'Full Stack Developer',
  department: 'Engineering',
  location: 'Remote',
  type: 'Full-time',
  description: 'Build and scale our platform using modern technologies.'
}, {
  title: 'Data Scientist',
  department: 'Data',
  location: 'Remote / New York',
  type: 'Full-time',
  description: 'Develop predictive models and analyze market trends.'
}, {
  title: 'Content Writer',
  department: 'Content',
  location: 'Remote',
  type: 'Full-time / Part-time',
  description: 'Create engaging financial education content for our audience.'
}, {
  title: 'Product Designer',
  department: 'Design',
  location: 'Remote',
  type: 'Full-time',
  description: 'Design intuitive user experiences for our investment tools.'
}];
export default function CareersPage() {
  return <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">Careers</span>
            <h1 className="heading-xl mb-6">Join Our Team</h1>
            <p className="body-xl">
              Help us democratize access to professional-grade financial data. We are building the future of investment analytics.
            </p>
          </div>
        </section>

        {/* Benefits */}
        

        {/* Open Positions */}
        

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Do you interested in our mission?</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">We are always looking for talented people in IT and Finance. Send us your resume and we will keep you in mind for future opportunities.</p>
            <Button size="lg">
              Send Your Resume
            </Button>
          </div>
        </section>
      </div>
    </Layout>;
}