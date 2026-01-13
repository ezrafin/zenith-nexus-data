import { Layout } from '@/components/layout/Layout';
import { Rocket, CheckCircle, Clock, Users, Star, Bell, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { SEOHead } from '@/components/seo/SEOHead';

const courseModules = [
  { title: 'Introduction to Financial Markets', lessons: 8, duration: '2 hours' },
  { title: 'Understanding Asset Classes', lessons: 12, duration: '3 hours' },
  { title: 'Technical Analysis Fundamentals', lessons: 15, duration: '4 hours' },
  { title: 'Fundamental Analysis Deep Dive', lessons: 14, duration: '4 hours' },
  { title: 'Portfolio Construction & Management', lessons: 10, duration: '3 hours' },
  { title: 'Risk Management Strategies', lessons: 8, duration: '2 hours' },
  { title: 'Advanced Trading Strategies', lessons: 12, duration: '3.5 hours' },
  { title: 'Psychology of Investing', lessons: 6, duration: '1.5 hours' },
];

const features = [
  'Self-paced learning modules',
  'Interactive quizzes and assessments',
  'Real-world case studies',
  'Certificate upon completion',
  'Lifetime access to materials',
  'Community discussion forums',
  'Monthly live Q&A sessions',
  'Downloadable resources & templates',
];

const instructors = [
  {
    name: 'Dr. Michael Torres',
    title: 'Lead Instructor',
    credentials: 'CFA, CMT, PhD Finance',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: '20+ years of experience in institutional asset management. Former portfolio manager at Fidelity Investments.',
  },
  {
    name: 'Sarah Mitchell',
    title: 'Technical Analysis Expert',
    credentials: 'CMT, Market Technician',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Author of "Chart Patterns That Work" and regular contributor to technical analysis publications.',
  },
  {
    name: 'James Chen',
    title: 'Portfolio Strategy Instructor',
    credentials: 'CFA, CAIA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Former quantitative strategist at Goldman Sachs. Specializes in factor investing and portfolio optimization.',
  },
];

const testimonials = [
  {
    name: 'Jennifer Adams',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: 'This course transformed my understanding of the markets. The practical exercises and real-world case studies made complex concepts accessible.',
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'Small Business Owner',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    quote: 'Finally, an investment course that goes beyond basics without being overwhelming. The instructor support is exceptional.',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    quote: 'Worth every minute. I went from knowing nothing about investing to confidently managing my own portfolio.',
    rating: 5,
  },
];


export default function LearningCoursePage() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [email, setEmail] = useState('');

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(t('toast.courseNotification'));
      setEmail('');
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Launching Q1 2026</span>
            </div>
            <h1 className="heading-hero mb-6">
              Master the Markets
              <span className="block gradient-text">Investment Course</span>
            </h1>
            <p className="body-xl max-w-2xl mx-auto mb-8">
              A comprehensive, structured learning program designed to take you from beginner to confident investor. Our expert-led curriculum covers everything you need to succeed.
            </p>

            {/* Notify Form */}
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">
                <Bell className="h-4 w-4 mr-2" />
                {t('toast.notifyMe')}
              </Button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">85+</div>
              <div className="text-sm text-muted-foreground">Video Lessons</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">23+</div>
              <div className="text-sm text-muted-foreground">Hours of Content</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Comprehensive Modules</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Certification</div>
            </div>
          </div>


          {/* Course Modules & Features */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-lg mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {courseModules.map((module, index) => (
                  <div key={module.title} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-lg mb-6">What You Will Get</h2>
              <div className="glass-card p-8">
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-2">
                      {[
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=80&h=80&fit=crop&crop=face',
                      ].map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt={`Student avatar ${index + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-background object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">2,500+</span>
                      <span className="text-muted-foreground"> students waiting</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">Based on pilot program feedback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructors */}
          <div className="mb-16">
            <h2 className="heading-lg text-center mb-8">Meet Your Instructors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <div key={instructor.name} className="glass-card p-6 text-center">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg">{instructor.name}</h3>
                  <p className="text-primary text-sm mb-1">{instructor.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{instructor.credentials}</p>
                  <p className="text-sm text-muted-foreground">{instructor.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="heading-lg text-center mb-8">What Students Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="glass-card p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="body-sm mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mt-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Be the First to Know</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              Join our waitlist to get early access and exclusive launch pricing when the course becomes available in Q1 2026.
            </p>
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="lg">
                {t('toast.joinWaitlist')}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}
