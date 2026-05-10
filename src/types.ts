export type ReconciliationFlag = "MATCH" | "MISMATCH" | "MISSING_COUNTY" | "MISSING_STATE" | "CONFLICT";

export interface CustodyStatusVerification {
  record_id: string;
  case_number: string;
  jurisdiction: "Hunt County" | "Rains County" | "Region 3E" | "Texas";
  county_status: string;
  state_status: string;
  reconciliation_flag: ReconciliationFlag;
  discrepancy_notes?: string[];
  timestamp_utc: string;
  source_hash: string;
  previous_record_id?: string;
  signature: {
    algorithm: "Ed25519";
    public_key: string;
    value: string;
    timestamp: string;
  };
}
