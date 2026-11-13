import test from "node:test";
import assert from "node:assert/strict";
import { validateAggregateMeasure, comparableMeasure } from "../src/aggregate-measure.mjs";

function measure(overrides = {}) {
  return {
    measure_id: "orr-fy23-discharges-total",
    source_id: "HHS-ORR-UAC-DAILY",
    agency: "HHS/ORR",
    metric_name: "Unaccompanied Children Discharged to Sponsors",
    unit_of_analysis: "discharge_event",
    is_unique_person_count: false,
    time_window: { start_date: "2022-10-01", end_date: "2023-09-30", calendar_type: "US_FEDERAL_FY" },
    value: 100,
    denominator_definition: "All recorded discharge events during FY2023",
    population_scope: { cohort_definition: "All children discharged from ORR care", geography: "US" },
    measurement_class: "administrative_event_count",
    known_limitations: ["Counts events, not deduplicated people."],
    provenance: {
      url: "https://example.gov/report",
      retrieved_at: "2026-11-13T21:00:00Z",
      publication_date: "2024-01-01",
      artifact_sha256: "a".repeat(64)
    },
    ...overrides
  };
}

test("validates a fully specified AggregateMeasure", () => {
  assert.equal(validateAggregateMeasure(measure()), true);
});

test("requires explicit unique-person semantics", () => {
  const m = measure(); delete m.is_unique_person_count;
  assert.throws(() => validateAggregateMeasure(m), /is_unique_person_count/);
});

test("blocks mismatched unit of analysis", () => {
  const result = comparableMeasure(measure(), measure({ unit_of_analysis: "unique_child" }));
  assert.equal(result.comparable, false);
  assert.ok(result.blockers.includes("UNIT_OF_ANALYSIS_MISMATCH"));
});

test("blocks calendar-year and federal-fiscal-year differences", () => {
  const result = comparableMeasure(measure(), measure({ time_window: { start_date: "2023-01-01", end_date: "2023-12-31", calendar_type: "CALENDAR_YEAR" } }));
  assert.ok(result.blockers.includes("TEMPORAL_MISMATCH"));
});

test("blocks different population cohort definitions", () => {
  const result = comparableMeasure(measure(), measure({ population_scope: { cohort_definition: "Category 3 sponsor discharges", geography: "US" } }));
  assert.ok(result.blockers.includes("POPULATION_SCOPE_MISMATCH"));
});

test("blocks event counts and deduplicated person counts", () => {
  const result = comparableMeasure(measure(), measure({ is_unique_person_count: true }));
  assert.ok(result.blockers.includes("PERSON_DEDUPLICATION_MISMATCH"));
});

test("blocks differing denominators", () => {
  const result = comparableMeasure(measure(), measure({ denominator_definition: "All referrals during FY2023" }));
  assert.ok(result.blockers.includes("DENOMINATOR_DEFINITION_MISMATCH"));
});

test("requires uncertainty metadata for samples and projections", () => {
  assert.throws(() => validateAggregateMeasure(measure({ measurement_class: "audit_sample" })), /uncertainty object/);
});

test("does not permit point arithmetic for sample estimates without uncertainty propagation", () => {
  const a = measure({ measurement_class: "audit_sample", uncertainty: { confidence_level: 0.95, method: "Design-based confidence interval" } });
  const b = measure({ measurement_class: "audit_sample", uncertainty: { confidence_level: 0.95, method: "Design-based confidence interval" } });
  const result = comparableMeasure(a,b);
  assert.equal(result.comparable, false);
  assert.ok(result.blockers.includes("UNCERTAINTY_PROPAGATION_REQUIRED"));
});

test("permits arithmetic only when metadata contract matches", () => {
  const result = comparableMeasure(measure(), measure({ value: 80 }));
  assert.equal(result.comparable, true);
  assert.equal(result.arithmetic.difference, 20);
  assert.equal(result.arithmetic.ratio, 1.25);
});
