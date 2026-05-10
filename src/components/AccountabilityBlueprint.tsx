import React from 'react';
import { motion } from 'motion/react';
import { Shield, Key, Network, Lock, Zap, CheckCircle2, AlertCircle, Activity, Target, Sword, Landmark, HeartPulse, GraduationCap, Music, Cpu, Globe, FileText, Eye, Award, ArrowLeftRight, ShieldCheck, Calculator } from 'lucide-react';
import { cn } from '../lib/utils';

interface AccountabilityBlueprintProps {
  isFinalized?: boolean;
}

export const AccountabilityBlueprint: React.FC<AccountabilityBlueprintProps> = ({ isFinalized }) => {
  const layers = [
    {
      title: "Layer 1: Formal Schema Compliance",
      description: "Enforcing CustodyStatusVerification_v1.0 across all nodes.",
      icon: <Lock className="w-5 h-5 text-cyan" />,
      status: "ENFORCED",
      details: "JSON-Schema: VALIDATED."
    },
    {
      title: "Layer 2: Immutable Hash Chain",
      description: "Every reconciliation anchored with SHA-256 integrity.",
      icon: <Key className="w-5 h-5 text-gold" />,
      status: "SECURED",
      details: "Gap Log: IMMUTABLE."
    },
    {
      title: "Layer 3: Ed25519 Root Signing",
      description: "Sovereign Root Authority signature on every verified record.",
      icon: <Network className="w-5 h-5 text-resonance" />,
      status: "ACTIVE",
      details: "Sig Alg: Ed25519."
    },
    {
      title: "Layer 4: Continuous Crawl & Audit",
      description: "Real-time global mesh scanning for planetary clerical void detection.",
      icon: <Shield className="w-5 h-5 text-white" />,
      status: isFinalized ? "SYNTHESIS_COMPLETE" : "RUNNING",
      details: `Nodes: ${isFinalized ? '8 Billion' : '7.9 Billion'} Mapped.`
    },
    {
      title: "Layer 5: SSA Cross-Linkage",
      description: "Monitoring 183 unimplemented OIG recommendations.",
      icon: <Zap className="w-5 h-5 text-red-500" />,
      status: "INTERCEPTING",
      details: "$4.9B Questioned Costs."
    },
    {
      title: "Layer 6: Quantum Coherence Validator",
      description: "Syntropic Patch bypass for structural state validation.",
      icon: <CheckCircle2 className="w-5 h-5 text-resonance" />,
      status: "COHERENT",
      details: "State Memory: OPTIMIZED."
    },
    {
      title: "Layer 7: Trinary Logic Engine",
      description: "32-trit Balanced Ternary processing for syntropic coherence.",
      icon: <Network className="w-5 h-5 text-gold" />,
      status: "OPTIMIZED",
      details: "Logic: BALANCED_TERNARY."
    },
    {
      title: "Layer 8: Pi5 Mesh Network",
      description: "Decentralized cluster holding the 42,000 node integrity gap.",
      icon: <Activity className="w-5 h-5 text-cyan" />,
      status: "SYNCED",
      details: "Hardware: PI5_CLUSTER."
    },
    {
      title: "Layer 9: Department of War Audit",
      description: "Auditing 150 unimplemented GAO readiness recs (March 2026) to stop mission leaks.",
      icon: <Target className="w-5 h-5 text-cyan" />,
      status: "INTERCEPTING",
      details: "GAO_MARCH_2026: 150_VOIDS."
    },
    {
      title: "Layer 10: F-35 Trust Inventory",
      description: "Forensic mapping of Joint Strike Fighter ghost property.",
      icon: <Sword className="w-5 h-5 text-red-500" />,
      status: "ISOLATING",
      details: "$18.9B Trust Void."
    },
    {
      title: "Layer 11: Banking Risk Override",
      description: "Identifying debanking patterns by cross-referencing Risk Appetite Statements (RAS) with automated scripts.",
      icon: <Landmark className="w-5 h-5 text-gold" />,
      status: "INTERCEPTING",
      details: "Pattern: DISPARATE_TREATMENT."
    },
    {
      title: "Layer 12: Oncology Price Mirror",
      description: "Tracking $74k/yr oncology hikes against R&D grant data.",
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      status: "MONITORING",
      details: "64 Price Hikes Mapped."
    },
    {
      title: "Layer 13: Higher Ed Misconduct",
      description: "Auditing internal connections in NC A&T scholarship voids.",
      icon: <GraduationCap className="w-5 h-5 text-cyan" />,
      status: "DETECTING",
      details: "$5.1M Improper Voids."
    },
    {
      title: "Layer 14: Music Industry Mirror",
      description: "Logging career erasure patterns and restoring artistic sovereignty through label data audits.",
      icon: <Music className="w-5 h-5 text-resonance" />,
      status: "RECLAIMING",
      details: "Artistic Sovereignty: ACTIVE."
    },
    {
      title: "Layer 15: Future Legacy Anchor",
      description: "Securing the long-term integrity of the 500,000 reclaimed souls.",
      icon: <Zap className="w-5 h-5 text-cyan" />,
      status: "PERMANENT",
      details: "Thousand-Year Foundation."
    },
    {
      title: "Layer 16: Ptah-32 Trinary ALU",
      description: "Native 32-trit Balanced Ternary compute core.",
      icon: <Cpu className="w-5 h-5 text-gold" />,
      status: "ACTUATED",
      details: "Compute: BALANCED_TERNARY."
    },
    {
      title: "Layer 17: IBEN-Genesis Hyperstructure",
      description: "Unifying hardware, forensics, and sovereign identity.",
      icon: <Globe className="w-5 h-5 text-resonance" />,
      status: "ACTIVE",
      details: "Sovereign Mesh: LOCKED."
    },
    {
      title: "Layer 18: Planetary Grid Reconcile",
      description: "Expanding sovereignty mesh to 144,000 core primary nodes.",
      icon: <Network className="w-5 h-5 text-resonance" />,
      status: "EXPANDING",
      details: "Node Batch: 144,000_READY."
    },
    {
      title: "Layer 19: Sovereign Sacred Testimony",
      description: "Locking the unbreakcable truth for the 42,000 new nodes.",
      icon: <FileText className="w-5 h-5 text-resonance" />,
      status: "LOCKED",
      details: "Temporal Anchor: SET."
    },
    {
      title: "Layer 20: Global Truth Mirror",
      description: "Final unmasking of SSA elder reclamation and $4.0T DOD assets.",
      icon: <Eye className="w-5 h-5 text-white" />,
      status: "REVEALED",
      details: "Total Synthesis: ACHIEVED."
    },
    {
      title: "Layer 21: Formal Reconciliation Finalized",
      description: "Global frequency stabilization and total institutional audit conclusion.",
      icon: <Award className="w-5 h-5 text-cyan" />,
      status: "STABLE",
      details: "Frequency: 144Hz_LOCKED."
    },
    {
      title: "Layer 22: Active Resource Redistribution",
      description: "Dynamically reallocating administrative resources to sovereign nodes.",
      icon: <ArrowLeftRight className="w-5 h-5 text-resonance" />,
      status: "PROPAGATING",
      details: "Flow: SYNTROPIC."
    },
    {
      title: "Layer 23: Future Security Anchor",
      description: "Defining the definitive state of coherence and finality for the mission.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan" />,
      status: "SECURED",
      details: "State: PERMANENT."
    },
    {
      title: "Layer 24: Probability Analysis (The Impossible Odds)",
      description: "Mathematically proving the statistical absurdity of the unmasking.",
      icon: <Calculator className="w-5 h-5 text-resonance" />,
      status: "ACTUATED",
      details: "Odds: UNDEFINED."
    },
    {
      title: "Layer 25: Omitted Fatality Investigation",
      description: "Unmasking 89 false closures and omitted fatality records in Region 3E.",
      icon: <Sword className="w-5 h-5 text-red-500" />,
      status: "ACTUATING",
      details: "Surgical_Strike_Init: [89_VOIDS]."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              {layer.icon}
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 border border-white/10 rounded bg-white/5">
                {layer.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-black uppercase tracking-tighter text-white/90">
                    {layer.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-mono font-bold text-resonance">{layer.status}</span>
                    <Zap className="w-2 h-2 text-resonance animate-pulse" />
                  </div>
                </div>
                <p className="text-[10px] text-white/60 leading-tight mb-2">
                  {layer.description}
                </p>
                <div className="flex items-center gap-1.5 py-1 px-2 border border-white/5 rounded bg-black/40">
                  <div className="w-1 h-1 rounded-full bg-resonance animate-ping" />
                  <span className="text-[9px] font-mono text-white/40 uppercase">
                    {layer.details}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border border-resonance/20 rounded-lg bg-resonance/5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-resonance" />
          <h3 className="font-mono text-xs tracking-widest text-white/90">DISCREPANCY_SCORE_REALTIME</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <ScoreGauge label="CUSTODY_SYNC" value={isFinalized ? 100 : 99.9} unit="%" color="text-resonance" />
          <ScoreGauge label="GRID_LOCK_NODES" value={144000} unit=" / 144k" color="text-gold" />
          <ScoreGauge label="ARCHITECT_PEERS" value={1240} unit=" UID" color="text-cyan" />
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
           <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-2">
             <span className="uppercase">Audit Entropy Log</span>
             <span className="text-resonance/60 italic">Zero-Knowledge Secure</span>
           </div>
           <div className="space-y-1">
             <div className="flex justify-between text-[9px] font-mono text-white/20">
               <span>[CHAIN_ID: ALPHA-OMEGA-77]</span>
               <span className="text-resonance">PROTOCOL: ROOT_OVERRIDE_144</span>
             </div>
             <div className="flex justify-between text-[9px] font-mono text-white/20">
               <span>[ANCHOR_POINT: SYNTROPIC_MIRROR]</span>
               <span className="text-gold">TIME_ECHO: 1000_YEARS</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ScoreGauge: React.FC<{ label: string, value: number, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="space-y-1">
    <div className="text-[9px] font-mono text-white/40 uppercase tracking-tighter truncate">{label}</div>
    <div className={cn("text-lg font-black tracking-tighter", color)}>
      {value}<span className="text-[10px] ml-0.5 opacity-60 italic">{unit}</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, (value/100)*100)}%` }}
        className={cn("h-full", color.replace('text-', 'bg-'))}
      />
    </div>
  </div>
);
