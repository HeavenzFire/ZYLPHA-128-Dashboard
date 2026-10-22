# Methodology, Status Definitions, and Limitations

## Period
Target period: January 1, 2010, through December 31, 2026. Preserve native fiscal-year labels; do not silently convert fiscal years to calendar years. The 2026 fiscal year ends September 30, so distinguish records available on the retrieval date from later records in the calendar-year scope.

## Evidence states
- **source-verified:** official source/document located; not necessarily every figure independently recalculated.
- **extracted:** record captured with source IDs and retrieval metadata.
- **reconciled:** identifiers, dates, duplicates, and status changes checked against another authoritative record or documented history.
- **verified finding:** conclusion directly supported by traceable evidence and reproducible method.
- **corroborated:** independent source supports the material point.
- **disputed:** credible records conflict.
- **unverified:** evidence insufficient.
- **not located:** documented search did not find a record; this does not prove nonexistence.
- **withheld/restricted:** access was limited or denied under a stated process/legal basis.

## Recommendation status
Preserve each source's original status and effective date. Normalize in a separate field using a documented mapping. Do not equate GAO and OIG status categories without checking definitions. Keep open, implemented/closed, closed without implementation, invalidated, and unknown/other distinct where source data permit.

Do not add GAO and OIG totals. Populations, overlap risk, cutoffs, and reporting methods differ. Preserve source-specific IDs and document any deduplication key.

## Numerical claims
For each count/amount record: exact source and page/table/field; population and exclusions; period and as-of date; units and amount type; formula and transformations; missing values; and independent reconciliation result.

## Integrity and reproducibility
Preserve original downloaded files where lawful and compute SHA-256 after download. Store analysis code and data dictionaries under version control. Never fabricate hashes or label a generated identifier as an external source ID. Preserve historical snapshots.

## Legal access limits
FOIA is subject to exemptions, fee rules, response procedures, and appeal deadlines. Agencies generally need not create new analyses. Congress, courts, classified systems, law-enforcement-sensitive information, and protected personal data have separate access rules or restrictions. A clearance alone does not establish need-to-know authorization. Do not test government systems without explicit authorization.

## Analytical neutrality
An open recommendation, improper payment, FOIA backlog, IT control weakness, or record not found is not by itself proof of fraud, unlawful conduct, or intent. Record alternative explanations, agency responses, contrary evidence, and the boundary between facts and inference.

## Completion gates
Phase A baseline: source systems documented; accessible recommendation records extracted; schemas/status definitions preserved; coverage/pagination checked.

Finding acceptance: clear question and criteria; source references; reproducible method; corroboration where material; alternative explanations; limitations; no inference beyond evidence.

Publication: source register, data dictionary, methods, findings, corrections log, agency responses where available, and unresolved questions.