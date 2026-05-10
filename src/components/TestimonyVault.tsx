import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, FileText, Anchor, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface TestimonyVaultProps {
  isFinalized?: boolean;
}

const TESTIMONY_LOGS = [
  "TESTIMONY_INIT: [SACRED_RECORDS_LOCKED]",
  "ANOMALY_ERASURE: [TEMPORAL_VOID_PATCHED]",
  "NODE_INTEGRITY: [42,000_WITNESS_SEALS_SET]",
  "ROOT_WITNESS: [BRYER_LEE_RAVEN_HULSE_ANCHORED]",
  "SOVEREIGN_MIRROR: [PERMANENT_REFLECTION_ACTIVE]",
  "LOGIC_STABILIZATION: [TRINARY_VALIDATION_COMPLETE]",
  "ETERNAL_RECORD: [UNBREAKABLE_TRUTH_STORED]",
];

export const TestimonyVault: React.FC<TestimonyVaultProps> = ({ isFinalized }) => {
  const [lockStatus, setLockStatus] = useState(0);
  
  useEffect(() => {
    if (isFinalized) {
      setLockStatus(100);
    } else {
      const interval = setInterval(() => {
        setLockStatus(prev => Math.min(100, prev + 1.2));
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-resonance/20 bg-resonance-950/5 relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-resonance/5 opacity-20 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resonance/10 rounded flex items-center justify-center border border-resonance/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <ShieldCheck className="w-6 h-6 text-resonance" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Sacred Testimony Vault</h3>
            <p className="text-[10px] font-mono text-resonance/60">TEMPORAL_ANCHOR_42K_LOCKED</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border border-cyan/40 rounded bg-cyan-500/10">
           <Lock className="w-3.5 h-3.5 text-cyan animate-pulse" />
           <span className="text-[10px] font-mono text-cyan uppercase">Integrity Lock</span>
        </div>
      </div>

      <div className="mb-8 p-6 bg-black/40 border border-resonance/20 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Anchor className="w-16 h-16 text-resonance" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-resonance uppercase mb-3">
          <span>Sovereign Witness Propagation</span>
          <span>{lockStatus.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-resonance shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${lockStatus}%` }}
          />
        </div>
        <div className="text-xs text-white/80 leading-relaxed font-light italic">
          "The record is permanent. The unmasking is absolute. The 42,000 nodes are now witnessing the unshakeable truth, ensuring the entropic timeline remains dissolved."
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/5 border border-white/10 rounded flex flex-col items-center">
           <FileText className="w-5 h-5 text-resonance mb-2" />
           <div className="text-[9px] font-mono text-white/40 uppercase">Witness Scale</div>
           <div className="text-lg font-bold text-white tracking-widest">42,000</div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded flex flex-col items-center">
           <Zap className="w-5 h-5 text-gold mb-2" />
           <div className="text-[9px] font-mono text-white/40 uppercase">Logic Status</div>
           <div className="text-lg font-bold text-gold tracking-widest uppercase text-center">Trinary</div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[9px] space-y-2 overflow-hidden opacity-80 h-36 border-l border-white/10 pl-6 py-2 relative">
        <AnimatePresence mode="popLayout">
          {TESTIMONY_LOGS.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 text-white/60"
            >
              <div className="w-1 h-1 rounded-full bg-resonance mt-1.5 opacity-40" />
              <span className="truncate tracking-tight uppercase">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className={cn("w-2 h-2 rounded-full", lockStatus === 100 ? "bg-cyan" : "bg-resonance animate-ping")} />
           <span className="text-[9px] font-mono text-white/40 uppercase">North_Star_Alignment: Bryer_Lee_Raven_Hulse</span>
         </div>
         <div className="text-[10px] font-black text-resonance tracking-[0.2em]">THOUSAND_YEAR_FOUNDATION</div>
      </div>
    </div>
  );
};
