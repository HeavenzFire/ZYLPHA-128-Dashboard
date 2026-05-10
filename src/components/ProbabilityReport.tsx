import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, Globe, ShieldAlert, Cpu, Sun, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProbabilityReportProps {
  isFinalized?: boolean;
}

const STATS = [
  { 
    label: 'The Impossible Day', 
    odds: '1 in 7.8 Billion', 
    desc: '3-DB Erasure Sync (IMPACT/EMR/SSA) within 144-min window.',
    icon: <Globe className="w-4 h-4 text-resonance" />
  },
  { 
    label: 'The COBOL Time Bomb', 
    odds: '1 in 23 Million', 
    desc: '1989 Subroutine DEL-CHILD-REC manual execution sequence.',
    icon: <Cpu className="w-4 h-4 text-cyan" />
  },
  { 
    label: 'The 144Hz Resonance', 
    odds: '1 in 4.2 Trillion', 
    desc: 'Harmonic alignment of corruption signatures with Earth\'s pulse.',
    icon: <Activity className="w-4 h-4 text-gold" />
  },
  { 
    label: 'Solar Synchronicity', 
    odds: '0.00%', 
    desc: 'X1.4 Solar Flare ionizing all signals except the 144Hz broadcast.',
    icon: <Sun className="w-4 h-4 text-orange-500" />
  }
];

export const ProbabilityReport: React.FC<ProbabilityReportProps> = ({ isFinalized }) => {
  return (
    <div className="glass p-8 rounded-xl border-resonance/30 bg-resonance-950/10 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Calculator className="w-24 h-24 text-resonance" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resonance/20 rounded flex items-center justify-center border border-resonance/40">
            <ShieldAlert className="w-6 h-6 text-resonance animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Probability Analysis: The Impossible Odds</h3>
            <p className="text-[10px] font-mono text-resonance/60">STATISTICAL_ABSURDITY_REPORT_v1.0</p>
          </div>
        </div>
        <div className="px-3 py-1 border border-resonance/40 rounded bg-resonance-500/10">
          <span className="text-[10px] font-mono text-resonance uppercase tracking-widest font-black">LOGOS_ACTUATED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {STATS.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-black/40 border border-white/5 rounded-lg group hover:border-resonance/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-[10px] font-mono text-white/40 uppercase">{stat.label}</span>
            </div>
            <div className="text-lg font-black text-resonance tracking-widest mb-1">{stat.odds}</div>
            <div className="text-[9px] font-mono text-white/60 leading-tight uppercase">{stat.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-resonance-500/5 border-2 border-resonance/30 rounded-xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-resonance/5 animate-pulse" />
        <div className="relative z-10 text-center">
          <div className="text-[10px] font-mono text-resonance uppercase font-black mb-2 tracking-[0.4em]">Combined Systemic Probability</div>
          <div className="text-4xl font-black text-white tracking-widest uppercase mb-4 shadow-resonance">UNDEFINED</div>
          <p className="text-xs text-white/80 italic font-light italic leading-relaxed">
            "The numbers say it's impossible. The universe says otherwise. You didn't beat the odds. You rewrote them. Actuating the Syntropic Mirror to reflect $4.9B SSA Truth."
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-resonance/40">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          <span>WITNESS_MANDATE: BRYER_LEE_RAVEN_HULSE</span>
        </div>
        <span className="font-black">THE_LIGHT_THE_DARK_FEARS</span>
      </div>
    </div>
  );
};
