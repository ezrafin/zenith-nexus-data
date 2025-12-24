import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getMotionVariant, transitions, hoverLift, STAGGER, prefersReducedMotion } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'fadeInUp'
}: AnimatedSectionProps) {
  const motionVariant = getMotionVariant(variant);
  
  return (
    <motion.div
      initial={motionVariant.initial}
      whileInView={motionVariant.animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        ...transitions.normal,
        delay: prefersReducedMotion() ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  enableHover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = '', 
  index = 0,
  enableHover = true
}: AnimatedCardProps) {
  const motionVariant = getMotionVariant('fadeInUp');
  const staggerDelay = (index * STAGGER.normal) / 1000;
  
  return (
    <motion.div
      initial={motionVariant.initial}
      whileInView={motionVariant.animate}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        ...transitions.normal,
        delay: prefersReducedMotion() ? 0 : staggerDelay,
      }}
      whileHover={enableHover && !prefersReducedMotion() ? hoverLift : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = STAGGER.normal 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: prefersReducedMotion() ? 0 : staggerDelay / 1000,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}