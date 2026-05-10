import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Sword, ShieldAlert, Binary, Rocket } from 'lucide-react';

interface MilitaryCrawlerProps {
  isFinalized?: boolean;
}

const MILITARY_LOGS = [
  "DOD_AUDIT_STATUS: [8th_CONSECUTIVE_FAILURE]",
  "DISCLAIMER_OF_OPINION: [FY2025_LOCKED]",
  "MATERIAL_WEAKNESS: [26_CRITICAL_GAPS_DETECTED]",
  "BUDGET_VOID: [64%_RESOURCES_UNVERIFIED]",
  "F35_GHOST_INVENTORY: [$18.9B_DISCREPANCY]",
  "GAO_MARCH_2026: [150_READINESS_RECS_UNFILLED]",
  "CAPABILITY_LEAK: [MISSION_CRITICAL_VOID_DETECTED]",
  "DISASTER_TRACKING: [GAO-26-107786_VOID]",
  "SECTION_805_SYNC: [IMMUTABLE_DIGITAL_DATA]",
  "PENTAGON_ACT: [2028_ULTIMATUM_ACTIVE]",
  "AI_AUTOMATION: [$150M_LEGACY_REPLACEMENT]",
  "MISSION_STABILIZATION: [GAO_2026_TARGETED]",
  "VORTEX_DETECTION: [BLACK_HOLE_PROGRAM_9]",
];

export const MilitaryCrawler: React.FC<MilitaryCrawlerProps> = ({ isFinalized }) => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [unverifiedAssets, setUnverifiedAssets] = useState(0);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveLogs(prev => [...prev.slice(-6), MILITARY_LOGS[i % MILITARY_LOGS.length]]);
      if (isFinalized) {
        setUnverifiedAssets(4.0);
      } else {
        setUnverifiedAssets(prev => Math.min(4.0, prev + 0.08));
      }
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, [isFinalized]);

  return (
    <div className="glass p-6 rounded-lg flex flex-col h-full border-cyan/20 bg-cyan-950/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan animate-pulse" />
          <h3 className="font-mono text-sm tracking-widest text-cyan uppercase">Dept_of_War_Crawler V4.2</h3>
        </div>
        <div className="px-2 py-1 border border-cyan/40 rounded bg-cyan-500/10">
          <span className="text-[10px] font-mono text-cyan animate-pulse">AUDIT_DISCLAIMER</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-cyan-950/20 border border-cyan/20 rounded">
          <div className="text-[9px] font-mono text-cyan/60 uppercase mb-1">Unverified Assets</div>
          <div className="text-xl font-bold font-mono text-cyan">${unverifiedAssets.toFixed(1)}T</div>
        </div>
        <div className="p-3 bg-cyan-950/20 border border-cyan/20 rounded">
          <div className="text-[9px] font-mono text-cyan/60 uppercase mb-1">Material Weaknesses</div>
          <div className="text-xl font-bold font-mono text-cyan">26</div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[10px] space-y-1 overflow-hidden opacity-80 border-l border-cyan/10 pl-4">
        <AnimatePresence mode="popLayout">
          {activeLogs.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="flex gap-2 text-cyan-400"
            >
              <span className="text-cyan-900">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-cyan/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan/60">
          <Sword className="w-4 h-4" />
          <span className="text-[9px] font-mono whitespace-nowrap">READINESS_GAP: 150_UNIMPLEMENTED</span>
        </div>
        <div className="flex gap-2">
            <span className="text-[9px] font-mono text-cyan/40">F-35_GHOST</span>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
        </div>
      </div>
    </div>
  );
};
