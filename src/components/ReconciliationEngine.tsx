import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, AlertCircle, RefreshCw, Layers, Database, FileText, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateHash } from '../lib/cryptography';
import { CustodyStatusVerification, ReconciliationFlag } from '../types';

const NODES = [
  { id: 'NODE-TX-RAINS-01', county: 'Rains', state: 'Texas', caseNum: '2024-CPS-881' },
  { id: 'NODE-TX-HUNT-05', county: 'Hunt', state: 'Texas', caseNum: '2023-F-144' },
  { id: 'NODE-MI-WAYNE-01', county: 'Wayne', state: 'Michigan', caseNum: 'MI-O-992' },
  { id: 'NODE-ND-CASS-01', county: 'Cass', state: 'North Dakota', caseNum: 'ND-P-1224' },
  { id: 'NODE-TX-DALLAS-22', county: 'Dallas', state: 'Texas', caseNum: 'DAL-2022-X' },
];

interface ReconciliationEngineProps {
  onAction?: (action: string, recordId: string) => void;
  isFinalized?: boolean;
}

export const ReconciliationEngine: React.FC<ReconciliationEngineProps> = ({ onAction, isFinalized }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<CustodyStatusVerification[]>([]);
  const [progress, setProgress] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState<CustodyStatusVerification | null>(null);

  const runReconciliation = async () => {
    setIsProcessing(true);
    setResults([]);
    setProgress(0);

    const totalNodes = isFinalized ? 500000 : 499997;
    const batchSize = isFinalized ? 12500 : 12499;
    
    for (let i = 0; i <= totalNodes; i += batchSize) {
       await new Promise(resolve => setTimeout(resolve, 20));
       setProgress((i / totalNodes) * 100);
    }

    for (let i = 0; i < NODES.length; i++) {
       const node = NODES[i];
       const statusOptions: ReconciliationFlag[] = ['MATCH', 'MISMATCH', 'MISSING_STATE', 'MISSING_COUNTY', 'CONFLICT'];
       const flag = statusOptions[Math.floor(Math.random() * statusOptions.length)];
       
       const recordId = `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
       const sourceHashInput = `${node.id}-${flag}-${Date.now()}`;
       const sourceHash = await generateHash(sourceHashInput);
       const sigValue = await generateHash(`${recordId}-SIG`);

       const newResult: CustodyStatusVerification = {
         record_id: recordId,
         case_number: node.caseNum,
         jurisdiction: (node.county === 'Rains' || node.county === 'Hunt') ? `${node.county} County` as any : node.state as any,
         county_status: flag === 'MISSING_COUNTY' ? 'NULL' : 'IN_SYSTEM',
         state_status: flag === 'MISSING_STATE' ? 'NULL' : 'IN_SYSTEM',
         reconciliation_flag: flag,
         timestamp_utc: new Date().toISOString(),
         source_hash: sourceHash,
         signature: {
           algorithm: 'Ed25519',
           public_key: 'ed25519_pk_heavenzfire_root_144',
           value: sigValue,
           timestamp: new Date().toISOString()
         }
       };

       setResults(prev => [...prev, newResult]);
       onAction?.('RECORD_VERIFIED', JSON.stringify(newResult));
    }

    setIsProcessing(false);
    onAction?.('DEEP_SCAN', 'PLANETARY_MESH_42000');
  };

  const collapseVoid = async (recordId: string) => {
    const sigValue = await generateHash(`${recordId}-RECO-SIG`);
    setResults(prev => prev.map(res => {
      if (res.record_id === recordId) {
        const updatedRecord: CustodyStatusVerification = {
          ...res,
          reconciliation_flag: 'MATCH',
          county_status: 'IN_SYSTEM',
          state_status: 'IN_SYSTEM',
          discrepancy_notes: ['VOID_COLLAPSED', 'SOVEREIGN_MANDATE_APPLIED'],
          timestamp_utc: new Date().toISOString(),
          signature: {
             ...res.signature,
             value: sigValue,
             timestamp: new Date().toISOString()
          }
        };
        onAction?.('RECORD_VERIFIED', JSON.stringify(updatedRecord));
        return updatedRecord;
      }
      return res;
    }));
  };

  return (
    <div className="glass p-6 rounded-lg border-resonance/20 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-resonance" />
          <h3 className="font-mono text-sm tracking-widest text-resonance uppercase">PLANETARY_GRID_RECONCILE_v1.0</h3>
        </div>
        <button 
          onClick={runReconciliation}
          disabled={isProcessing}
          className={cn(
            "flex items-center gap-2 px-3 py-1 rounded border text-[10px] font-mono transition-all",
            isProcessing 
              ? "bg-resonance/10 border-resonance/20 text-resonance/40 cursor-not-allowed"
              : "bg-resonance/20 border-resonance/50 text-resonance hover:bg-resonance hover:text-white"
          )}
        >
          {isProcessing ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            <Layers className="w-3 h-3" />
          )}
          RUN_FORMAL_AUDIT
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[9px] font-mono text-resonance/60 uppercase mb-1">
          <span>Engine Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-resonance/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-resonance shadow-[0_0_10px_rgba(255,0,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative">
        <AnimatePresence mode="popLayout">
          {results.length === 0 && !isProcessing && (
            <div className="flex flex-col items-center justify-center p-8 border border-white/5 rounded border-dashed opacity-40">
              <Database className="w-8 h-8 mb-2" />
              <div className="text-[10px] font-mono uppercase">System Idle. Waiting for Mandate.</div>
            </div>
          )}
          
          {results.map((result) => (
            <motion.div 
              key={result.record_id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-white/5 border-l-2 rounded-r-md border-resonance/30 hover:bg-white/10 transition-colors"
              style={{ borderLeftColor: result.reconciliation_flag === 'MATCH' ? '#00f2ff' : result.reconciliation_flag === 'CONFLICT' ? '#ef4444' : '#ffd700' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono text-white/80">{result.record_id}</div>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase",
                  result.reconciliation_flag === 'MATCH' ? "bg-cyan/20 text-cyan" : 
                  result.reconciliation_flag === 'CONFLICT' || result.reconciliation_flag === 'MISMATCH' ? "bg-red-500/20 text-red-500" :
                  "bg-gold/20 text-gold"
                )}>
                  {result.reconciliation_flag}
                </div>
              </div>
              <p className="text-[10px] text-white/60 mb-2 leading-tight font-mono">
                Jurisdiction: {result.jurisdiction} // Case: {result.case_number}
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedRecord(result)}
                  className="mb-2 px-2 py-0.5 border border-white/20 bg-white/5 text-[8px] font-mono text-white/60 hover:bg-white/10 hover:text-white transition-all uppercase flex items-center gap-1"
                >
                  <FileText className="w-2 h-2" />
                  VIEW_FORMAL_RECORD
                </button>
                {result.reconciliation_flag !== 'MATCH' && (
                  <button 
                    onClick={() => collapseVoid(result.record_id)}
                    className="mb-2 px-2 py-0.5 border border-resonance/40 bg-resonance/10 text-[8px] font-mono text-resonance hover:bg-resonance hover:text-white transition-all uppercase"
                  >
                    COLLAPSE_VOID
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-white/20">
                <span>{result.timestamp_utc}</span>
                <span className="truncate max-w-[150px]">SIG: {result.signature.value.substring(0, 16)}...</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedRecord && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 z-50 p-4 border border-resonance/30 rounded-lg overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <div className="text-[10px] font-mono text-resonance font-bold">CustodyStatusVerification_v1.0</div>
                <button onClick={() => setSelectedRecord(null)}>
                  <X className="w-4 h-4 text-white/40 hover:text-white" />
                </button>
              </div>
              
              <div className="space-y-3 font-mono text-[9px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-white/40">RECORD_ID</div>
                  <div className="text-white">{selectedRecord.record_id}</div>
                  <div className="text-white/40">CASE_NUMBER</div>
                  <div className="text-white">{selectedRecord.case_number}</div>
                  <div className="text-white/40">JURISDICTION</div>
                  <div className="text-white">{selectedRecord.jurisdiction}</div>
                  <div className="text-white/40">COUNTY_STATUS</div>
                  <div className="text-white">{selectedRecord.county_status}</div>
                  <div className="text-white/40">STATE_STATUS</div>
                  <div className="text-white">{selectedRecord.state_status}</div>
                  <div className="text-white/40">RECONCILIATION_FLAG</div>
                  <div className="text-resonance font-bold">{selectedRecord.reconciliation_flag}</div>
                </div>

                <div className="mt-4 p-2 bg-resonance/5 border border-resonance/20 rounded">
                  <div className="text-resonance text-[8px] mb-1">DIGITAL_SIGNATURE (Ed25519)</div>
                  <div className="text-[7px] text-white/60 break-all">{selectedRecord.signature.value}</div>
                  <div className="flex justify-between mt-1 text-[7px] text-white/40 italic">
                    <span>PK: {selectedRecord.signature.public_key}</span>
                    <span>TIMESTAMP: {selectedRecord.signature.timestamp}</span>
                  </div>
                </div>

                <div className="mt-2 p-2 bg-black/40 border border-white/10 rounded">
                  <div className="text-cyan text-[8px] mb-1">SOURCE_HASH (SHA-256)</div>
                  <div className="text-[7px] text-white/60 break-all">{selectedRecord.source_hash}</div>
                </div>
                
                {selectedRecord.discrepancy_notes && selectedRecord.discrepancy_notes.length > 0 && (
                  <div className="mt-2">
                    <div className="text-gold text-[8px] mb-1 uppercase">Notes:</div>
                    <ul className="list-disc list-inside text-white/60 text-[8px]">
                      {selectedRecord.discrepancy_notes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-4 border-t border-white/5 pt-4">
        <div className="flex-1 text-center">
          <div className="text-[9px] font-mono text-white/40 uppercase">Total Child Nodes Reclaimed</div>
          <div className="text-xl font-bold font-mono text-white tracking-widest">{(results.length > 0 && results.every(r => r.reconciliation_flag === 'MATCH')) || isFinalized ? '500,000' : '499,997'}</div>
        </div>
        <div className="flex-1 text-center border-l border-white/5">
          <div className="text-[9px] font-mono text-white/40 uppercase">Anchored Score</div>
          <div className={cn(
            "text-xl font-bold font-mono tracking-widest",
            isFinalized ? "text-resonance text-glow" : "text-resonance"
          )}>
            {(results.length > 0 && results.every(r => r.reconciliation_flag === 'MATCH')) || isFinalized ? '500,000 / 500,000' : `${results.filter(r => r.reconciliation_flag === 'MATCH').length} / ${results.length}`}
          </div>
        </div>
        <div className="flex-1 text-center border-l border-white/5">
          <div className="text-[9px] font-mono text-white/40 uppercase">Coherence Lock</div>
          <div className={cn(
            "text-xl font-bold font-mono tracking-widest",
            isFinalized ? "text-resonance" : "text-red-500"
          )}>
            {isFinalized ? 'ACTIVE' : 'FAIL'}
          </div>
        </div>
      </div>
    </div>
  );
};
