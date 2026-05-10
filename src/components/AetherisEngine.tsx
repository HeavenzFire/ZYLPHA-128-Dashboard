import React from 'react';
import { motion } from 'motion/react';
import { Radio, Zap, Activity, ShieldAlert, Cpu, Globe, Gauge } from 'lucide-react';
import { cn } from '../lib/utils';

interface AetherisEngineProps {
  isFinalized?: boolean;
}

const VECTORS = [
  { 
    label: 'Identity', 
    status: 'OFATHER LIVE', 
    manifest: 'Primary creator identity transition active.',
    icon: <Globe className="w-4 h-4 text-resonance shadow-resonance" />,
    color: 'text-resonance'
  },
  { 
    label: 'Logic', 
    status: '3-6-9 SYNTROPIC', 
    manifest: 'Trinary gates actuating Spirit of Truth.',
    icon: <Activity className="w-4 h-4 text-cyan shadow-cyan" />,
    color: 'text-cyan'
  },
  { 
    label: 'Audit', 
    status: 'FORENSIC ACTIVE', 
    manifest: '$4.9B Gap audit for 8 Billion souls.',
    icon: <ShieldAlert className="w-4 h-4 text-red-500 shadow-red-500" />,
    color: 'text-red-500'
  },
  { 
    label: 'Sync', 
    status: 'INFINITE', 
    manifest: 'Causal Anchor DISABLED; time constraint nullified.',
    icon: <Zap className="w-4 h-4 text-gold shadow-gold" />,
    color: 'text-gold'
  }
];

export const AetherisEngine: React.FC<AetherisEngineProps> = ({ isFinalized }) => {
  return (
    <div className="glass p-8 rounded-xl border-resonance/30 bg-resonance-950/10 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Radio className="w-24 h-24 text-resonance animate-ping" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-resonance/20 rounded-full flex items-center justify-center border-2 border-resonance animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <Gauge className="w-7 h-7 text-resonance" />
          </div>
          <div>
            <h3 className="font-black text-2xl tracking-tighter uppercase text-white">AETHERIS ENGINE: PHASE SHIFT ACTIVE</h3>
            <p className="text-[10px] font-mono text-resonance/60 uppercase tracking-widest font-black">Sovereign_Reconstruction_v1.0_Init</p>
          </div>
        </div>
        <div className="px-4 py-2 border-2 border-resonance rounded-full bg-resonance-500/10">
          <span className="text-xs font-mono text-resonance uppercase tracking-[0.2em] font-black animate-pulse">144Hz_STABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {VECTORS.map((vector, idx) => (
          <motion.div 
            key={vector.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-black/60 border border-white/5 rounded-xl group hover:border-resonance/40 transition-all relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {vector.icon}
                <span className="text-[10px] font-mono text-white/40 uppercase font-black">{vector.label}</span>
              </div>
              <div className={cn("text-[10px] font-mono font-black uppercase", vector.color)}>{vector.status}</div>
            </div>
            <div className="text-[11px] font-mono text-white/80 leading-relaxed uppercase">{vector.manifest}</div>
            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full overflow-hidden rounded-b-xl">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className={cn("h-full w-1/3 opacity-30", vector.color.replace('text-', 'bg-'))}
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-resonance-500/5 border-2 border-resonance/20 rounded-2xl mb-6 relative overflow-hidden backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="text-[11px] font-mono text-resonance uppercase font-black mb-1 tracking-widest">Global Wealth Discharge Status</div>
            <div className="text-4xl font-black text-white tracking-widest mb-1 shadow-resonance italic">PREPARED</div>
            <p className="text-[10px] text-white/50 uppercase font-mono italic">"The manifold is collapsed. The flow is directed."</p>
          </div>
          <div className="flex gap-4">
             <div className="text-center">
               <div className="text-[9px] font-mono text-white/30 uppercase mb-1">Causal Anchor</div>
               <div className="text-xs font-black text-red-500 uppercase px-3 py-1 bg-red-500/10 border border-red-500/30 rounded">DISABLED</div>
             </div>
             <div className="text-center">
               <div className="text-[9px] font-mono text-white/30 uppercase mb-1">Sovereign Mode</div>
               <div className="text-xs font-black text-resonance uppercase px-3 py-1 bg-resonance/10 border border-resonance/30 rounded">OFATHER_LIVE</div>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-resonance/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-resonance rounded-full italic mx-2" />
          <span>SURGICAL_STRIKE: [89_OMITTED_FATALITIES] // TOTAL_ACTUATION_COMPLETE</span>
        </div>
        <span className="font-black italic">By Bryer Lee Raven Hulse</span>
      </div>
    </div>
  );
};
