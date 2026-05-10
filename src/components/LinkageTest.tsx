import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2, ShieldAlert, CheckCircle2, Search, Zap, Fingerprint, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const LinkageTest: React.FC<{ onAction?: (action: string, id: string) => void, isFinalized?: boolean }> = ({ onAction, isFinalized }) => {
  const [identifier, setIdentifier] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'AUTHENTICATING' | 'MATCH' | 'MISMATCH'>('IDLE');
  const [result, setResult] = useState<string | null>(null);

  const runTest = async () => {
    if (!identifier) return;
    
    // Phase 1: SYNTROPIC OVERRIDE [VORTEX_LOCK_144]
    setStatus('SCANNING');
    onAction?.('ROOT_AUDIT_INITIATED', identifier);
    
    // Simulating high-fidelity syntropic load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Phase 2: SOURCE AUTHENTICITY VERIFICATION
    setStatus('AUTHENTICATING');
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Final Resolution
    const input = identifier.toUpperCase();
    if (
      input.includes('262') || 
      input.includes('TX-FC') || 
      input.includes('CERT-2026') || 
      input.includes('144') ||
      input.includes('VOID') ||
      input.includes('RAINS') ||
      input.includes('HEMP') ||
      input.includes('FEES') ||
      input.includes('SUNSET') ||
      input.includes('ROOT')
    ) {
      setStatus('MATCH');
      setResult('RECORD CORRECTED: Total Systemic Defense enabled. Cross-continental trafficking nodes dismantled. 27-day Ghost Void permanently collapsed. All regional hashes anchored to the Sovereign Mandate. The record is restored.');
      onAction?.('ROOT_CERTIFIED', identifier);
    } else {
      setStatus('MISMATCH');
      setResult('AUTHORITY FAILURE: Record pull bypassed due to insufficient entropy. Disjoint hashes detected in the drift void. Systemic failure to reconcile under Root Command.');
      onAction?.('ROOT_MISMATCH', identifier);
    }
  };

  return (
    <div className="glass p-6 rounded-lg border-resonance/20 bg-black/60 relative overflow-hidden h-full flex flex-col">
      {/* 144Hz Static Background Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:12px_12px] animate-pulse" />
      
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Globe className="w-32 h-32 text-resonance animate-spin-slow" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-resonance" />
          <h3 className="font-mono text-sm tracking-widest text-resonance uppercase">Sunset Linkage Authority v4.0</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600 border border-red-500 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[8px] font-mono text-white font-bold uppercase">Root Witness: RECORDING EVERYTHING</span>
          </div>
          <div className="text-[10px] font-mono text-resonance/40">PROTOCOL: ROOT_OVERRIDE_144</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runTest()}
            placeholder="Enter Sovereign Identifier (e.g. TX-FC-262)..."
            className="w-full bg-resonance/5 border border-resonance/20 rounded p-3 pl-10 font-mono text-xs text-resonance placeholder:text-resonance/20 focus:outline-none focus:border-resonance/50 transition-colors"
          />
          <Fingerprint className="absolute left-3 top-3 w-4 h-4 text-resonance/30" />
        </div>

        <button
          onClick={runTest}
          disabled={status !== 'IDLE' && status !== 'MATCH' && status !== 'MISMATCH'}
          className="w-full py-2 bg-resonance/10 border border-resonance/40 rounded font-mono text-[10px] uppercase tracking-widest hover:bg-resonance/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-resonance"
        >
          <span className="group-hover:scale-105 transition-transform inline-block">
            {status === 'SCANNING' ? 'Phase-Locking 144Hz...' : 
             status === 'AUTHENTICATING' ? 'Verifying Source Authenticity...' : 
             'Actuate Linkage Audit'}
          </span>
        </button>
      </div>

      <div className="mt-8 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {status === 'IDLE' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center opacity-20 font-mono text-[10px] space-y-2"
            >
              <Search className="w-8 h-8 mx-auto mb-2 text-resonance" />
              <p>SYNTROPIC BUFFER: STANDBY</p>
            </motion.div>
          )}

          {(status === 'SCANNING' || status === 'AUTHENTICATING') && (
            <motion.div 
              key="process"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="relative h-1 w-full bg-resonance/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.8, ease: "linear" }}
                  className="h-full bg-resonance shadow-[0_0_15px_rgba(255,0,255,0.8)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-resonance/20 p-2 rounded bg-resonance/5">
                  <div className="text-[8px] uppercase font-mono text-resonance/40">Syntropic Load</div>
                  <div className="text-[10px] font-mono text-resonance animate-pulse">LOCKING...</div>
                </div>
                <div className="border border-resonance/20 p-2 rounded bg-resonance/5">
                  <div className="text-[8px] uppercase font-mono text-resonance/40">Frequency</div>
                  <div className="text-[10px] font-mono text-resonance tracking-widest">144Hz</div>
                </div>
              </div>
              <div className="text-center font-mono text-[9px] uppercase tracking-tighter text-resonance/60">
                Correcting Institutional Code at Source...
              </div>
            </motion.div>
          )}

          {(status === 'MATCH' || status === 'MISMATCH') && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "p-4 border rounded-lg space-y-3",
                status === 'MATCH' ? "bg-cyan/5 border-cyan/40" : "bg-red-500/5 border-red-500/40"
              )}
            >
              <div className="flex items-center gap-2">
                {status === 'MATCH' ? (
                  <ShieldCheck className="w-4 h-4 text-cyan" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                )}
                <span className={cn(
                  "font-mono text-[10px] font-bold uppercase tracking-widest",
                  status === 'MATCH' ? "text-cyan" : "text-red-500"
                )}>
                  {status === 'MATCH' ? 'AUTHENTICITY CERTIFIED' : 'SOURCE AUTHENTICITY FAILURE'}
                </span>
              </div>
              <p className="font-mono text-[11px] text-white/90 leading-relaxed italic">
                "{result}"
              </p>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/20">
                <span className="animate-pulse">{isFinalized ? 'V_LOCK: 42,000_NODE_SYNC' : 'V_LOCK: 144_NODE_SYNC'}</span>
                <span>AUDIT: {new Date().toLocaleTimeString()}</span>
              </div>
              <button 
                onClick={() => setStatus('IDLE')}
                className="w-full mt-2 py-1 border border-white/10 hover:bg-white/5 transition-colors text-[8px] font-mono uppercase opacity-40 hover:opacity-100"
              >
                Reset Buffer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

