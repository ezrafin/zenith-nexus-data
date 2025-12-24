import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, Video, BookOpen, Award, Rocket, GraduationCap } from 'lucide-react';
import { educationRoutes } from '@/lib/educationRoutes';
import { useTranslation } from '@/hooks/useTranslation';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getMotionVariant, transitions, STAGGER, prefersReducedMotion } from '@/lib/animations';
export function Footer() {
  const { t } = useTranslation({ namespace: 'ui' });

  const footerLinks = useMemo(() => ({
    markets: [{
      name: t('navigation.indices'),
      href: '/markets/indices',
      icon: TrendingUp
    }, {
      name: t('navigation.stocks'),
      href: '/markets/stocks',
      icon: BarChart3
    }, {
      name: t('navigation.commodities'),
      href: '/markets/commodities',
      icon: Coins
    }, {
      name: t('navigation.crypto'),
      href: '/markets/crypto',
      icon: Bitcoin
    }, {
      name: t('navigation.currenciesEtfs'),
      href: '/markets/currencies',
      icon: DollarSign
    }],
    education: [{
      name: t('navigation.learning'),
      href: educationRoutes.learning,
      icon: BookOpen
    }, {
      name: t('navigation.videoLibrary'),
      href: educationRoutes.video,
      icon: GraduationCap
    }, {
      name: t('navigation.investorCourse'),
      href: educationRoutes.course,
      icon: Rocket
    }],
    content: [{
      name: t('navigation.news'),
      href: '/news'
    }, {
      name: t('navigation.analytics'),
      href: '/analytics'
    }, {
      name: t('navigation.forum'),
      href: '/forum'
    }, {
      name: t('navigation.communityHub'),
      href: '/community'
    }],
    community: [{
      name: t('navigation.aboutUs'),
      href: '/about'
    }, {
      name: t('navigation.contactUs'),
      href: '/contact'
    }, {
      name: t('navigation.careers'),
      href: '/careers'
    }, {
      name: t('navigation.authors'),
      href: '/authors'
    }],
    legal: [{
      name: t('navigation.termsOfService'),
      href: '/terms'
    }, {
      name: t('navigation.privacyPolicy'),
      href: '/privacy'
    }, {
      name: t('navigation.disclaimer'),
      href: '/disclaimer'
    }]
  }), [t]);
  const fadeInVariant = getMotionVariant('fadeInUp');

  return <footer role="contentinfo" className="border-t border-border bg-card/30">
      <motion.div 
        className="container-wide py-16 md:py-20"
        initial={fadeInVariant.initial}
        whileInView={fadeInVariant.animate}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          ...transitions.normal,
          staggerChildren: prefersReducedMotion() ? 0 : STAGGER.normal / 1000,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <Link to="/" className="flex justify-center mb-4">
              <img 
                src="/favicon.png" 
                alt="INVESTOPATRONUS" 
                className="h-12 md:h-16 lg:h-20"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 text-center max-w-xs">
              Your Guardian in Global Markets. Professional analytics and real-time financial data.
            </p>
          </div>
          
          {/* Navigation sections in a single row on desktop */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center lg:justify-items-start">
              {/* Content */}
              <motion.div 
                className="text-center lg:text-left"
                initial={prefersReducedMotion() ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={transitions.normal}
              >
                <h3 className="text-sm font-semibold mb-4">{t('navigation.content')}</h3>
                <ul className="space-y-2.5">
                  {footerLinks.content.map((link, index) => <motion.li 
                    key={link.href}
                    initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                    whileInView={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      ...transitions.fast,
                      delay: prefersReducedMotion() ? 0 : (index * STAGGER.fast) / 1000,
                    }}
                  >
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </motion.li>)}
                </ul>
              </motion.div>

              {/* Markets */}
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-semibold mb-4">{t('navigation.markets')}</h3>
                <ul className="space-y-2.5">
                  {footerLinks.markets.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 justify-center lg:justify-start">
                        <link.icon className="h-3.5 w-3.5" />
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Education */}
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-semibold mb-4">{t('navigation.education')}</h3>
                <ul className="space-y-2.5">
                  {footerLinks.education.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 justify-center lg:justify-start">
                        <link.icon className="h-3.5 w-3.5" />
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Community */}
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-semibold mb-4">{t('navigation.community')}</h3>
                <ul className="space-y-2.5">
                  {footerLinks.community.map(link => <li key={link.href}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </div>

              {/* Legal */}
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-semibold mb-4">{t('navigation.legal')}</h3>
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
        <motion.div 
          className="mt-12 pt-8 border-t border-border flex items-center justify-center"
          initial={prefersReducedMotion() ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion() ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={transitions.normal}
        >
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} INVESTOPATRONUS. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>;
}