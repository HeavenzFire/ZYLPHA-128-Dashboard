# Dashboard Integrity Review — Reconciliation Simulation Retired

**Review date:** 2026-11-13  
**Scope:** Existing dashboard implementation inspected before introducing the independent evidence engine.  
**Purpose:** Prevent simulated or hardcoded values from being mistaken for source-backed audit findings.

## Findings in the prior implementation

### 1. ReconciliationEngine did not reconcile source records

The previous src/components/ReconciliationEngine.tsx implementation:
- Declared five hardcoded nodes with example-looking case references.
- Set a progress loop to 500,000 or 499,997 iterations without loading 500,000 records.
- Generated five results from Math.random() status selection.
- Generated record IDs using Math.random().
- Created hashes from generated strings containing a node ID, random flag, and current time rather than hashes of source evidence.
- Labeled a SHA-256 digest as an Ed25519 signature without using an Ed25519 private key or signing operation.
- Included a collapseVoid action that overwrote a discrepancy as MATCH without any new source evidence.

These behaviors cannot support a real audit conclusion. A progress animation is not a data scan; a random status is not a reconciliation result; a digest is not a digital signature; and a status change is not proof that an underlying discrepancy was resolved.

### 2. Cryptography helper overstated its guarantees

The previous src/lib/cryptography.ts:
- Described its SHA-256 implementation as a pseudo-implementation even though it used Web Crypto SHA-256.
- Initialized an asynchronous genesis block from a constructor without awaiting initialization, creating a race in which addBlock could be called before the chain was ready.
- Used JSON.stringify as the serialization basis without canonical key ordering.
- Called the structure an ImmutableLedger even though the in-memory array could be changed by the running process and did not provide external tamper resistance.
- Included a simplified credential-shaped interface; that interface alone does not issue or verify W3C Verifiable Credentials.

SHA-256 is useful for integrity comparison. It does not authenticate the source, prove the content is true, establish authorship, or create a digital signature.

### 3. Evidence register contains a useful warning

The existing AuditEvidenceRegister explicitly says it is a source discovery and claim-triage list, not a live agency query. It also marks certain dashboard figures as unverified because no matching source report or calculation is linked. That warning should remain visible and should govern any future display of those metrics.

### 4. Hardcoded evidence-vault records require provenance review

The existing EvidenceVault component contains a static record array with status-like labels and named entities. Those values are not, by themselves, evidence of an independently verified case outcome. Each public claim needs a source, scope, date, method, and a clear evidence status. Personal or child-related information must not be displayed without a lawful basis and strict privacy review.

## Remediation applied in v0.1 branch

- Replaced the simulated reconciliation component with a disabled, explicit "source data required" state.
- Added a separate deterministic evidence engine under audit-engine/.
- Added a strict input contract, pseudonymous token requirement, event taxonomy, bounded coverage windows, conservative status rules, synthetic fixture, tests, and CI workflow.
- Explicitly state that no government system is connected and that the 145,000 claim remains unvalidated by this code.

## Required before production

1. Execute the test suite in CI and retain the run URL and logs.
2. Review all dashboard components for hardcoded totals, invented sample identities, randomized statuses, simulated crawler results, and unsupported "verified" language.
3. Replace sample values with visibly labeled synthetic fixtures or remove them.
4. Connect only source-backed, legally obtained, aggregate-safe datasets.
5. Have an independent reviewer validate source completeness, tokenization, cohort rules, query logic, and small-cell disclosure controls.
6. Keep the public display read-only until the source-to-result chain is independently reproducible.

## Conclusion

The previous dashboard UI was not evidence of a functioning federal-record reconciliation system. The new engine is a genuine software starting point, but it is not yet a production audit service and has not validated any child-level population or the 145,000 figure.
