import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, Video, BookOpen, Award, Rocket, GraduationCap } from 'lucide-react';
import { educationRoutes } from '@/lib/educationRoutes';
const footerLinks = {
  markets: [{
    name: 'Indices',
    href: '/markets/indices',
    icon: TrendingUp
  }, {
    name: 'Stocks',
    href: '/markets/stocks',
    icon: BarChart3
  }, {
    name: 'Commodities',
    href: '/markets/commodities',
    icon: Coins
  }, {
    name: 'Crypto',
    href: '/markets/crypto',
    icon: Bitcoin
  }, {
    name: 'Currencies & ETFs',
    href: '/markets/currencies',
    icon: DollarSign
  }],
  education: [{
    name: 'Learning',
    href: educationRoutes.learning,
    icon: BookOpen
  }, {
    name: 'Video Library',
    href: educationRoutes.video,
    icon: GraduationCap
  }, {
    name: 'Learning Course',
    href: educationRoutes.course,
    icon: Rocket
  }],
  content: [{
    name: 'News',
    href: '/news'
  }, {
    name: 'Analytics',
    href: '/analytics'
  }, {
    name: 'Forum',
    href: '/forum'
  }],
  community: [{
    name: 'About Us',
    href: '/about'
  }, {
    name: 'Contact Us',
    href: '/contact'
  }, {
    name: 'Careers',
    href: '/careers'
  }, {
    name: 'Authors',
    href: '/authors'
  }],
  legal: [{
    name: 'Terms of Service',
    href: '/terms'
  }, {
    name: 'Privacy Policy',
    href: '/privacy'
  }, {
    name: 'Disclaimer',
    href: '/disclaimer'
  }]
};
export function Footer() {
  return <footer role="contentinfo" className="border-t border-border bg-card/30">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
            <Link to="/" className="flex justify-center mb-4">
              <img 
                src="/favicon.png" 
                alt="INVESTOPATRONUS" 
                className="h-12 md:h-16 lg:h-20"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 text-center lg:text-left max-w-xs">
              Your Guardian in Global Markets. Professional analytics and real-time financial data.
            </p>
          </div>
          
          {/* Navigation sections in a single row on desktop */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {/* Content */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Content</h3>
                <ul className="space-y-2.5">
                  {footerLinks.content.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Markets */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Markets</h3>
                <ul className="space-y-2.5">
                  {footerLinks.markets.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <link.icon className="h-3.5 w-3.5" />
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Education</h3>
                <ul className="space-y-2.5">
                  {footerLinks.education.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <link.icon className="h-3.5 w-3.5" />
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Community */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Community</h3>
                <ul className="space-y-2.5">
                  {footerLinks.community.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Legal</h3>
                <ul className="space-y-2.5">
                  {footerLinks.legal.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} INVESTOPATRONUS. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>;
}