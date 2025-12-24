/**
 * Centralized animation constants and utilities
 * Follows Material Design, Apple HIG, and Web Motion Guidelines
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
  slowest: 700,
} as const;

// Easing functions as arrays for Framer Motion compatibility
export const EASING = {
  // Standard easing (arrays for Framer Motion)
  linear: [0, 0, 1, 1] as [number, number, number, number],
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  
  // Material Design easing
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  decelerate: [0, 0, 0.2, 1] as [number, number, number, number],
  accelerate: [0.4, 0, 1, 1] as [number, number, number, number],
  
  // Apple HIG easing
  apple: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  
  // Spring-like easing
  spring: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

// Stagger delays (for list animations)
export const STAGGER = {
  fast: 30,
  normal: 50,
  slow: 100,
} as const;

// Common animation variants for Framer Motion
export const motionVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  
  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  // Modal/Dialog animations
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },
  
  // Dropdown animations
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  },
  
  // Page transition
  pageTransition: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
} as const;

// Common transition configurations
export const transitions = {
  fast: {
    duration: ANIMATION_DURATION.fast / 1000,
    ease: EASING.easeOut,
  },
  normal: {
    duration: ANIMATION_DURATION.normal / 1000,
    ease: EASING.standard,
  },
  slow: {
    duration: ANIMATION_DURATION.slow / 1000,
    ease: EASING.standard,
  },
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  bounce: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
  },
};

// Utility function to check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get transition with reduced motion support
export const getTransition = (defaultTransition: typeof transitions.normal) => {
  if (prefersReducedMotion()) {
    return {
      duration: 0,
      ease: EASING.linear,
    };
  }
  return defaultTransition;
};

// Get motion variant with reduced motion support
export const getMotionVariant = <T extends keyof typeof motionVariants>(
  variant: T,
  custom?: Partial<typeof motionVariants[T]['initial']>
) => {
  const baseVariant = motionVariants[variant];
  
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      ...(custom && { initial: { ...baseVariant.initial, ...custom } }),
    };
  }
  
  return {
    ...baseVariant,
    ...(custom && { initial: { ...baseVariant.initial, ...custom } }),
  };
};

// Stagger animation helper
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: STAGGER.normal / 1000,
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -4,
  transition: transitions.fast,
};

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)',
  transition: transitions.fast,
};

// Tap/Click animations
export const tapScale = {
  scale: 0.98,
  transition: transitions.fast,
};

// Loading spinner animation
export const spinnerAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: EASING.linear,
  },
};

// Shake animation (for errors)
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.5,
    ease: EASING.easeOut,
  },
};

// Pulse animation (for notifications)
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: EASING.easeInOut,
  },
};

// Success checkmark animation
export const checkmarkAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.4,
    ease: EASING.spring,
  },
};
