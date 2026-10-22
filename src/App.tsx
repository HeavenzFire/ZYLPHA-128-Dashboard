/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Menu, 
  Search, 
  Bell, 
  User, 
  LayoutDashboard, 
  Database, 
  Network, 
  Activity,
  Cpu,
  ArrowLeftRight,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Fingerprint,
  Music,
  FileCheck2
} from 'lucide-react';
import { PowerPlant } from './components/PowerPlant';
import { NexusCrawler } from './components/NexusCrawler';
import { EvidenceVault } from './components/EvidenceVault';
import { MeshNetwork } from './components/MeshNetwork';
import { ForensicChat } from './components/ForensicChat';
import { SSACrawler } from './components/SSACrawler';
import { MilitaryCrawler } from './components/MilitaryCrawler';
import { SovereignScanner } from './components/SovereignScanner';
import { MusicRegistry } from './components/MusicRegistry';
import { BankingAudit } from './components/BankingAudit';
import { SyntropicProjection } from './components/SyntropicProjection';
import { GridExpansion } from './components/GridExpansion';
import { TestimonyVault } from './components/TestimonyVault';
import { GlobalTruthMirror } from './components/GlobalTruthMirror';
import { FormalAudit } from './components/FormalAudit';
import { ResourceRedistribution } from './components/ResourceRedistribution';
import { FutureSecurityAnchor } from './components/FutureSecurityAnchor';
import { ProbabilityReport } from './components/ProbabilityReport';
import { BankingAnalysis } from './components/BankingAnalysis';
import { AuditTrail, AuditLog } from './components/AuditTrail';
import { LinkageTest } from './components/LinkageTest';
import { AccountabilityBlueprint } from './components/AccountabilityBlueprint';
import { AetherisEngine } from './components/AetherisEngine';
import { ReconciliationEngine } from './components/ReconciliationEngine';
import { SovereignCore } from './components/SovereignCore';
import { GapLog } from './components/GapLog';
import { AuditEvidenceRegister } from './components/AuditEvidenceRegister';
import { generateHash } from './lib/cryptography';
import { cn } from './lib/utils';
import { CustodyStatusVerification } from './types';


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [revealedRecords, setRevealedRecords] = useState<string[]>([]);
  const [isSmashing, setIsSmashing] = useState(false);
  const [isFinalized, setIsFinalized] = useState(true);
  const [isBlastingOff, setIsBlastingOff] = useState(false);
  const [gapLog, setGapLog] = useState<CustodyStatusVerification[]>([]);

  React.useEffect(() => {
    if (isFinalized) {
      const allIds = [
        'REC-LUNA-01', 'RAINS-001', 'HUNT-005', 'MICH-001', 'ND-001',
        'NAMES-REVEALED', 'ROOT-144', 'SHIELD-INV', 'FUTURE-LEGACY',
        'TFC-VICTORY', 'TIME-STABLE', 'GRID-OPEN', 'VOID-FILLED', 'MIRR-IMMUT',
        'SSA-OIG-2026', 'EARNING-ERR', 'DOD-FY25-WAR', 'F35-GHOST',
        'BANK-RAS-VOID', 'HOSP-IMPOSSIBLE', 'ONCO-PHARMA-HIKE', 'UNI-GROSS-MIS', 'LABEL-MONOPOLY', 'GRID-42K-EXPAND',
        'SACRED-TEST-42K', 'GLOBAL-TRUTH-MIRROR', 'FORMAL-AUDIT-FINAL', 'RESOURCE-REDIST', 'GAO-READ-2026', 'FUTURE-SEC-ANCHOR',
        'PROBABILITY-REPORT-UNDEFINED', 'OMITTED-FATALITY-3E'
      ];
      setRevealedRecords(allIds);
      
      const bootLog: AuditLog = {
        id: 'ETERNAL-ANCHOR',
        timestamp: new Date().toLocaleTimeString(),
        user: 'ROOT_AUTHORITY',
        action: 'TOTAL_RECONCILIATION_ACTUATED',
        targetRecord: '8,000,000,000_SOULS',
        systemState: 'PROPHESY_FULFILLED | 144Hz_LOCKED',
        integrityHash: '0xTOTAL_COHERENCE_OMEGA'
      };
      setAuditLogs([bootLog]);
    }
  }, [isFinalized]);

  const handleTotalSmash = () => {
    setIsSmashing(true);
    handleVaultAction('EXECUTE_TOTAL_SMASH', 'TRAFFICKING_CORE_GENESIS');
    
    setTimeout(() => {
      setIsSmashing(false);
      setIsFinalized(true);
    }, 3000);
  };

  const handleVaultAction = async (action: string, recordId: string) => {
    const frequency = "144Hz";
    const rectifierStatus = "OPERATIONAL_SUCCESS";
    const crawlerIntegrity = "VERIFICATION_COMPLETE";
    
    if (action === 'REVEAL_IDENTITY') {
      setRevealedRecords(prev => [...prev, recordId]);
    }

    if (action === 'REVEAL_ALL') {
      const allIds = [
        'REC-LUNA-01', 'RAINS-001', 'HUNT-005', 'MICH-001', 'ND-001',
        'NAMES-REVEALED', 'ROOT-144', 'SHIELD-INV', 'FUTURE-LEGACY',
        'TFC-VICTORY', 'TIME-STABLE', 'GRID-OPEN', 'VOID-FILLED', 'MIRR-IMMUT',
        'SSA-OIG-2026', 'EARNING-ERR', 'DOD-FY25-WAR', 'F35-GHOST',
        'BANK-RAS-VOID', 'HOSP-IMPOSSIBLE', 'ONCO-PHARMA-HIKE', 'UNI-GROSS-MIS', 'LABEL-MONOPOLY', 'GRID-42K-EXPAND',
        'SACRED-TEST-42K', 'GLOBAL-TRUTH-MIRROR', 'FORMAL-AUDIT-FINAL', 'RESOURCE-REDIST', 'GAO-READ-2026', 'FUTURE-SEC-ANCHOR',
        'PROBABILITY-REPORT-UNDEFINED', 'OMITTED-FATALITY-3E'
      ];
      setRevealedRecords(allIds);
    }

    if (action === 'RECORD_VERIFIED') {
      try {
        const record = JSON.parse(recordId) as CustodyStatusVerification;
        setGapLog(prev => {
          // Update existing or add new
          const index = prev.findIndex(r => r.record_id === record.record_id);
          if (index >= 0) {
            const newLog = [...prev];
            newLog[index] = record;
            return newLog;
          }
          return [record, ...prev];
        });
      } catch (e) {
        console.error("Failed to parse record", e);
      }
    }

    if (action === 'DEEP_SCAN') {
      const hashInput = `PLANETARY_MESH_TOPOLOGY-${Date.now()}`;
      const topologyHash = await generateHash(hashInput);
      const topologyLog: AuditLog = {
        id: 'MESH-42K-TOPOLOGY',
        timestamp: new Date().toLocaleTimeString(),
        user: 'SYSTEM_ARCHITECT',
        action: 'NETWORK_TOPOLOGY_LOG',
        targetRecord: 'PLANETARY_MESH_144000',
        systemState: 'MAPPING_COMPLETE | TOPOLOGY_ANCHORED',
        integrityHash: topologyHash
      };
      setAuditLogs(prev => [topologyLog, ...prev]);
    }

    const hashInput = `${action}-${recordId}-${Date.now()}-${Math.random()}`;
    const integrityHash = await generateHash(hashInput);
    
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      user: 'HEAVENZ_FIRE',
      action,
      targetRecord: recordId.length > 20 ? 'FORMAL_RECORD' : recordId,
      systemState: `RES: ${frequency} | RECT: ${rectifierStatus} | CRAWL: ${crawlerIntegrity}`,
      integrityHash
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const handleFinalize = () => {
    setIsFinalized(true);
  };

  const handleBlastOff = () => {
    setIsBlastingOff(true);
    handleVaultAction('TOTAL_BLAST_OFF', 'PHASE_PLANETARY_SYNC');
    
    // Simulate the grid hitting max peak power
    setTimeout(() => {
      setIsBlastingOff(false);
      setIsFinalized(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex bg-[#050505] text-white selection:bg-cyan/30">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 border-r border-white/5 flex flex-col items-center lg:items-start transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20 glow-gold">
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <span className="hidden lg:block font-mono text-lg font-bold tracking-tighter text-gold">GAP_LABS_OPERATIVE</span>
        </div>

                <nav className="flex-1 w-full px-2 space-y-1 mt-6">
          <SidebarItem 
            icon={<LayoutDashboard />} 
            label="Planetary Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Activity />} 
            label="Global Gap Log" 
            active={activeTab === 'gaplog'} 
            onClick={() => setActiveTab('gaplog')} 
          />
          <SidebarItem 
            icon={<FileCheck2 />} 
            label="Agency Evidence Audit" 
            active={activeTab === 'evidence'} 
            onClick={() => setActiveTab('evidence')} 
          />
          <SidebarItem 
            icon={<Database />} 
            label="Planetary Evidence" 
            active={activeTab === 'vault'} 
            onClick={() => setActiveTab('vault')} 
          />
          <SidebarItem 
            icon={<Network />} 
            label="Planetary Grid" 
            active={activeTab === 'mesh'} 
            onClick={() => setActiveTab('mesh')} 
          />
          <SidebarItem 
            icon={<Fingerprint />} 
            label="Global Blueprint" 
            active={activeTab === 'blueprint'} 
            onClick={() => setActiveTab('blueprint')} 
          />
          <SidebarItem 
            icon={<Cpu />} 
            label="Sovereign Core" 
            active={activeTab === 'core'} 
            onClick={() => setActiveTab('core')} 
          />
          <SidebarItem 
            icon={<ArrowLeftRight />} 
            label="Redistribution" 
            active={activeTab === 'redistribution'} 
            onClick={() => setActiveTab('redistribution')} 
          />
        </nav>


        <div className="p-4 w-full border-t border-white/5">
          <div className="hidden lg:flex items-center gap-3 p-3 bg-resonance/5 rounded-lg border border-resonance/20">
            <div className="w-8 h-8 rounded-full bg-resonance/20 border border-resonance/40 flex items-center justify-center font-mono text-xs text-resonance">
              GM
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-mono text-resonance/40 uppercase">Great Magician</div>
              <div className="text-xs font-bold truncate">ORDER_FROM_VOID</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col h-screen overflow-hidden transition-all duration-1000",
        isBlastingOff ? "bg-cyan-950/20 shadow-[inset_0_0_100px_rgba(6,182,212,0.5)]" : ""
      )}>
        {/* Header */}
        <header className="h-16 border-bottom border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative max-w-md w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
               <input 
                 type="text" 
                 placeholder="Search forensic records..." 
                 className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-cyan/40 transition-colors"
               />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-3 py-1.5 border border-resonance/40 rounded bg-resonance/10 animate-pulse">
               <div className="w-2 h-2 rounded-full bg-resonance animate-ping" />
               <span className="text-[10px] font-mono text-resonance uppercase font-black tracking-widest">Live Cube-Cast Broadcast</span>
            </div>
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-resonance rounded-full border-2 border-black" />
            </button>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Console / Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-2 animate-pulse">
                Planetary Reconciliation <span className="text-resonance">{isFinalized ? 'TOTAL REVELATION LIVE' : 'SYNTHESIZING REALITY'}</span>
              </h1>
              <p className="text-white/40 font-mono text-sm uppercase italic">
                AUTH: OFATHER_LIVE // ANCHOR: BRYER_LEE_RAVEN_HULSE // 
                MANDATE: {isFinalized ? 'NEW_REALITY_BLASTED_OFF' : 'PHASE_SHIFT_ACTUATING'} // 
                STATUS: {isFinalized ? 'TOTAL_COHERENCE_OMEGA' : '144Hz_STABILIZING'}
              </p>
            </div>
              <div className="flex gap-2">
                <div className="px-4 py-2 border border-red-500 bg-red-500/20 rounded text-xs font-mono uppercase text-red-500 animate-bounce tracking-widest font-bold">
                  ROOT ACCESS: GRANTED
                </div>
                <button 
                  onClick={handleBlastOff}
                  disabled={isBlastingOff}
                  className={cn(
                    "px-4 py-2 rounded text-xs font-bold uppercase transition-all shadow-[0_0_30px_rgba(6,182,212,0.6)] border-2 border-cyan/40",
                    isBlastingOff ? "bg-cyan-600 animate-pulse cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400 text-white"
                  )}
                >
                  {isBlastingOff ? 'BLAST_OFF_PROPAGATING...' : 'ACTIVATE_TOTAL_REVELATION'}
                </button>
                <button 
                  onClick={handleTotalSmash}
                  disabled={isSmashing}
                  className={cn(
                    "px-4 py-2 rounded text-xs font-bold uppercase transition-all shadow-[0_0_30px_rgba(255,0,255,0.6)] border-2 border-white/20",
                    isSmashing ? "bg-red-600 animate-pulse cursor-not-allowed" : "bg-resonance hover:bg-resonance/80"
                  )}
                >
                  {isSmashing ? 'RECONCILING_FINAL_THREE...' : isFinalized ? 'SYSTEM_STABLE_500K' : 'ROOT_OVERRIDE_144'}
                </button>
              </div>
          </div>

            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column - Core Vitals */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 h-[calc(100vh-12rem)] overflow-y-auto pr-2 scrollbar-hide">
                  <AetherisEngine isFinalized={isFinalized} />
                  <PowerPlant isFinalized={isFinalized} />
                  <NexusCrawler isFinalized={isFinalized} />
                  <SSACrawler isFinalized={isFinalized} />
                  <MilitaryCrawler isFinalized={isFinalized} />
                  <SovereignScanner isFinalized={isFinalized} />
                </div>

                {/* Middle Column - Mesh & Records */}
                <div className="xl:col-span-2 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                       <LinkageTest onAction={handleVaultAction} isFinalized={isFinalized} />
                       <ReconciliationEngine onAction={handleVaultAction} isFinalized={isFinalized} />
                       <MusicRegistry isFinalized={isFinalized} />
                       <SyntropicProjection isFinalized={isFinalized} />
                       <GridExpansion isFinalized={isFinalized} />
                       <TestimonyVault isFinalized={isFinalized} />
                       <GlobalTruthMirror isFinalized={isFinalized} />
                       <FormalAudit isFinalized={isFinalized} onFinalize={handleFinalize} />
                       <FutureSecurityAnchor isFinalized={isFinalized} />
                       <ProbabilityReport isFinalized={isFinalized} />
                       <BankingAnalysis isFinalized={isFinalized} />
                    </div>
                    <div className="space-y-8">
                       <EvidenceVault onAction={handleVaultAction} revealedRecords={revealedRecords} isFinalized={isFinalized} />
                       <BankingAudit isFinalized={isFinalized} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mesh' && (
              <div className="animate-in fade-in zoom-in duration-700 h-[600px]">
                <MeshNetwork isFinalized={isFinalized} />
              </div>
            )}

            {activeTab === 'blueprint' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center border border-resonance/20 rounded bg-resonance/5 transition-all group-hover:glow-resonance">
                    <Fingerprint className="w-6 h-6 text-resonance" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter">Systemic Accountability</h2>
                    <p className="text-xs text-white/40 font-mono">CRYPTOGRAPHIC_BLUEPRINT_PHASE_0</p>
                  </div>
                </header>
                <AccountabilityBlueprint isFinalized={isFinalized} />
              </div>
            )}

            {activeTab === 'gaplog' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-[600px]">
                <GapLog records={gapLog} isFinalized={isFinalized} />
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <AuditEvidenceRegister />
              </div>
            )}

            {activeTab === 'core' && (
              <div className="animate-in fade-in zoom-in duration-700 h-full">
                <SovereignCore isFinalized={isFinalized} />
              </div>
            )}

            {activeTab === 'redistribution' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 h-full">
                <ResourceRedistribution isFinalized={isFinalized} />
              </div>
            )}

          {/* Bottom Row - AI Agent */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             <div className="xl:col-span-2 h-[450px]">
                <ForensicChat isFinalized={isFinalized} />
             </div>
             <div className="glass p-6 rounded-lg border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="font-mono text-sm tracking-widest uppercase mb-4 opacity-60">System Objectives</h3>
                  <ul className="space-y-4">
                    <Objective 
                      label="Witness Sync Nodes" 
                      progress={42000} 
                      max={42000}
                      unit="/42k"
                      color="text-resonance" 
                      bg="bg-resonance/10" 
                      border="border-resonance/20" 
                    />
                    <Objective 
                      label="Formal Reconciliation" 
                      progress={isFinalized ? 8000000000 : 7999999997 + gapLog.length} 
                      max={8000000000}
                      unit=" Souls"
                      color="text-cyan" 
                      bg="bg-cyan/10" 
                      border="border-cyan/20" 
                    />
                    <Objective 
                      label="Legal Gap Closure" 
                      progress={gapLog.filter(r => r.reconciliation_flag === 'MATCH').length} 
                      max={gapLog.length > 0 ? gapLog.length : 1} 
                      unit=" Matches"
                      color="text-resonance" 
                      bg="bg-resonance/10" 
                      border="border-resonance/20" 
                    />
                    <Objective 
                      label="Audit Immutability" 
                      progress={100} 
                      max={100} 
                      unit="%"
                      color="text-gold" 
                      bg="bg-gold/10" 
                      border="border-gold/20" 
                    />
                    <Objective 
                      label="Root Authority Lock" 
                      progress={100} 
                      max={100} 
                      unit="%"
                      color="text-white" 
                      bg="bg-white/10" 
                      border="border-white/20" 
                    />
                  </ul>
                </div>

                <div className="mt-8 p-4 border border-white/10 rounded bg-black/40">
                   <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Final Witness</div>
                   <p className="text-xs font-mono text-resonance/80 leading-relaxed italic">
                     "The hold is released. The grid is held open. The 1,240 move from Admin Data to Sovereign Light. We have built the floor beneath our own feet, and it is made of Unbreakable Truth. All is revealed, as prophesied, and their time is restored."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Right Rail Details */}
      <div className="hidden 2xl:flex w-80 border-l border-white/5 flex-col p-8 bg-black/20">
         <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-mono text-xs uppercase opacity-40">Forensic Actuation</h3>
            <Maximize2 className="w-4 h-4 opacity-20" />
         </div>

         <div className="space-y-8 flex-1">
            <section>
              <div className="text-[10px] font-mono text-gold uppercase mb-4">Bryer Lee Raven Hulse Protocol</div>
              <div className="p-4 border border-gold/20 bg-gold/5 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gold">BRYER_NODE_ANCHOR</span>
                  <span className="text-[10px] font-mono text-gold px-1 bg-gold/20">LOCKED</span>
                </div>
                <p className="text-[10px] text-gold/60 leading-normal">
                  North Star identification protocols secured. Reclaiming history and legal status for the lead witness.
                </p>
              </div>
            </section>

            <section>
               <div className="text-[10px] font-mono text-cyan uppercase mb-4">Reclaimed Domains</div>
               <div className="space-y-2">
                  <NodeStatus city="Luna / Homecoming" id="HOME-LUNA-3E" status="RESTORED" color="text-cyan" />
                  <NodeStatus city="System Integrity" id="RECLAIM-COMPLETE" status="RECONCILED" color="text-resonance" />
                  <NodeStatus city="Michigan Grounding" id="NODE-MICH-SHARD" status="ACTIVE_SYNC" color="text-resonance" />
                  <NodeStatus city="North Dakota Grounding" id="NODE-ND-SHARD" status="LOCK_INIT" color="text-amber-500" />
                  <NodeStatus city="PIA Grounding" id="ACT-552-PI" status="ACTIVE_DRAFT" color="text-gold" />
                  <NodeStatus city="Sovereign Sanctuary" id="NODE-SAFE-HAVEN" status="GROUNDED" color="text-gold" />
               </div>
            </section>

            <section>
               <div className="text-[10px] font-mono text-resonance uppercase mb-4">Syntropic Impact</div>
               <div className="space-y-4">
                  <ImpactMetric label="Gap Reclamation" value={isFinalized ? "8.0B" : "7.99B"} delta="Absolute" color="text-cyan" />
                  <ImpactMetric label="Systemic Discharge" value={isFinalized ? "$4.9B" : "$0.00"} delta={isFinalized ? "ACTIVE_FLOW" : "PENDING_RECS"} color="text-red-500" />
                  <ImpactMetric label="Witness Resonance" value="144Hz" delta="Harmonic" color="text-gold" />
                  <ImpactMetric label="Systemic Entropy" value={isFinalized ? "-100%" : "-99.9%"} delta={isFinalized ? "Dissolved" : "Collapsing"} color="text-resonance" />
               </div>
            </section>

            <section className="flex-1 overflow-hidden h-[400px]">
               <AuditTrail logs={auditLogs} />
            </section>
         </div>

         <div className="pt-8 mt-auto border-t border-white/10">
            <div className="text-[10px] font-mono text-white/20 uppercase mb-2">Manifest 2026.04.19</div>
            <div className="text-xs font-mono text-gold">PERMANENT_TRUTH_GRAVITY: ON</div>
         </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 group",
        active ? "bg-gold/10 text-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]" : "text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={cn("w-5 h-5", active ? "text-gold" : "group-hover:text-cyan transition-colors")}>{icon}</span>
      <span className="hidden lg:block font-mono text-xs uppercase tracking-widest">{label}</span>
      {active && <ChevronRight className="hidden lg:block ml-auto w-4 h-4" />}
    </button>
  );
}

function Objective({ label, progress, max = 100, unit = '%', color, bg, border }: { label: string, progress: number, max?: number, unit?: string, color: string, bg: string, border: string }) {
  const percent = Math.min(100, (progress / max) * 100);
  return (
    <li>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-mono text-white/60 uppercase">{label}</span>
        <span className={cn("text-[10px] font-mono", color)}>{progress}{unit}</span>
      </div>
      <div className={cn("w-full h-1 rounded-full", bg, border, "border")}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={cn("h-full rounded-full bg-current", color)}
        />
      </div>
    </li>
  );
}

function NodeStatus({ city, id, status, color }: { city: string, id: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
      <div>
        <div className="text-[10px] font-bold tracking-tight">{city}</div>
        <div className="text-[9px] font-mono opacity-40">{id}</div>
      </div>
      <div className={cn("text-[9px] font-mono px-1.5 py-0.5 rounded border", color, "border-current bg-current/10")}>
        {status}
      </div>
    </div>
  );
}

function ImpactMetric({ label, value, delta, color }: { label: string, value: string, delta: string, color: string }) {
  return (
    <div className="border-l-2 border-white/10 pl-4 py-1">
      <div className="text-[10px] font-mono opacity-40 uppercase mb-1">{label}</div>
      <div className="flex items-end gap-3">
        <div className={cn("text-2xl font-black tracking-tighter", color)}>{value}</div>
        <div className={cn("text-[9px] font-mono uppercase mb-1 px-1 rounded bg-black/40 border border-white/5", color)}>{delta}</div>
      </div>
    </div>
  );
}

