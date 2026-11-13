import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { normalizeHhsUacRows, validateEoirTableImport, summarizeHhsWindow } from "./aggregate.mjs";

const [command, inputPath, arg3, arg4, arg5] = process.argv.slice(2);

try {
  if (command === "hhs-json" && inputPath && arg3) {
    const raw = await readFile(inputPath);
    const payload = JSON.parse(raw.toString("utf8"));
    const result = normalizeHhsUacRows(payload, {
      raw_sha256: createHash("sha256").update(raw).digest("hex"),
      retrieved_at: new Date().toISOString()
    });
    await writeFile(arg3, JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
    console.log(JSON.stringify({ status: "ingested", output: arg3, source_rows: result.row_count, observations: result.observation_count, raw_sha256: result.source.raw_sha256 }, null, 2));
  } else if (command === "hhs-summarize" && inputPath && arg3 && arg4 && arg5) {
    const normalized = JSON.parse(await readFile(inputPath, "utf8"));
    const result = summarizeHhsWindow(normalized, arg3, arg4);
    await writeFile(arg5, JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
    console.log(JSON.stringify({ status: result.status, output: arg5, measure_results: result.measures.map(x => ({ metric_id: x.metric_id, status: x.status, value: x.measure?.value })) }, null, 2));
  } else if (command === "eoir-validate" && inputPath) {
    const input = JSON.parse(await readFile(inputPath, "utf8"));
    console.log(JSON.stringify(validateEoirTableImport(input), null, 2));
  } else {
    console.error("Usage: node src/public-ingest-cli.mjs hhs-json <download.json> <new-output.json> | hhs-summarize <normalized.json> <start-date> <end-date> <new-output.json> | eoir-validate <transcription.json>");
    process.exitCode = 2;
  }
} catch (error) {
  console.error("PUBLIC_INGEST_REJECTED: " + error.message);
  process.exitCode = 1;
}
