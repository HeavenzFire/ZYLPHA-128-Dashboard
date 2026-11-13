import test from "node:test";
import assert from "node:assert/strict";
import { normalizeHhsUacRows, compareAggregateObservations, summarizeHhsWindow } from "../src/aggregate.mjs";

const provenance = { raw_sha256: "a".repeat(64), retrieved_at: "2026-11-13T12:00:00Z" };
const row = {
  date: "2026-10-28T00:00:00.000",
  children_placed_in_cbp_custody_: 10,
  children_in_cbp_custody: 4,
  children_transferred_out_of_cbp_custody: 6,
  children_in_hhs_care: 100,
  children_discharged_from: 8
};

test("normalizes HHS daily aggregates while preserving distinct stock and flow measures", () => {
  const result = normalizeHhsUacRows([row], provenance);
  assert.equal(result.row_count, 1);
  assert.equal(result.observation_count, 5);
  assert.equal(result.observations.find(x => x.metric_id === "children_in_hhs_care").measure_type, "daily_stock");
  assert.equal(result.observations.find(x => x.metric_id === "children_discharged_from").measure_type, "daily_flow");
});

test("preserves sparse historical schemas and records missing metric coverage", () => {
  const sparse = { date: "2021-04-01T00:00:00.000", children_in_hhs_care: 100, children_discharged_from: 5 };
  const result = normalizeHhsUacRows([sparse], provenance);
  assert.equal(result.observation_count, 2);
  assert.equal(result.metric_field_coverage.children_in_hhs_care, 1);
  assert.equal(result.metric_field_coverage.children_placed_in_cbp_custody_, 0);
  assert.ok(result.schema_variants.includes("children_discharged_from,children_in_hhs_care"));
  assert.equal(result.observations.some(x => x.metric_id === "children_placed_in_cbp_custody_"), false);
});

test("preserves duplicate source dates and flags them for downstream reconciliation", () => {
  const result = normalizeHhsUacRows([row, row], provenance);
  assert.equal(result.row_count, 2);
  assert.equal(result.unique_date_count, 1);
  assert.deepEqual(result.duplicate_dates, [{ date: "2026-10-28", row_count: 2 }]);
  const summary = summarizeHhsWindow(result, "2026-10-28", "2026-10-28");
  const flow = summary.measures.find(item => item.metric_id === "children_placed_in_cbp_custody_");
  const stock = summary.measures.find(item => item.metric_id === "children_in_hhs_care");
  assert.equal(flow.status, "BLOCKED_DUPLICATE_DAILY_OBSERVATIONS");
  assert.equal(stock.status, "BLOCKED_AMBIGUOUS_ENDPOINT_SNAPSHOT");
});

test("treats null metric cells as missing, never as zero", () => {
  const sparse = { ...row, children_in_hhs_care: null };
  const result = normalizeHhsUacRows([sparse], provenance);
  assert.equal(result.metric_field_coverage.children_in_hhs_care, 0);
  assert.equal(result.observations.some(item => item.metric_id === "children_in_hhs_care"), false);
});

test("rejects negative or fractional counts", () => {
  assert.throws(() => normalizeHhsUacRows([{ ...row, children_in_hhs_care: -1 }], provenance), /Invalid non-negative integer/);
  assert.throws(() => normalizeHhsUacRows([{ ...row, children_in_hhs_care: 1.5 }], provenance), /Invalid non-negative integer/);
});

test("requires a raw-source content hash", () => {
  assert.throws(() => normalizeHhsUacRows([row], { ...provenance, raw_sha256: "nope" }), /SHA-256/);
});

test("does not compare different measure types or periods", () => {
  const a = { metric_id: "pending", period_label: "FY2026 Q3", unit: "cases", measure_type: "period_end_stock", geography: "US", value: 16560 };
  const b = { ...a, measure_type: "annual_flow", value: 8610 };
  assert.deepEqual(compareAggregateObservations(a, b), { comparable: false, mismatches: ["measure_type"] });
});

test("compares only identical metric, period, unit, measure type, and geography", () => {
  const a = { metric_id: "pending", period_label: "FY2026 Q3", unit: "cases", measure_type: "period_end_stock", geography: "US", value: 16560 };
  const b = { ...a, value: 16000 };
  assert.deepEqual(compareAggregateObservations(a, b), { comparable: true, difference: 560, left_value: 16560, right_value: 16000 });
});

function normalizedObservations(observations) {
  return {
    dataset_kind: "public_aggregate_observations",
    source: {
      retrieved_at: "2026-11-13T12:00:00Z",
      raw_sha256: "c".repeat(64)
    },
    observations
  };
}

test("sums a flow only when every calendar date in the requested window exists", () => {
  const base = { source_id: "HHS-ORR-UAC-DAILY", metric_id: "children_placed_in_cbp_custody_", metric_label: "CBP placements", measure_type: "daily_flow", unit: "children", geography: "US" };
  const normalized = normalizedObservations([
    { ...base, observed_date: "2026-10-01", value: 10 },
    { ...base, observed_date: "2026-10-02", value: 15 }
  ]);
  const result = summarizeHhsWindow(normalized, "2026-10-01", "2026-10-02");
  assert.equal(result.measures[0].status, "READY");
  assert.equal(result.measures[0].measure.value, 25);
  assert.equal(result.measures[0].measure.time_window.calendar_type, "CUSTOM");
});

test("blocks flow totals when a reporting date is missing", () => {
  const normalized = normalizedObservations([
    { source_id: "HHS-ORR-UAC-DAILY", metric_id: "children_placed_in_cbp_custody_", metric_label: "CBP placements", measure_type: "daily_flow", unit: "children", geography: "US", observed_date: "2026-10-01", value: 10 }
  ]);
  const result = summarizeHhsWindow(normalized, "2026-10-01", "2026-10-02");
  assert.equal(result.measures[0].status, "BLOCKED_INCOMPLETE_DAILY_COVERAGE");
  assert.equal(result.measures[0].measure, undefined);
});

test("uses the requested endpoint only for stock snapshots and never sums stock days", () => {
  const base = { source_id: "HHS-ORR-UAC-DAILY", metric_id: "children_in_hhs_care", metric_label: "Children in HHS care", measure_type: "daily_stock", unit: "children", geography: "US" };
  const normalized = normalizedObservations([
    { ...base, observed_date: "2026-10-01", value: 100 },
    { ...base, observed_date: "2026-10-02", value: 80 }
  ]);
  const result = summarizeHhsWindow(normalized, "2026-10-01", "2026-10-02");
  const stock = result.measures.find(item => item.metric_id === "children_in_hhs_care");
  assert.equal(stock.status, "READY");
  assert.equal(stock.measure.value, 80);
  assert.deepEqual(stock.measure.time_window, { start_date: "2026-10-02", end_date: "2026-10-02", calendar_type: "POINT_IN_TIME" });
});

test("limits duplicate-date report to the requested period", () => {
  const base = { source_id: "HHS-ORR-UAC-DAILY", metric_id: "children_in_hhs_care", metric_label: "Children in HHS care", measure_type: "daily_stock", unit: "children", geography: "US" };
  const normalized = normalizedObservations([
    { ...base, observed_date: "2026-11-12", value: 100 }
  ]);
  normalized.duplicate_dates = [
    { date: "2022-01-26", row_count: 2 },
    { date: "2026-11-12", row_count: 2 }
  ];
  const result = summarizeHhsWindow(normalized, "2026-11-12", "2026-11-12");
  assert.deepEqual(result.duplicate_dates, [{ date: "2026-11-12", row_count: 2 }]);
});

test("rejects impossible HHS source dates", () => {
  assert.throws(() => normalizeHhsUacRows([{ ...row, date: "2026-02-31T00:00:00.000" }], provenance), /Invalid HHS date/);
});
