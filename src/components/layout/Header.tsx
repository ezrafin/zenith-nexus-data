import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, Mic, GraduationCap, BookOpen, Award, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const navigation = [{
  name: 'News',
  href: '/news'
}, {
  name: 'Analytics',
  href: '/analytics'
}, {
  name: 'Markets',
  href: '/markets',
  children: [{
    name: 'Indices',
    href: '/markets/indices',
    icon: TrendingUp,
    description: 'Track major market indices'
  }, {
    name: 'Stocks',
    href: '/markets/stocks',
    icon: BarChart3,
    description: 'Individual stock analysis'
  }, {
    name: 'Commodities',
    href: '/markets/commodities',
    icon: Coins,
    description: 'Gold, oil, and more'
  }, {
    name: 'Crypto',
    href: '/markets/crypto',
    icon: Bitcoin,
    description: 'Cryptocurrency markets'
  }, {
    name: 'Currencies & ETFs',
    href: '/markets/currencies',
    icon: DollarSign,
    description: 'Forex and exchange-traded funds'
  }]
}, {
  name: 'Video',
  href: '/video',
  children: [{
    name: 'Видеотека',
    href: '/video',
    icon: GraduationCap,
    description: 'Образовательные видео'
  }, {
    name: 'Podcasts',
    href: '/video/podcasts',
    icon: Mic,
    description: 'Аудио дискуссии экспертов'
  }]
}, {
  name: 'Education',
  href: '/education',
  children: [{
    name: 'Базовые статьи',
    href: '/education/basic',
    icon: BookOpen,
    description: 'Основы для начинающих'
  }, {
    name: 'Продвинутые статьи',
    href: '/education/advanced',
    icon: Award,
    description: 'Углублённый анализ'
  }, {
    name: 'Курс инвестора',
    href: '/course',
    icon: Rocket,
    description: 'Структурированное обучение'
  }, {
    name: 'Предложить статью',
    href: '/articles/submit',
    icon: GraduationCap,
    description: 'Стать автором'
  }]
}, {
  name: 'Companies',
  href: '/companies'
}, {
  name: 'Forum',
  href: '/forum'
}];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'}`}>
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">IP</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">INVESTOPATRONUS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map(item => item.children ? <div key={item.name} className="relative" onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: 10
              }} transition={{
                duration: 0.2
              }} className="absolute top-full left-0 mt-2 w-72 py-3 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl">
                        {item.children.map(child => <Link key={child.href} to={child.href} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <child.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{child.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                            </div>
                          </Link>)}
                      </motion.div>}
                  </AnimatePresence>
                </div> : <Link key={item.name} to={item.href} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                  {item.name}
                </Link>)}
          </div>

          {/* Live indicator + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            
            <Link to="/analytics" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25">
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <button type="button" className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border max-h-[80vh] overflow-y-auto">
            <div className="container-wide py-4 space-y-1">
              {navigation.map(item => item.children ? <div key={item.name} className="space-y-1">
                    <div className="px-4 py-2 text-sm font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children.map(child => <Link key={child.href} to={child.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors ${isActive(child.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                          <child.icon className="h-4 w-4 text-primary" />
                          {child.name}
                        </Link>)}
                    </div>
                  </div> : <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 text-sm rounded-lg transition-colors ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                    {item.name}
                  </Link>)}
              <div className="pt-4 px-4">
                <Link to="/analytics" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                  Subscribe
                </Link>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}