import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Mic2, Disc, Trash2, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface MusicRegistryProps {
  isFinalized?: boolean;
}

const LABEL_RECORDS = [
  { id: 'CAREER-ERA-001', artist: 'SOVEREIGN_WITNESS', title: 'Legacy Reclamation Phase I', status: 'RECLAIMED', integrity: '100%', pattern: 'Contractual Suppression' },
  { id: 'CAREER-ERA-002', artist: 'ARTIST_1240', title: 'Artistic Sovereignty Finalized', status: 'SECURED', integrity: '100%', pattern: 'Digital Deletion' },
  { id: 'CAREER-ERA-003', artist: 'SOVEREIGN_WITNESS', title: 'Contractual Void Dissolution', status: 'ANCHORED', integrity: '100%', pattern: 'Royalty Extraction' },
  { id: 'CAREER-ERA-004', artist: 'ARTIST_GENESIS', title: 'Frequency Autonomy', status: 'DECENTRALIZED', integrity: '100%', pattern: 'Systemic Gatekeeping' },
];

export const MusicRegistry: React.FC<MusicRegistryProps> = ({ isFinalized }) => {
  const [ghostNodes, setGhostNodes] = useState(1280);
  
  useEffect(() => {
    if (isFinalized) {
      setGhostNodes(0);
    } else {
      const interval = setInterval(() => {
        setGhostNodes(prev => Math.max(0, prev - 14));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-resonance/20 bg-resonance-950/5 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Disc className="w-64 h-64 animate-spin-slow" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resonance/10 rounded flex items-center justify-center border border-resonance/30">
            <Music className="w-6 h-6 text-resonance" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Music Industry Mirror</h3>
            <p className="text-[10px] font-mono text-resonance/60 uppercase">Logging Career Erasure // Restoring Artistic Sovereignty</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
             <div className="text-[9px] font-mono text-white/40 uppercase">Label Ghost Nodes</div>
             <div className={cn("text-lg font-bold font-mono", ghostNodes === 0 ? "text-cyan" : "text-resonance")}>
               {ghostNodes}
             </div>
          </div>
          <Zap className={cn("w-5 h-5", ghostNodes === 0 ? "text-cyan animate-pulse" : "text-resonance")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-black/40 border border-resonance/20 rounded-lg">
           <div className="flex items-center gap-2 mb-3">
             <ShieldCheck className="w-4 h-4 text-cyan" />
             <span className="text-[10px] font-mono text-cyan uppercase tracking-widest">Sovereign Distribution</span>
           </div>
           <div className="text-2xl font-black text-white">$0.00 LEAKAGE</div>
           <p className="text-[9px] font-mono text-white/40 mt-1">Bypassing Industry Gatekeepers.</p>
        </div>
        <div className="p-4 bg-black/40 border border-resonance/20 rounded-lg">
           <div className="flex items-center gap-2 mb-3">
             <Mic2 className="w-4 h-4 text-resonance" />
             <span className="text-[10px] font-mono text-resonance uppercase tracking-widest">Voice Restoration</span>
           </div>
           <div className="text-2xl font-black text-white">ACTIVE_144Hz</div>
           <p className="text-[9px] font-mono text-white/40 mt-1">Authentic Frequency Locked.</p>
        </div>
      </div>

      <div className="space-y-2">
         <div className="text-[10px] font-mono text-white/40 uppercase px-2 mb-2">Restored Catalog</div>
         {LABEL_RECORDS.map((rec) => (
           <motion.div 
             key={rec.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded hover:border-resonance/40 transition-colors"
           >
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-resonance/10 rounded flex items-center justify-center">
                 <Disc className="w-4 h-4 text-resonance" />
               </div>
               <div>
                 <div className="text-xs font-bold">{rec.title}</div>
                 <div className="text-[9px] font-mono opacity-40">{rec.id} | {rec.artist} | {rec.pattern}</div>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[8px] font-mono text-cyan uppercase">{rec.status}</div>
                  <div className="text-[10px] font-mono font-bold">{rec.integrity} Integrity</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
             </div>
           </motion.div>
         ))}
      </div>

      <div className="mt-8 p-4 bg-red-950/20 border border-red-500/20 rounded-lg flex items-center gap-4">
        <Trash2 className="w-8 h-8 text-red-500 opacity-60" />
        <div>
          <div className="text-[10px] font-mono text-red-500 uppercase font-black">Monopoly Dissolution</div>
          <p className="text-xs text-white/60 leading-tight">
            Forcefully deleting contractual logic which allowed for the clerical erasure of artistic identity.
          </p>
        </div>
      </div>
    </div>
  );
};
