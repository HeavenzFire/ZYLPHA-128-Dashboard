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

1. Download the JSON from the official catalog endpoint.
2. Preserve the exact downloaded bytes as a read-only source artifact.
3. Run:

~~~sh
node src/public-ingest-cli.mjs hhs-json ./downloads/hhs-uac.json ./derived/hhs-uac-normalized.json
~~~

The output path must not already exist. The tool refuses overwrite to preserve provenance.

## Registered source: DOJ EOIR UAC tables

Official statistics page: https://www.justice.gov/eoir/workload-and-adjudication-statistics

EOIR publishes UAC tables as PDFs. v0.1 does not pretend to OCR those documents or silently infer values from chart pixels. A transcription must cite the exact PDF URL, PDF SHA-256, generated date, page, table/chart, unit, period, and measure type.

Validate a prepared transcription:

~~~sh
node src/public-ingest-cli.mjs eoir-validate ./imports/eoir-uac.json
~~~

The template includes one previously published FY2026 Q3 pending-case value for pipeline testing. Verify it against the cited PDF before treating it as a current observation.

## Comparability contract

Two observations are comparable only when metric identifier, period, unit, measure type, and geography match exactly. A daily stock cannot be summed as a flow; a case count cannot be compared with a child count; a fiscal-year total cannot be compared with a point-in-time snapshot.

The system will not derive unique children from daily aggregate flows, infer missing children from court cases, or equate an in-absentia order with disappearance, trafficking, or unsafe placement.

## Integrity limitations

SHA-256 proves only that the bytes used later match the bytes originally hashed. It does not prove the publisher's data are accurate, that the extraction is complete, or that the PDF transcription is correct. Manual PDF transcription requires a second-person check against the cited page before publication.
