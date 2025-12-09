import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, Mic, Video, BookOpen, Award, Rocket } from 'lucide-react';
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
video: [{
    name: 'Podcasts',
    href: '/video/podcasts',
    icon: Mic
  }],
  education: [{
    name: 'Basic Articles',
    href: '/education/basic',
    icon: BookOpen
  }, {
    name: 'Advanced Articles',
    href: '/education/advanced',
    icon: Award
  }, {
    name: 'Learning Course',
    href: '/education/course',
    icon: Rocket
  }],
  content: [{
    name: 'News',
    href: '/news'
  }, {
    name: 'Analytics',
    href: '/analytics'
  }, {
    name: 'Companies',
    href: '/companies'
  }, {
    name: 'Forum',
    href: '/forum'
  }],
  company: [{
    name: 'About Us',
    href: '/about'
  }, {
    name: 'Contact Us',
    href: '/contact'
  }, {
    name: 'Careers',
    href: '/careers'
  }, {
    name: 'Partnerships',
    href: '/partnerships'
  }, {
    name: 'Advertise',
    href: '/advertise'
  }, {
    name: 'Authors',
    href: '/authors'
  }],
  resources: [{
    name: 'Browse Topics',
    href: '/topics'
  }, {
    name: 'Events',
    href: '/events'
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
  return <footer className="border-t border-border bg-card/30">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IP</span>
              </div>
              <span className="text-lg font-semibold">PATRONUS</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Your Guardian in Global Markets. Professional analytics and real-time financial data.
            </p>
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

          {/* Video & Education */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Video</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.video.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <link.icon className="h-3.5 w-3.5" />
                    {link.name}
                  </Link>
                </li>)}
            </ul>
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

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.resources.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} INVESTOPATRONUS. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>;
}