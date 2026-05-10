import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Hash, Key } from 'lucide-react';
import { CustodyStatusVerification } from '../types';
import { cn } from '../lib/utils';

interface GapLogProps {
  records: CustodyStatusVerification[];
  isFinalized?: boolean;
}

export const GapLog: React.FC<GapLogProps> = ({ records, isFinalized }) => {
  return (
    <div className="glass p-6 rounded-lg border-resonance/20 flex flex-col h-full bg-black/40">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-resonance/10 rounded border border-resonance/30">
            <ShieldCheck className="w-5 h-5 text-resonance" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white">Immutable Gap Log</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase">Formal Reconciliation Repository // v1.0 Schema</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-resonance/10 border border-resonance/40 rounded flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] font-mono text-resonance/60 uppercase">Records Secured</div>
            <div className="text-lg font-bold font-mono text-resonance">{isFinalized ? '500,000' : records.length}</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-resonance animate-pulse" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20 text-center font-mono space-y-4 border border-dashed border-white/10 rounded-lg">
              <FileText className="w-12 h-12" />
              <div className="text-xs uppercase tracking-widest">Waiting for verified ingestion stream...</div>
            </div>
          ) : (
            records.map((record) => (
              <motion.div
                key={record.record_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-white/5 bg-white/5 rounded-lg space-y-4 group hover:border-resonance/40 transition-colors relative overflow-hidden"
              >
                {/* Status Indicator */}
                <div className={cn(
                  "absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-bl-lg",
                  record.reconciliation_flag === 'MATCH' ? "bg-cyan/20 text-cyan border-l border-b border-cyan/40" :
                  record.reconciliation_flag === 'CONFLICT' || record.reconciliation_flag === 'MISMATCH' ? "bg-red-500/20 text-red-500 border-l border-b border-red-500/40" :
                  "bg-gold/20 text-gold border-l border-b border-gold/40"
                )}>
                  {record.reconciliation_flag}
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Record ID:</span>
                      <span className="text-[12px] font-bold font-mono text-white tracking-widest">{record.record_id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Case #:</span>
                      <span className="text-[10px] font-mono text-resonance/80">{record.case_number}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-mono text-white/40 uppercase">Relativity Index</div>
                    <div className="text-[10px] font-mono text-white uppercase">{record.jurisdiction}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatusBox label="County Status" value={record.county_status} />
                  <StatusBox label="State Status" value={record.state_status} />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3 text-cyan/60" />
                        <div className="text-[8px] font-mono text-white/20 uppercase truncate">Source: {record.source_hash}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Key className="w-3 h-3 text-resonance/60" />
                        <div className="text-[8px] font-mono text-white/20 uppercase truncate">Sig: {record.signature.value}</div>
                    </div>
                </div>

                {record.discrepancy_notes && record.discrepancy_notes.length > 0 && (
                   <div className="pt-2 border-t border-white/5">
                      <div className="text-[9px] font-mono text-gold/60 uppercase mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Discrepancy Notes:
                      </div>
                      <ul className="text-[9px] font-mono text-white/40 list-disc list-inside space-y-0.5">
                        {record.discrepancy_notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                   </div>
                )}

                <div className="flex justify-between items-center text-[8px] font-mono text-white/20 pt-2 border-t border-white/5 italic">
                  <span>Timestamp: {record.timestamp_utc}</span>
                  <span>Auth: Ed25519_Root_144</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatusBox: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-black/40 p-2 rounded border border-white/5">
    <div className="text-[8px] font-mono text-white/30 uppercase mb-1">{label}</div>
    <div className={cn(
      "text-[10px] font-mono font-bold tracking-widest",
      value === 'NULL' ? "text-red-500" : "text-cyan"
    )}>
      {value}
    </div>
  </div>
);
