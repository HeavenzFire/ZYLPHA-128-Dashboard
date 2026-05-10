import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ShieldAlert, TrendingDown, DollarSign, Activity, FileCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface GlobalTruthMirrorProps {
  isFinalized?: boolean;
}

const TRUTH_METRICS = [
  { label: 'SSA_RECLAMATION', value: 'TOTAL_REVELATION', sub: '$4.9B Discharge Live', color: 'text-gold' },
  { label: 'REGION_3E', value: 'UNMASKED', sub: '89 Fatalities Anchored', color: 'text-resonance' },
  { label: 'CUBE_CAST', value: 'LIVE_BROADCAST', sub: '144Hz Global Sync', color: 'text-cyan' }
];

export const GlobalTruthMirror: React.FC<GlobalTruthMirrorProps> = ({ isFinalized }) => {
  const [revelationIndex, setRevelationIndex] = useState(0);
  
  useEffect(() => {
    if (isFinalized) {
      setRevelationIndex(100);
    } else {
      const interval = setInterval(() => {
        setRevelationIndex(prev => Math.min(100, prev + 2.5));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-white/10 bg-white-950/5 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center border border-white/30">
            <Eye className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Global Truth Mirror</h3>
            <p className="text-[10px] font-mono text-white/60">TOTAL_SYNTHESIS_REVELATION_v1.0</p>
          </div>
        </div>
        <div className="px-3 py-1 border border-cyan/40 rounded bg-cyan-500/10">
          <span className="text-[10px] font-mono text-cyan uppercase tracking-widest font-black">Mirr_Immut_Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TRUTH_METRICS.map((item, idx) => (
          <div key={item.label} className="p-4 bg-black/40 border border-white/5 rounded-lg text-center">
            <div className={cn("text-[8px] font-mono uppercase mb-2", item.color)}>{item.label}</div>
            <div className="text-lg font-black text-white leading-none mb-1">{item.value}</div>
            <div className="text-[9px] font-mono text-white/40">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gold-950/20 border border-gold/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="w-4 h-4 text-gold" />
            <span className="text-[10px] font-mono text-gold uppercase font-black">Global Asset Discharge</span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            Phase 3 Actuated: The $4.9 Billion SSA reclamation is being discharged to 47,000 sovereign nodes. Absolute value restoration.
          </p>
        </div>

        <div className="p-4 bg-resonance-950/20 border border-resonance/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingDown className="w-4 h-4 text-resonance" />
            <span className="text-[10px] font-mono text-resonance uppercase font-black">Forensic Surgical Logic</span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            Region 3E extraction complete. The 89 omitted fatalities have been successfully anchored into the Witness Sync. The institutional void is erased.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan" />
              <span className="text-[9px] font-mono text-white/40 uppercase">Revelation_Index: {revelationIndex.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-gold" />
              <span className="text-[9px] font-mono text-white/40 uppercase">Audit_Verified</span>
            </div>
         </div>
         <div className="text-[10px] text-white/20 font-mono italic">"Everything that is true is visible."</div>
      </div>
    </div>
  );
};
