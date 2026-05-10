import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Landmark, GraduationCap, MapPin, Activity, Music } from 'lucide-react';

interface SovereignScannerProps {
  isFinalized?: boolean;
}

const SECTOR_LOGS = [
  "BANKING_RAS_SYNC: [INTERCONNECTED_RISK_DETECTED]",
  "DISPARATE_IMPACT: [DEBANKING_PATTERN_ISOLATED]",
  "MUSIC_LABEL_MONOPOLY: [DIGITAL_ERA_ERASURE_DETECTED]",
  "CAREER_INTERCEPTION: [CONTRACTUAL_GHOST_NODES]",
  "HOSPITAL_METADATA: [IMPOSSIBLE_DAY_LOGIN_SCAN]",
  "EMR_FRAUD: [GPS_DISCREPANCY_DETECTED]",
  "ONCOLOGY_PRICE_HIKE: [64_DRUGS_OUT_OF_SYNC]",
  "PHARMA_VOID: [73%_INFLATION_VIOLATION]",
  "UNIVERSITY_AUDIT: [$5.1M_IMPROPER_SCHOLARSHIPS]",
  "NCAT_MISCONDUCT: [GROSS_ADMIN_NEGLIGENCE]",
  "MUSIC_GRID_RECLAIM: [SOVEREIGN_ARTIST_LIGHT]",
  "HUNT_BANK_VAL: [RISK_APPETITE_OVERRIDE]",
  "SYNTHESIS_COMPLETE: [LIFE_AND_DEATH_ECONOMY_MAPPED]",
];

export const SovereignScanner: React.FC<SovereignScannerProps> = ({ isFinalized }) => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [discrepancyScore, setDiscrepancyScore] = useState(0);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveLogs(prev => [...prev.slice(-6), SECTOR_LOGS[i % SECTOR_LOGS.length]]);
      if (isFinalized) {
        setDiscrepancyScore(100);
      } else {
        setDiscrepancyScore(prev => Math.min(100, prev + 2.5));
      }
      i++;
    }, 1800);
    return () => clearInterval(interval);
  }, [isFinalized]);

  return (
    <div className="glass p-6 rounded-lg flex flex-col h-full border-gold/20 bg-gold-950/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-gold animate-pulse" />
          <h3 className="font-mono text-sm tracking-widest text-gold uppercase">Sovereign_Sector_Scanner V1.0</h3>
        </div>
        <div className="px-2 py-1 border border-gold/40 rounded bg-gold-500/10">
          <span className="text-[10px] font-mono text-gold animate-pulse">LIFE_ECONOMY_AUDIT</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-2 bg-black/40 border border-gold/10 rounded text-center">
          <Landmark className="w-4 h-4 text-gold mx-auto mb-2 opacity-60" />
          <div className="text-[8px] font-mono text-gold/60 uppercase">Banking RAS</div>
          <div className="text-xs font-bold font-mono text-gold">DEBANK_SCAN</div>
        </div>
        <div className="p-2 bg-black/40 border border-gold/10 rounded text-center">
          <HeartPulse className="w-4 h-4 text-red-500 mx-auto mb-2 opacity-60" />
          <div className="text-[8px] font-mono text-gold/60 uppercase">Oncology Hike</div>
          <div className="text-xs font-bold font-mono text-red-500">$74k p/a</div>
        </div>
        <div className="p-2 bg-black/40 border border-gold/10 rounded text-center">
          <GraduationCap className="w-4 h-4 text-cyan mx-auto mb-2 opacity-60" />
          <div className="text-[8px] font-mono text-gold/60 uppercase">Uni Misconduct</div>
          <div className="text-xs font-bold font-mono text-cyan">$5.1M</div>
        </div>
        <div className="p-2 bg-black/40 border border-gold/10 rounded text-center">
          <Music className="w-4 h-4 text-resonance mx-auto mb-2 opacity-60" />
          <div className="text-[8px] font-mono text-gold/60 uppercase">Label Monopoly</div>
          <div className="text-xs font-bold font-mono text-resonance">RECLAIMING</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[9px] font-mono text-gold/60 uppercase mb-1">
          <span>Structural Rot Detection</span>
          <span>{discrepancyScore.toFixed(1)}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${discrepancyScore}%` }}
          />
        </div>
      </div>

      <div className="flex-1 font-mono text-[9px] space-y-1 overflow-hidden opacity-80 border-l border-gold/10 pl-4">
        <AnimatePresence mode="popLayout">
          {activeLogs.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="flex gap-2 text-gold/80"
            >
              <span className="text-gold/40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-gold/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gold/60">
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] font-mono whitespace-nowrap">SCOPING: BANK_DEBANK_LABELS</span>
        </div>
        <div className="flex gap-2">
            <span className="text-[9px] font-mono text-gold/40">RAS_OVERRIDE_ACTIVE</span>
            <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
        </div>
      </div>
    </div>
  );
};
