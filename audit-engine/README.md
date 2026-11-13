# HeavenzFire Independent Evidence Engine v0.1

A deterministic, privacy-preserving audit core for reconciling published claims against source-backed event data. This package is deliberately separate from the existing dashboard UI: it does not read the dashboard's hardcoded sample records, simulate scans, or manufacture verification outcomes.

## Run

Requires Node.js 20 or later.

~~~sh
cd audit-engine
npm test
npm run verify:fixture
~~~

The fixture is synthetic and must never be cited as real evidence.

## Core counting rule

For the pilot claim, a child is counted as "located" only when a source-backed event records a **successful direct child contact** and the event has an approved pseudonymous subject token. Repeated direct contacts for the same token count as multiple events but one unique subject. Sponsor contact, household contact, address verification, school-record checks, and attempted contact are reported separately and do not count as direct child contact.

This is an intentionally strict operational definition for testing. It does not assert that the agency used this definition. If the agency's published definition differs, preserve both definitions and report the difference rather than silently substituting one.

## Privacy boundary

- Never ingest names, dates of birth, addresses, phone numbers, email addresses, A-numbers, passport/biometric data, Social Security numbers, case numbers, or docket numbers.
- subject_token must be a 64-character HMAC-SHA256 token created by an authorized data custodian outside this public audit engine. Do not use plain hashes of names or identifiers; those are vulnerable to dictionary attacks.
- Do not store the HMAC secret in this repository, a browser, a public notebook, or a dashboard.
- This engine accepts only aggregate-safe event records with opaque tokens. Real linkage requires documented legal authority, a data-sharing agreement, strict access controls, and a separate secure environment operated by an authorized custodian.
- Do not publish small-cell counts that could re-identify children.

## Evidence contract

Each event points to a source record. Each source carries a retrieval timestamp and SHA-256 content hash. The coverage declaration carries the extraction window, extraction ID, explicit completeness flag, and a hash of the exact query/workpaper. A SHA-256 hash detects later content changes; it does not prove source authenticity, truth, or a digital signature.

## Status semantics

- verified: observed count exactly matches the claim and the extraction is declared complete for the stated period. This is bounded to the defined measure and period; the completeness declaration itself still needs independent review.
- partially_verified: qualifying evidence exists but the count differs, or the extraction is not declared complete.
- conflicted: computed count exceeds the asserted count, indicating a definition/cohort/source conflict requiring reconciliation.
- unsupported: reserved for a claim for which no supporting evidence has been produced after a documented, sufficiently complete search. The v0.1 counter does not assign this automatically.
- not_testable: no qualifying source-backed event is present or required inputs are absent.

## Event taxonomy

Events are kept distinct: direct child contact, sponsor/household contact, address verification, school-record check, attempted contact, safety assessment, referral, substantiated finding, arrest, prosecution, conviction, reunification, and unknown disposition.

No event type implies another. In particular:
- contact is not a safety determination;
- a safety-assessment record is not proof of a safe outcome;
- a referral is not a substantiated finding;
- an arrest is not a conviction;
- reunification requires its own event and evidence.

## Pilot sequence for the 145,000 claim

1. Freeze the exact public claim, date range, and agency wording as a claim object.
2. Obtain the agency's existing calculation workpaper, query, field definitions, and aggregate event extract.
3. Have an authorized custodian tokenize any subject identifiers with a secret HMAC key, retaining the key and source identifiers outside this repository.
4. Independently hash the delivered source files and query/workpaper; record provenance and extraction scope.
5. Run this verifier against the aggregate-safe extract.
6. Compare strict direct-contact count with agency-defined "located" count; separately report sponsor-only, address-only, attempted, safety-assessment, referral, substantiation, and disposition counts.
7. Publish only aggregate results with small-cell suppression and documented limitations.

## Current boundary

v0.1 is a tested counting/validation core, not a production case-management system, legal determination, child-welfare assessment, or proof that the 145,000 assertion is true or false. It currently accepts JSON input and emits deterministic metrics plus a manifest. It does not connect to government systems or collect personal data.
