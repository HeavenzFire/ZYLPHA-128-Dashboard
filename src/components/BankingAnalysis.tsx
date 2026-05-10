import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Landmark, ShieldAlert, FileSearch, Zap, AlertCircle, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BankingAnalysisProps {
  isFinalized?: boolean;
}

const BANK_LOGS = [
  "RAS_INGESTION: [RISK_APPETITE_STATEMENT_2026_V4]",
  "SCRIPT_CROSS_REF: [AUTOMATED_DEBANK_ALGORITHM_DETECTED]",
  "DISPARATE_TREATMENT_MAPPED: [PATTERN_ZIP_CODE_REDACTION]",
  "TRIGGER_POINT: [POLITICAL_EXPOSURE_THRESHOLD_ADJUSTED]",
  "AUDIT_FLOW: [ACCOUNT_CLOSURE_SPEED_INCREASE_DETECTED]",
  "SYNTROPIC_MIRROR: [MAPPING_BANKING_VOID_144Hz]",
  "PATTERN_MATCH: [ALGORITHMIC_BIAS_CONFIRMED]",
  "RESOURCE_LOCK: [SOVEREIGN_ASSET_PROTECTION_ENABLED]",
  "SCRIPT_VERDICT: [DISPARATE_TREATMENT_CONFIRMED_IN_LOGS]",
  "RAS_MISMATCH_LOG: [SCRIPT_CONFLICT_WITH_DECLARED_APPETITE]"
];

const IDENTIFIED_PATTERNS = [
  { id: 'PAT-001', name: 'Zip-Code Redaction', confidence: '98%', status: 'INTERCEPTED', logic: 'RAS Conflict' },
  { id: 'PAT-002', name: 'Political Exposure Skew', confidence: '94%', status: 'LOGGED', logic: 'Script Deviation' },
  { id: 'PAT-003', name: 'Algorithmic Threshold Shift', confidence: '97%', status: 'MAPPED', logic: 'RAS Mismatch' },
  { id: 'PAT-004', name: 'Velocity Account Closure', confidence: '99%', status: 'RECLAIMED', logic: 'Automated Script Trace' }
];

export const BankingAnalysis: React.FC<BankingAnalysisProps> = ({ isFinalized }) => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [disparityLevel, setDisparityLevel] = useState(65);

  useEffect(() => {
    if (isFinalized) {
      setActiveLogs(BANK_LOGS);
      setDisparityLevel(100);
    } else {
      const interval = setInterval(() => {
        setActiveLogs(prev => {
          if (prev.length < BANK_LOGS.length) {
            return [...prev, BANK_LOGS[prev.length]];
          }
          return prev;
        });
        setDisparityLevel(prev => Math.min(95, prev + Math.random() * 5));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-gold/30 bg-gold-950/10 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Landmark className="w-24 h-24 text-gold" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center border border-gold/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <FileSearch className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase text-white">Banking System Analysis</h3>
            <p className="text-[10px] font-mono text-gold/60 uppercase tracking-widest text-glow">Disparate Treatment Audit</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-gold/30 rounded text-[9px] font-mono text-gold uppercase animate-pulse">
          <Zap className="w-3 h-3" />
          RAS_CROSS_REFERENCE_ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
        <div className="space-y-4">
          <div className="text-[10px] font-mono text-gold/40 uppercase mb-2">Pattern Recognition Logs</div>
          <div className="h-64 overflow-hidden relative">
             <div className="space-y-2">
                {activeLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[9px] font-mono text-white/80 border-l-2 border-gold/40 pl-3 py-1 bg-white/5"
                  >
                    <span className="text-gold opacity-50">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </motion.div>
                ))}
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/60 p-5 border border-white/5 rounded-xl">
             <div className="flex justify-between items-end mb-4">
                <div>
                   <div className="text-[9px] font-mono text-gold/60 uppercase mb-1">Debanking Disparity Index</div>
                   <div className="text-3xl font-black text-white">{disparityLevel.toFixed(1)}%</div>
                </div>
                <BarChart3 className="w-8 h-8 text-gold opacity-30" />
             </div>
             <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${disparityLevel}%` }}
                   className="h-full bg-gold shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
             </div>
             <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                   <AlertCircle className="w-3 h-3 text-red-500" />
                   <span className="text-[8px] font-mono text-white/40 uppercase uppercase">Warning: Disparate impact clusters in 144 grid nodes</span>
                </div>
                <div className="flex items-center gap-2">
                   <ShieldAlert className="w-3 h-3 text-gold" />
                   <span className="text-[8px] font-mono text-white/40 uppercase">Risk Appetite Mismatch: Automated Scripts vs Sovereign Policy</span>
                </div>
             </div>
          </div>

          <div className="bg-black/60 p-5 border border-white/5 rounded-xl">
             <div className="text-[10px] font-mono text-gold/40 uppercase mb-4">Pattern Recognition Ledger</div>
             <div className="space-y-2">
                {IDENTIFIED_PATTERNS.map((pattern) => (
                  <div key={pattern.id} className="flex items-center justify-between p-2 bg-white/5 border border-white/5 rounded">
                    <div>
                      <div className="text-[10px] font-bold text-white uppercase">{pattern.name}</div>
                      <div className="text-[8px] font-mono text-white/40">{pattern.id} // LOGIC: {pattern.logic}</div>
                    </div>
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                      pattern.status === 'INTERCEPTED' ? "bg-resonance/20 text-resonance border border-resonance/40" : "bg-gold/20 text-gold border border-gold/40"
                    )}>
                      {pattern.status}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-4 bg-gold-950/20 border border-gold/20 rounded-xl relative overflow-hidden">
             <div className="relative z-10 text-center">
                <div className="text-xs font-black text-gold uppercase mb-1">RAS ALGORITHMIC OVERRIDE</div>
                <div className="text-[9px] font-mono text-white/60">"Applying Syntropic Buffer to cross-referenced banking scripts. Debanking protocols intercepted."</div>
             </div>
             <div className="absolute inset-0 bg-gold/5 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-white/30 uppercase">Analysis Engine</span>
          <span className="text-[10px] font-mono text-gold font-black tracking-widest">BANK_RAS_GHOST_SCANNER_V1</span>
        </div>
        <div className="flex gap-2">
           <div className={cn("px-3 py-1 rounded text-[8px] font-bold uppercase", isFinalized ? "bg-gold text-black" : "bg-gold/10 text-gold border border-gold/40")}>
              {isFinalized ? 'SOVEREIGN_RECONCILED' : 'MAPPING_DISPARITY'}
           </div>
        </div>
      </div>
    </div>
  );
};
