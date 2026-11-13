# HeavenzFire Federal Government Audit

**Scope:** U.S. federal government, cross-agency baseline  
**Period:** 2010–2026 inclusive  
**Workstreams:** oversight recommendations; spending/procurement; FOIA transparency; regulatory accountability; information-system controls.  
**Status:** Phase A source baseline established; full data extraction and reconciliation pending.

## Principles
1. Trace every material claim to an identifiable source.
2. Distinguish source facts, analyst calculations, allegations, and open questions.
3. Do not treat an open recommendation, improper payment, missing record, or control weakness as proof of fraud or intentional misconduct.
4. Preserve source URL, identifier, publication date, retrieval date, version, and SHA-256 for downloaded files where lawful.
5. Document conflicting evidence and limitations.
6. Do not call a dataset complete until coverage, filters, pagination, and date range have been validated.
7. Use lawful public sources and authorized records-access pathways only.

## Work products
- [FOIA transparency baseline (Phase C)](verification/foia-transparency-baseline-2026-11-13.md)
- [FOIA FY2010–FY2025 archive inventory](verification/foia-archive-inventory.csv)
- [USAspending award-obligation validation sample (Phase D)](verification/usaspending-award-sample-2026-11-13.md)
- [USAspending FY2010/FY2025 agency sample CSV](verification/usaspending-agency-sample-2010-2025.csv)
- [USAspending award-category and agency-budgetary cross-check CSV](verification/usaspending-category-budgetary-sample-2026-11-13.csv)
- [USAspending top-tier agency-code reference (111 records)](verification/usaspending-toptier-agency-reference-2026-11-13.csv)
- [Evidence register](evidence-register.csv)
- [Workstream plan](workstreams.md)
- [Records-request drafts](records-requests.md)
- [Source registry](source-registry.md)
- [Methodology and limitations](methodology.md)

## Phase D spending-data validation
- Six official USAspending API agency-year records were extracted for DoD, HHS, and VA in FY2010 and FY2025. The nominal endpoint calculations and their limitations are documented in the Phase D memo; this is not a government-wide total or representative sample.

## Phase C source baseline
- FOIA.gov's official download page lists all-agency CSV ZIP archives for FY2010–FY2025 (16 fiscal years). Archive contents have not yet been downloaded or parsed; FY2026 is not listed on the captured page. See the Phase C memo and inventory.

## Phase A initial findings
- GAO report GAO-24-107146 reported 5,480 open recommendations as of March 2024, from a population of recommendations issued since FY2001. This is a historical snapshot, not a 2010–2026 count.
- Oversight.gov provides a live inspector-general recommendations database. Its total must be timestamped and must not be added to GAO totals because populations and status systems differ.
- GAO publishes agency-specific priority-recommendation reports. These are leads, not complete agency backlogs.
- GAO's FY2025 financial-audit and improper-payment reporting identifies government-wide control/reporting issues; improper payments are not synonymous with fraud.
- FOIA.gov provides annual and quarterly agency processing data for reproducible comparisons.

## Completion criteria
Phase A is complete only after recommendation-level records are extracted for the period, source coverage and status definitions are documented, duplicates are reconciled, and annual/agency totals can be reproduced.

This repository stores the audit plan and evidence ledger. External sources remain authoritative for their own records. Stored values are dated snapshots, not live data. Preserve historical snapshots rather than silently overwriting them.