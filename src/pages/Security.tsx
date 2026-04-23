import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  FileLock2, 
  Fingerprint, 
  Network,
  Cpu,
  RefreshCw,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Activity
} from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UI';
import { MOCK_DATA } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { Security3DContainer } from '../components/Security3D';

export const SecurityGrid: React.FC = () => {
  const [nodeStates, setNodeStates] = useState<Record<string, { status: string, level: number }>>({
    'Authorized Identity': { status: 'VERIFIED', level: 9.8 },
    'iPhone 15 Pro': { status: 'SECURE', level: 9.5 },
    'Mac Studio': { status: 'SECURE', level: 9.9 },
    'Risk Engine': { status: 'SCANNING', level: 8.8 },
    'Encrypted Vault': { status: 'LOCKED', level: 10.0 },
    'Financial Bridge': { status: 'CONNECTED', level: 9.2 },
    'User Accounts': { status: 'AUTHORIZED', level: 9.4 },
    'Kernel Firewall': { status: 'BLOCKING', level: 9.7 },
    'Financial Database': { status: 'ENCRYPTED', level: 10.0 }
  });

  const [auditLogs, setAuditLogs] = useState(MOCK_DATA.auditLogs);
  const [isVerifying, setIsVerifying] = useState(false);

  const addLog = (event: string, device: string, status: 'trusted' | 'blocked' | 'warning') => {
    const newLog = {
      id: auditLogs.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      event,
      device,
      status
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const handleAction = (node: string, action: string) => {
    if (action === 'ROTATE') {
      setNodeStates(prev => ({
        ...prev,
        [node]: { ...prev[node], status: 'ROTATING...', level: 7.0 }
      }));
      addLog('Key Rotation Initiated', node, 'warning');
      
      setTimeout(() => {
        setNodeStates(prev => ({
          ...prev,
          [node]: { ...prev[node], status: 'VERIFIED', level: 10.0 }
        }));
        addLog('Integrity Verified', node, 'trusted');
      }, 2000);
    } else if (action === 'BLOCK') {
       setNodeStates(prev => ({
        ...prev,
        [node]: { ...prev[node], status: 'BLOCKED', level: 0.0 }
      }));
      addLog('Emergency Block Active', node, 'blocked');
    } else if (action === 'UNBLOCK') {
       setNodeStates(prev => ({
        ...prev,
        [node]: { ...prev[node], status: 'RE-VERIFYING', level: 5.0 }
      }));
      addLog('Re-verification Start', node, 'warning');
      
      setTimeout(() => {
        setNodeStates(prev => ({
          ...prev,
          [node]: { ...prev[node], status: 'SECURE', level: 9.5 }
        }));
        addLog('Device Re-authorized', node, 'trusted');
      }, 1500);
    }
  };

  const handleReverify = () => {
    setIsVerifying(true);
    addLog('System-wide Identity Audit', 'Kernel', 'warning');
    
    // Simulate a scan across all nodes
    Object.keys(nodeStates).forEach((node, index) => {
      setTimeout(() => {
        setNodeStates(prev => ({
          ...prev,
          [node]: { ...prev[node], status: 'SCANNING', level: 8.0 }
        }));
      }, index * 100);

      setTimeout(() => {
        setNodeStates(prev => ({
          ...prev,
          [node]: { ...prev[node], status: prev[node].status === 'BLOCKED' ? 'BLOCKED' : 'VERIFIED', level: prev[node].level }
        }));
      }, index * 100 + 1000);
    });

    setTimeout(() => {
      setIsVerifying(false);
      addLog('Global Audit Complete', 'Kernel', 'trusted');
    }, 2500);
  };

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Zero Trust Control</h2>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest mt-1">Identity & Policy Kernel</p>
        </div>
        <NeonButton 
          variant="emerald" 
          onClick={handleReverify}
          disabled={isVerifying}
          className="flex items-center gap-2 group"
        >
          <RefreshCw className={cn("w-4 h-4", isVerifying && "animate-spin")} />
          {isVerifying ? 'Scanning...' : 'Re-verify Identity'}
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Engine 3D Visualization */}
        <GlassCard className="lg:col-span-2 h-[500px] relative overflow-hidden p-0 border-white/5 bg-black/40">
          <Security3DContainer 
            nodeStates={nodeStates}
            onAction={handleAction}
          />
        </GlassCard>

        {/* Access Metrics */}
        <div className="space-y-6">
          <GlassCard className="border-white/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Real-time Risks
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Brute Force Attempt', count: 0, status: 'safe' },
                { label: 'API Session Bloat', count: auditLogs.length > 10 ? 4 : 2, status: 'warning' },
                { label: 'Geo-Anomaly', count: 0, status: 'safe' }
              ].map((risk, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-all">
                  <span className="text-xs text-white/60 font-mono">{risk.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-widest">{risk.count}</span>
                    <div className={`w-2 h-2 rounded-full ${risk.status === 'safe' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="border-white/5">
            <h3 className="font-bold text-lg mb-4">Device Trust Architecture</h3>
            <div className="space-y-6">
              {[
                { id: 'iPhone 15 Pro', icon: Smartphone, color: 'emerald' },
                { id: 'Mac Studio', icon: Cpu, color: 'blue' }
              ].map((device) => {
                const state = nodeStates[device.id];
                return (
                  <div key={device.id} className={cn("flex items-center gap-3 transition-opacity duration-500", state.status === 'BLOCKED' && "opacity-40")}>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      state.status === 'BLOCKED' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                      device.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    )}>
                      <device.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs font-bold text-white tracking-tight uppercase">{device.id}</p>
                        <span className={cn(
                          "text-[9px] font-mono font-black tracking-widest",
                          state.status === 'BLOCKED' ? "text-rose-400" :
                          device.color === 'emerald' ? "text-emerald-400" : "text-blue-400"
                        )}>{state.status}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${state.level * 10}%` }}
                          className={cn(
                            "h-full transition-all duration-700 shadow-sm",
                            state.status === 'BLOCKED' ? "bg-rose-500 shadow-rose-500/50" :
                            device.color === 'emerald' ? "bg-emerald-500 shadow-emerald-500/50" : "bg-blue-500 shadow-blue-500/50"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Access Logs Timeline */}
      <GlassCard className="border-white/5">
        <div className="flex items-center justify-between mb-8">
           <h3 className="font-bold text-xl flex items-center gap-3 italic uppercase">
              <Activity className="w-6 h-6 text-blue-400" />
              Access Audit Matrix
           </h3>
           <NeonButton variant="ghost" className="text-[10px] font-bold tracking-[0.2em] uppercase p-0 h-auto">Export Forensic Zip</NeonButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 font-mono text-[10px] uppercase text-white/40 font-normal tracking-widest">Event ID</th>
                <th className="py-4 font-mono text-[10px] uppercase text-white/40 font-normal tracking-widest">Timestamp</th>
                <th className="py-4 font-mono text-[10px] uppercase text-white/40 font-normal tracking-widest">Operation</th>
                <th className="py-4 font-mono text-[10px] uppercase text-white/40 font-normal tracking-widest">Source Entity</th>
                <th className="py-4 font-mono text-[10px] uppercase text-white/40 font-normal text-right tracking-widest">Control Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {auditLogs.map((log) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={log.id} 
                    className="group transition-colors"
                  >
                    <td className="py-5 font-mono text-[10px] text-white/40">#{log.id.toString().padStart(4, '0')}</td>
                    <td className="py-5 text-xs font-mono text-white/60">{log.time}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-white/90 uppercase tracking-tight">{log.event}</span>
                      </div>
                    </td>
                    <td className="py-5 text-xs text-white/40 font-mono tracking-tighter">{log.device}</td>
                    <td className="py-5 text-right">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm",
                        log.status === 'trusted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        log.status === 'blocked' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      )}>
                        {log.status === 'trusted' ? 'ACCESS_GRANTED' : log.status === 'blocked' ? 'ACCESS_DENIED' : 'PENDING_VERIFY'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
