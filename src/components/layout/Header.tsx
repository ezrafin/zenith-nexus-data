import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, GraduationCap, BookOpen, Award, Rocket, User, LogOut, Settings, Bookmark, Users } from 'lucide-react';
import { logger } from '@/lib/logger';
import { AchievementSystem } from '@/components/forum/AchievementSystem';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { UserAvatar } from '@/components/user/UserAvatar';
import { EDUCATION_BASE_PATH, educationRoutes } from '@/lib/educationRoutes';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export function Header() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useUser();
  const navigate = useNavigate();

  const navigation = useMemo(() => [{
    name: t('navigation.content'),
    href: '/news',
    children: [{
      name: t('navigation.news'),
      href: '/news',
      icon: BookOpen,
      description: t('descriptions.news')
    }, {
      name: t('navigation.analytics'),
      href: '/analytics',
      icon: BarChart3,
      description: t('descriptions.analytics')
    }, {
      name: t('navigation.forum'),
      href: '/forum',
      icon: Award,
      description: t('descriptions.forum')
    }]
  }, {
    name: t('navigation.markets'),
    href: '/markets',
    children: [{
      name: t('navigation.indices'),
      href: '/markets/indices',
      icon: TrendingUp,
      description: t('descriptions.indices')
    }, {
      name: t('navigation.stocks'),
      href: '/markets/stocks',
      icon: BarChart3,
      description: t('descriptions.stocks')
    }, {
      name: t('navigation.commodities'),
      href: '/markets/commodities',
      icon: Coins,
      description: t('descriptions.commodities')
    }, {
      name: t('navigation.crypto'),
      href: '/markets/crypto',
      icon: Bitcoin,
      description: t('descriptions.crypto')
    }, {
      name: t('navigation.currenciesEtfs'),
      href: '/markets/currencies',
      icon: DollarSign,
      description: t('descriptions.currenciesEtfs')
    }]
  }, {
    name: t('navigation.education'),
    href: EDUCATION_BASE_PATH,
    children: [{
      name: t('navigation.learning'),
      href: educationRoutes.learning,
      icon: BookOpen,
      description: t('descriptions.learning')
    }, {
      name: t('navigation.videoLibrary'),
      href: educationRoutes.video,
      icon: GraduationCap,
      description: t('descriptions.videoLibrary')
    }, {
      name: t('navigation.investorCourse'),
      href: '/course',
      icon: Rocket,
      description: t('descriptions.investorCourse')
    }]
  }, {
    name: t('navigation.community'),
    href: '/about',
    children: [{
      name: t('navigation.aboutUs'),
      href: '/about',
      icon: Award,
      description: t('descriptions.aboutUs')
    }, {
      name: t('navigation.contactUs'),
      href: '/contact',
      icon: BookOpen,
      description: t('descriptions.contactUs')
    }, {
      name: t('navigation.careers'),
      href: '/careers',
      icon: Rocket,
      description: t('descriptions.careers')
    }, {
      name: t('navigation.authors'),
      href: '/authors',
      icon: Award,
      description: t('descriptions.authors')
    }]
  }, {
    name: t('navigation.companies'),
    href: '/companies'
  }], [t]);
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
  return <header role="banner" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'}`}>
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/favicon.png" 
              alt="INVESTOPATRONUS" 
              className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-sm md:text-base font-bold text-foreground transition-opacity duration-300 group-hover:opacity-80 leading-tight">
              <span>INVESTO</span>
              <span>PATRONUS</span>
            </div>
          </Link>

                 {/* Desktop Navigation */}
                 <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
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
          </nav>

          {/* Live indicator + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <UserAvatar profile={profile} size="sm" />
                    <span className="text-sm font-medium">
                      {profile?.display_name || profile?.username || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate flex-1">{profile?.display_name || profile?.username || 'User'}</p>
                      <AchievementBadge userId={user.id} />
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    {t('buttons.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/watchlists')}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t('buttons.watchlists')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookmarks')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t('buttons.bookmarks')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/community')}>
                    <Users className="mr-2 h-4 w-4" />
                    {t('navigation.community')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    {t('buttons.settings')}
                  </DropdownMenuItem>
                  <AchievementMenuItem />
                  {/* Moderator link - would check user role in real app */}
                  {/* <DropdownMenuItem onClick={() => navigate('/admin/moderation')}>
                    <Shield className="mr-2 h-4 w-4" />
                    Moderation
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('buttons.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('buttons.signIn')}
                </Link>
                <Link to="/auth/register" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25">
                  {t('buttons.register')}
                </Link>
              </>
            )}
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
              <div className="pt-4 px-4 space-y-2">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      {t('buttons.profile')}
                    </Link>
                    <button
                      onClick={async () => {
                        await signOut();
                        setMobileMenuOpen(false);
                        navigate('/');
                      }}
                      className="block w-full text-center px-4 py-3 text-sm font-medium text-destructive border border-destructive/50 rounded-lg"
                    >
                      {t('buttons.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      {t('buttons.signIn')}
                    </Link>
                    <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                      {t('buttons.register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}

function AchievementBadge({ userId }: { userId: string }) {
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [totalCount] = useState(12); // Total achievements from achievements.ts

  useEffect(() => {
    async function loadAchievements() {
      try {
        const { data, error } = await supabase
          .from('user_achievements')
          .select('achievement_id')
          .eq('user_id', userId);

        if (error) throw error;
        setUnlockedCount(data?.length || 0);
      } catch (error) {
        logger.error('Error loading achievements:', error);
      }
    }

    loadAchievements();
  }, [userId]);

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 text-amber-500">
      <Trophy className="h-3.5 w-3.5" />
      <span className="text-xs font-medium">{unlockedCount}/{totalCount}</span>
    </div>
  );
}

function AchievementMenuItem() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Delay opening to allow dropdown to close first
    setTimeout(() => setOpen(true), 100);
  };

  return (
    <>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={handleClick}>
        <Trophy className="mr-2 h-4 w-4" />
        {t('buttons.achievements')}
      </DropdownMenuItem>
      <AchievementSystem open={open} onOpenChange={setOpen} />
    </>
  );
}