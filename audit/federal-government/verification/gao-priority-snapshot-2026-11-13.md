# Phase B — GAO Recommendation Snapshot Verification

**Audit date:** 2026-11-13  
**Workstream:** WS-01 — Oversight recommendations  
**Scope of this memo:** Verify the aggregate GAO baseline and five agency-specific priority recommendation snapshots already listed in the evidence register. This is not a complete recommendation-level extraction.

## Executive result

The six existing GAO snapshot claims were checked against official GAO product pages and, for the historical aggregate, the full accessible PDF of GAO-24-107146.

- The historical aggregate is confirmed: **43,203** recommendations made to federal agencies and Congress from FY2001 through March 2024; **5,480 open** and **37,723 closed** as of March 2024.
- The five 2026 agency priority snapshots are confirmed at **53 DoD**, **20 OMB**, **9 State**, **24 DOE**, and **39 DHS**.
- These five agency figures are **priority-open subsets**, not each agency's full inventory of GAO recommendations and not financial-loss estimates.
- The evidence register rows HF-FED-001 and HF-FED-011 through HF-FED-015 have been updated with exact report identifiers, publication/release dates, snapshot dates, count movement, and limitations.

## 1. GAO historical aggregate — GAO-24-107146

**Official product page:** https://www.gao.gov/products/gao-24-107146  
**Accessible PDF:** https://www.gao.gov/assets/880/871005.pdf  
**Published:** July 11, 2024  
**Snapshot cutoff:** March 2024  
**Relevant location:** Figure 1 and accessible data, report pages 3–4.

GAO states that it made **43,203** recommendations to federal agencies and Congress between FY2001 and March 2024. Of those, **5,480 remained open** and **37,723 were closed** as of March 2024.

Breakdown shown in Figure 1:
| Status | Before 2020 | 2020 or later | Total |
|---|---:|---:|---:|
| Open | 1,311 | 4,169 | 5,480 |
| Closed | 35,520 | 2,203 | 37,723 |
| Total | 36,831 | 6,372 | 43,203 |

Important definition: GAO says the closed category includes recommendations and matters for congressional consideration implemented by agencies/Congress and those closed because they were no longer valid. Of the closed recommendations, **4,526 were closed-no-longer-valid**. Therefore “closed” must not be reported as synonymous with “implemented.”

GAO also estimates that implementing a subset of about 4% of open recommendations could yield **$106 billion to $208 billion** in measurable financial benefits, using simulation. GAO explicitly notes that actual benefits depend on whether, how, and when recommendations are addressed; its simulation does not identify the benefit value of each individual recommendation. This range is not a current recoverable balance, a confirmed saving, a questioned-cost total, or proof of waste/fraud.

## 2. 2026 agency priority-open snapshots

The five source pages publish the report date and a “What GAO Found” narrative describing the movement in each priority list. The numbers below are GAO's priority-open snapshot totals, not full agency backlogs.

| Agency | GAO report | Published / public release | Snapshot | GAO-reported movement |
|---|---|---|---:|---|
| Department of Defense | [GAO-26-108980](https://www.gao.gov/products/gao-26-108980) | Jul 28 / Aug 4, 2026 | 53 | May 2025 baseline 79; 17 implemented; 7 added; priority removed from 16 |
| Office of Management and Budget | [GAO-26-108991](https://www.gao.gov/products/gao-26-108991) | Aug 4 / Aug 11, 2026 | 20 | Aug 2024 baseline 37; 11 implemented; 7 added; priority removed from 5; 8 closed as no longer valid |
| Department of State | [GAO-26-109086](https://www.gao.gov/products/gao-26-109086) | Sep 1 / Sep 8, 2026 | 9 | Apr 2025 baseline 13; 6 implemented; priority removed from 2; 4 added |
| Department of Energy | [GAO-26-109001](https://www.gao.gov/products/gao-26-109001) | Jul 2 / Jul 9, 2026 | 24 | Apr 2025 baseline 30; 5 implemented; 1 added; priority removed from 2 |
| Department of Homeland Security | [GAO-26-109077](https://www.gao.gov/products/gao-26-109077) | Jul 20 / Jul 27, 2026 | 39 | May 2025 baseline 39; 5 implemented; 2 closed as no longer valid; 7 added |

### Interpretation

1. A priority designation is GAO's signal that a recommendation warrants priority attention; it is not a finding that an agency committed fraud or incurred a loss.
2. A recommendation can leave the priority list because it was implemented, because priority status was removed, or because it was closed as no longer valid. Those are distinct events and must remain distinct in the normalized data.
3. A snapshot count is not a cumulative count of all recommendations ever issued to an agency.
4. The reports identify substantive oversight topics. For example, the DoD report highlights readiness, weapon-system acquisition/modernization, and financial/fraud-risk management; OMB highlights federal fraud risks, improper payments, and a federal program inventory; State highlights fraud-risk management and oversight of security assistance; DOE highlights nuclear modernization, environmental liabilities, and energy security; DHS highlights disaster response, IT/cybersecurity, and immigration/border data. Topic labels do not establish misconduct.
5. The reports' summary pages verify counts and movement, but do not substitute for recommendation-by-recommendation extraction, status histories, agency response review, or independent implementation testing.

## 3. Reconciliation arithmetic

The report narratives describe how each priority list changed. Arithmetic checks:
- DoD: 79 − 17 + 7 − 16 = 53.
- OMB: 37 − 11 + 7 − 5 − 8 = 20.
- State: 13 − 6 − 2 + 4 = 9.
- DOE: 30 − 5 + 1 − 2 = 24.
- DHS: 39 − 5 − 2 + 7 = 39.

These are arithmetic reconciliations of GAO's published narrative, not independent re-computations from the underlying recommendation-level database.

## 4. What remains unverified / next steps

- Recommendation-level identifiers, original recommendation text, issue dates, status dates, and source-defined closure reasons for every item in the five lists.
- Whether any status changed after each report's cutoff.
- Whether agency closure assertions are supported by implementation evidence or follow-up audits.
- The current complete GAO recommendation population for the 2010–2026 audit period.
- A separate, timestamped Oversight.gov/CIGIE extraction. Do not add its counts to GAO totals; the populations and status taxonomies differ.
- Any link between a GAO recommendation and a specific award, questioned cost, financial statement, or recoverable amount.

## 5. Reproducibility and provenance

- Source pages were retrieved on 2026-11-13.
- GAO-24-107146 PDF was parsed from the official GAO URL; page references above point to its Figure 1 and accessible data on pages 3–4.
- The 2026 priority counts and publication/release dates were transcribed from each official GAO product page's Highlights / What GAO Found section.
- No GAO recommendation API or database export was downloaded in this phase.
- No data were generated from UI counters, crawler strings, keyword matches, or model-generated metrics.
- The machine-readable snapshot table is `gao-priority-snapshot.csv`.
- The evidence register is `../evidence-register.csv`.

## 6. Parallel work

Issue [#5 — Parallel GPT workstream](https://github.com/HeavenzFire/ZYLPHA-128-Dashboard/issues/5) is the independent assignment for a second worker to verify the same historical baseline, extract recommendation-level records, and inspect Oversight.gov separately. The second worker should submit a separate PR and not edit this branch.
