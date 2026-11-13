# Public Aggregate Data Ingestion v0.1

## Data model

Public aggregate observations are a separate data product from pseudonymous case-event records. The two must never be combined into one count.

Every observation retains:
- original source and dataset identifier;
- retrieval timestamp and SHA-256 of exact raw source bytes;
- observed date or reporting period;
- metric identifier and original unit;
- stock-versus-flow measure type;
- geography and grain;
- page/table reference for manually transcribed PDF values.

## Registered source: HHS ORR daily UAC series

Official landing page: https://healthdata.gov/National/HHS-Unaccompanied-Alien-Children-Program/ehpz-xc9n

Official Data.gov catalog metadata identifies the JSON download endpoint:
https://healthdata.gov/api/v3/views/ehpz-xc9n/query.json?accessType=DOWNLOAD

The dataset has six columns: date plus five measures—CBP custody placements, CBP custody stock, transfers out of CBP custody, HHS care stock, and discharges from HHS care. These are aggregate daily values. They are not child-level case records, direct contact evidence, post-release safety outcomes, or a way to validate the 145,000 claim by themselves.

### Ingest

1. Use the built-in fetch path to download and timestamp the source in one operation:

~~~sh
node src/public-ingest-cli.mjs hhs-fetch ./downloads/hhs-uac-raw.json ./derived/hhs-uac-normalized.json
~~~

2. The CLI captures the retrieval timestamp immediately after the HTTP response, preserves the exact raw bytes, and writes a sibling acquisition receipt with the raw-byte SHA-256.
3. For an artifact downloaded separately, pass its actual retrieval timestamp explicitly; the offline importer refuses to invent one:

~~~sh
node src/public-ingest-cli.mjs hhs-json ./downloads/hhs-uac-raw.json ./derived/hhs-uac-normalized.json 2026-11-13T21:32:57.508Z
~~~

The output path must not already exist. The tool refuses overwrite to preserve provenance.

## Registered source: DOJ EOIR UAC tables

Official statistics page: https://www.justice.gov/eoir/workload-and-adjudication-statistics

EOIR publishes UAC tables as PDFs. v0.1 does not pretend to OCR those documents or silently infer values from chart pixels. A transcription must cite the exact PDF URL, PDF SHA-256, generated date, page, table/chart, unit, period, and measure type.

The EOIR importer now verifies the transcription against the exact downloaded PDF bytes, registered official artifact URL, publication/generated date, fiscal-period label, metric/unit definition, and page/table reference. It rejects duplicate metric-period rows. It emits a separate receipt and normalized observations.

~~~sh
node src/public-ingest-cli.mjs eoir-import ./acquisitions/2026-11-13/eoir-uac-pending-transcription.json ./downloads/eoir-uac-pending.pdf ./derived/eoir-uac-pending.normalized.json
node src/public-ingest-cli.mjs eoir-import ./acquisitions/2026-11-13/eoir-uac-outcomes-transcription.json ./downloads/eoir-uac-outcomes.pdf ./derived/eoir-uac-outcomes.normalized.json
~~~

Two official PDFs have been acquired and transcribed with page-1/Table-1 references:
- Pending UAC cases: generated July 24, 2026; FY2016–FY2025 plus FY2026 Third Quarter.
- UAC outcomes: generated July 24, 2026; FY2026 Third Quarter only.

The checked-in transcription JSONs include the exact PDF hashes and retrieval timestamps. The original PDF bytes are archived on the authorized Windows machine under `C:\\Users\\rucke\\HeavenzFire\\PublicEvidence\\EOIR-UAC\\2026-11-13\\`, not committed as binary files. The importer refuses to normalize if the supplied PDF bytes do not match the hash in the transcription. Transcription review remains pending a second-person check; hash matching alone does not verify manually entered cells.

## Comparability contract

Two observations are comparable only when metric identifier, period, unit, measure type, and geography match exactly. A daily stock cannot be summed as a flow; a case count cannot be compared with a child count; a fiscal-year total cannot be compared with a point-in-time snapshot.

The system will not derive unique children from daily aggregate flows, infer missing children from court cases, or equate an in-absentia order with disappearance, trafficking, or unsafe placement.

## Integrity limitations

SHA-256 proves only that the bytes used later match the bytes originally hashed. It does not prove the publisher's data are accurate, that the extraction is complete, or that the PDF transcription is correct. Manual PDF transcription requires a second-person check against the cited page before publication.


## AggregateMeasure contract and comparability gate

Each normalized measure is validated against `src/aggregate-measure.mjs`. In addition to the schema fields, v0.1 requires:
- explicit `unit` and `unit_of_analysis` (e.g. "children" vs "events", and "unique_child" vs "discharge_event");
- an explicit `is_unique_person_count` boolean;
- a defined denominator and cohort;
- exact start/end dates and calendar type;
- a measurement class: administrative census, snapshot, event count, audit sample, projection, research estimate, or unknown;
- source URL, retrieval timestamp, raw-artifact SHA-256, and known publication date (or explicit null).

The source registry is a catalog, not an assertion that we have already retrieved every artifact. Each retrieval creates an acquisition receipt containing the timestamp, byte count, SHA-256, and publication date. We do not fabricate retrieval timestamps or file hashes for sources not yet downloaded.

Run:

~~~sh
node src/claim-audit.mjs validate fixtures/aggregate-measure.synthetic.json
node src/claim-audit.mjs compare measure-a.json measure-b.json
~~~

The comparison gate blocks arithmetic if unit, period, cohort/geography, measurement class, unique-person semantics, or denominator differ. It also blocks direct point arithmetic for audit samples and projections until an uncertainty-propagation implementation exists. Temporal mismatch is a hard blocker, not a warning.

The sample and projection gate is intentionally conservative: v0.1 records confidence metadata but does not yet implement statistical interval propagation. It therefore refuses subtraction/ratios for those classes rather than producing false precision.


## HHS period summarization

The HHS normalizer preserves daily rows as observations. The summarizer then applies metric-specific rules:

- Daily flow metrics (CBP placements, transfers out, ORR discharges) are summed only if every calendar date in the requested window is present for that metric. Any gap blocks the total.
- Daily stock metrics (children in CBP custody, children in HHS care) are represented only by the value on the requested end date. Stock values are never summed.
- Flow totals are labeled as event counts and are not asserted to be unique children across the full period.
- The summary emits a separate typed measure for each metric and carries raw-source hash and retrieval timestamp forward.

Example:

~~~sh
node src/public-ingest-cli.mjs hhs-summarize ./derived/hhs-uac-normalized.json 2026-10-01 2026-10-28 ./derived/hhs-uac-2026-10-window.json
~~~

The public series currently has missing calendar dates in its visible daily history. The strict flow gate will therefore block a naive full-month total rather than silently treating missing days as zero.


## Acquisition receipts

For each HHS raw download, the ingestion CLI writes two new artifacts:
- normalized observation JSON;
- a sibling `.receipt.json` containing source ID, agency, source URL, retrieval timestamp, byte length, publication date (null when not established), and SHA-256 of the exact raw bytes.

Both output paths use exclusive-create mode and refuse overwrite. The fetch command writes the raw artifact to the first path you supply; retain it alongside the normalized artifact and receipt.


## Observed source-quality conditions in the 2026-11-13 acquisition

The downloaded HHS JSON contained 1,390 rows across 1,380 distinct dates. Ten dates had duplicate source rows. The first three CBP-related measures had non-null values in 689 rows each, while the two ORR custody/discharge measures had non-null values in all 1,390 rows. These are source-structure facts, not child counts.

The duplicates are retained with their source record IDs and versions. Null/missing cells are omitted as observations and remain visible through metric coverage counts. The summarizer blocks any metric/date combination with duplicate values; it does not select a "latest" row, average, or sum duplicate records. The acquisition receipt and exact raw-file hash are the controlling evidence for this snapshot.


## EOIR UAC acquisition — 2026-11-13

The current EOIR page links two one-page official PDFs, both generated July 24, 2026. The source page itself says the statistics are subject to change as EOIR staff update the case database.

### Pending UAC case stock

The pending table reports FY2016–FY2025 and FY2026 Third Quarter. For each period, it reports four age bands and total pending cases. The FY2026 Q3 row is 1,165 pending less than six months, 2,209 pending 6 months–2 years, 3,280 pending 2–5 years, and 9,906 pending more than five years, totaling 16,560. The importer checks that the four age bands sum exactly to the published total for each period.

### UAC initial case-completion outcomes

For FY2026 Third Quarter, the table reports 8,610 initial case decisions: 49 relief grants, 4,838 removals, 3,065 dismissals/terminations, 654 voluntary departures, 4 withdrawn, and 0 other. The 4,023 removal-in-absentia count is a subset of the 4,838 removals; it is explicitly typed as a subset and is never added again to total decisions. The importer checks both the outcome subtotal and subset bound.

### Interpretation limits

- Pending cases are a point-in-time court-case stock, not a count of children physically missing.
- Decisions are FY-to-date initial case completions, not a point-in-time child population.
- EOIR's footnote limits outcomes to I-862 initial case completions.
- The PDFs exclude mental competency/Franco litigation, Institutional Hearing Program, Migration Protection Protocol cases, and cases with a 7A adjournment.
- These court statistics do not establish location, post-release safety, trafficking, sponsor contact, or unique-child outcomes.
- The transcriptions remain `PENDING_SECOND_PERSON_TRANSCRIPTION_REVIEW`; automated arithmetic checks do not certify transcription accuracy.
