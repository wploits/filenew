import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export function SlideIn({ children, direction = 'left', delay = 0 }: SlideInProps) {
  const initial = { x: direction === 'left' ? -20 : 20, opacity: 0 };
  
  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}