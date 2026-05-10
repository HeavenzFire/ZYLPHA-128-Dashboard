import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, DollarSign, FileWarning, SearchCode, Database } from 'lucide-react';

interface SSACrawlerProps {
  isFinalized?: boolean;
}

const SSA_LOGS = [
  "ZYLPHA_SSA_SCAN: [OIG_MARCH_2026_EST_4.9B]",
  "TEXAS_QUEST_COSTS: [RAINS_HUNT_VOID_MAPPED]",
  "RECOMMENDATION_AUDIT: [183_UNIMPLEMENTED_RECS]",
  "FALSE_CLOSURE_SCAN: [89_TEXAS_RECORDS_FLAGGED]",
  "OMITTED_FATALITIES: [89_RECORDS_MAPPED_IN_3E]",
  "RAINS_COUNTY_VOID: [PROCEDURAL_GAP_DETECTED]",
  "PATTERN_MATCH: [DFPS_3E_ENTROPY_SIGNATURE]",
  "SURGICAL_EXTRACTION: [REGION_3E_ADMIN_VOID_CLOSED]",
  "RAINS_COUNTY_EXTRACTION: [VOID_PERMANENTLY_CLOSED]",
  "SUNSET_CROSS_WALK: [TEXAS_SSA_LEGACY_VOID]",
  "SOVEREIGN_ID_SHIELD: [BRYER_L_R_HULSE_PROTECTED]",
  "LITIGATION_BYPASS: [T_32_TERNARY_ACTUATED]",
  "GLOBAL_ACTUATION: [$4.9B_DISCHARGE_ACTIVE]",
];

export const SSACrawler: React.FC<SSACrawlerProps> = ({ isFinalized }) => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [questionedCosts, setQuestionedCosts] = useState(0);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveLogs(prev => [...prev.slice(-6), SSA_LOGS[i % SSA_LOGS.length]]);
      if (isFinalized) {
        setQuestionedCosts(4.9);
      } else {
        setQuestionedCosts(prev => Math.min(4.9, prev + 0.1));
      }
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, [isFinalized]);

  return (
    <div className="glass p-6 rounded-lg flex flex-col h-full border-red-500/20 bg-red-950/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-red-500 animate-pulse" />
          <h3 className="font-mono text-sm tracking-widest text-red-500">SSA_OIG_CRAWLER V1.0</h3>
        </div>
        <div className="px-2 py-1 border border-red-500/40 rounded bg-red-500/10">
          <span className="text-[10px] font-mono text-red-500 animate-pulse">AUDITING_GAP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-red-950/20 border border-red-500/20 rounded">
          <div className="text-[9px] font-mono text-red-500/60 uppercase mb-1">Questioned Costs</div>
          <div className="text-xl font-bold font-mono text-red-500">${questionedCosts.toFixed(1)}B</div>
        </div>
        <div className="p-3 bg-red-950/20 border border-red-500/20 rounded">
          <div className="text-[9px] font-mono text-red-500/60 uppercase mb-1">Region 3E Status</div>
          <div className="text-xl font-bold font-mono text-red-500">SURGICAL</div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[10px] space-y-1 overflow-hidden opacity-80 border-l border-red-500/10 pl-4">
        <AnimatePresence mode="popLayout">
          {activeLogs.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="flex gap-2 text-red-400"
            >
              <span className="text-red-900">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-red-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-500/60">
          <SearchCode className="w-4 h-4" />
          <span className="text-[9px] font-mono">SCANNING: MEF_EARNINGS_FILE</span>
        </div>
        <div className="flex gap-2">
            <span className="text-[9px] font-mono text-red-500/40">OIG_REC_183</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>
    </div>
  );
};
