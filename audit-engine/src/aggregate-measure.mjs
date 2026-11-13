import { createHash } from "node:crypto";

export const MEASUREMENT_CLASSES = new Set([
  "administrative_census",
  "administrative_snapshot",
  "administrative_event_count",
  "audit_sample",
  "statistical_projection",
  "research_estimate",
  "unknown"
]);

const SHA_RE = /^[a-f0-9]{64}$/i;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function assert(ok, message) {
  if (!ok) throw new TypeError(message);
}
function dateOk(value) {
  if (typeof value !== "string" || !ISO_DATE_RE.test(value)) return false;
  const parsed = new Date(value + "T00:00:00Z");
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
function nonempty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateAggregateMeasure(m) {
  assert(m && typeof m === "object", "AggregateMeasure must be an object.");
  for (const key of ["measure_id","source_id","agency","metric_name","unit_of_analysis","unit","denominator_definition"]) {
    assert(nonempty(m[key]), key + " is required.");
  }
  assert(typeof m.is_unique_person_count === "boolean", "is_unique_person_count must be explicit.");
  assert(Number.isSafeInteger(m.value) && m.value >= 0, "value must be a non-negative safe integer.");
  assert(m.time_window && dateOk(m.time_window.start_date) && dateOk(m.time_window.end_date), "Valid time_window dates are required.");
  assert(m.time_window.start_date <= m.time_window.end_date, "time_window start_date must not exceed end_date.");
  assert(new Set(["US_FEDERAL_FY","CALENDAR_YEAR","CUSTOM","POINT_IN_TIME"]).has(m.time_window.calendar_type), "Unsupported calendar_type.");
  assert(MEASUREMENT_CLASSES.has(m.measurement_class), "measurement_class is required and must be recognized.");
  assert(Array.isArray(m.known_limitations), "known_limitations must be an array.");
  assert(m.population_scope && nonempty(m.population_scope.cohort_definition), "population_scope.cohort_definition is required.");
  assert(nonempty(m.population_scope.geography), "population_scope.geography is required.");
  assert(m.provenance && /^https:\/\//.test(m.provenance.url || ""), "provenance.url must be HTTPS.");
  assert(typeof m.provenance.retrieved_at === "string" && !Number.isNaN(Date.parse(m.provenance.retrieved_at)), "provenance.retrieved_at is required.");
  assert(SHA_RE.test(m.provenance.artifact_sha256 || ""), "provenance.artifact_sha256 must be SHA-256.");
  assert(m.provenance.publication_date === null || dateOk(m.provenance.publication_date), "publication_date must be a valid ISO date or explicit null.");
  if (m.measurement_class === "audit_sample" || m.measurement_class === "statistical_projection" || m.measurement_class === "research_estimate") {
    assert(m.uncertainty && (Number.isFinite(m.uncertainty.confidence_level) || m.uncertainty.confidence_level === null),
      "Sample/projection/estimate requires an explicit uncertainty object and confidence_level (or null with explanation).");
    assert(nonempty(m.uncertainty.method), "Uncertainty method or reason unavailable is required.");
  }
  return true;
}

export function comparableMeasure(a, b) {
  validateAggregateMeasure(a);
  validateAggregateMeasure(b);
  const blockers = [];
  const warnings = [];
  if (a.unit_of_analysis !== b.unit_of_analysis) blockers.push("UNIT_OF_ANALYSIS_MISMATCH");
  if (a.unit !== b.unit) blockers.push("MEASURE_UNIT_MISMATCH");
  if (a.time_window.start_date !== b.time_window.start_date || a.time_window.end_date !== b.time_window.end_date ||
      a.time_window.calendar_type !== b.time_window.calendar_type) blockers.push("TEMPORAL_MISMATCH");
  if (a.population_scope.cohort_definition !== b.population_scope.cohort_definition ||
      a.population_scope.geography !== b.population_scope.geography) blockers.push("POPULATION_SCOPE_MISMATCH");
  if (a.measurement_class !== b.measurement_class) blockers.push("MEASUREMENT_CLASS_MISMATCH");
  if (a.is_unique_person_count !== b.is_unique_person_count) blockers.push("PERSON_DEDUPLICATION_MISMATCH");
  if (a.metric_name !== b.metric_name) warnings.push("METRIC_LABELS_DIFFER");
  if (a.denominator_definition !== b.denominator_definition) blockers.push("DENOMINATOR_DEFINITION_MISMATCH");
  if (a.measurement_class === "audit_sample" || a.measurement_class === "statistical_projection" || a.measurement_class === "research_estimate") {
    blockers.push("UNCERTAINTY_PROPAGATION_REQUIRED");
  }
  return {
    comparable: blockers.length === 0,
    blockers,
    warnings,
    arithmetic: blockers.length === 0 ? {
      difference: a.value - b.value,
      ratio: b.value === 0 ? null : a.value / b.value,
      note: "Arithmetic is permitted only under the declared metadata contract; it does not establish that either source is accurate."
    } : null
  };
}

export function createAcquisitionReceipt(source, rawBytes, retrievedAt, publicationDate = null) {
  assert(source && nonempty(source.source_id), "Registered source is required.");
  assert(typeof retrievedAt === "string" && !Number.isNaN(Date.parse(retrievedAt)), "retrievedAt must be an ISO timestamp.");
  assert(publicationDate === null || dateOk(publicationDate), "publicationDate must be ISO date or null.");
  return {
    receipt_version: "1.0",
    source_id: source.source_id,
    agency: source.agency || source.publisher,
    source_url: source.url || source.landing_url,
    artifact_url: source.artifact_url || source.download_url,
    artifact_sha256: createHash("sha256").update(rawBytes).digest("hex"),
    artifact_bytes: rawBytes.length,
    retrieved_at: retrievedAt,
    publication_date: publicationDate
  };
}
