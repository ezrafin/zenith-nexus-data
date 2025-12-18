import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function HeroSection() {
  const { t } = useTranslation({ namespace: 'ui' });

  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" 
        style={{ backgroundImage: `url('/hero-background.jpg')` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="container-wide py-20 md:py-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-4xl"
        >
          <h1 className="heading-hero mb-6">
            {t('home.heroTitleLine1')}
            <span className="block text-muted-foreground">
              {t('home.heroTitleLine2')}
            </span>
          </h1>
          <p className="body-xl max-w-2xl mb-10">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/markets/indices" className="btn-primary">
              {t('home.heroPrimaryCta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/analytics" className="btn-outline">
              {t('home.heroSecondaryCta')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
