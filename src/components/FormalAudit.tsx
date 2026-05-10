import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCheck2, ShieldCheck, Zap, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface FormalAuditProps {
  isFinalized?: boolean;
  onFinalize?: () => void;
}

export const FormalAudit: React.FC<FormalAuditProps> = ({ isFinalized, onFinalize }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('AWAITING_MANDATE');

  const startAudit = () => {
    setStatus('AUDITING_PHASE_1');
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('TOTAL_SYNTHESIS_COMPLETE');
          if (onFinalize) onFinalize();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="glass p-8 rounded-xl border-resonance/40 bg-resonance-950/10 relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-resonance/5 opacity-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resonance/20 rounded flex items-center justify-center border border-resonance/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <FileCheck2 className="w-6 h-6 text-resonance" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">Formal Reconciliation Audit</h3>
            <p className="text-[10px] font-mono text-resonance/60">GLOBAL_FREQUENCY_STABILIZATION_v1.0</p>
          </div>
        </div>
        {isFinalized ? (
          <div className="flex items-center gap-2 px-3 py-1 border border-cyan/40 rounded bg-cyan-500/10">
            <Award className="w-3.5 h-3.5 text-cyan" />
            <span className="text-[10px] font-mono text-cyan uppercase font-bold">Finalized</span>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startAudit}
            disabled={status !== 'AWAITING_MANDATE'}
            className={cn(
              "px-4 py-2 border rounded font-mono text-[10px] uppercase font-bold transition-all",
              status === 'AWAITING_MANDATE' 
                ? "border-resonance text-resonance bg-resonance/10 hover:bg-resonance hover:text-white" 
                : "border-white/20 text-white/40 cursor-not-allowed"
            )}
          >
            {status === 'AWAITING_MANDATE' ? 'Execute Formal Audit' : 'Audit In Progress'}
          </motion.button>
        )}
      </div>

      <div className="mb-8 p-6 bg-black/60 border border-resonance/30 rounded-lg">
        <div className="flex justify-between text-[11px] font-mono text-resonance uppercase mb-4 font-bold">
          <span>System Status: {status}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/10">
          <motion.div 
            className="h-full bg-resonance shadow-[0_0_15px_rgba(239,68,68,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center">
            <CheckCircle2 className={cn("w-5 h-5 mx-auto mb-2", progress > 20 ? "text-cyan" : "text-white/20")} />
            <div className="text-[8px] font-mono text-white/40 uppercase">SSA $4.9B</div>
          </div>
          <div className="text-center">
            <CheckCircle2 className={cn("w-5 h-5 mx-auto mb-2", progress > 40 ? "text-cyan" : "text-white/20")} />
            <div className="text-[8px] font-mono text-white/40 uppercase">DOD $4.0T</div>
          </div>
          <div className="text-center">
            <CheckCircle2 className={cn("w-5 h-5 mx-auto mb-2", progress > 60 ? "text-cyan" : "text-white/20")} />
            <div className="text-[8px] font-mono text-white/40 uppercase">GAO 150 RECS</div>
          </div>
          <div className="text-center">
            <CheckCircle2 className={cn("w-5 h-5 mx-auto mb-2", progress > 80 ? "text-cyan" : "text-white/20")} />
            <div className="text-[8px] font-mono text-white/40 uppercase">500K Souls</div>
          </div>
          <div className="text-center">
            <CheckCircle2 className={cn("w-5 h-5 mx-auto mb-2", progress === 100 ? "text-cyan" : "text-white/20")} />
            <div className="text-[8px] font-mono text-white/40 uppercase">Grid 42K</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-cyan-950/20 border border-cyan/20 rounded-lg flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-cyan shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-cyan uppercase font-black">Coherent Stability Shield</div>
            <p className="text-xs text-white/70 leading-relaxed mt-1">
              Final frequency synchronization for Bryer Lee Raven Hulse. The Thousand-Year Foundation is now self-sustaining. All "Spirits of Error" have been purged from the active reconciliation buffers.
            </p>
          </div>
        </div>

        {isFinalized && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gold-950/20 border border-gold/30 rounded-lg flex items-center justify-center gap-4 text-center"
          >
            <Zap className="w-10 h-10 text-gold animate-pulse" />
            <div>
              <div className="text-lg font-black text-gold uppercase tracking-tighter">Total Synthesis Achieved</div>
              <p className="text-[10px] font-mono text-white/60">The hold is released. The truth is unbreakable.</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-resonance/40">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>MANDATE_EXECUTED_BY_ROOT</span>
        </div>
        <span>IBEN-GENESIS: 2026-05-04_144Hz</span>
      </div>
    </div>
  );
};
