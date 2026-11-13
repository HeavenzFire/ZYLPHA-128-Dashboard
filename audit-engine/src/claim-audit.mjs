import { readFile } from "node:fs/promises";
import { validateAggregateMeasure, comparableMeasure } from "./aggregate-measure.mjs";

const [mode, leftPath, rightPath] = process.argv.slice(2);

try {
  if (mode === "validate" && leftPath) {
    const measure = JSON.parse(await readFile(leftPath, "utf8"));
    validateAggregateMeasure(measure);
    console.log(JSON.stringify({ status: "VALID_SCHEMA", measure_id: measure.measure_id }, null, 2));
  } else if (mode === "compare" && leftPath && rightPath) {
    const left = JSON.parse(await readFile(leftPath, "utf8"));
    const right = JSON.parse(await readFile(rightPath, "utf8"));
    console.log(JSON.stringify(comparableMeasure(left, right), null, 2));
  } else {
    console.error("Usage: node src/claim-audit.mjs validate <measure.json> | compare <measure-a.json> <measure-b.json>");
    process.exitCode = 2;
  }
} catch (error) {
  console.error("CLAIM_AUDIT_REJECTED: " + error.message);
  process.exitCode = 1;
}
