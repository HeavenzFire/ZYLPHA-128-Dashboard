# Authoritative Source Registry

These are official starting points. A portal's existence does not mean its full contents have been extracted or independently validated. Record retrieval timestamps and query filters each time a source is used.

| Source | Purpose | URL | Required capture |
|---|---|---|---|
| GAO reports and testimonies | Audits, recommendations, follow-up | https://www.gao.gov/reports-testimonies | Report number/title/date/pages/recommendation IDs |
| GAO priority recommendations | Dated priority snapshots | https://www.gao.gov/priority-recommendations | Agency, snapshot date, ID/status, comparison |
| GAO-24-107146 | Historical recommendation snapshot | https://www.gao.gov/assets/880/871005.pdf | Scope, report date, status definitions, page references |
| Oversight.gov | Inspector-general reports and recommendations | https://www.oversight.gov/reports/recommendations | OIG, report/recommendation ID, dates, filters |
| USAspending.gov | Awards, obligations, outlays, recipients | https://www.usaspending.gov/ | Query, export timestamp, award IDs, schema |
| FOIA.gov agency directory | Correct FOIA component and submission method | https://www.foia.gov/agency-search.html | Component, submission URL, request ID |
| FOIA.gov reports | Annual/quarterly processing datasets | https://www.foia.gov/reports.html | Fiscal year, dataset version, schema |
| Federal Register | Rules and official notices | https://www.federalregister.gov/ | Document/docket ID, publication/effective date |
| eCFR | Codified regulations and versions | https://www.ecfr.gov/ | Title/part/section, historical version |
| Congress.gov | Legislation and congressional actions | https://www.congress.gov/ | Bill/public law number, version, date |
| GovInfo | Official publications and court collections | https://www.govinfo.gov/ | Collection, document ID, date |
| GAO FISCAM | Information-system control audit methodology | https://www.gao.gov/fiscam | Edition/date, control objectives |
| GAO Yellow Book | Government Auditing Standards | https://www.gao.gov/yellowbook | Applicable edition and standard |
| OGIS | FOIA mediation and dispute-resolution information | https://www.archives.gov/ogis | Relevant advice/mediation steps |

## Source priority
1. Primary official records and underlying documents.
2. Official audit reports and formal agency responses.
3. Official data exports with documented schema.
4. Secondary reporting only as leads to primary evidence.

## Retrieval log fields
source_id, retrieved_at_utc, URL, query_or_filters, date_range, filename, SHA-256, record_count, pagination_complete, schema_version, limitations, operator.