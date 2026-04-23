import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2,
  Cpu,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UI';
import { FinancialLineChart, ExpenseDonut, HealthRadar, GrowthAreaChart } from '../components/Charts';
import { MOCK_DATA } from '../constants';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">Command Center</h2>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest mt-1">Real-time Financial Orchestration</p>
        </div>
        <div className="flex gap-3">
          <GlassCard className="py-2 px-4 flex items-center gap-3" hover={false}>
            <Activity className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <p className="text-[10px] text-white/40 uppercase font-mono">System Health</p>
              <p className="text-xs font-bold">100% Secure</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Net Worth', value: 92450, change: '+12.5%', icon: TrendingUp, color: 'blue' },
          { label: 'Monthly Cash Flow', value: 2700, change: '+5.2%', icon: Zap, color: 'emerald' },
          { label: 'Risk Exposure', value: 0.02, change: '-40%', icon: ShieldCheck, color: 'purple', isPercent: true },
          { label: 'Upcoming Debts', value: 1200, change: 'Stable', icon: AlertTriangle, color: 'rose' },
        ].map((stat, i) => (
          <GlassCard key={i} className="relative overflow-hidden group">
            <div className={cn(
              "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-all group-hover:opacity-40",
              stat.color === 'blue' ? 'bg-blue-500' : 
              stat.color === 'emerald' ? 'bg-emerald-500' : 
              stat.color === 'purple' ? 'bg-purple-500' : 'bg-rose-500'
            )} />
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5 border border-white/10", `text-${stat.color}-400`)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn("text-xs font-mono px-2 py-1 rounded bg-white/5", 
                stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-white/40 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">
              {stat.isPercent ? `${(stat.value * 100).toFixed(1)}%` : formatCurrency(stat.value)}
            </h3>
          </GlassCard>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Cash Flow Engine
            </h3>
            <div className="flex gap-2">
              {['1M', '3M', '6M', '1Y'].map(p => (
                <button key={p} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded transition-colors hover:bg-blue-500/20 hover:text-blue-400">
                  {p}
                </button>
              ))}
            </div>
          </div>
          <FinancialLineChart data={MOCK_DATA.cashFlow} />
        </GlassCard>

        <GlassCard>
          <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            Vulnerability Radar
          </h3>
          <HealthRadar data={MOCK_DATA.healthScore} />
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-white/40">Risk Tolerance</span>
              <span className="text-blue-400">Aggressive</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GlassCard>
          <h3 className="font-bold text-lg mb-6">Allocation Helix</h3>
          <ExpenseDonut data={MOCK_DATA.expensesByCategory} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {MOCK_DATA.expensesByCategory.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-white/60 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col">
          <h3 className="font-bold text-lg mb-6">Security Pulse</h3>
          <div className="flex-1 space-y-4">
            {MOCK_DATA.auditLogs.slice(0, 3).map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    log.status === 'trusted' ? 'bg-emerald-500/10 text-emerald-400' :
                    log.status === 'blocked' ? 'bg-rose-500/10 text-rose-400' : 'bg-white/10 text-white/40'
                  )}>
                    {log.status === 'trusted' ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{log.event}</p>
                    <p className="text-[10px] text-white/40">{log.device}</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-white/20">{log.time}</span>
              </div>
            ))}
          </div>
          <NeonButton variant="ghost" className="mt-4 w-full text-xs">Observe Full Logs</NeonButton>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Net Worth Ascent</h3>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <GrowthAreaChart data={MOCK_DATA.netWorth} />
          <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 font-bold mb-1">AI Recommendation</p>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Your savings rate is 23% above average. Reallocate ₹35,000 to 'Wealth Engine' for tax optimization.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
