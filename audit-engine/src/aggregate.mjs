import { createHash } from "node:crypto";
import { getPublicSource } from "./public-sources.mjs";
import { validateAggregateMeasure } from "./aggregate-measure.mjs";

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


function enumerateDates(start, end) {
  const dates = [];
  const cursor = new Date(start + "T00:00:00Z");
  const last = new Date(end + "T00:00:00Z");
  while (cursor <= last) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

const HHS_MEASURE_DEFINITIONS = {
  children_placed_in_cbp_custody_: {
    unit_of_analysis: "cbp_custody_placement_event",
    measurement_class: "administrative_event_count",
    unique: false,
    denominator: "Sum of daily reported placements in CBP custody; source does not establish deduplication across reporting days."
  },
  children_transferred_out_of_cbp_custody: {
    unit_of_analysis: "cbp_transfer_out_event",
    measurement_class: "administrative_event_count",
    unique: false,
    denominator: "Sum of daily reported transfers out of CBP custody; source does not establish deduplication across reporting days."
  },
  children_discharged_from: {
    unit_of_analysis: "orr_discharge_event",
    measurement_class: "administrative_event_count",
    unique: false,
    denominator: "Sum of daily reported discharges from HHS care; source does not establish deduplication across reporting days or sponsor-category breakdown."
  },
  children_in_cbp_custody: {
    unit_of_analysis: "cbp_custody_stock_snapshot",
    measurement_class: "administrative_snapshot",
    unique: true,
    denominator: "Children reported in CBP custody on the specified snapshot date."
  },
  children_in_hhs_care: {
    unit_of_analysis: "orr_care_stock_snapshot",
    measurement_class: "administrative_snapshot",
    unique: true,
    denominator: "Children reported in HHS care on the specified snapshot date."
  }
};

export function summarizeHhsWindow(normalized, startDate, endDate) {
  requireValue(normalized && normalized.dataset_kind === "public_aggregate_observations", "Normalized public aggregate dataset required.");
  requireValue(DATE_RE.test(startDate) && DATE_RE.test(endDate) && startDate <= endDate, "Valid inclusive startDate/endDate required.");
  const source = getPublicSource("hhs_uac_daily");
  const rows = normalized.observations || [];
  const selected = rows.filter(row => row.observed_date >= startDate && row.observed_date <= endDate);
  const observedDates = new Set(selected.map(row => row.observed_date));
  const expectedDates = enumerateDates(startDate, endDate);
  const missingDates = expectedDates.filter(date => !observedDates.has(date));
  const metricIds = [...new Set(selected.map(row => row.metric_id))];
  const results = [];

  for (const metricId of metricIds) {
    const definition = HHS_MEASURE_DEFINITIONS[metricId];
    if (!definition) {
      results.push({ metric_id: metricId, status: "BLOCKED_UNKNOWN_MEASURE_DEFINITION" });
      continue;
    }
    const metricRows = selected.filter(row => row.metric_id === metricId);
    const metricDates = new Set(metricRows.map(row => row.observed_date));
    const metricMissingDates = expectedDates.filter(date => !metricDates.has(date));
    const isStock = definition.measurement_class === "administrative_snapshot";
    let value;
    let measureWindow;
    let status = "READY";
    if (isStock) {
      const endpoint = metricRows.find(row => row.observed_date === endDate);
      if (!endpoint) {
        results.push({ metric_id: metricId, status: "BLOCKED_MISSING_ENDPOINT_SNAPSHOT", required_snapshot_date: endDate });
        continue;
      }
      value = endpoint.value;
      measureWindow = { start_date: endDate, end_date: endDate, calendar_type: "POINT_IN_TIME" };
    } else {
      if (metricMissingDates.length) {
        results.push({ metric_id: metricId, status: "BLOCKED_INCOMPLETE_DAILY_COVERAGE", missing_dates: metricMissingDates, observed_date_count: metricDates.size, expected_date_count: expectedDates.length });
        continue;
      }
      value = metricRows.reduce((sum, row) => sum + row.value, 0);
      measureWindow = { start_date: startDate, end_date: endDate, calendar_type: "CUSTOM" };
    }

    const first = metricRows[0];
    const measure = {
      measure_id: source.source_id.toLowerCase() + "-" + metricId + "-" + startDate + "-" + endDate,
      source_id: source.source_id,
      agency: source.publisher,
      metric_name: first.metric_label,
      unit_of_analysis: definition.unit_of_analysis,
      unit: "children",
      is_unique_person_count: definition.unique,
      time_window: measureWindow,
      value,
      denominator_definition: definition.denominator,
      population_scope: {
        cohort_definition: first.metric_label + " as defined by the source dataset",
        geography: "US"
      },
      measurement_class: definition.measurement_class,
      known_limitations: [
        "Source is daily aggregate data and contains no child-level records.",
        "This dataset does not establish post-release location, safety, trafficking, or final disposition.",
        ...(!definition.unique ? ["The source does not establish deduplication of the same child across reporting days."] : [])
      ],
      provenance: {
        url: source.landing_url,
        retrieved_at: normalized.source.retrieved_at,
        publication_date: null,
        artifact_sha256: normalized.source.raw_sha256
      }
    };
    validateAggregateMeasure(measure);
    results.push({ metric_id: metricId, status, measure });
  }

  return {
    status: missingDates.length ? "PARTIAL_COVERAGE" : "COMPLETE_DATE_COVERAGE",
    requested_window: { start_date: startDate, end_date: endDate, expected_date_count: expectedDates.length },
    observed_date_count: observedDates.size,
    missing_dates: missingDates,
    measures: results,
    coverage_note: "Date coverage is assessed at calendar-day granularity. Missing dates block flow summation; stock metrics use only the explicitly requested end-date snapshot."
  };
}
