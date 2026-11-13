import React from 'react';
import { AlertTriangle, Database, ShieldAlert } from 'lucide-react';

interface ReconciliationEngineProps {
  onAction?: (action: string, recordId: string) => void;
  isFinalized?: boolean;
}

/**
 * Safety stop: the former component simulated a 500,000-record scan,
 * generated random outcomes for five hardcoded records, and labeled a
 * SHA-256 digest as an Ed25519 signature. It did not reconcile source data.
 *
 * Keep this panel disabled until the independent evidence engine is connected
 * to a lawful, source-backed, aggregate-safe dataset.
 */
export const ReconciliationEngine: React.FC<ReconciliationEngineProps> = () => {
  return (
    <section
      role="status"
      aria-live="polite"
      className="glass p-6 rounded-lg border border-amber-500/30 relative overflow-hidden h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <ShieldAlert className="w-5 h-5 text-amber-300" />
        <h3 className="font-mono text-sm tracking-widest text-amber-200 uppercase">
          RECONCILIATION ENGINE — SOURCE DATA REQUIRED
        </h3>
      </div>

      <div className="flex items-start gap-3 rounded border border-amber-500/20 bg-amber-500/5 p-4">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-300" />
        <div>
          <p className="text-sm font-semibold text-white">
            Automated reconciliation is disabled.
          </p>
          <p className="text-xs leading-relaxed text-white/65 mt-1">
            No government records or verified aggregate dataset are currently connected.
            This panel will not simulate record counts, invent matches, or label generated
            hashes as digital signatures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <Database className="w-4 h-4 text-cyan-300 mb-2" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
            Input requirement
          </div>
          <div className="text-sm text-white/80 mt-1">
            Source-backed aggregate events with documented coverage and provenance
          </div>
        </div>
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <ShieldAlert className="w-4 h-4 text-cyan-300 mb-2" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
            Privacy requirement
          </div>
          <div className="text-sm text-white/80 mt-1">
            Pseudonymous tokens only; no child or sponsor personal identifiers
          </div>
        </div>
      </div>

      <p className="text-[10px] font-mono uppercase tracking-wider text-white/35 mt-4">
        State: NOT RUN · No records processed · No findings generated
      </p>
    </section>
  );
};
