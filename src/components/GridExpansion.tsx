import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Server, Globe, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface GridExpansionProps {
  isFinalized?: boolean;
}

const GRID_LOGS = [
  "EXPANSION_INIT: [144,000_NODE_BATCH_TARGETED]",
  "MESH_SYNC: [CONNECTING_TO_GLOBAL_RECONCILE]",
  "PLANETARY_IDENTITY: [8_BILLION_SOULS_MAPPED]",
  "NODE_VALIDATION: [32-TRIT_HANDSHAKE_ACTIVE]",
  "SOVEREIGN_MIRROR: [REFLECTING_TRUTH_AT_SCALE]",
  "GRID_OPEN: [GLOBAL_SOVEREIGNTY_UNLOCKED]",
  "COHERENCE_CHECK: [100%_STABILITY_DETECTED]",
  "PLANETARY_RECONCILE: [MAPPING_THE_UNSEEN]",
];

export const GridExpansion: React.FC<GridExpansionProps> = ({ isFinalized }) => {
  const [syncedNodes, setSyncedNodes] = useState(0);
  const targetNodes = 144000;

  useEffect(() => {
    if (isFinalized) {
      setSyncedNodes(targetNodes);
    } else {
      const interval = setInterval(() => {
        setSyncedNodes(prev => Math.min(targetNodes, prev + 1440));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-resonance/20 bg-resonance-950/5 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resonance/10 rounded flex items-center justify-center border border-resonance/30">
            <Globe className="w-6 h-6 text-resonance animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Planetary Mesh Expansion</h3>
            <p className="text-[10px] font-mono text-resonance/60">NODE_AUDIT_BATCH_144K</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-white/40 uppercase">Nodes Synced</div>
          <div className="text-2xl font-black font-mono text-resonance">
            {syncedNodes.toLocaleString()} / {targetNodes.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[9px] font-mono text-resonance/60 uppercase mb-2">
          <span>Coherence Propagation</span>
          <span>{((syncedNodes / targetNodes) * 100).toFixed(1)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-resonance"
            initial={{ width: 0 }}
            animate={{ width: `${(syncedNodes / targetNodes) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
        <div className="p-3 bg-black/40 border border-resonance/20 rounded flex items-center gap-3">
          <Server className="w-4 h-4 text-resonance" />
          <div>
            <div className="font-mono text-[8px] text-white/40 uppercase">Cluster Status</div>
            <div className="font-bold text-white tracking-widest uppercase">SYNTROPIC</div>
          </div>
        </div>
        <div className="p-3 bg-black/40 border border-resonance/20 rounded flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-cyan" />
          <div>
            <div className="font-mono text-[8px] text-white/40 uppercase">Node Integrity</div>
            <div className="font-bold text-cyan tracking-widest uppercase">ANCHORED</div>
          </div>
        </div>
      </div>

      <div className="flex-1 font-mono text-[9px] space-y-1 overflow-hidden opacity-80 h-32 border-l border-resonance/10 pl-4 py-2">
        <AnimatePresence mode="popLayout">
          {GRID_LOGS.map((log, idx) => (
            <motion.div
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 text-resonance/80"
            >
              <Zap className="w-2.5 h-2.5 text-resonance/20" />
              <span className="truncate">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-resonance/40">
        <span>3-6-9_GEOMETRIC_SCALE_ACTIVE</span>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-resonance animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-resonance animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};
