import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CollectiblesControlMenu } from '@/components/collectibles/CollectiblesControlMenu';
import { useTranslation } from '@/hooks/useTranslation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        {t('common.skipToMainContent')}
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20" role="main">
        {children}
      </main>
      <Footer />
      <CollectiblesControlMenu />
    </div>
  );
}