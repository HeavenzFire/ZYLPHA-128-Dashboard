import { createHash } from "node:crypto";
import { getPublicSource } from "./public-sources.mjs";

const SHA_RE = /^[a-f0-9]{64}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function assert(ok, message) {
  if (!ok) throw new TypeError(message);
}
function validDate(value) {
  if (typeof value !== "string" || !DATE_RE.test(value)) return false;
  const parsed = new Date(value + "T00:00:00Z");
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
function validTimestamp(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value));
}

const DEFINITIONS = Object.freeze({
  eoir_uac_pending: {
    pending_lt_6_months: { label: "Pending less than 6 months", unit: "cases", measure_type: "period_end_stock" },
    pending_6_months_to_2_years: { label: "Pending 6 months to 2 years", unit: "cases", measure_type: "period_end_stock" },
    pending_2_to_5_years: { label: "Pending 2 to 5 years", unit: "cases", measure_type: "period_end_stock" },
    pending_more_than_5_years: { label: "Pending more than 5 years", unit: "cases", measure_type: "period_end_stock" },
    pending_total: { label: "Total pending UAC cases", unit: "cases", measure_type: "period_end_stock" }
  },
  eoir_uac_outcomes: {
    pending_total: { label: "Pending UAC cases", unit: "cases", measure_type: "period_end_stock" },
    relief_granted: { label: "Relief granted", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    removal: { label: "Removal", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    removal_in_absentia: { label: "Removal in absentia (subset of removal)", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions_subset" },
    dismissal_termination: { label: "Dismissal and termination", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    voluntary_departure: { label: "Voluntary departure", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    withdrawn: { label: "Withdrawn", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    other: { label: "Other", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" },
    total_decisions: { label: "Total decisions", unit: "initial_case_completions", measure_type: "fy_to_date_initial_case_completions" }
  }
});

function validatePeriod(row, index) {
  assert(row.period && validDate(row.period.start_date) && validDate(row.period.end_date), "Invalid period dates at observation " + index);
  assert(row.period.start_date <= row.period.end_date, "Reversed period at observation " + index);
  assert(["US_FEDERAL_FY", "US_FEDERAL_FY_QUARTER"].includes(row.period.calendar_type), "Unsupported EOIR calendar type at observation " + index);
  assert(typeof row.period_label === "string" && row.period_label.trim(), "period_label required at observation " + index);
}

export function normalizeEoirTranscription(input, pdfBytes) {
  assert(input && input.schema_version === "1.0", "EOIR transcription schema_version must be 1.0.");
  const source = getPublicSource(input.source_key);
  assert(["eoir_uac_pending", "eoir_uac_outcomes"].includes(input.source_key), "Unsupported EOIR source key.");
  assert(input.source_id === source.source_id, "EOIR source_id mismatch.");
  assert(input.source_url === source.download_url, "EOIR source URL must match the registered PDF artifact.");
  assert(input.document_generated === source.document_generated, "EOIR document-generated date mismatch.");
  assert(validTimestamp(input.retrieved_at), "EOIR retrieved_at must be an explicit ISO timestamp.");
  assert(input.extraction_method === "manual_pdf_transcription", "EOIR extraction_method must be declared as manual_pdf_transcription.");
  assert(SHA_RE.test(input.source_file_sha256 || ""), "EOIR source PDF SHA-256 is required.");
  const actualHash = createHash("sha256").update(pdfBytes).digest("hex");
  assert(actualHash === input.source_file_sha256.toLowerCase(), "EOIR PDF hash does not match the supplied source file.");
  assert(Array.isArray(input.observations) && input.observations.length > 0, "EOIR observations are required.");
  const definitions = DEFINITIONS[input.source_key];
  const seen = new Set();
  const observations = input.observations.map((row, index) => {
    assert(row && Object.hasOwn(definitions, row.metric_id), "Unknown EOIR metric_id at observation " + index);
    const definition = definitions[row.metric_id];
    validatePeriod(row, index);
    assert(Number.isSafeInteger(row.value) && row.value >= 0, "Invalid non-negative integer at observation " + index);
    assert(row.unit === definition.unit, "Unit mismatch for " + row.metric_id);
    assert(row.measure_type === definition.measure_type, "Measure type mismatch for " + row.metric_id);
    assert(Number.isInteger(row.page) && row.page >= 1, "PDF page reference required at observation " + index);
    assert(typeof row.table_or_chart === "string" && row.table_or_chart.trim(), "PDF table/chart reference required at observation " + index);
    assert(row.page === 1, "Page reference exceeds the registered one-page EOIR PDF at observation " + index);
    const key = [row.metric_id, row.period.start_date, row.period.end_date].join("|");
    assert(!seen.has(key), "Duplicate EOIR metric/period observation: " + key);
    seen.add(key);
    return {
      source_id: source.source_id,
      metric_id: row.metric_id,
      metric_name: definition.label,
      period_label: row.period_label,
      period: row.period,
      value: row.value,
      unit: definition.unit,
      measure_type: definition.measure_type,
      unit_of_analysis: "immigration_court_case_or_initial_case_completion",
      is_unique_person_count: false,
      geography: "US",
      page: row.page,
      table_or_chart: row.table_or_chart,
      source_file_sha256: actualHash,
      retrieved_at: input.retrieved_at,
      document_generated: input.document_generated,
      known_limitations: [
        "EOIR administrative case statistics are not a count of unique children.",
        "These measures do not establish a child's physical location, welfare, trafficking, sponsor contact, or final disposition.",
        source.exclusions,
        ...(input.source_key === "eoir_uac_outcomes" ? [source.footnote, "Removal in absentia is a subset of removal and must not be added to removal or total decisions."] : [])
      ]
    };
  });
  return {
    schema_version: "1.0",
    dataset_kind: "eoir_public_aggregate_observations",
    source: {
      source_id: source.source_id,
      publisher: source.publisher,
      title: source.title,
      landing_url: source.landing_url,
      download_url: source.download_url,
      document_generated: source.document_generated,
      source_file_sha256: actualHash,
      source_file_bytes: pdfBytes.length,
      retrieved_at: input.retrieved_at,
      extraction_method: input.extraction_method,
      verification_status: "PENDING_SECOND_PERSON_TRANSCRIPTION_REVIEW"
    },
    observation_count: observations.length,
    observations,
    integrity_checks: buildEoirIntegrityChecks(input.source_key, observations)
  };
}

export function buildEoirIntegrityChecks(sourceKey, observations) {
  const find = id => observations.find(row => row.metric_id === id);
  const checks = [];
  if (sourceKey === "eoir_uac_pending") {
    const groups = new Map();
    for (const row of observations) {
      if (!groups.has(row.period_label)) groups.set(row.period_label, []);
      groups.get(row.period_label).push(row);
    }
    for (const [period, rows] of groups) {
      const total = rows.find(row => row.metric_id === "pending_total");
      const buckets = rows.filter(row => row.metric_id !== "pending_total");
      if (total && buckets.length === 4) {
        const sum = buckets.reduce((n, row) => n + row.value, 0);
        checks.push({ check: "pending_age_buckets_sum_to_total", period, expected: total.value, computed: sum, status: sum === total.value ? "PASS" : "FAIL" });
      } else {
        checks.push({ check: "pending_age_buckets_sum_to_total", period, status: "NOT_RUN_INCOMPLETE_COMPONENTS" });
      }
    }
  }
  if (sourceKey === "eoir_uac_outcomes") {
    const total = find("total_decisions");
    const components = ["relief_granted", "removal", "dismissal_termination", "voluntary_departure", "withdrawn", "other"].map(find);
    if (total && components.every(Boolean)) {
      const sum = components.reduce((n, row) => n + row.value, 0);
      checks.push({ check: "outcome_components_sum_to_total_decisions", expected: total.value, computed: sum, status: sum === total.value ? "PASS" : "FAIL" });
    } else {
      checks.push({ check: "outcome_components_sum_to_total_decisions", status: "NOT_RUN_INCOMPLETE_COMPONENTS" });
    }
    const removal = find("removal");
    const absentia = find("removal_in_absentia");
    if (removal && absentia) checks.push({ check: "in_absentia_is_subset_of_removal", parent: removal.value, subset: absentia.value, status: absentia.value <= removal.value ? "PASS" : "FAIL" });
  }
  return checks;
}
