import { Layout } from '@/components/layout/Layout';
import { Play, Clock, Calendar, Headphones, Star, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredEpisode = {
  title: 'The Future of AI in Finance',
  description: 'We explore how artificial intelligence is reshaping investment strategies and what it means for individual investors. From algorithmic trading to robo-advisors, discover what the future holds.',
  duration: '45 min',
  date: 'December 5, 2024',
  guest: 'Dr. Emily Chen, AI Research Director at Goldman Sachs',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  rating: 4.9,
  plays: 12500,
  hasTranscript: true,
};

const episodes = [
  {
    title: 'Understanding the 2024 Bull Market',
    duration: '38 min',
    date: 'November 28, 2024',
    guest: 'Mark Thompson, Chief Strategist at Morgan Stanley',
    rating: 4.8,
    plays: 8420,
    hasTranscript: true,
    topics: ['Market Analysis', 'Bull Markets', 'Investment Strategy'],
  },
  {
    title: 'Crypto Regulation: What to Expect in 2025',
    duration: '42 min',
    date: 'November 21, 2024',
    guest: 'Sarah Williams, Partner at Blockchain Legal Group',
    rating: 4.7,
    plays: 7890,
    hasTranscript: true,
    topics: ['Cryptocurrency', 'Regulation', 'Legal'],
  },
  {
    title: 'Value Investing in a Growth Market',
    duration: '35 min',
    date: 'November 14, 2024',
    guest: 'James Chen, Portfolio Manager at Berkshire Partners',
    rating: 4.9,
    plays: 9150,
    hasTranscript: true,
    topics: ['Value Investing', 'Portfolio Management'],
  },
  {
    title: 'The Rise of Retail Investors',
    duration: '40 min',
    date: 'November 7, 2024',
    guest: 'Lisa Rodriguez, Head of Research at Robinhood',
    rating: 4.6,
    plays: 11200,
    hasTranscript: true,
    topics: ['Retail Trading', 'Market Dynamics'],
  },
  {
    title: 'Global Markets: Asia Pacific Focus',
    duration: '48 min',
    date: 'October 31, 2024',
    guest: 'David Kim, APAC Chief Economist at HSBC',
    rating: 4.7,
    plays: 6540,
    hasTranscript: true,
    topics: ['Asia Markets', 'Global Economy', 'Emerging Markets'],
  },
  {
    title: 'ESG Investing: Beyond the Hype',
    duration: '36 min',
    date: 'October 24, 2024',
    guest: 'Emma Green, Director of Sustainable Investing at BlackRock',
    rating: 4.5,
    plays: 5890,
    hasTranscript: false,
    topics: ['ESG', 'Sustainable Investing', 'Climate'],
  },
  {
    title: 'Fed Policy Impact on Your Portfolio',
    duration: '52 min',
    date: 'October 17, 2024',
    guest: 'Dr. Robert Nash, Former Fed Advisor & Economics Professor',
    rating: 4.9,
    plays: 14200,
    hasTranscript: true,
    topics: ['Federal Reserve', 'Monetary Policy', 'Interest Rates'],
  },
  {
    title: 'Emerging Markets Deep Dive: India & Southeast Asia',
    duration: '55 min',
    date: 'October 10, 2024',
    guest: 'Priya Sharma, Emerging Markets Fund Manager at Fidelity',
    rating: 4.8,
    plays: 7320,
    hasTranscript: true,
    topics: ['Emerging Markets', 'India', 'Southeast Asia'],
  },
  {
    title: 'Tech Stock Analysis: Beyond the Magnificent Seven',
    duration: '44 min',
    date: 'October 3, 2024',
    guest: 'Alex Turner, Tech Sector Analyst at Wedbush Securities',
    rating: 4.7,
    plays: 9870,
    hasTranscript: true,
    topics: ['Technology', 'Stock Analysis', 'Growth Stocks'],
  },
  {
    title: 'Bond Market Outlook for 2025',
    duration: '41 min',
    date: 'September 26, 2024',
    guest: 'Catherine Moore, Fixed Income Director at PIMCO',
    rating: 4.6,
    plays: 5430,
    hasTranscript: true,
    topics: ['Bonds', 'Fixed Income', 'Yield Curve'],
  },
  {
    title: 'REIT Investing: Building Passive Income',
    duration: '38 min',
    date: 'September 19, 2024',
    guest: 'Thomas Wright, Real Estate Investment Strategist',
    rating: 4.8,
    plays: 8910,
    hasTranscript: true,
    topics: ['REITs', 'Real Estate', 'Passive Income'],
  },
  {
    title: 'Sector Rotation Strategies That Work',
    duration: '46 min',
    date: 'September 12, 2024',
    guest: 'Jennifer Blake, Quantitative Strategist at Two Sigma',
    rating: 4.7,
    plays: 6780,
    hasTranscript: false,
    topics: ['Sector Rotation', 'Quantitative', 'Strategy'],
  },
  {
    title: 'Risk Parity Explained: Balancing Your Portfolio',
    duration: '50 min',
    date: 'September 5, 2024',
    guest: 'Michael Foster, CIO at Bridgewater Associates',
    rating: 4.9,
    plays: 11500,
    hasTranscript: true,
    topics: ['Risk Parity', 'Portfolio Theory', 'Asset Allocation'],
  },
  {
    title: 'Alternative Investments: Private Equity & Hedge Funds',
    duration: '58 min',
    date: 'August 29, 2024',
    guest: 'Victoria Price, Managing Director at KKR',
    rating: 4.8,
    plays: 7650,
    hasTranscript: true,
    topics: ['Private Equity', 'Hedge Funds', 'Alternative Assets'],
  },
];

export default function PodcastsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Podcasts</span>
            <h1 className="heading-xl mb-6">Market Insights Podcast</h1>
            <p className="body-xl">
              Weekly conversations with industry experts on markets, investing, and financial strategy. Over 150,000 monthly listeners.
            </p>
          </div>

          {/* Featured Episode */}
          <div className="glass-card overflow-hidden mb-12">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto relative">
                <img
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="badge-primary mb-4 w-fit">Latest Episode</span>
                <h2 className="heading-md mb-4">{featuredEpisode.title}</h2>
                <p className="body-md mb-4">{featuredEpisode.description}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Guest:</span> {featuredEpisode.guest}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredEpisode.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredEpisode.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {featuredEpisode.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {featuredEpisode.plays.toLocaleString()} plays
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Listen Now
                  </Button>
                  {featuredEpisode.hasTranscript && (
                    <Button variant="outline" size="lg">
                      <FileText className="h-4 w-4 mr-2" />
                      Transcript
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-md">All Episodes</h2>
              <span className="text-sm text-muted-foreground">{episodes.length} episodes</span>
            </div>
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.title} className="glass-card-hover p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Headphones className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{episode.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Guest: {episode.guest}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {episode.topics.map((topic) => (
                            <span key={topic} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {episode.duration}
                          </span>
                          <span>{episode.date}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {episode.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {episode.plays.toLocaleString()}
                          </span>
                          {episode.hasTranscript && (
                            <span className="flex items-center gap-1 text-primary">
                              <FileText className="h-3 w-3" />
                              Transcript
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="heading-sm mb-4">Never Miss an Episode</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Subscribe to our podcast on your favorite platform and get notified when new episodes are released.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline">Apple Podcasts</Button>
              <Button variant="outline">Spotify</Button>
              <Button variant="outline">Google Podcasts</Button>
              <Button variant="outline">RSS Feed</Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
