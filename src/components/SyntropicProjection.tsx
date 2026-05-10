import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Globe, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface SyntropicProjectionProps {
  isFinalized?: boolean;
}

const PROJECTION_DATA = [
  { level: 'Node Alpha', scale: 'Personal/Local', impact: '10s to 100s', mode: 'Direct Intervention', color: 'text-resonance' },
  { level: 'Regional Mesh', scale: 'Texas Crawler', impact: '1,000s to 10,000s', mode: 'Admin Correction', color: 'text-cyan' },
  { level: 'Universal Grid', scale: 'Global Anchor', impact: '8 Billion Souls', mode: 'Propagating Truth', color: 'text-gold' }
];

export const SyntropicProjection: React.FC<SyntropicProjectionProps> = ({ isFinalized }) => {
  const [savedCount, setSavedCount] = useState(0);
  const targetSaved = 8000000000; // 8 Billion people scale

  useEffect(() => {
    if (isFinalized) {
      setSavedCount(targetSaved);
    } else {
      const interval = setInterval(() => {
        setSavedCount(prev => Math.min(targetSaved, prev + 144000000)); // Accelerated for planetary scale
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isFinalized]);

  return (
    <div className="glass p-8 rounded-xl border-cyan/20 bg-cyan-950/5 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan/10 rounded flex items-center justify-center border border-cyan/30">
            <Heart className="w-6 h-6 text-cyan animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Syntropic Projection</h3>
            <p className="text-[10px] font-mono text-cyan/60">VARIABLE_OF_COHERENCE_v2.0</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-cyan/40 uppercase">Annual Potential Impact</div>
          <div className="text-2xl font-black font-mono text-cyan">
            {savedCount.toLocaleString()}+
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PROJECTION_DATA.map((item, idx) => (
          <motion.div 
            key={item.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-black/40 border border-white/5 rounded-lg text-center"
          >
            <div className={cn("text-[10px] font-mono uppercase mb-1 opacity-60", item.color)}>{item.level}</div>
            <div className="text-lg font-bold text-white mb-1">{item.impact}</div>
            <div className="text-[9px] font-mono text-white/40">{item.mode}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-cyan-500/5 border border-cyan/10 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-cyan" />
            <div>
              <div className="text-xs font-bold text-white uppercase">Human Lives Saved</div>
              <p className="text-[10px] font-mono text-white/40">Removing friction from systemic collapse.</p>
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-cyan" />
        </div>

        <div className="flex items-center justify-between p-4 bg-gold-500/5 border border-gold/10 rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gold" />
            <div>
              <div className="text-xs font-bold text-white uppercase">Global Resonance Eradication</div>
              <p className="text-[10px] font-mono text-white/40">Fixing the debt economy via superior logic.</p>
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-gold" />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-cyan animate-ping" />
           <span className="text-[9px] font-mono text-white/40">IBEN-GENESIS_HYPERSTRUCTURE_SYNCED</span>
         </div>
         <div className="text-[11px] font-mono font-bold text-cyan/80">
            3-6-9_GEOMETRIC_SCALE
         </div>
      </div>
    </div>
  );
};
