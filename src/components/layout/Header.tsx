import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, GraduationCap, BookOpen, Award, Rocket, User, LogOut, Settings, Bookmark, Users, Trophy, Globe } from 'lucide-react';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { logger } from '@/lib/logger';
import { useUserPreferences, type Theme } from '@/hooks/useUserPreferences';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { getMotionVariant, transitions, prefersReducedMotion, STAGGER } from '@/lib/animations';
import { useUser } from '@/context/UserContext';
import { UserAvatar } from '@/components/user/UserAvatar';
import { EDUCATION_BASE_PATH, educationRoutes } from '@/lib/educationRoutes';
import { useTranslation } from '@/hooks/useTranslation';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useI18n } from '@/context/I18nContext';
import { LANGUAGE_NAMES, type SupportedLanguage } from '@/lib/i18n';
import { themes, ALL_THEME_CLASSES } from '@/components/layout/ThemeSwitcher';
import { cn } from '@/lib/utils';
import { preloadImages } from '@/lib/utils/preloadImages';
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
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useUser();
  const navigate = useNavigate();
  const { preferences, updatePreferences } = useUserPreferences();
  const { changeLanguage, language } = useI18n();

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navigation = useMemo(() => [{
    name: t('navigation.content'),
    href: '/news',
    children: [{
      name: t('navigation.news'),
      href: '/news',
      icon: BookOpen,
      customIcon: '/logos/navigation/news.png',
      description: t('descriptions.news')
    }, {
      name: t('navigation.analytics'),
      href: '/analytics',
      icon: BarChart3,
      customIcon: '/logos/navigation/analytics.png',
      description: t('descriptions.analytics')
    }, {
      name: t('navigation.forum'),
      href: '/forum',
      icon: Award,
      customIcon: '/logos/navigation/forum.png',
      description: t('descriptions.forum')
    }, {
      name: t('navigation.communityHub'),
      href: '/community',
      icon: Users,
      description: t('navigation.communityHub')
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
      name: t('navigation.academy'),
      href: '/academy',
      icon: Rocket,
      customIcon: '/logos/navigation/academy.png',
      description: t('descriptions.academy')
    }, {
      name: t('navigation.mentorEducation'),
      href: educationRoutes.course,
      icon: Users,
      customIcon: '/logos/navigation/mentor.png',
      description: t('descriptions.mentorEducation')
    }]
  }, {
    name: t('navigation.community'),
    href: '/about',
    children: [{
      name: t('navigation.aboutUs'),
      href: '/about',
      icon: Award,
      customIcon: '/logos/navigation/about-us.png', // Custom icon image
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
      customIcon: '/logos/navigation/careers.png',
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

  // Extract all custom icon URLs from navigation structure
  const navigationIconUrls = useMemo(() => {
    const urls: string[] = [];
    
    const extractIcons = (items: typeof navigation) => {
      items.forEach(item => {
        if (item.children) {
          item.children.forEach(child => {
            if ((child as any).customIcon) {
              urls.push((child as any).customIcon);
            }
          });
        }
      });
    };
    
    extractIcons(navigation);
    return urls;
  }, [navigation]);

  // Preload navigation icons on mount
  useEffect(() => {
    if (navigationIconUrls.length === 0) return;

    // Use requestIdleCallback if available for low-priority preloading
    // Otherwise use setTimeout to avoid blocking initial render
    const preloadIcons = () => {
      preloadImages(navigationIconUrls).then(() => {
        logger.debug(`Preloaded ${navigationIconUrls.length} navigation icons`);
      }).catch(error => {
        logger.warn('Failed to preload some navigation icons:', error);
      });
    };

    if ('requestIdleCallback' in window) {
      const idleCallbackId = (window as any).requestIdleCallback(preloadIcons, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(idleCallbackId);
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(preloadIcons, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [navigationIconUrls]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sync theme when preferences change
    const html = document.documentElement;
    const currentTheme = preferences.theme || 'dark';
    ALL_THEME_CLASSES.forEach(cls => html.classList.remove(cls));
    html.classList.add(currentTheme);
  }, [preferences.theme]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleThemeChange = async (theme: Theme) => {
    await updatePreferences({ theme });
    setThemeMenuOpen(false);
  };

  const getCurrentThemeData = () => {
    return themes.find(t => t.value === preferences.theme) || themes[0];
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
                  <button 
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 min-h-[44px] ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    onTouchStart={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && <motion.div 
                      initial={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
                      animate={prefersReducedMotion() ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                      exit={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
                      transition={transitions.fast}
                      className="absolute top-full left-0 mt-2 w-72 py-3 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl">
                        {item.children.map(child => <Link key={child.href} to={child.href} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              {(child as any).customIcon ? (
                                <img 
                                  src={(child as any).customIcon} 
                                  alt={child.name}
                                  className="h-full w-full object-contain p-1"
                                />
                              ) : (
                                <child.icon className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{child.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                            </div>
                          </Link>)}
                      </motion.div>}
                  </AnimatePresence>
                </div> : <Link key={item.name} to={item.href} className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                  {item.name}
                </Link>)}
          </nav>

          {/* Live indicator + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <GlobalSearch />
            {user && <NotificationDropdown />}
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
                  
                  {/* Language Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguageMenuOpen(!languageMenuOpen);
                        setThemeMenuOpen(false);
                      }}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      {t('common.language')}
                      <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {languageMenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="py-1 pl-4 space-y-0.5">
                            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
                              <button
                                key={code}
                                type="button"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  await changeLanguage(code as SupportedLanguage);
                                  setLanguageMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm transition-colors text-left hover:bg-accent hover:text-accent-foreground ${
                                  language === code ? 'bg-secondary/50' : ''
                                }`}
                              >
                                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="flex-1">{name}</span>
                                {language === code && (
                                  <span className="text-primary text-xs">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Theme Toggle Submenu */}
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setThemeMenuOpen(!themeMenuOpen);
                        setLanguageMenuOpen(false);
                      }}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {(() => {
                        const currentThemeData = getCurrentThemeData();
                        const ThemeIcon = currentThemeData.icon;
                        return (
                          <>
                            <div className={cn('w-3 h-3 rounded-full mr-2', currentThemeData.color)} />
                            <ThemeIcon className="mr-2 h-4 w-4" />
                          </>
                        );
                      })()}
                      {t('common.theme')}
                      <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${themeMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {themeMenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="py-1 pl-4 space-y-0.5 max-h-60 overflow-y-auto">
                            {themes.map((theme) => {
                              const Icon = theme.icon;
                              const isActiveTheme = preferences.theme === theme.value;
                              return (
                                <button
                                  key={theme.value}
                                  type="button"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    await handleThemeChange(theme.value);
                                  }}
                                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm transition-colors text-left hover:bg-accent hover:text-accent-foreground ${
                                    isActiveTheme ? 'bg-secondary/50' : ''
                                  }`}
                                >
                                  <div className={cn('w-3 h-3 rounded-full flex-shrink-0', theme.color)} />
                                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="flex-1">{theme.label}</span>
                                  {isActiveTheme && (
                                    <span className="text-primary text-xs">✓</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    {t('buttons.settings')}
                  </DropdownMenuItem>
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
                <Link to="/auth/login" className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors leading-tight">
                  {t('buttons.signIn')}
                </Link>
                <Link to="/auth/register" className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 leading-tight">
                  {t('buttons.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            type="button" 
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
          id="mobile-navigation"
          initial={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: '-100%' }}
          animate={prefersReducedMotion() ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: '-100%' }}
          transition={transitions.normal}
          className="lg:hidden fixed inset-0 top-16 md:top-20 bg-background/95 backdrop-blur-xl border-b border-border h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-y-auto z-50"
          role="navigation"
          aria-label="Mobile navigation">
            <div className="container-wide py-4 space-y-1">
              {/* Mobile Search */}
              <div className="px-4 mb-4">
                <GlobalSearch />
              </div>
              {navigation.map(item => item.children ? <div key={item.name} className="space-y-1">
                    <div className="px-4 py-2 text-sm font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children.map(child => <Link key={child.href} to={child.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors min-h-[44px] ${isActive(child.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                          {(child as any).customIcon ? (
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <img 
                                src={(child as any).customIcon} 
                                alt={child.name}
                                className="h-full w-full object-contain p-1"
                              />
                            </div>
                          ) : (
                            <child.icon className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          {child.name}
                        </Link>)}
                    </div>
                  </div> :                   <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 text-sm rounded-lg transition-colors min-h-[44px] flex items-center ${isActive(item.href) ? 'text-foreground bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}>
                    {item.name}
                  </Link>)}
              <div className="pt-4 px-4 space-y-2">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      <User className="h-4 w-4" />
                      {t('buttons.profile')}
                    </Link>
                    <Link to="/watchlists" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      <TrendingUp className="h-4 w-4" />
                      {t('buttons.watchlists')}
                    </Link>
                    <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      <BookOpen className="h-4 w-4" />
                      {t('buttons.bookmarks')}
                    </Link>
                    
                    {/* Language Toggle */}
                    <button
                      onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium border border-border rounded-lg"
                    >
                      <Globe className="h-4 w-4" />
                      {t('common.language')}
                      <span className="ml-auto">{languageMenuOpen ? '▼' : '▶'}</span>
                    </button>
                    
                    {languageMenuOpen && (
                      <div className="pl-4 space-y-1">
                        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
                          <button
                            key={code}
                            onClick={async () => {
                              await changeLanguage(code as SupportedLanguage);
                              await updatePreferences({ language: code as SupportedLanguage });
                              setLanguageMenuOpen(false);
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg border transition-colors ${
                              language === code
                                ? 'bg-secondary border-border'
                                : 'border-border hover:bg-secondary/30'
                            }`}
                          >
                            {name}
                            {language === code && <span className="ml-auto">✓</span>}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Mobile Theme Toggle */}
                    <button
                      onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium border border-border rounded-lg"
                    >
                      {(() => {
                        const currentThemeData = getCurrentThemeData();
                        const ThemeIcon = currentThemeData.icon;
                        return (
                          <>
                            <div className={cn('w-3 h-3 rounded-full', currentThemeData.color)} />
                            <ThemeIcon className="h-4 w-4" />
                          </>
                        );
                      })()}
                      {t('common.theme')}
                      <span className="ml-auto">{themeMenuOpen ? '▼' : '▶'}</span>
                    </button>
                    
                    {themeMenuOpen && (
                      <div className="pl-4 space-y-1">
                        {themes.map((theme) => {
                          const Icon = theme.icon;
                          const isActive = preferences.theme === theme.value;
                          return (
                            <button
                              key={theme.value}
                              onClick={async () => {
                                await handleThemeChange(theme.value);
                                setMobileMenuOpen(false);
                              }}
                              className={`flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg border transition-colors ${
                                isActive
                                  ? 'bg-secondary border-border'
                                  : 'border-border hover:bg-secondary/30'
                              }`}
                            >
                              <div className={cn('w-3 h-3 rounded-full', theme.color)} />
                              <Icon className="h-4 w-4" />
                              {theme.label}
                              {isActive && <span className="ml-auto">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium border border-border rounded-lg">
                      <Settings className="h-4 w-4" />
                      {t('buttons.settings')}
                    </Link>
                    <button
                      onClick={async () => {
                        await signOut();
                        setMobileMenuOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-destructive border border-destructive/50 rounded-lg"
                    >
                      <LogOut className="h-4 w-4" />
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
          </motion.nav>
        )}
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
