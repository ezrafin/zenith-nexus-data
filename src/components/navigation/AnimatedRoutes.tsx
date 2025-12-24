import { ReactNode } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getMotionVariant, transitions, prefersReducedMotion } from '@/lib/animations';

interface AnimatedRoutesProps {
  children: ReactNode;
}

export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const location = useLocation();
  const pageVariant = getMotionVariant('pageTransition');

  if (prefersReducedMotion()) {
    return <Routes location={location}>{children}</Routes>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {children}
        <Route
          path="*"
          element={
            <motion.div
              key={location.pathname}
              initial={pageVariant.initial}
              animate={pageVariant.animate}
              exit={pageVariant.exit}
              transition={transitions.normal}
            >
              {children}
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

