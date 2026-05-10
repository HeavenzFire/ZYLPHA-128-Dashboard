import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, ArrowRight, ShieldCheck, Users, Globe, Zap, Download, Radio } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResourceRedistributionProps {
  isFinalized?: boolean;
}

const REDISTRIBUTION_NODES = [
  { id: 'REC-001', name: 'Elderly Support Fund', amount: '$1.2B', status: 'VERIFIED', desk: 'SSA-BALTIMORE-01' },
  { id: 'REC-002', name: 'Disabled Assistance Root', amount: '$850M', status: 'VERIFIED', desk: 'SSA-OFFICE-FINANCE' },
  { id: 'REC-003', name: 'Region 3E Omitted Rectification', amount: '$432M', status: 'VERIFIED', desk: 'TX-REGIONAL-3E' },
  { id: 'REC-004', name: 'Rains County Void Closure', amount: '$120M', status: 'VERIFIED', desk: 'TX-RAINS-AUDIT' },
  { id: 'REC-005', name: 'Sovereign Heritage Trust', amount: '$2.1B', status: 'GLOBAL_DISCHARGE', desk: 'GLOBAL-CUSTODY' },
  { id: 'REC-006', name: '47,000 Sovereign Recipients', amount: '$4.9B', status: 'GLOBAL_DISCHARGE', desk: 'TREASURY-DISCHARGE-CORE' },
];

const DISCHARGE_LOGS = [
  { time: '20:47:12', target: '47,000_SOVEREIGN_RECIPIENTS', action: 'BATCH_DISCHARGE_INITIATED', status: 'FLOW' },
  { time: '20:47:15', target: '144,000_LATTICE_NODES', action: 'GLOBAL_SYNC_LOCKED', status: 'LOCKED' },
  { time: '20:47:20', target: 'TX-REGIONAL-3E', action: 'RECTIFICATION_AUDIT_STREAM', status: 'FLOW' },
  { time: '20:51:10', target: 'SSA-TREASURY', action: 'TOTAL_REVELATION_ACTUATED', status: 'LOCKED' },
  { time: '20:51:19', target: 'GLOBAL-MIRROR', action: 'CUBE_CAST_MAX_RESONANCE', status: 'ACTIVE' },
];

export const ResourceRedistribution: React.FC<ResourceRedistributionProps> = ({ isFinalized }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-8 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/20 border border-gold/40 rounded-xl flex items-center justify-center glow-gold">
            <DollarSign className="w-7 h-7 text-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Resource Redistribution Interface</h2>
            <p className="text-xs font-mono text-white/40">PHASE_3_ACTUATION // SYSTEM_WEALTH_DISCHARGE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-cyan/40 bg-cyan/10 rounded-full">
           <ShieldCheck className="w-4 h-4 text-cyan" />
           <span className="text-[10px] font-mono text-cyan uppercase font-black">Audit Integrity: CERTIFIED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Discharge Terminal */}
        <div className="glass p-8 rounded-xl border-resonance/30 bg-resonance-950/10 relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-resonance animate-pulse" /> Global Actuation Terminal
              </h3>
              <div className="text-[10px] font-mono text-resonance uppercase border border-resonance/40 px-2 py-1 rounded bg-resonance/10">Phase 5: Total Revelation</div>
           </div>

           <div className="space-y-6">
              {REDISTRIBUTION_NODES.map((node, index) => (
                <div key={node.id} className="relative">
                   <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "w-2 h-2 rounded-full",
                           node.status === 'DISCHARGING' || node.status === 'ACTUATING' || node.status === 'MAX_PRESSURE' || node.status === 'GLOBAL_DISCHARGE' ? "bg-resonance animate-ping" :
                           node.status === 'VERIFIED' ? "bg-cyan" :
                           node.status === 'SURGICAL' ? "bg-gold animate-pulse" : "bg-white/20"
                         )} />
                         <span className="text-xs font-mono font-bold uppercase">{node.name}</span>
                      </div>
                      <span className="text-sm font-black text-white">{node.amount}</span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: 
                          node.status === 'VERIFIED' ? '100%' : 
                          node.status === 'GLOBAL_DISCHARGE' ? '98%' :
                          node.status === 'MAX_PRESSURE' ? '95%' :
                          node.status === 'ACTUATING' ? '85%' :
                          node.status === 'DISCHARGING' ? '65%' : 
                          node.status === 'SURGICAL' ? '45%' : '0%' 
                        }}
                        className={cn(
                          "h-full",
                          node.status === 'DISCHARGING' || node.status === 'ACTUATING' || node.status === 'MAX_PRESSURE' || node.status === 'GLOBAL_DISCHARGE' ? "bg-resonance" :
                          node.status === 'VERIFIED' ? "bg-cyan" : 
                          node.status === 'SURGICAL' ? "bg-gold" : "bg-white/10"
                        )}
                      />
                   </div>
                   <div className="flex justify-between mt-1 text-[8px] font-mono opacity-40 uppercase">
                      <span>NodeID: {node.id}</span>
                      <span>Status: {node.status}</span>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-8">
              <button className="w-full py-4 bg-resonance/20 border border-resonance/40 rounded-lg font-mono text-xs uppercase tracking-[0.2em] hover:bg-resonance hover:text-white transition-all shadow-resonance-hover">
                 Initiate Batch Discharge
              </button>
           </div>
        </div>

        {/* Global Impact & Summary */}
        <div className="space-y-8">
           <div className="glass p-8 rounded-xl border-white/10 bg-black/40">
              <h4 className="text-xs font-black uppercase mb-6 text-white/60 flex items-center gap-2">
                 <Globe className="w-4 h-4" /> Global Sovereignty Impact
              </h4>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-black text-white mb-1">47,000</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Recipients Restored</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-black text-cyan mb-1">100%</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Verification Rate</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-black text-gold mb-1">$4.9B</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Total Value Anchored</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-black text-resonance mb-1">∞</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Systemic Integrity</div>
                 </div>
              </div>
           </div>

           <div className="glass p-8 rounded-xl border-white/10 bg-black/40 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-10">
                 <Users className="w-32 h-32 text-white" />
              </div>
              <h4 className="text-xs font-black uppercase mb-4 text-white/60">Forensic Recovery Summary</h4>
              <p className="text-sm text-white/80 leading-relaxed italic mb-6">
                 "The redistribution of captured administrative value represents the final collapse of the institutional void. All sovereign assets are now mapped to their rightful nodes within the planetary lattice."
              </p>
              <div className="flex items-center gap-4">
                 <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded font-mono text-[9px] uppercase hover:bg-white/20 transition-all">
                    <Download className="w-3 h-3" /> Export Audit Log
                 </button>
                 <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded font-mono text-[9px] uppercase hover:bg-white/20 transition-all">
                    <Download className="w-3 h-3" /> Sovereignty Certs
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-gold-950/20 border border-gold/20 rounded-xl flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Zap className="w-5 h-5 text-gold animate-pulse" />
            <div className="font-mono text-[10px] text-white/80 uppercase">
              Current Vector: <span className="text-gold font-bold">TOTAL_SYSTEMIC_RESTORATION_IN_PROGRESS</span>
            </div>
         </div>
         <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
            Witness_Sync_Authenticated
         </div>
      </div>

      {/* Discharge Logs Section */}
      <div className="glass p-8 rounded-xl border-white/10 bg-black/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Radio className="w-4 h-4 text-resonance" /> Sovereign Discharge Log
          </h3>
          <span className="text-[9px] font-mono text-white/20">LIVE_AUDIT_STREAM</span>
        </div>
        <div className="space-y-3 font-mono text-[10px]">
          {DISCHARGE_LOGS.map((log, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
              <span className="text-white/30">[{log.time}]</span>
              <span className="text-resonance w-40 truncate">{log.target}</span>
              <span className="text-white/60 flex-1">{log.action}</span>
              <span className={cn(
                "px-2 py-0.5 rounded text-[8px] font-black",
                log.status === 'FLOW' ? "bg-resonance/20 text-resonance" :
                log.status === 'LOCKED' ? "bg-cyan/20 text-cyan" :
                "bg-gold/20 text-gold"
              )}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
