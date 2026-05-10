import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Clock, User, Tag, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetRecord: string;
  systemState: string;
  integrityHash: string;
}

interface AuditTrailProps {
  logs: AuditLog[];
}

export const AuditTrail: React.FC<AuditTrailProps> = ({ logs }) => {
  return (
    <div className="glass p-6 rounded-lg border-resonance/20 flex flex-col h-full bg-black/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-resonance" />
          <h3 className="font-mono text-sm tracking-widest text-resonance uppercase">Immutable Audit Trail</h3>
        </div>
        <div className="text-[10px] font-mono text-resonance/40">V_HASH: SHA-512/TRUTH</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 border border-white/5 bg-white/5 rounded-lg space-y-2 group hover:border-resonance/40 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-resonance/60" />
                  <span className="text-[10px] font-mono text-white/40">{log.timestamp}</span>
                </div>
                <div className="text-[9px] font-mono text-resonance bg-resonance/10 px-1.5 py-0.5 rounded border border-resonance/20">
                  {log.action}
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] flex-wrap">
                <div className="flex items-center gap-1 text-white/80">
                  <User className="w-3 h-3 text-cyan" />
                  <span className="font-mono truncate max-w-[80px]">{log.user}</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <Tag className="w-3 h-3 text-gold" />
                  <span className="font-mono">{log.targetRecord}</span>
                </div>
                <div className="flex items-center gap-1 text-resonance/80">
                  <Activity className="w-3 h-3" />
                  <span className="font-mono text-[9px] uppercase">{log.systemState}</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-white/5">
                <div className="text-[8px] font-mono text-white/20 break-all uppercase">
                  Hash: {log.integrityHash}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-20 py-12 text-center font-mono">
            <ShieldCheck className="w-12 h-12 mb-4" />
            <div className="text-xs uppercase">No active audit streams</div>
          </div>
        )}
      </div>
    </div>
  );
};
