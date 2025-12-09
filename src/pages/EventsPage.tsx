import { Layout } from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, Video, Users, Coffee, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    title: '2025 Market Outlook Conference',
    date: 'January 15, 2025',
    time: '2:00 PM EST',
    type: 'Webinar',
    speaker: 'Michael Chen',
    speakerTitle: 'Senior Market Analyst at JPMorgan',
    speakerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    description: 'Join us for an in-depth analysis of what to expect in the markets for 2025, including sector rotations and key themes.',
    attendees: 1250,
    hasNetworking: false,
  },
  {
    title: 'Cryptocurrency Trading Masterclass',
    date: 'January 22, 2025',
    time: '11:00 AM EST',
    type: 'Online Workshop',
    speaker: 'Sarah Johnson',
    speakerTitle: 'Head of Crypto Research at Coinbase',
    speakerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    description: 'Learn advanced cryptocurrency trading strategies, DeFi opportunities, and institutional-grade risk management.',
    attendees: 890,
    hasNetworking: true,
  },
  {
    title: 'Annual Investment Conference',
    date: 'February 10-11, 2025',
    time: '9:00 AM - 5:00 PM EST',
    type: 'In-Person',
    location: 'New York Marriott Marquis',
    speaker: 'Multiple Speakers',
    speakerTitle: '20+ Industry Leaders',
    speakerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop',
    description: 'Our flagship annual conference featuring top industry speakers, hands-on workshops, and unparalleled networking.',
    attendees: 2500,
    hasNetworking: true,
  },
  {
    title: 'Portfolio Rebalancing Workshop',
    date: 'March 5, 2025',
    time: '1:00 PM EST',
    type: 'Online Workshop',
    speaker: 'David Park',
    speakerTitle: 'Portfolio Manager at Vanguard',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    description: 'Master the art of portfolio rebalancing with hands-on exercises using real market scenarios.',
    attendees: 650,
    hasNetworking: false,
  },
  {
    title: 'ESG Investing Summit',
    date: 'April 18, 2025',
    time: '10:00 AM - 4:00 PM EST',
    type: 'Hybrid',
    location: 'Chicago Convention Center & Virtual',
    speaker: 'Emma Green',
    speakerTitle: 'Director of Sustainable Investing at BlackRock',
    speakerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    description: 'Explore the future of sustainable investing, impact measurement, and integrating ESG into your portfolio strategy.',
    attendees: 1800,
    hasNetworking: true,
  },
  {
    title: 'Summer Trading Bootcamp',
    date: 'June 20-22, 2025',
    time: '9:00 AM - 6:00 PM EST',
    type: 'In-Person',
    location: 'San Francisco Financial District',
    speaker: 'Multiple Instructors',
    speakerTitle: 'Professional Traders & Analysts',
    speakerImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    description: 'An intensive 3-day bootcamp covering technical analysis, options strategies, and live trading sessions.',
    attendees: 200,
    hasNetworking: true,
  },
];

const pastEvents = [
  {
    title: 'Q4 2024 Earnings Preview',
    date: 'December 1, 2024',
    type: 'Webinar',
    recording: true,
    views: 4520,
  },
  {
    title: 'Fixed Income Strategies Workshop',
    date: 'November 15, 2024',
    type: 'Online Workshop',
    recording: true,
    views: 3210,
  },
  {
    title: 'ETF Investing 101',
    date: 'November 1, 2024',
    type: 'Webinar',
    recording: true,
    views: 5670,
  },
  {
    title: 'Retirement Planning Masterclass',
    date: 'October 20, 2024',
    type: 'Online Workshop',
    recording: true,
    views: 7890,
  },
  {
    title: 'Options Trading for Income',
    date: 'October 8, 2024',
    type: 'Webinar',
    recording: true,
    views: 4120,
  },
  {
    title: 'Fall Investment Symposium',
    date: 'September 25, 2024',
    type: 'In-Person',
    recording: true,
    views: 2340,
  },
];

export default function EventsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Events</span>
            <h1 className="heading-xl mb-6">Upcoming Events</h1>
            <p className="body-xl">
              Join our webinars, workshops, and conferences to learn from industry experts and connect with fellow investors.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6 mb-16">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="glass-card-hover p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="badge-primary">{event.type}</span>
                      {event.attendees && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees.toLocaleString()} registered
                        </span>
                      )}
                      {event.hasNetworking && (
                        <span className="flex items-center gap-1 text-sm text-primary">
                          <Coffee className="h-4 w-4" />
                          Networking Session
                        </span>
                      )}
                    </div>
                    <h3 className="heading-sm mb-2">{event.title}</h3>
                    <p className="body-md mb-4">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <img 
                        src={event.speakerImage} 
                        alt={event.speaker}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{event.speaker}</p>
                        <p className="text-xs text-muted-foreground">{event.speakerTitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 lg:items-end">
                    <Button size="lg" className="w-full lg:w-auto">
                      Register Now
                    </Button>
                    <Button variant="outline" size="sm" className="w-full lg:w-auto">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Add to LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Past Events */}
          <div>
            <h2 className="heading-md mb-6">Past Events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div key={event.title} className="glass-card p-6">
                  <span className="badge-secondary mb-3">{event.type}</span>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  {event.recording && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {event.views.toLocaleString()} views
                    </p>
                  )}
                  {event.recording && (
                    <Button variant="outline" size="sm" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Watch Recording
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Host CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="heading-sm mb-4">Want to Speak at Our Events?</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              We are always looking for industry experts to share their knowledge. Apply to become a speaker at our upcoming events.
            </p>
            <Button variant="outline">Apply to Speak</Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
