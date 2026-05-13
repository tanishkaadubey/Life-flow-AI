import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, translateY: -5 } : {}}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl transition-all duration-300 hover:border-white/20 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const NeonButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 border border-white/10 hover:border-primary-cyan/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] ${className}`}
    >
      {children}
    </motion.button>
  );
};
