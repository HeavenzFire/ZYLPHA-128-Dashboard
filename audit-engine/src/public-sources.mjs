export const PUBLIC_SOURCES = Object.freeze({
  hhs_uac_daily: {
    source_id: "HHS-ORR-UAC-DAILY",
    publisher: "HHS/ACF/ORR",
    title: "HHS Unaccompanied Alien Children Program",
    dataset_id: "ehpz-xc9n",
    landing_url: "https://healthdata.gov/National/HHS-Unaccompanied-Alien-Children-Program/ehpz-xc9n",
    download_url: "https://healthdata.gov/api/v3/views/ehpz-xc9n/query.json?accessType=DOWNLOAD",
    format: "json",
    grain: "daily_aggregate",
    contains_person_level_records: false,
    metrics: {
      children_placed_in_cbp_custody_: { label: "Children apprehended and placed in CBP custody", unit: "children", measure: "daily_flow" },
      children_in_cbp_custody: { label: "Children in CBP custody", unit: "children", measure: "daily_stock" },
      children_transferred_out_of_cbp_custody: { label: "Children transferred out of CBP custody", unit: "children", measure: "daily_flow" },
      children_in_hhs_care: { label: "Children in HHS care", unit: "children", measure: "daily_stock" },
      children_discharged_from: { label: "Children discharged from HHS care to vetted sponsors", unit: "children", measure: "daily_flow" }
    }
  },
  eoir_uac_pending: {
    source_id: "DOJ-EOIR-UAC-PENDING",
    publisher: "DOJ/EOIR",
    title: "Pending Unaccompanied Alien Child (UAC) Cases",
    landing_url: "https://www.justice.gov/eoir/workload-and-adjudication-statistics",
    download_url: "https://www.justice.gov/eoir/media/1344946/dl?inline=",
    document_generated: "2026-07-24",
    format: "pdf",
    grain: "fiscal_year_end_or_quarter_end_case_stock",
    contains_person_level_records: false,
    exclusions: "Excludes mental competency/Franco litigation, Institutional Hearing Program, Migration Protection Protocol cases, and cases with a 7A adjournment."
  },
  eoir_uac_outcomes: {
    source_id: "DOJ-EOIR-UAC-OUTCOMES",
    publisher: "DOJ/EOIR",
    title: "Unaccompanied Alien Child Statistics",
    landing_url: "https://www.justice.gov/eoir/workload-and-adjudication-statistics",
    download_url: "https://www.justice.gov/eoir/media/1344956/dl?inline=",
    document_generated: "2026-07-24",
    format: "pdf",
    grain: "fiscal_year_to_date_initial_case_completions",
    contains_person_level_records: false,
    footnote: "I-862 initial case completions only.",
    exclusions: "Excludes mental competency/Franco litigation, Institutional Hearing Program, Migration Protection Protocol cases, and cases with a 7A adjournment."
  },
  eoir_uac_statistics: {
    source_id: "DOJ-EOIR-UAC-STATISTICS",
    publisher: "U.S. Department of Justice — Executive Office for Immigration Review",
    title: "Workload and Adjudication Statistics — Unaccompanied Alien Children",
    landing_url: "https://www.justice.gov/eoir/workload-and-adjudication-statistics",
    format: "pdf",
    grain: "fiscal_year_or_quarter_case_aggregate",
    contains_person_level_records: false,
    automated_download: false,
    note: "Official UAC tables are published as PDFs. Import transcribed table cells with page/table references; do not scrape chart pixels or infer unreported values."
  }
});

export function getPublicSource(sourceKey) {
  const source = PUBLIC_SOURCES[sourceKey];
  if (!source) throw new TypeError("Unknown public source key: " + sourceKey);
  return source;
}
