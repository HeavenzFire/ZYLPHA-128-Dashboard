import { createHash } from "node:crypto";
import { getPublicSource } from "./public-sources.mjs";

const SHA_RE = /^[a-f0-9]{64}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function requireValue(ok, message) {
  if (!ok) throw new TypeError(message);
}

function parseCount(value, field, rowIndex) {
  const n = typeof value === "number" ? value : Number(value);
  requireValue(value !== null && value !== undefined && value !== "" && Number.isSafeInteger(n) && n >= 0,
    "Invalid non-negative integer in row " + rowIndex + ", field " + field);
  return n;
}

export function normalizeHhsUacRows(rows, provenance) {
  const source = getPublicSource("hhs_uac_daily");
  requireValue(Array.isArray(rows), "HHS source payload must be a JSON array.");
  requireValue(rows.length > 0, "HHS source payload is empty.");
  requireValue(provenance && SHA_RE.test(provenance.raw_sha256 || ""), "A SHA-256 hash of the exact raw source payload is required.");
  requireValue(typeof provenance.retrieved_at === "string" && !Number.isNaN(Date.parse(provenance.retrieved_at)), "retrieved_at must be an ISO timestamp.");
  const seenDates = new Set();
  const observations = [];

  rows.forEach((row, index) => {
    const rawDate = row.date;
    const date = typeof rawDate === "string" ? rawDate.slice(0, 10) : "";
    requireValue(DATE_RE.test(date) && !Number.isNaN(Date.parse(date + "T00:00:00Z")), "Invalid HHS date at row " + index);
    requireValue(!seenDates.has(date), "Duplicate HHS date: " + date);
    seenDates.add(date);

    for (const [field, definition] of Object.entries(source.metrics)) {
      requireValue(Object.hasOwn(row, field), "Missing HHS metric field: " + field);
      observations.push({
        source_id: source.source_id,
        dataset_id: source.dataset_id,
        observed_date: date,
        metric_id: field,
        metric_label: definition.label,
        measure_type: definition.measure,
        unit: definition.unit,
        value: parseCount(row[field], field, index),
        geography: "US",
        grain: source.grain,
        raw_source_sha256: provenance.raw_sha256,
        retrieved_at: provenance.retrieved_at
      });
    }
  });

  return {
    schema_version: "1.0",
    dataset_kind: "public_aggregate_observations",
    source: {
      source_id: source.source_id,
      publisher: source.publisher,
      title: source.title,
      landing_url: source.landing_url,
      download_url: source.download_url,
      dataset_id: source.dataset_id,
      raw_sha256: provenance.raw_sha256,
      retrieved_at: provenance.retrieved_at
    },
    row_count: rows.length,
    observation_count: observations.length,
    observations
  };
}

export function validateEoirTableImport(input) {
  requireValue(input && input.schema_version === "1.0", "EOIR import schema_version must be 1.0.");
  requireValue(input.source_id === "DOJ-EOIR-UAC-STATISTICS", "EOIR source_id mismatch.");
  requireValue(typeof input.source_url === "string" && input.source_url.startsWith("https://www.justice.gov/eoir/"), "EOIR source must be an official justice.gov URL.");
  requireValue(typeof input.table_title === "string" && input.table_title.length > 0, "EOIR table_title is required.");
  requireValue(typeof input.document_generated === "string" && DATE_RE.test(input.document_generated), "EOIR document_generated date is required.");
  requireValue(SHA_RE.test(input.source_file_sha256 || ""), "EOIR source PDF SHA-256 is required.");
  requireValue(Array.isArray(input.observations) && input.observations.length > 0, "EOIR observations are required.");
  for (const [i, row] of input.observations.entries()) {
    requireValue(typeof row.metric_id === "string" && row.metric_id.length > 0, "EOIR metric_id missing at row " + i);
    requireValue(typeof row.period_label === "string" && row.period_label.length > 0, "EOIR period_label missing at row " + i);
    requireValue(Number.isSafeInteger(row.value) && row.value >= 0, "EOIR value invalid at row " + i);
    requireValue(typeof row.unit === "string" && row.unit.length > 0, "EOIR unit missing at row " + i);
    requireValue(typeof row.measure_type === "string" && row.measure_type.length > 0, "EOIR measure_type missing at row " + i);
    requireValue(Number.isInteger(row.page) && row.page >= 1, "EOIR PDF page reference required at row " + i);
    requireValue(typeof row.table_or_chart === "string" && row.table_or_chart.length > 0, "EOIR table/chart reference required at row " + i);
  }
  return { observation_count: input.observations.length, status: "validated_transcription_metadata_not_source_authenticity" };
}

export function compareAggregateObservations(a, b) {
  const keys = ["metric_id", "period_label", "unit", "measure_type", "geography"];
  const mismatches = keys.filter(key => (a[key] ?? null) !== (b[key] ?? null));
  if (mismatches.length) return { comparable: false, mismatches };
  return { comparable: true, difference: a.value - b.value, left_value: a.value, right_value: b.value };
}
