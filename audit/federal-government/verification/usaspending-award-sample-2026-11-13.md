# Phase D — USAspending award-obligation validation sample

**Audit period:** FY2010–FY2026  
**Capture date:** 2026-11-13  
**Workstream:** WS-02 — Spending, procurement, grants, and financial controls  
**Status:** Six official agency-year API records retrieved successfully; exploratory sample only. No government-wide totals or misconduct findings are asserted.

## 1. Objective and method

This phase tests whether the official USAspending API can return comparable agency-year award-obligation summaries for an early and a recent fiscal year. We queried the documented API v2 agency endpoint for three top-tier agencies (DoD, HHS, VA), for FY2010 and FY2025:

`GET /api/v2/agency/{toptier_code}/?fiscal_year={year}`

Each request returned one agency record, `complete=true`, HTTP 200, no warning, and no pagination cursor. The provider schema was `1.0.0`; source vintage was 2026-11-13. Exact query URLs and retrieval timestamps are preserved in `usaspending-agency-sample-2010-2025.csv`.

## 2. Retrieved source values

The source describes `awards_summary.obligations` as transaction-level award obligations in the fiscal year, in nominal USD. It separately reports the fiscal-year transaction count.

| Agency | FY2010 obligations | FY2010 transactions | FY2025 obligations | FY2025 transactions |
|---|---:|---:|---:|---:|
| Department of Defense | $375,725,708,749.04 | 1,582,499 | $536,892,406,509.15 | 4,532,782 |
| Department of Health and Human Services | $630,821,483,531.40 | 225,446 | $2,024,158,622,976.80 | 330,557 |
| Department of Veterans Affairs | $18,732,082,329.27 | 264,463 | $288,167,067,230.52 | 559,886 |

Primary API records:
- [DoD FY2010](https://api.usaspending.gov/api/v2/agency/097/?fiscal_year=2010) · [DoD FY2025](https://api.usaspending.gov/api/v2/agency/097/?fiscal_year=2025)
- [HHS FY2010](https://api.usaspending.gov/api/v2/agency/075/?fiscal_year=2010) · [HHS FY2025](https://api.usaspending.gov/api/v2/agency/075/?fiscal_year=2025)
- [VA FY2010](https://api.usaspending.gov/api/v2/agency/036/?fiscal_year=2010) · [VA FY2025](https://api.usaspending.gov/api/v2/agency/036/?fiscal_year=2025)

## 3. Endpoint-to-endpoint arithmetic

The following are analyst calculations from the six source values. They are nominal changes between two fiscal-year endpoints, not inflation-adjusted growth rates and not a continuous trend.

| Agency | Nominal change (FY2010 to FY2025) | Nominal percentage change |
|---|---:|---:|
| Department of Defense | +$161,166,697,760.11 | +42.89% |
| Department of Health and Human Services | +$1,393,337,139,445.40 | +220.88% |
| Department of Veterans Affairs | +$269,434,984,901.25 | +1,438.36% |

These calculations do not establish why the reported obligations changed. They do not adjust for inflation, agency mission/program changes, award classification, changes in reporting requirements, or changes in data quality. A 15-year endpoint comparison cannot identify year-to-year movements or causation.

## 4. Critical scope and quality limits

1. **Award data are not all agency spending.** USAspending's data documentation distinguishes account data (budgetary resources, obligations, outlays, including non-award spending) from award data. The agency endpoint above is an award-obligation summary, not the agency's complete budget, outlays, or financial statement.
2. **Reporting threshold.** USAspending's current About the Data disclosure states that prime award transactions with obligation value of $25,000 and above are subject to reporting under 31 U.S.C. § 6101 note. Treat threshold coverage and exceptions as a limitation when analyzing small transactions.
3. **Historical comparability.** The same documentation says reporting requirements have changed over time and that data quality is generally higher in more recent fiscal years. FY2010 and FY2025 should not be treated as perfectly homogeneous without a field- and rule-level crosswalk.
4. **Coverage start differs by interface.** USAspending's About the Data document states award data are available from FY2001, while Advanced Search award data begin in FY2008. Do not infer the underlying API's full coverage from one UI's search window.
5. **DoD publication lag.** The DoD agency response states that contract and IDV data are subject to a 90-day publication delay; other DoD financial-assistance and account data are not subject to that delay. This matters for current-period completeness.
6. **Nominal dollars.** No inflation adjustment has been applied.
7. **Sample design.** DoD, HHS, and VA were selected as a small validation set, not by a probability sample. These six records cannot support estimates for all agencies.
8. **No delivery/quality inference.** Obligations show recorded federal award funding actions; they do not prove that goods/services were delivered, accepted, effective, or free of waste.

Documentation:
- [USAspending API v2 endpoint reference](https://api.usaspending.gov/docs/endpoints) (the API documentation states endpoints do not require authorization and documents both the agency `obligations_by_award_category` and `budgetary_resources` GET endpoints).
- [USAspending About the Data](https://www.usaspending.gov/data/about-the-data-download.pdf) (document states “Last updated November 19, 2025”).

## 5. Award-category cross-check and agency-level reconciliation lead

A second endpoint, `/api/v2/agency/{toptier_code}/obligations_by_award_category/?fiscal_year={year}`, returned the same six award-obligation totals as the agency overview endpoint and disaggregated them into contracts, IDVs, grants, loans, direct payments, and other. All six category requests returned HTTP 200. The category values and request URLs are in `usaspending-category-budgetary-sample-2026-11-13.csv`.

For FY2025, the separate `/api/v2/agency/{toptier_code}/budgetary_resources/?fiscal_year=2025` endpoint returned the following agency-level account/budgetary summary:

| Agency | Award obligations | Agency total obligations | Agency total outlays | Agency budgetary resources |
|---|---:|---:|---:|---:|
| DoD | $536.89B | $1,451.32B | $1,342.21B | $2,213.23B |
| HHS | $2,024.16B | $2,794.35B | $2,722.17B | $3,129.73B |
| VA | $288.17B | $412.39B | $404.94B | $458.78B |

Analyst subtraction gives an **unreconciled difference** between agency total obligations and award obligations of $914.43B (DoD), $770.19B (HHS), and $124.23B (VA). This difference is an audit lead, not a finding of unreported or missing spending. USAspending's data documentation distinguishes:
- File A/B account data, which include award and non-award spending;
- File C, which provides the financial aspect of awards;
- Files D1/D2, which provide procurement and financial-assistance award attributes.

The same documentation explains that records can be unlinked between agency financial systems and governmentwide award systems. Until the agency/account data are reconciled to File C and the relevant award datasets, the difference cannot be assigned entirely to non-award spending, missing awards, or any error category.

## 6. Additional source limitations established from the USAspending disclosure

- Prime award data are available from FY2001; Advanced Search begins at FY2008.
- The disclosure states that reporting requirements changed over time and data quality is generally higher in more recent fiscal years.
- Prime award transactions with obligation value of $25,000 and above must be reported under 31 U.S.C. § 6101 note.
- Agency financial-system data (award and non-award spending) are available beginning FY2017 Q2. Before FY2022, outlay data were optional and may be incomplete.
- DoD and U.S. Army Corps of Engineers procurement data have a 90-day publication delay in FPDS; this affects USAspending Files C and D1, not Files A, B, or D2.
- Subaward data have their own $30,000 reporting threshold and documented duplication/inconsistency risks. Do not sum prime awards and subawards without deduplication and an explicit analytical purpose.

## 7. Next audit steps

1. Retrieve the complete top-tier agency reference list and preserve its agency codes.
2. Build an agency × fiscal-year matrix for FY2010–FY2025 using the agency endpoint; record missing agencies, API failures, source vintage, and transaction counts.
3. Separate award families (contracts, IDVs, grants, loans, direct payments, other) rather than comparing an undifferentiated award total.
4. For selected high-value and risk-indicated awards, capture award detail, transaction/modification history, and reported subawards; preserve negative de-obligations.
5. Reconcile sampled awards and questioned costs to GAO/OIG audits and agency financial statements. Do not call an obligation amount a questioned cost unless an audit source says so.
6. Normalize to constant dollars only after selecting and documenting a public deflator series and base year.
7. Keep the full source query, filters, response payload, timestamps, schema version, and SHA-256 of any preserved raw response.

## 8. Evidence classification

- **Source-verified / extracted:** six agency-year award-obligation summaries; 36 award-category values and six category totals; and three FY2025 agency-level budgetary summaries. Each API response returned HTTP 200 and its URL/retrieval date is in the machine-readable CSVs.
- **Analyst calculation:** three nominal endpoint changes and percentages in Section 3; three unreconciled differences between agency total obligations and award obligations in Section 5.
- **Not established:** government-wide totals, a classification of the reconciliation differences, causal explanations, inflation-adjusted trends, delivery outcomes, improper payments, questioned costs, fraud, or misconduct.

## 9. CSV and ledger validation

The six-record sample CSV was parsed after retrieval: 6 data rows, 15 columns, and consistent row width. The evidence register was also normalized to a valid 10-column CSV; seven inherited rows (HF-FED-004, HF-FED-008, and HF-FED-011 through HF-FED-015) had unquoted commas in their final field and were repaired by quoting every field. No source values were changed by that repair.

The expanded category/budgetary CSV contains 45 data rows (42 award-category/total rows and 3 FY2025 agency budgetary summaries), each with a source URL and retrieval date.
