import test from "node:test";
import assert from "node:assert/strict";
import { buildEvidenceManifest, computeMetrics, evaluateLocatedClaim, sha256, validateDataset } from "../src/verify.mjs";

const tokenA = "a".repeat(64);
const tokenB = "b".repeat(64);
const source = { source_id: "SRC-1", uri: "https://example.gov/report", retrieved_at: "2026-11-13T12:00:00Z", sha256: sha256("source fixture") };

function fixture(overrides = {}) {
  return {
    schema_version: "1.0",
    claim: { claimed_count: 2 },
    sources: [source],
    coverage: {
      start: "2026-02-01T00:00:00Z",
      end: "2026-11-13T23:59:59Z",
      complete_for_period: true,
      extraction_id: "FIXTURE-EXTRACT-001",
      query_sha256: sha256("SELECT pseudonymous_token,event_type,outcome FROM approved_aggregate_view")
    },
    events: [
      { event_id: "E-1", source_id: "SRC-1", subject_token: tokenA, event_type: "direct_child_contact", observed_at: "2026-02-02T12:00:00Z", outcome: "successful" },
      { event_id: "E-2", source_id: "SRC-1", subject_token: tokenA, event_type: "direct_child_contact", observed_at: "2026-02-03T12:00:00Z", outcome: "successful" },
      { event_id: "E-3", source_id: "SRC-1", subject_token: tokenB, event_type: "direct_child_contact", observed_at: "2026-02-04T12:00:00Z", outcome: "successful" },
      { event_id: "E-4", source_id: "SRC-1", subject_token: tokenB, event_type: "sponsor_contact", observed_at: "2026-02-04T12:30:00Z", outcome: "successful" }
    ],
    ...overrides
  };
}

test("deduplicates repeat direct contacts by pseudonymous subject token", () => {
  const result = computeMetrics(fixture());
  assert.equal(result.unique_children_with_successful_direct_contact, 2);
  assert.equal(result.event_counts.direct_child_contact, 3);
});

test("sponsor-only contact is not counted as child location", () => {
  const data = fixture({ events: [
    { event_id: "E-1", source_id: "SRC-1", subject_token: tokenA, event_type: "sponsor_contact", observed_at: "2026-02-02T12:00:00Z", outcome: "successful" }
  ]});
  assert.equal(computeMetrics(data).unique_children_with_successful_direct_contact, 0);
});

test("address verification and attempted contact are not direct child contact", () => {
  const data = fixture({ events: [
    { event_id: "E-1", source_id: "SRC-1", subject_token: tokenA, event_type: "address_verification", observed_at: "2026-02-02T12:00:00Z", outcome: "verified" },
    { event_id: "E-2", source_id: "SRC-1", subject_token: tokenB, event_type: "attempted_contact", observed_at: "2026-02-02T12:00:00Z", outcome: "no_answer" }
  ]});
  assert.equal(computeMetrics(data).unique_children_with_successful_direct_contact, 0);
});

test("does not treat a safety assessment record as proof of safety", () => {
  const result = evaluateLocatedClaim(fixture(), 2);
  assert.equal(result.status, "verified");
  assert.equal(result.limitations.some(x => x.includes("cannot establish child safety")), true);
  assert.equal(result.metrics.exclusions.safety_assessment_record_is_not_a_finding_of_safety, true);
});

test("requires a complete declared extraction before exact count is verified", () => {
  const data = fixture({ coverage: { ...fixture().coverage, complete_for_period: false } });
  assert.equal(evaluateLocatedClaim(data, 2).status, "partially_verified");
});

test("labels a partial count partially_verified", () => {
  assert.equal(evaluateLocatedClaim(fixture(), 3).status, "partially_verified");
});

test("rejects direct personal identifiers and case numbers", () => {
  const data = fixture();
  data.events[0].case_number = "CASE-123";
  assert.throws(() => validateDataset(data), /Prohibited personal-data field/);
});

test("rejects malformed subject identifiers", () => {
  const data = fixture();
  data.events[0].subject_token = "child-123";
  assert.throws(() => validateDataset(data), /HMAC-SHA256 token/);
});

test("rejects events that cite unknown sources", () => {
  const data = fixture();
  data.events[0].source_id = "UNKNOWN";
  assert.throws(() => validateDataset(data), /unknown source/);
});

test("rejects duplicate event IDs", () => {
  const data = fixture();
  data.events[1].event_id = data.events[0].event_id;
  assert.throws(() => validateDataset(data), /Duplicate event_id/);
});

test("claim count above observed count is not silently accepted", () => {
  const result = evaluateLocatedClaim(fixture(), 1);
  assert.equal(result.status, "conflicted");
});

test("events outside declared coverage do not enter metrics", () => {
  const data = fixture({ events: [
    { event_id: "E-1", source_id: "SRC-1", subject_token: tokenA, event_type: "direct_child_contact", observed_at: "2025-01-01T00:00:00Z", outcome: "successful" }
  ]});
  assert.equal(computeMetrics(data).unique_children_with_successful_direct_contact, 0);
});

test("evidence manifest is reproducible for identical dataset content", () => {
  const data = fixture();
  assert.deepEqual(buildEvidenceManifest(data), buildEvidenceManifest(data));
});
