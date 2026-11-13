import { createHash } from "node:crypto";

export const EVENT_TYPES = new Set([
  "direct_child_contact", "sponsor_contact", "household_contact",
  "address_verification", "school_record_check", "attempted_contact",
  "safety_assessment", "referral", "substantiated_finding", "arrest",
  "prosecution", "conviction", "reunification", "unknown_disposition"
]);

const PII_KEY = /(name|first_name|last_name|full_name|date_of_birth|dob|birth_date|address|street|phone|email|alien_number|a_number|passport|biometric|ssn|social_security|case_number|docket_number|exact_location)/i;
const TOKEN_RE = /^[a-f0-9]{64}$/i;
const SHA_RE = /^[a-f0-9]{64}$/i;

export function canonicalJson(value) {
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  if (value && typeof value === "object") {
    return "{" + Object.keys(value).sort().map(k => JSON.stringify(k) + ":" + canonicalJson(value[k])).join(",") + "}";
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash("sha256").update(typeof value === "string" ? value : canonicalJson(value)).digest("hex");
}

function assert(condition, message) {
  if (!condition) throw new TypeError(message);
}

function inspectForPii(value, path = "$") {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    assert(!PII_KEY.test(key), "Prohibited personal-data field at " + path + "." + key);
    inspectForPii(child, path + "." + key);
  }
}

function validDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value) && !Number.isNaN(Date.parse(value));
}

export function validateDataset(dataset) {
  assert(dataset && typeof dataset === "object", "Dataset must be an object.");
  inspectForPii(dataset);
  assert(dataset.schema_version === "1.0", "schema_version must be 1.0.");
  assert(Array.isArray(dataset.sources), "sources must be an array.");
  assert(Array.isArray(dataset.events), "events must be an array.");
  assert(dataset.coverage && typeof dataset.coverage === "object", "coverage declaration is required.");

  const sourceIds = new Set();
  for (const source of dataset.sources) {
    assert(typeof source.source_id === "string" && source.source_id.length > 0, "Every source needs source_id.");
    assert(!sourceIds.has(source.source_id), "Duplicate source_id: " + source.source_id);
    sourceIds.add(source.source_id);
    assert(typeof source.uri === "string" && /^https?:\/\//.test(source.uri), "Source " + source.source_id + " needs an HTTP(S) URI.");
    assert(SHA_RE.test(source.sha256 || ""), "Source " + source.source_id + " needs a SHA-256 content hash.");
    assert(validDate(source.retrieved_at), "Source " + source.source_id + " needs retrieved_at.");
  }

  const eventIds = new Set();
  for (const event of dataset.events) {
    assert(typeof event.event_id === "string" && event.event_id.length > 0, "Every event needs event_id.");
    assert(!eventIds.has(event.event_id), "Duplicate event_id: " + event.event_id);
    eventIds.add(event.event_id);
    assert(sourceIds.has(event.source_id), "Event " + event.event_id + " references an unknown source.");
    assert(EVENT_TYPES.has(event.event_type), "Unsupported event_type on " + event.event_id + ".");
    assert(validDate(event.observed_at), "Event " + event.event_id + " needs an ISO timestamp.");
    assert(typeof event.outcome === "string" && event.outcome.length > 0, "Event " + event.event_id + " needs an outcome.");
    if (event.subject_token !== undefined && event.subject_token !== null) {
      assert(TOKEN_RE.test(event.subject_token), "Event " + event.event_id + " subject_token must be a 64-character HMAC-SHA256 token.");
    }
  }

  const c = dataset.coverage;
  assert(validDate(c.start) && validDate(c.end), "Coverage start/end must be ISO timestamps.");
  assert(Date.parse(c.start) <= Date.parse(c.end), "Coverage start must not be after coverage end.");
  assert(typeof c.complete_for_period === "boolean", "coverage.complete_for_period must be explicitly true or false.");
  assert(typeof c.extraction_id === "string" && c.extraction_id.length > 0, "coverage.extraction_id is required.");
  assert(SHA_RE.test(c.query_sha256 || ""), "coverage.query_sha256 must be a SHA-256 hash of the extraction query/workpaper.");
  return { source_count: dataset.sources.length, event_count: dataset.events.length };
}

function withinCoverage(event, coverage) {
  const t = Date.parse(event.observed_at);
  return t >= Date.parse(coverage.start) && t <= Date.parse(coverage.end);
}

export function computeMetrics(dataset) {
  validateDataset(dataset);
  const events = dataset.events.filter(e => withinCoverage(e, dataset.coverage));
  const tokensFor = type => new Set(events.filter(e => e.event_type === type && e.subject_token).map(e => e.subject_token));
  const directSuccessful = events.filter(e => e.event_type === "direct_child_contact" && e.outcome === "successful" && e.subject_token);
  const locatedTokens = new Set(directSuccessful.map(e => e.subject_token));
  const eventCounts = Object.fromEntries([...EVENT_TYPES].map(type => [type, events.filter(e => e.event_type === type).length]));

  return {
    extraction_id: dataset.coverage.extraction_id,
    coverage_start: dataset.coverage.start,
    coverage_end: dataset.coverage.end,
    coverage_complete: dataset.coverage.complete_for_period,
    source_count: dataset.sources.length,
    event_count_in_period: events.length,
    unique_subject_tokens_observed: new Set(events.map(e => e.subject_token).filter(Boolean)).size,
    unique_children_with_successful_direct_contact: locatedTokens.size,
    unique_children_with_sponsor_contact: tokensFor("sponsor_contact").size,
    unique_children_with_safety_assessment_record: tokensFor("safety_assessment").size,
    event_counts: eventCounts,
    exclusions: {
      sponsor_contact_is_not_direct_child_contact: true,
      address_verification_is_not_direct_child_contact: true,
      attempted_contact_is_not_successful_contact: true,
      referral_is_not_substantiation: true,
      arrest_is_not_conviction: true,
      safety_assessment_record_is_not_a_finding_of_safety: true
    }
  };
}

export function evaluateLocatedClaim(dataset, claimedCount) {
  assert(Number.isSafeInteger(claimedCount) && claimedCount >= 0, "claimedCount must be a non-negative safe integer.");
  const metrics = computeMetrics(dataset);
  const observed = metrics.unique_children_with_successful_direct_contact;
  let status = "not_testable";
  let reason = "No qualifying direct-child-contact evidence is present.";

  if (observed > claimedCount) {
    status = "conflicted";
    reason = "The independently computed count exceeds the asserted count; definitions, cohorts, or source coverage may differ.";
  } else if (observed > 0 && observed < claimedCount) {
    status = "partially_verified";
    reason = "Some qualifying records exist, but the asserted total is not reproduced.";
  } else if (observed === claimedCount && metrics.coverage_complete) {
    status = "verified";
    reason = "The count matches within a declared complete extraction window. This verifies only the defined measure and period.";
  } else if (observed === claimedCount && !metrics.coverage_complete) {
    status = "partially_verified";
    reason = "The count matches, but source coverage is not declared complete.";
  }

  return {
    claim: { measure: "unique children with successful direct child contact", claimed_count: claimedCount },
    observed_count: observed,
    status,
    reason,
    metrics,
    limitations: [
      "A pseudonymous token is only as reliable as the source-side tokenization and cross-system linkage process.",
      "A complete extraction declaration must be independently checked against the source system and query/workpaper.",
      "This engine cannot establish child safety, trafficking, reunification, or final disposition from a location/contact event."
    ]
  };
}

export function buildEvidenceManifest(dataset) {
  validateDataset(dataset);
  return {
    manifest_version: "1.0",
    dataset_sha256: sha256(dataset),
    source_hashes: dataset.sources.map(s => ({ source_id: s.source_id, sha256: s.sha256 })).sort((a,b) => a.source_id.localeCompare(b.source_id)),
    event_count: dataset.events.length,
    generated_at: new Date().toISOString(),
    integrity_note: "SHA-256 detects content changes; it is not a digital signature, proof of source authenticity, or proof that source data are true."
  };
}
