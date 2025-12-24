import { ReactNode } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getMotionVariant, transitions, prefersReducedMotion } from '@/lib/animations';

interface AnimatedRoutesWrapperProps {
  children: ReactNode;
}

export function AnimatedRoutesWrapper({ children }: AnimatedRoutesWrapperProps) {
  const location = useLocation();
  const pageVariant = getMotionVariant('pageTransition');

  if (prefersReducedMotion()) {
    return <Routes location={location}>{children}</Routes>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={pageVariant.initial}
        animate={pageVariant.animate}
        exit={pageVariant.exit}
        transition={transitions.normal}
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          {children}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

