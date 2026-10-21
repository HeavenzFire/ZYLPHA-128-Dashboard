import React from 'react';
import { ExternalLink, FileCheck2, AlertTriangle, ShieldCheck, CircleHelp } from 'lucide-react';

type EvidenceStatus = 'PRIMARY SOURCE' | 'CLAIM UNVERIFIED' | 'SCOPE TO CHECK';

interface EvidenceItem {
  id: string;
  agency: string;
  subject: string;
  status: EvidenceStatus;
  note: string;
  url: string;
  urlLabel: string;
}

const evidence: EvidenceItem[] = [
  {
    id: 'TX-SAO-27-001',
    agency: 'Texas State Auditor’s Office',
    subject: 'Regional Security Operations Center at Angelo State University',
    status: 'PRIMARY SOURCE',
    note: 'Official report listing confirms this audit exists. Read the report before asserting any specific deficiency.',
    url: 'https://sao.texas.gov/SAOReports/ReportNumber?id=27-001',
    urlLabel: 'Open report record'
  },
  {
    id: 'TX-SAO-27-002',
    agency: 'Texas State Auditor’s Office',
    subject: 'On-site financial audits of selected residential foster care contractors',
    status: 'PRIMARY SOURCE',
    note: 'Official report listing confirms this audit exists. Contractor-specific findings must be tied to the report text.',
    url: 'https://sao.texas.gov/SAOReports/',
    urlLabel: 'Search official reports'
  },
  {
    id: 'TX-SAO-27-003',
    agency: 'Texas State Auditor’s Office',
    subject: 'Offboarding processes at the Alcoholic Beverage Commission',
    status: 'PRIMARY SOURCE',
    note: 'Official report listing confirms this audit exists. Do not infer an individual case outcome from the report title.',
    url: 'https://sao.texas.gov/SAOReports/',
    urlLabel: 'Search official reports'
  },
  {
    id: 'TX-SAO-26-011',
    agency: 'Texas State Auditor’s Office',
    subject: 'Configuration and vulnerability management at the Department of Information Resources',
    status: 'PRIMARY SOURCE',
    note: 'A published state audit is available; the report is a lead for technology-control review, not proof of unrelated claims.',
    url: 'https://sao.texas.gov/SAOReports/',
    urlLabel: 'Search official reports'
  },
  {
    id: 'TX-SUNSET-2026-27',
    agency: 'Texas Sunset Advisory Commission',
    subject: 'Department of Family and Protective Services and other agencies under review',
    status: 'PRIMARY SOURCE',
    note: 'The official review schedule identifies agencies under review. Recommendations and implementation status must be checked individually.',
    url: 'https://www.sunset.texas.gov/reviews-and-reports',
    urlLabel: 'Open review schedule'
  },
  {
    id: 'SSA-OIG-INDEX',
    agency: 'Social Security Administration Office of the Inspector General',
    subject: 'SSA audit reports and recommendations',
    status: 'PRIMARY SOURCE',
    note: 'Use the official report index to identify the exact report, recommendation number, questioned costs, and follow-up status.',
    url: 'https://oig.ssa.gov/audit-reports/',
    urlLabel: 'Search SSA OIG reports'
  },
  {
    id: 'CLAIM-SSA-4-9B',
    agency: 'SSA / OIG claim shown in this dashboard',
    subject: '$4.9 billion questioned costs; 183 unimplemented recommendations',
    status: 'CLAIM UNVERIFIED',
    note: 'These figures appear in hardcoded UI strings. No matching source report or calculation is linked in the current implementation; do not present them as verified.',
    url: 'https://oig.ssa.gov/audit-reports/',
    urlLabel: 'Find a matching primary report'
  },
  {
    id: 'CLAIM-DOD-18-9B',
    agency: 'Defense / F-35 claim shown in this dashboard',
    subject: '$18.9 billion “ghost inventory” discrepancy',
    status: 'CLAIM UNVERIFIED',
    note: 'The current crawler uses a hardcoded message, not a live DoD or GAO data query. The exact report and calculation are still required.',
    url: 'https://www.gao.gov/',
    urlLabel: 'Search GAO reports'
  },
  {
    id: 'CLAIM-RAINS-3E',
    agency: 'Rains County / DFPS / Region 3E references',
    subject: 'Local records, custody, fatalities, and procedural-gap assertions',
    status: 'SCOPE TO CHECK',
    note: 'These references are not substantiated by the crawler logs themselves. Each specific event needs a dated, attributable public record or lawful records request.',
    url: 'https://www.dfps.texas.gov/About_DFPS/Reports_and_Presentations/',
    urlLabel: 'Open DFPS reports'
  }
];

const statusStyle: Record<EvidenceStatus, string> = {
  'PRIMARY SOURCE': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  'CLAIM UNVERIFIED': 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  'SCOPE TO CHECK': 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'
};

export const AuditEvidenceRegister: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <FileCheck2 className="w-5 h-5" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Zylpha 128 / Evidence Ledger</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Agency Audit — Source Register</h2>
          <p className="text-sm text-white/60 mt-2 max-w-3xl">
            Source discovery and claim triage. A source being listed does not establish that a dashboard allegation is true.
            No agency system is queried live by this register.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Hardcoded crawler metrics are not verified findings</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="glass rounded-lg border border-emerald-500/20 p-4">
          <ShieldCheck className="w-5 h-5 text-emerald-300 mb-2" />
          <div className="text-2xl font-bold font-mono">{evidence.filter(item => item.status === 'PRIMARY SOURCE').length}</div>
          <div className="text-xs uppercase tracking-wider text-white/50">Official source indexes / report leads</div>
        </div>
        <div className="glass rounded-lg border border-amber-500/20 p-4">
          <AlertTriangle className="w-5 h-5 text-amber-200 mb-2" />
          <div className="text-2xl font-bold font-mono">{evidence.filter(item => item.status === 'CLAIM UNVERIFIED').length}</div>
          <div className="text-xs uppercase tracking-wider text-white/50">Prominent numeric claims not sourced here</div>
        </div>
        <div className="glass rounded-lg border border-cyan-500/20 p-4">
          <CircleHelp className="w-5 h-5 text-cyan-200 mb-2" />
          <div className="text-2xl font-bold font-mono">{evidence.filter(item => item.status === 'SCOPE TO CHECK').length}</div>
          <div className="text-xs uppercase tracking-wider text-white/50">Case-specific leads awaiting records</div>
        </div>
      </div>

      <div className="space-y-3">
        {evidence.map(item => (
          <article key={item.id} className="glass rounded-lg border border-white/10 p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/40 mb-1">{item.id}</div>
                <h3 className="font-semibold text-white">{item.agency}</h3>
                <p className="text-sm text-cyan-100/90 mt-1">{item.subject}</p>
              </div>
              <span className={`self-start shrink-0 rounded border px-2 py-1 font-mono text-[10px] tracking-wider ${statusStyle[item.status]}`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mt-3">{item.note}</p>
            <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 text-xs font-mono text-cyan-200 hover:text-white underline underline-offset-4">
              {item.urlLabel}<ExternalLink className="w-3 h-3" />
            </a>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-xs text-white/50 leading-relaxed">
        <strong className="text-white/70">Evidence standard:</strong> promote a claim to “verified” only after recording the primary document URL, report or case identifier, publication date, page/section, exact finding, and the status of any recommendation. Record retrieval time and preserve the original source. Never treat a UI animation, keyword match, generated hash, or progress bar as external verification.
      </div>
    </section>
  );
};
