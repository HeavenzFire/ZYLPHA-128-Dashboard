import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Radio, Database, Shield, Server, Box, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

interface SovereignCoreProps {
  isFinalized?: boolean;
}

export const SovereignCore: React.FC<SovereignCoreProps> = ({ isFinalized }) => {
  return (
    <div className="space-y-8 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-resonance/20 border border-resonance/40 rounded-xl flex items-center justify-center glow-resonance">
            <Cpu className="w-7 h-7 text-resonance" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Sovereign Computational Core</h2>
            <p className="text-xs font-mono text-white/40">IBEN-GENESIS_HYPERSTRUCTURE // RPI5_CLUSTER_V4.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-resonance/40 bg-resonance/10 rounded-full">
           <Radio className="w-4 h-4 text-resonance animate-pulse" />
           <span className="text-[10px] font-mono text-resonance uppercase font-black">144Hz Timing Lattice: LOCKED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balanced Ternary Engine Card */}
        <div className="lg:col-span-2 glass p-8 rounded-xl border-resonance/30 bg-resonance-950/10 relative overflow-hidden">
           <div className="flex items-center gap-4 mb-6">
             <Box className="w-6 h-6 text-resonance" />
             <h3 className="font-bold text-lg uppercase tracking-tight">Ptah-32 Balanced Ternary Engine</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Logic Architecture</div>
                    <div className="text-xl font-black text-white">32-Trit Native ALU</div>
                    <div className="text-[9px] font-mono text-resonance mt-1">Balanced Ternary (-1, 0, 1)</div>
                 </div>
                 
                 <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Cluster Hardware</div>
                    <div className="text-xl font-black text-white">RPI5 x 12 (Sovereign Node)</div>
                    <div className="text-[9px] font-mono text-cyan mt-1">Local Edge Orchestration</div>
                 </div>
                 
                 <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-2">State Resolution</div>
                    <div className="text-xl font-black text-white">O(T) Constant Time</div>
                    <div className="text-[9px] font-mono text-gold mt-1">Non-Binary Collisions: NULLIFIED</div>
                 </div>
              </div>

              <div className="relative flex items-center justify-center min-h-[250px]">
                 {/* Visualizer for Ternary Logic */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Layers className="w-48 h-48 text-resonance animate-slow-spin" />
                 </div>
                 <div className="z-10 grid grid-cols-3 gap-4">
                    {[-1, 0, 1].map(v => (
                       <div key={v} className="flex flex-col items-center gap-2">
                          <div className={cn(
                            "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-black text-lg",
                            v === 1 ? "border-cyan text-cyan bg-cyan/10" :
                            v === -1 ? "border-red-500 text-red-500 bg-red-500/10" :
                            "border-white/20 text-white/40 bg-white/5"
                          )}>
                             {v === 1 ? '+' : v === -1 ? '-' : '0'}
                          </div>
                          <span className="text-[8px] font-mono uppercase opacity-40">
                             {v === 1 ? 'SYNTROPIC' : v === -1 ? 'ENTROPIC' : 'NEUTRAL'}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="mt-8 p-4 bg-resonance-500/5 border border-resonance/20 rounded-lg">
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                 The IBEN-Genesis hyperstructure operates beyond Boolean limitations. By utilizing balanced ternary logic, the engine resolves systemic discrepancies at the scalar level. This is the foundation of the 144Hz timing lattice, anchoring the planetary witness sync into a physical, local hardware cluster.
              </p>
           </div>
        </div>

        {/* System Vitals & Identity Reclaim */}
        <div className="space-y-8">
           <div className="glass p-6 rounded-xl border-white/10 bg-black/40">
              <h4 className="text-xs font-black uppercase mb-4 text-white/60 flex items-center gap-2">
                 <Shield className="w-3.5 h-3.5" /> Identity Reclamation Status
              </h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase">Identity_Anchor: HEAVENZFIRE</span>
                    <span className="text-[10px] font-mono text-cyan">VERIFIED</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase">Identity_Project: OFATHER</span>
                    <span className="text-[10px] font-mono text-gold">INITIALIZED</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase">Label_Ghost_Nodes</span>
                    <span className="text-[10px] font-mono text-red-500">RECLAIMED</span>
                 </div>
              </div>
           </div>

           <div className="glass p-6 rounded-xl border-white/10 bg-black/40">
              <h4 className="text-xs font-black uppercase mb-4 text-white/60 flex items-center gap-2">
                 <Server className="w-3.5 h-3.5" /> Forensic Node Clusters
              </h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                    <div className="text-[10px] font-mono opacity-40">NODE_TX_01</div>
                    <div className="text-xs font-bold text-resonance">ONLINE</div>
                 </div>
                 <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                    <div className="text-[10px] font-mono opacity-40">NODE_PI_05</div>
                    <div className="text-xs font-bold text-resonance">ONLINE</div>
                 </div>
                 <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                    <div className="text-[10px] font-mono opacity-40">GRID_RES_8B</div>
                    <div className="text-xs font-bold text-cyan">LOCKED</div>
                 </div>
                 <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                    <div className="text-[10px] font-mono opacity-40">TER_SYNC_32</div>
                    <div className="text-xs font-bold text-gold">STABLE</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-cyan-950/20 border border-cyan/20 rounded-xl flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Zap className="w-5 h-5 text-cyan animate-pulse" />
            <div className="font-mono text-[10px] text-white/80 uppercase">
              Momentum Directing Phase Shift: <span className="text-cyan font-bold">GLOBAL ACTUATION INITIATED // 42,000 NODE WITNESS SYNC COMPLETE</span>
            </div>
         </div>
         <div className="text-[10px] font-mono text-white/20 whitespace-nowrap">
            v1.0.42_STABLE_SOVEREIGN
         </div>
      </div>
    </div>
  );
};
