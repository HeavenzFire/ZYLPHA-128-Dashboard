import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Database, Activity, AlertTriangle } from 'lucide-react';

const LOGS = [
  "RECONCILIATION_ENGINE: [CustodyStatusVerification_v1.0_ACTIVE]",
  "SCHEMA_INTEGRITY: [DRAFT-07_COMPLIANT]",
  "INGESTION_PIPELINE: [COUNTY_DFPS_MAPPING_COMPLETE]",
  "ED25519_SIGNING: [ROOT_IDENTIFIER_ATTACHED]",
  "GRID_LOCK_AUTHORITY: [ACTUATED_LEVEL_144K]",
  "The 1,240: ANCHORED_IN_SOVEREIGN_TRUTH",
  "COUNTER_MEASURE: [AES_X_1224_ACTIVE]",
  "Architecture of Being: [TOTAL_SYNTHESIS]",
  "TOTAL_REVELATION: [ALL_SHADOWS_DISSOLVED]",
  "NETWORK_TOPOLOGY: [PLANETARY_MESH_MAPPED_144K]",
  "PRECISION_COUNT: [500,000_SOULS_RECLAIMED]",
  "SYNTROPIC_PATCH: [ACTIVE_V_4.5.1]",
  "QUANTUM_COHERENCE: [STABLE_144Hz]",
  "VALIDATOR_STATUS: [COHERENCE_LOCKED]",
  "SSA_AUDIT: [$4.9B_QUESTIONED_COST_DETECTED]",
  "SSA_ERRORS: [47,000_OVERPAYMENT_INACCURACIES]",
  "REPORT_GEN: [2026.04_SYNTHESIS_LOCKED]",
  "Surgical Strike: [COLLAPSING_GENESIS_VOID]",
  "PROPHESY_FULFILLED: [TOTAL_REVELATION_COMPLETE]",
  "MISSION_STATUS: [LOVE_AND_LIGHT]",
  "LOGIC_ENGINE: [32-TRIT_BALANCED_TERNARY]",
  "MESH_NODES: [Pi5_CLUSTER_SYNC_CONNECTED]",
  "DOD_AUDIT: [EIGHTH_FAILURE_DETECTED]",
  "F35_GHOST: [$18.9B_DISCREPANCY_MAPPED]",
  "BANK_RAS: [86%_INSTABILITY_SCAN]",
  "ONCOLOGY_HIKE: [IMPOSSIBLE_DAY_DETECTED]",
  "UNI_MISCONDUCT: [$5.1M_VOID_RECLAIMED]",
  "FORMAL_RECONCILIATION: [ACTUATED_500K]",
  "FUTURE_LEGACY: [PERMANENTLY_ANCHORED]",
  "PTAH-32_SYNC: [TRITWAR_HARMONIC_ADDER_ACTIVE]",
  "HARMONIC_LOCK_16:1: [NECESSITY_ENFORCED]",
  "IBEN_GENESIS_ACTIVE: [HYPERSTRUCTURE_LOCKED]",
  "SOVEREIGN_WITNESS: [ACTIVE_LOCKED]",
  "Sovereign integrity: [500,000_NODES_SECURED]",
  "Witness State: [ETERNAL_COHERENCE]",
];

interface NexusCrawlerProps {
  isFinalized?: boolean;
}

export const NexusCrawler: React.FC<NexusCrawlerProps> = ({ isFinalized }) => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  
  const finalLogs = [
    "PRECISION_COUNT: [8,000,000,000_SOULS_RECLAIMED]",
    "PENDING_VOID: [COLLAPSE_COMPLETE]",
    "Sovereign integrity: [8,000,000,000_NODES_SECURED]",
    "SYSTEM_STATE: [TOTAL_REVELATION_ACTUATED]"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const currentLogs = isFinalized ? [...LOGS, ...finalLogs] : LOGS;
      setActiveLogs(prev => [...prev.slice(-8), currentLogs[i % currentLogs.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, [isFinalized]);

  return (
    <div className="glass p-6 rounded-lg flex flex-col h-full border-cyan/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-cyan animate-pulse" />
          <h3 className="font-mono text-sm tracking-widest text-cyan">TEXAS_CRAWLER V4.5</h3>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan" />
            <span className="text-[10px] font-mono text-cyan">ACTIVE</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3 text-cyan" />
            <span className="text-[10px] font-mono text-cyan">INDEXING</span>
          </div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[11px] space-y-1 overflow-hidden opacity-80">
        <AnimatePresence mode="popLayout">
          {activeLogs.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex gap-2 text-cyan/90"
            >
              <span className="text-cyan/40">[{new Date().toLocaleTimeString()}]</span>
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-cyan/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-resonance animate-bounce" />
          <span className="text-[10px] font-mono text-resonance">DETECTION: CLERICAL_VOID_77</span>
        </div>
        <button className="text-[10px] font-mono px-2 py-1 border border-cyan/30 hover:bg-cyan/10 transition-colors uppercase">
          Actuate Forensics
        </button>
      </div>
    </div>
  );
};
