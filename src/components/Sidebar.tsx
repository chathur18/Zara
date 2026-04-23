import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  History, 
  Settings, 
  Lock, 
  Activity,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'finances', label: 'Transactions', icon: Wallet },
    { id: 'investments', label: 'Wealth Engine', icon: TrendingUp },
    { id: 'security', label: 'Zero Trust Control', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Logs', icon: History },
    { id: 'settings', label: 'Kernel Settings', icon: Settings },
  ];

  return (
    <div className="w-72 h-screen fixed left-0 top-0 border-r border-white/10 bg-black/40 backdrop-blur-3xl flex flex-col z-50">
      <div className="p-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
            FortiFin
          </h1>
          <p className="text-[8px] font-mono uppercase tracking-[0.4em] text-blue-400/60 mt-1">
            Zero Trust Network Access
          </p>
        </motion.div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-white/10 text-white shadow-lg shadow-black/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "group-hover:text-blue-300")} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active-indicator">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-white/40">Continuously Verifying</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/80 font-medium">Identity Certified</p>
            <Lock className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
        
        <button className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Terminate Session</span>
        </button>
      </div>
    </div>
  );
};
