import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { AIAssistant } from './components/AIAssistant';
import { Dashboard } from './pages/Dashboard';
import { SecurityGrid } from './pages/Security';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Fingerprint } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Artificial futuristic loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'security':
        return <SecurityGrid />;
      default:
        return (
          <div className="h-[80vh] flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
              <ShieldCheck className="w-10 h-10 text-white/20" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Access Restricted</h2>
            <p className="text-white/40 max-w-md mt-2">
              The {activeTab} module is currently under kernel maintenance or requires higher privilege escalation.
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[1000]">
        <div className="relative">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 border-2 border-blue-500/30 border-t-blue-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Fingerprint className="w-10 h-10 text-blue-500 animate-pulse" />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold tracking-[0.2em] font-mono text-white/80">FORTIFIN KERNEL</h2>
          <p className="text-[10px] text-blue-400 font-mono mt-2 tracking-[0.3em] uppercase">Booting Zero-Trust Architecture...</p>
        </div>
        
        <div className="absolute bottom-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans relative overflow-x-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" 
        />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-emerald-600/5 rounded-full blur-[150px]" />
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="relative z-10">
        <TopNav />
        <div className="ml-72 min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AIAssistant />
      
      {/* Ambient noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
