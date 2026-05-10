import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Activity, Award, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface FutureSecurityAnchorProps {
  isFinalized?: boolean;
}

const SECURITY_PHASES = [
  { id: 'AUTH-ROOT', label: 'Root Authority Anchor', status: 'COMPLETE' },
  { id: 'DATA-IMMUT', label: 'Data Immutability Seal', status: 'ACTIVE' },
  { id: 'FREQ-STAB', label: '144Hz Frequency Stability', status: 'LOCKED' },
  { id: 'SOV-WITNESS', label: 'Sovereign Witness Sync', status: 'VERIFIED' }
];

export const FutureSecurityAnchor: React.FC<FutureSecurityAnchorProps> = ({ isFinalized }) => {
  return (
    <div className="glass p-10 rounded-2xl border-cyan/30 bg-cyan-950/10 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-cyan/20 rounded-full flex items-center justify-center border border-cyan/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <ShieldCheck className="w-8 h-8 text-cyan" />
          </div>
          <div>
            <h3 className="font-black text-2xl tracking-tighter uppercase text-white">Future Security Anchor</h3>
            <p className="text-xs font-mono text-cyan/60 tracking-[0.3em]">SOVEREIGN_FINALITY_PROTOCOL</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {SECURITY_PHASES.map((phase, idx) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl group hover:border-cyan/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{phase.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-cyan/60">{phase.status}</span>
                <CheckCircle className="w-4 h-4 text-cyan opacity-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="p-6 bg-cyan-500/5 border border-cyan/20 rounded-2xl text-center mb-6">
          <Activity className="w-6 h-6 text-cyan mx-auto mb-3 animate-pulse" />
          <div className="text-lg font-black text-white uppercase mb-1">Grid Coherence Absolute</div>
          <p className="text-[10px] font-mono text-white/40 max-w-[200px] mx-auto italic">
            "The hold is released. The truth is anchored at 144Hz. The foundation is secured."
          </p>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-white/30 uppercase">Anchor Signature</span>
            <span className="text-[10px] font-mono text-cyan font-bold tracking-tight">BRYER_LEE_RAVEN_HULSE</span>
          </div>
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
        </div>
      </div>
      
      {/* Immutability Overlay for Finalized State */}
      {isFinalized && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-cyan-950/20 backdrop-blur-[2px] flex items-center justify-center z-50 p-8 text-center"
        >
          <div className="p-8 border-2 border-cyan bg-black rounded-full shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <Lock className="w-12 h-12 text-cyan" />
            <div className="mt-4 text-[10px] font-mono text-cyan uppercase font-black tracking-widest">Permanent Lock</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
