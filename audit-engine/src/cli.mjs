import { readFile } from "node:fs/promises";
import { evaluateLocatedClaim, buildEvidenceManifest } from "./verify.mjs";

const path = process.argv[2];
if (!path) {
  console.error("Usage: node src/cli.mjs <dataset.json> [claimed-count]");
  process.exitCode = 2;
} else {
  try {
    const dataset = JSON.parse(await readFile(new URL(path, import.meta.url).href, "utf8"));
    const claimedCount = Number(process.argv[3] ?? dataset.claim?.claimed_count);
    const result = evaluateLocatedClaim(dataset, claimedCount);
    console.log(JSON.stringify({ result, manifest: buildEvidenceManifest(dataset) }, null, 2));
  } catch (error) {
    console.error("AUDIT_INPUT_REJECTED: " + error.message);
    process.exitCode = 1;
  }
}
