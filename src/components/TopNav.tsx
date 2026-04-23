import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Fingerprint, 
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { NeonButton } from './UI';

export const TopNav: React.FC = () => {
  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-40 ml-72">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search kernel, transactions, or policies..."
            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-6 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-white/20"
          />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <Globe className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] uppercase font-mono text-blue-400 tracking-wider">Node: US-WEST-2</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} className="p-2 glass rounded-lg cursor-pointer relative">
            <Bell className="w-5 h-5 text-white/60" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-black" />
          </motion.div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">Admin Root</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] uppercase font-mono text-emerald-400">Trust Level 9.8</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <NeonButton variant="blue" className="px-4 py-2 flex items-center gap-2">
          <Fingerprint className="w-4 h-4" />
          <span className="text-sm">Verify</span>
        </NeonButton>
      </div>
    </header>
  );
};
