import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { generateBreadcrumbs, BreadcrumbItem as BreadcrumbItemType } from '@/utils/breadcrumbs';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateBreadcrumbListSchema } from '@/utils/structuredData';
import { getMotionVariant, transitions, STAGGER, prefersReducedMotion } from '@/lib/animations';

interface BreadcrumbsProps {
  pageTitle?: string;
  items?: BreadcrumbItemType[];
  className?: string;
}

export function Breadcrumbs({ pageTitle, items, className }: BreadcrumbsProps) {
  // useLocation must be called unconditionally (React hooks rule)
  // We'll use it if available, otherwise fallback to window.location
  let location: { pathname: string };
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation fails, create a fallback location object
    // This shouldn't happen in normal usage, but handles edge cases
    location = { pathname: typeof window !== 'undefined' ? window.location.pathname : '/' };
  }
  
  // Add try-catch for safety
  let breadcrumbItems: BreadcrumbItemType[];
  try {
    // Get pathname - prefer location from hook, fallback to window
    const pathname = location?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
    breadcrumbItems = items || generateBreadcrumbs(pathname, pageTitle);
  } catch (error) {
    console.error('Breadcrumb generation error:', error);
    breadcrumbItems = [];
  }

  // Generate structured data
  let structuredData;
  try {
    structuredData = generateBreadcrumbListSchema(breadcrumbItems);
  } catch (error) {
    console.error('BreadcrumbList schema generation error:', error);
    structuredData = null;
  }

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  const fadeInVariant = getMotionVariant('fadeInLeft');

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <nav 
        className="w-full mb-6 md:mb-8"
        aria-label="breadcrumb"
      >
        <Breadcrumb>
          <motion.ol
            className={`flex items-center gap-x-1.5 text-sm text-muted-foreground sm:gap-x-2.5${className ? ` ${className}` : ''}`}
            initial={fadeInVariant.initial}
            animate={fadeInVariant.animate}
            transition={{
              ...transitions.fast,
              staggerChildren: prefersReducedMotion() ? 0 : STAGGER.fast / 1000,
            }}
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              const path = item.url.replace('https://investopatronus.com', '');

              return (
                <React.Fragment key={item.url}>
                  {isLast ? (
                    <motion.li
                      initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                      animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                      transition={{
                        ...transitions.fast,
                        delay: prefersReducedMotion() ? 0 : (index * STAGGER.fast) / 1000,
                      }}
                      className="inline-flex items-center max-w-full"
                    >
                      <BreadcrumbPage className="truncate">{item.name}</BreadcrumbPage>
                    </motion.li>
                  ) : (
                    <>
                      <motion.li
                        initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                        animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                        transition={{
                          ...transitions.fast,
                          delay: prefersReducedMotion() ? 0 : (index * STAGGER.fast) / 1000,
                        }}
                        className="inline-flex items-center flex-shrink-0"
                      >
                        <BreadcrumbLink asChild>
                          <Link 
                            to={path} 
                            className="transition-colors hover:text-primary whitespace-nowrap"
                          >
                            {item.name}
                          </Link>
                        </BreadcrumbLink>
                      </motion.li>
                      <motion.li
                        initial={prefersReducedMotion() ? {} : { opacity: 0 }}
                        animate={prefersReducedMotion() ? {} : { opacity: 1 }}
                        transition={{
                          ...transitions.fast,
                          delay: prefersReducedMotion() ? 0 : ((index + 0.5) * STAGGER.fast) / 1000,
                        }}
                        role="presentation"
                        aria-hidden="true"
                        className="inline-flex items-center justify-center flex-shrink-0"
                      >
                        <ChevronRight className="size-3 sm:size-4 flex-shrink-0" />
                      </motion.li>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </motion.ol>
        </Breadcrumb>
      </nav>
    </>
  );
}

