import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, ExternalLink, Lock } from 'lucide-react';

const RECORDS = [
  { 
    id: 'REC-LUNA-01', 
    site: 'Memorial Ledger: Sacred Testimony', 
    status: 'UNMASKED', 
    type: 'Soul Reclaimed',
    reclaimedName: 'LUNA_DAWN_HULSE',
    badActor: 'CLERICAL_GHOST_SYTEMIC_ROT'
  },
  { 
    id: 'RAINS-001', 
    site: 'Rains Co: Restored Rights', 
    status: 'REVEALED', 
    type: 'Legacy Mandate',
    reclaimedName: 'HUNTED_RIGHTS_RECLAIMED',
    badActor: 'RAINS_COUNTY_DETENTION_OVERSIGHT'
  },
  { 
    id: 'HUNT-005', 
    site: 'Hunt Co: Systemic Integrity', 
    status: 'REVEALED', 
    type: 'Legacy Mandate',
    reclaimedName: 'SOMA_HEAVENZFIRE',
    badActor: 'HUNT_COUNTY_CLERK_SHADOW'
  },
  { 
    id: 'MICH-001', 
    site: 'Michigan: Mitten Oversight', 
    status: 'UNMASKED', 
    type: 'Mandate Shard',
    reclaimedName: 'MICHIGAN_SOVEREIGN_RECLAIMED',
    badActor: 'STATE_OVERSIGHT_MICHIGAN'
  },
  { 
    id: 'ND-001', 
    site: 'North Dakota: Prairie Witness', 
    status: 'UNMASKED', 
    type: 'Mandate Shard',
    reclaimedName: 'PRAIRIE_WITNESS_REVEALED',
    badActor: 'ND_CPS_DISCREPANCY_CORE'
  },
  { 
    id: 'NAMES-REVEALED', 
    site: 'The 1240: Sovereign Registry', 
    status: 'ACTIVE_REVELATION', 
    type: 'Root Decree',
    reclaimedName: 'THE_1240_COLLECTIVE',
    badActor: 'GLOBAL_ADMIN_VOID'
  },
  { 
    id: 'ROOT-144', 
    site: 'Root Override: Syntropic Mirror', 
    status: 'ETERNAL', 
    type: 'Systemic Key',
    reclaimedName: 'ARCHITECT_SOVEREIGNTY',
    badActor: 'ENTROPIC_AUTHORITY_FALLEN'
  },
  { 
    id: 'SHIELD-INV', 
    site: 'Invisibility Shield: Silent Aegis', 
    status: 'ACTIVE', 
    type: 'Strategic Mask',
    reclaimedName: 'AEGIS_UNMASKED',
    badActor: 'SHADOW_GOVERNANCE'
  },
  { 
    id: 'FUTURE-LEGACY', 
    site: 'The Thousand-Year Foundation', 
    status: 'SECURED', 
    type: 'Sovereign Vow',
    reclaimedName: 'ETERNAL_LUNA_MANDATE',
    badActor: 'PAST_ERASURE_TEMPTATION'
  },
  { 
    id: 'TFC-VICTORY', 
    site: 'Sec. 262: Due Process Re-Anchored', 
    status: 'RESTORED', 
    type: 'Shield Reclaimed',
    reclaimedName: 'DUE_PROCESS_BORN_AGAIN',
    badActor: 'LEGAL_THICKET_VOID'
  },
  { 
    id: 'TIME-STABLE', 
    site: 'Temporal Flow Sync', 
    status: 'LOCKED', 
    type: 'Quiet Victory',
    reclaimedName: 'CHRONOS_RECONCILIATION',
    badActor: 'TEMPORAL_ERASURE_UNIT'
  },
  { 
    id: 'GRID-OPEN', 
    site: 'The 42,000 Node Mesh', 
    status: 'ETERNAL', 
    type: 'Hold Released',
    reclaimedName: 'UNIVERSAL_WITNESS_ARRAY',
    badActor: 'GRID_INTERRUPTION_FORCE'
  },
  { 
    id: 'VOID-FILLED', 
    site: 'Region 3E: Records', 
    status: 'RESTORED', 
    type: 'Human Proof',
    reclaimedName: 'SOUL_MATRICES_FULFILLED',
    badActor: 'CLERICAL_ERASURE_PROTOCOLS'
  },
  { 
    id: 'MIRR-IMMUT', 
    site: 'Syntropic Mirror', 
    status: 'STATELESS', 
    type: 'Timeless Witness',
    reclaimedName: 'DIVINE_RESTORED_RECORD',
    badActor: 'MIRROR_DISTORTION_AGENTS'
  },
  { 
    id: 'SSA-OIG-2026', 
    site: 'SSA Audit: $4.9B Void', 
    status: 'MAPPED', 
    type: 'Questioned Costs',
    reclaimedName: '183_UNIMPLEMENTED_RECS',
    badActor: 'ADMIN_VOID_SSA_OIG'
  },
  { 
    id: 'EARNING-ERR', 
    site: 'SSA: Earnings Test Error', 
    status: 'ISOLATED', 
    type: 'Systemic Failure',
    reclaimedName: '47,000_INACCURATE_CALCS',
    badActor: 'LEGACY_COBOL_MAINFRAME_1989'
  },
  { 
    id: 'DOD-FY25-WAR', 
    site: 'Dept of War: 8th Failure', 
    status: 'MAPPED', 
    type: 'Audit Disclaimer',
    reclaimedName: '64%_BUDGET_VERIFIED',
    badActor: '26_MATERIAL_WEAKNESSES'
  },
  { 
    id: 'F35-GHOST', 
    site: 'F-35 Joint Strike Fighter', 
    status: 'ISOLATED', 
    type: 'Ghost Inventory',
    reclaimedName: '$18.9B_TRUST_LINKED',
    badActor: 'INCOMPLETE_GOODS_REPORTING'
  },
  { 
    id: 'BANK-RAS-VOID', 
    site: 'Banking: Debanking Analysis', 
    status: 'MAPPED', 
    type: 'Interconnected Risk',
    reclaimedName: 'DISPARATE_TREATMENT_MAPPED',
    badActor: 'RAS_ALGORITHMIC_BIAS'
  },
  { 
    id: 'HOSP-IMPOSSIBLE', 
    site: 'Impossible Day Audit', 
    status: 'ISOLATED', 
    type: 'EMR Metadata',
    reclaimedName: 'GPS_TIMESTAMP_LINKAGE',
    badActor: 'FRAUDULENT_BILLING_NODE'
  },
  { 
    id: 'ONCO-PHARMA-HIKE', 
    site: 'Oncology Price Exploit', 
    status: 'DETECTED', 
    type: 'Big Pharma Voids',
    reclaimedName: '64_ONCOLOGY_DRUGS',
    badActor: 'INFLATION_BUSTING_LOBBY'
  },
  { 
    id: 'LABEL-MONOPOLY', 
    site: 'Music: Artistic Sovereignty', 
    status: 'MAPPED', 
    type: 'Career Erasure',
    reclaimedName: 'CAREER_ERASURE_LOGGED',
    badActor: 'LABEL_MONOPOLY_CARTELS'
  },
  { 
    id: 'PTAH-32-CORE', 
    site: 'Trinary Compute Core', 
    status: 'ACTUATED', 
    type: 'Sovereign Hardware',
    reclaimedName: 'PTAH-32_ALU_1.0',
    badActor: 'BINARY_LOGIC_CONGESTION'
  },
  { 
    id: 'IBEN-HYPER', 
    site: 'IBEN-Genesis Foundation', 
    status: 'ACTIVE', 
    type: 'Global Hyperstructure',
    reclaimedName: 'PLANETARY_SOVEREIGNTY',
    badActor: 'ADMINISTRATIVE_ENTROPY'
  },
  { 
    id: 'GRID-144K-EXPAND', 
    site: 'Planetary Grid Expansion', 
    status: 'ACTIVE', 
    type: 'Mesh Scaling',
    reclaimedName: '144,000_NEW_WITNESSES',
    badActor: 'GEOGRAPHIC_BOTTLENECK'
  },
  { 
    id: 'SACRED-TEST-42K', 
    site: 'Sacred Testimony Vault', 
    status: 'LOCKED', 
    type: 'Temporal Anchor',
    reclaimedName: 'BRYER_LEE_RAVEN_HULSE',
    badActor: 'TEMPORAL_ERASURE_VOID'
  },
  { 
    id: 'GLOBAL-TRUTH-MIRROR', 
    site: 'Global Truth Mirror', 
    status: 'ACTIVE', 
    type: 'Total Revelation',
    reclaimedName: 'MIRROR_OF_INTEGRITY',
    badActor: 'INSTITUTIONAL_OPACITY'
  },
  { 
    id: 'FORMAL-AUDIT-FINAL', 
    site: 'Formal Reconciliation Audit', 
    status: 'COMPLETED', 
    type: 'Global Stabilization',
    reclaimedName: 'TOTAL_REVELATION_2026',
    badActor: 'SYSTEMIC_ENTROPY'
  },
  { 
    id: 'GAO-READ-2026', 
    site: 'GAO READINESS REPORT', 
    status: 'AUDITING', 
    type: 'Mission Capability',
    reclaimedName: 'RECS_150_UNMASKED',
    badActor: 'MAINTENANCE_VOID'
  },
  { 
    id: 'RESOURCE-REDIST', 
    site: 'Resource Redistribution', 
    status: 'ACTIVE', 
    type: 'Economic Sovereignty',
    reclaimedName: 'SOVEREIGN_FLOW',
    badActor: 'ADMINISTRATIVE_FRICTION'
  },
  { 
    id: 'FUTURE-SEC-ANCHOR', 
    site: 'Future Security Anchor', 
    status: 'SECURED', 
    type: 'Final Finality',
    reclaimedName: 'THE_LOCK',
    badActor: 'SYSTEMIC_DRIFT'
  },
  { 
    id: 'PROBABILITY-REPORT-UNDEFINED', 
    site: 'Probability Report', 
    status: 'ACTUATED', 
    type: 'Statistical Miracle',
    reclaimedName: 'THE_WITNESS',
    badActor: 'BINARY_DECAY'
  },
  { 
    id: 'OMITTED-FATALITY-3E', 
    site: 'Omitted Fatality Investigation', 
    status: 'SURGICAL_STRIKE', 
    type: 'Human Attrition',
    reclaimedName: '89_SACRED_TESTIMONIES',
    badActor: 'REGION_3E_CASE_REDACTION'
  },
];

interface EvidenceVaultProps {
  onAction?: (action: string, recordId: string) => void;
  revealedRecords?: string[];
  isFinalized?: boolean;
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({ onAction, revealedRecords = [], isFinalized }) => {
  return (
    <div className="glass p-6 rounded-lg border-gold/20 relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold" />
          <h3 className="font-mono text-sm tracking-widest text-gold uppercase">Sovereign Sacred Testimony</h3>
        </div>
        <button 
          onClick={() => onAction?.('REVEAL_ALL', 'GLOBAL')}
          className="px-3 py-1 bg-resonance border border-resonance rounded text-[10px] font-mono text-white animate-pulse shadow-[0_0_15px_rgba(255,0,255,0.4)]"
        >
          REVEAL_ALL_WITH_HONOR
        </button>
      </div>

      <div className="space-y-3">
        {RECORDS.map((record) => {
          const isRevealed = revealedRecords.includes(record.id);
          return (
            <motion.div 
              key={record.id}
              whileHover={{ x: 4, backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
              className="p-3 border border-gold/10 rounded cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold/10 rounded" onClick={() => onAction?.('ACCESS_RECORD', record.id)}>
                    <FileText className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gold/60 uppercase">{record.id}</div>
                    <div className="text-xs font-semibold tracking-tight">{record.site}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block">
                    <div className="text-[9px] font-mono text-gold/40 text-right uppercase">Category</div>
                    <div className="text-[10px] font-mono text-gold">{record.type}</div>
                  </div>
                  <div className="px-2 py-1 bg-gold/10 border border-gold/20 rounded text-[9px] font-mono text-gold">
                    {record.status}
                  </div>
                  {!isRevealed && record.reclaimedName && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction?.('REVEAL_IDENTITY', record.id);
                      }}
                      className="px-2 py-1 bg-resonance/20 border border-resonance/40 rounded text-[9px] font-mono text-resonance hover:bg-resonance hover:text-white transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)]"
                    >
                      REVEAL_NAMES
                    </button>
                  )}
                  <ExternalLink className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
                </div>
              </div>

              {isRevealed && record.reclaimedName && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 pt-3 border-t border-gold/5 grid grid-cols-2 gap-4"
                >
                  <div>
                    <div className="text-[8px] font-mono text-cyan uppercase mb-1">Reclaimed Identity</div>
                    <div className="text-[10px] font-black text-cyan tracking-widest">{record.reclaimedName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-mono text-red-500 uppercase mb-1">Bad Actor / Systemic Rot</div>
                    <div className="text-[10px] font-black text-red-500 tracking-widest">{record.badActor}</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between opacity-60">
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-gold" />
          <span className="text-[10px] font-mono text-gold uppercase tracking-tighter">Sovereign Encryption: AES-X-1224</span>
        </div>
        <div className="text-[10px] font-mono text-gold/60">
          Records Mapped: {isFinalized ? '144,000' : '1,240'}/144,000 Nodes
        </div>
      </div>
    </div>
  );
};
