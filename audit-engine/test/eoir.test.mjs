import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { normalizeEoirTranscription } from "../src/eoir.mjs";

const pdf = Buffer.from("%PDF-1.7\\nsynthetic EOIR test PDF");
const hash = createHash("sha256").update(pdf).digest("hex");
const pendingPeriod = { start_date: "2025-10-01", end_date: "2026-06-30", calendar_type: "US_FEDERAL_FY_QUARTER" };
function pendingInput(observations = [{
  metric_id: "pending_total", period_label: "FY2026 Q3", period: pendingPeriod,
  value: 16560, unit: "cases", measure_type: "period_end_stock", page: 1, table_or_chart: "Table 1"
}]) {
  return {
    schema_version: "1.0", source_key: "eoir_uac_pending", source_id: "DOJ-EOIR-UAC-PENDING",
    source_url: "https://www.justice.gov/eoir/media/1344946/dl?inline=",
    document_generated: "2026-07-24", retrieved_at: "2026-11-13T21:54:39.998Z",
    extraction_method: "manual_pdf_transcription", source_file_sha256: hash, observations
  };
}

test("normalizes EOIR observations only when exact PDF bytes match", () => {
  const result = normalizeEoirTranscription(pendingInput(), pdf);
  assert.equal(result.observation_count, 1);
  assert.equal(result.observations[0].value, 16560);
  assert.equal(result.source.verification_status, "PENDING_SECOND_PERSON_TRANSCRIPTION_REVIEW");
  assert.equal(result.observations[0].is_unique_person_count, false);
});

test("rejects a PDF whose bytes do not match the transcription hash", () => {
  assert.throws(() => normalizeEoirTranscription(pendingInput(), Buffer.from("different")), /hash does not match/);
});

test("rejects non-registered source URLs", () => {
  const input = pendingInput();
  input.source_url = "https://example.com/fake.pdf";
  assert.throws(() => normalizeEoirTranscription(input, pdf), /registered PDF artifact/);
});

test("rejects unsupported metric definitions and unit substitutions", () => {
  assert.throws(() => normalizeEoirTranscription(pendingInput([{ ...pendingInput().observations[0], metric_id: "child_safety_verified" }]), pdf), /Unknown EOIR metric_id/);
  assert.throws(() => normalizeEoirTranscription(pendingInput([{ ...pendingInput().observations[0], unit: "children" }]), pdf), /Unit mismatch/);
});

test("rejects duplicate metric-period rows", () => {
  const row = pendingInput().observations[0];
  assert.throws(() => normalizeEoirTranscription(pendingInput([row, row]), pdf), /Duplicate EOIR metric/);
});

test("requires PDF page and table references", () => {
  const row = { ...pendingInput().observations[0], page: 0 };
  assert.throws(() => normalizeEoirTranscription(pendingInput([row]), pdf), /PDF page reference/);
});

test("checks pending age-band subtotals without inventing missing components", () => {
  const base = pendingInput().observations[0];
  const rows = [
    ["pending_lt_6_months", 1165],
    ["pending_6_months_to_2_years", 2209],
    ["pending_2_to_5_years", 3280],
    ["pending_more_than_5_years", 9906],
    ["pending_total", 16560]
  ].map(([metric_id, value]) => ({
    ...base, metric_id, value,
    unit: "cases", measure_type: "period_end_stock"
  }));
  const result = normalizeEoirTranscription(pendingInput(rows), pdf);
  assert.equal(result.integrity_checks[0].status, "PASS");
  assert.equal(result.integrity_checks[0].computed, 16560);
});

test("checks decision subtotals and keeps in-absentia as a nested subset", () => {
  const input = {
    schema_version: "1.0", source_key: "eoir_uac_outcomes", source_id: "DOJ-EOIR-UAC-OUTCOMES",
    source_url: "https://www.justice.gov/eoir/media/1344956/dl?inline=",
    document_generated: "2026-07-24", retrieved_at: "2026-11-13T21:54:40.497Z",
    extraction_method: "manual_pdf_transcription", source_file_sha256: hash,
    observations: [
      ["relief_granted",49,"initial_case_completions","Table 1"],
      ["removal",4838,"initial_case_completions","Table 1"],
      ["removal_in_absentia",4023,"initial_case_completions_subset","Table 1"],
      ["dismissal_termination",3065,"initial_case_completions","Table 1"],
      ["voluntary_departure",654,"initial_case_completions","Table 1"],
      ["withdrawn",4,"initial_case_completions","Table 1"],
      ["other",0,"initial_case_completions","Table 1"],
      ["total_decisions",8610,"initial_case_completions","Table 1"],
      ["pending_total",16560,"cases","Table 1"]
    ].map(([metric_id,value,unit,table_or_chart]) => ({
      metric_id, period_label:"FY2026 Q3",
      period:pendingPeriod, value,
      unit: metric_id === "pending_total" ? "cases" : "initial_case_completions",
      measure_type: metric_id === "pending_total" ? "period_end_stock" :
        metric_id === "removal_in_absentia" ? "fy_to_date_initial_case_completions_subset" : "fy_to_date_initial_case_completions",
      page:1, table_or_chart
    }))
  };
  const result = normalizeEoirTranscription(input, pdf);
  assert.equal(result.integrity_checks[0].status, "PASS");
  assert.equal(result.integrity_checks[0].computed, 8610);
  assert.equal(result.integrity_checks[1].status, "PASS");
  assert.equal(result.integrity_checks[1].subset, 4023);
});

test("rejects period labels that do not match exact federal-fiscal dates", () => {
  const input = pendingInput();
  input.observations[0].period = { start_date: "2026-01-01", end_date: "2026-09-30", calendar_type: "US_FEDERAL_FY" };
  assert.throws(() => normalizeEoirTranscription(input, pdf), /Period label\/date contract mismatch/);
});
