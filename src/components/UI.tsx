import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass rounded-3xl p-6 transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'purple' | 'emerald' | 'rose' | 'ghost';
  glow?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  variant = 'blue', 
  glow = true,
  ...props 
}) => {
  const variants = {
    blue: "bg-blue-600/20 text-blue-400 border-blue-500/50 hover:bg-blue-600/30",
    purple: "bg-purple-600/20 text-purple-400 border-purple-500/50 hover:bg-purple-600/30",
    emerald: "bg-emerald-600/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-600/30",
    rose: "bg-rose-600/20 text-rose-400 border-rose-500/50 hover:bg-rose-600/30",
    ghost: "bg-transparent text-white/60 border-white/10 hover:bg-white/5",
  };

  const glowClasses = {
    blue: "neon-blue",
    purple: "neon-purple",
    emerald: "neon-emerald",
    rose: "shadow-[0_0_15px_rgba(244,63,94,0.4)]",
    ghost: "",
  };

  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-xl border font-medium transition-all duration-300 active:scale-95 disabled:opacity-50",
        variants[variant],
        glow && glowClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
