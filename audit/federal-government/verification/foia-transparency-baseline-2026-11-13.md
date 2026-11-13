# Phase C — FOIA annual-report data source baseline

**Audit period:** FY2010–FY2026 (preserve the source fiscal-year label)  
**Evidence capture date:** 2026-11-13  
**Workstream:** WS-03 — FOIA transparency and records access  
**Status:** Source inventory verified from the official FOIA.gov download page; archive contents not yet downloaded, hashed, parsed, or reconciled.

## 1. Finding at this phase

FOIA.gov's official dataset-download page lists governmentwide, all-agency CSV ZIP archives for each year from 2008 through 2025. The FY2010–FY2025 portion therefore has a listed archive for all 16 fiscal years in the audit's historical window. The same page lists annual full XML archives for 2008–2025.

The page was live-captured on 2026-11-13 (HTTP 200); the extraction returned 69 links, including all 16 exact all-agency CSV ZIP URLs for FY2010–FY2025. The page, as captured, does **not** list an FY2026 all-agency CSV or XML archive. This is a publication-availability gap in the captured download page, not evidence that agencies failed to report or that FY2026 data do not exist elsewhere. Keep FY2026 marked pending until an official archive or agency report is located.

Primary source: [FOIA.gov — Dataset Downloads](https://www.foia.gov/foia-dataset-download.html). The page returned HTTP 200 in the capture. The archive URLs in the companion CSV are transcribed from links on that page.

## 2. Scope and unit of analysis

The FOIA.gov glossary defines an agency for FOIA purposes as an executive-branch agency or independent regulatory agency. It expressly excludes the Judicial Branch, Congress, and state/local governments. FOIA administration is decentralized: agencies/components receive and process their own requests. The dataset should therefore be treated as agency-reported FOIA administration data, not a complete census of every public-records regime in the United States.

The unit to preserve in the first extraction is the source's agency/component × fiscal-year × reported metric. Do not aggregate component rows to parent agencies until component-to-parent mapping and duplicate/roll-up behavior are documented.

## 3. Source definitions and controls

- FOIA.gov defines **backlog** as requests or administrative appeals pending beyond the FOIA time period for a response. Preserve request backlog and appeal backlog separately where the schema distinguishes them.
- Annual FOIA Reports contain statistics on requests and appeals received, processed, and pending. Use the DOJ Annual FOIA Report Handbook for metric definitions rather than inferring definitions from column names.
- FOIA.gov's developer page states that downloadable agency annual-report data are represented in XML conforming to the FOIA Annual Report XML schema. It documents an annual-report XML API route, `/api/annual-report-xml/[agency abbreviation]/[year]`, and describes API-key use.
- The download page lists both annual XML archives and all-agency CSV archives. Use the CSV ZIP archives for the first bulk extraction; use XML/schema documentation to resolve field definitions and version differences.

Sources:
- [FOIA.gov — Annual Report data and glossary](https://www.foia.gov/data.html)
- [FOIA.gov — Developer resources and XML schema/API](https://www.foia.gov/developer/)
- [DOJ OIP — Annual FOIA Report Handbook](https://www.justice.gov/oip/page/file/1325056/download)

## 4. Archive inventory

The companion `foia-archive-inventory.csv` records the official all-agency CSV ZIP URL for each FY2010–FY2025 archive. The 16 links are listed on the official download page. The archive files themselves have not yet been fetched in this phase.

## 5. What is not yet verified

1. ZIP availability, byte size, archive members, and extraction success for each year.
2. Actual row counts, agency/component coverage, duplicate behavior, and missing values.
3. Column names and schema changes across 2010–2025.
4. Whether values are agency/component records, agency rollups, or both, and how to avoid double-counting.
5. Cross-year comparability of metrics and changes in reporting requirements.
6. FY2026 annual-report availability and whether partial/quarterly FY2026 data can be used without mixing reporting periods.

No backlog, processing-time, denial, or exemption trend has been calculated in this phase. No claim of noncompliance or unlawful withholding is made.

## 6. Next extraction protocol

For each archive, preserve the original ZIP, retrieval timestamp, HTTP response metadata, byte size, and SHA-256. Extract into a year-specific immutable directory. Record archive members and per-file row counts. Parse CSV using a standards-compliant parser; preserve raw headers and values before normalization. Compare each year's fields to the applicable XML schema and DOJ handbook. Build a data dictionary with metric name, native definition, unit, population, fiscal-year basis, agency/component grain, missing-value semantics, and schema version.

Before producing cross-year comparisons:
- reconcile component rows and parent agency totals;
- test arithmetic relationships (received, processed, pending, backlog) only where the handbook defines them;
- preserve request and appeal metrics separately;
- identify schema/definition changes and either stratify or document a valid crosswalk;
- report missing agency-years rather than silently imputing zero;
- publish code, filters, counts, and validation output.

## 7. Evidence labels

- **Verified:** archive link is present on the official FOIA.gov download page.
- **Not yet verified:** archive bytes, internal contents, row counts, schema conformance, and complete coverage.
- **Pending:** FY2026 archive/annual-report publication.
- **Not inferred:** backlog is not, by itself, proof of unlawful withholding, intent, or misconduct.
