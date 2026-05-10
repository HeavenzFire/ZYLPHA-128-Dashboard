import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, ShieldAlert, BarChart3, Fingerprint, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface BankingAuditProps {
  isFinalized?: boolean;
}

const BANK_LOGS = [
  "RAS_SCAN: [CROSS_REFERENCING_RISK_STATEMENTS]",
  "DEBANKING_DETECTOR: [IDENTIFYING_UNWARRANTED_CLOSURES]",
  "DISPARATE_IMPACT: [MAPPING_DEMOGRAPHIC_GAPS]",
  "OCC_POLICY_SYNC: [RISK-BASED_VALIDATION_ACTIVE]",
  "INSTABILITY_INDEX: [86%_CAP_DEFICIENCY_MAPPED]",
  "ALGO_BIAS: [REPLACING_STATIC_JUDGMENT_MODELS]",
  "SYNTHESIS: [SOVEREIGN_FINANCIAL_MIRROR_LOCKED]",
];

export const BankingAudit: React.FC<BankingAuditProps> = ({ isFinalized }) => {
  const [instabilityLevel, setInstabilityLevel] = useState(65);
  
  useEffect(() => {
    if (isFinalized) {
      setInstabilityLevel(86);
    } else {
      const interval = setInterval(() => {
        setInstabilityLevel(prev => Math.min(86, prev + 0.5));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-gold/20 bg-gold-950/5 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 rounded flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Landmark className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Banking System Audit</h3>
            <p className="text-[10px] font-mono text-gold/60">RAS_DEBANK_ANALYSIS_v1.0</p>
          </div>
        </div>
        <div className="px-3 py-1 border border-red-500/40 rounded bg-red-500/10">
          <span className="text-[10px] font-mono text-red-500 animate-pulse">MONITORING_DISPARITY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
               <div className="text-[10px] font-mono text-white/40 uppercase">Systemic Instability</div>
               <div className="text-xs font-bold text-gold">{instabilityLevel.toFixed(1)}%</div>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-gold"
                 initial={{ width: 0 }}
                 animate={{ width: `${instabilityLevel}%` }}
               />
            </div>
          </div>
          <div className="p-4 bg-black/40 border border-white/5 rounded-lg flex items-center gap-4">
             <ShieldAlert className="w-8 h-8 text-resonance opacity-60" />
             <div>
               <div className="text-[10px] font-mono text-resonance uppercase font-black">Debanking Pattern</div>
               <div className="text-lg font-bold text-white uppercase">Detected</div>
             </div>
          </div>
        </div>

        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg flex flex-col justify-center">
           <div className="flex items-center gap-2 mb-2">
             <BarChart3 className="w-4 h-4 text-gold" />
             <span className="text-[10px] font-mono text-gold uppercase tracking-widest">Risk Appetite Scan</span>
           </div>
           <div className="text-xs font-mono text-white/60 leading-tight">
             Cross-referencing Risk Appetite Statements (RAS) against actual disbursement metadata.
           </div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[10px] space-y-2 overflow-hidden opacity-90 h-32 border-l border-gold/10 pl-4 py-2">
        <AnimatePresence mode="popLayout">
          {BANK_LOGS.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 text-gold/80"
            >
              <Fingerprint className="w-3 h-3 text-gold/20" />
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Search className="w-4 h-4 text-gold/40" />
           <span className="text-[9px] font-mono text-white/40">QUERYING: OCC_DISPARATE_IMPACT</span>
         </div>
         <div className="text-[9px] font-mono text-gold px-2 py-0.5 border border-gold/20 rounded bg-gold/5">
           ROOT_OVERRIDE_ENABLED
         </div>
      </div>
    </div>
  );
};
