import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { normalizeHhsUacRows, validateEoirTableImport, summarizeHhsWindow } from "./aggregate.mjs";
import { createAcquisitionReceipt } from "./aggregate-measure.mjs";
import { getPublicSource } from "./public-sources.mjs";

const [command, inputPath, arg3, arg4, arg5] = process.argv.slice(2);
const hhsSource = getPublicSource("hhs_uac_daily");

async function ingestHhsBytes(raw, normalizedPath, retrievedAt) {
  if (typeof retrievedAt !== "string" || Number.isNaN(Date.parse(retrievedAt))) {
    throw new TypeError("A real ISO retrieval timestamp is required.");
  }
  const payload = JSON.parse(raw.toString("utf8"));
  const rawSha256 = createHash("sha256").update(raw).digest("hex");
  const result = normalizeHhsUacRows(payload, {
    raw_sha256: rawSha256,
    retrieved_at: retrievedAt
  });
  await writeFile(normalizedPath, JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
  const receiptPath = normalizedPath + ".receipt.json";
  const receipt = createAcquisitionReceipt(hhsSource, raw, retrievedAt, null);
  await writeFile(receiptPath, JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
  console.log(JSON.stringify({
    status: "ingested",
    output: normalizedPath,
    receipt: receiptPath,
    source_rows: result.row_count,
    unique_dates: result.unique_date_count,
    observations: result.observation_count,
    duplicate_dates: result.duplicate_dates.length,
    raw_sha256: rawSha256,
    retrieved_at: retrievedAt
  }, null, 2));
}

try {
  if (command === "hhs-fetch" && inputPath && arg3) {
    const response = await fetch(hhsSource.download_url);
    if (!response.ok) throw new Error("HHS download returned HTTP " + response.status);
    const raw = Buffer.from(await response.arrayBuffer());
    const retrievedAt = new Date().toISOString();
    await writeFile(inputPath, raw, { flag: "wx" });
    await ingestHhsBytes(raw, arg3, retrievedAt);
  } else if (command === "hhs-json" && inputPath && arg3 && arg4) {
    const raw = await readFile(inputPath);
    await ingestHhsBytes(raw, arg3, arg4);
  } else if (command === "hhs-summarize" && inputPath && arg3 && arg4 && arg5) {
    const normalized = JSON.parse(await readFile(inputPath, "utf8"));
    const result = summarizeHhsWindow(normalized, arg3, arg4);
    await writeFile(arg5, JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
    console.log(JSON.stringify({
      status: result.status,
      output: arg5,
      measure_results: result.measures.map(x => ({
        metric_id: x.metric_id,
        status: x.status,
        value: x.measure?.value
      }))
    }, null, 2));
  } else if (command === "eoir-validate" && inputPath) {
    const input = JSON.parse(await readFile(inputPath, "utf8"));
    console.log(JSON.stringify(validateEoirTableImport(input), null, 2));
  } else {
    console.error("Usage: node src/public-ingest-cli.mjs hhs-fetch <new-raw.json> <new-normalized.json> | hhs-json <download.json> <new-normalized.json> <retrieved-at-ISO> | hhs-summarize <normalized.json> <start-date> <end-date> <new-output.json> | eoir-validate <transcription.json>");
    process.exitCode = 2;
  }
} catch (error) {
  console.error("PUBLIC_INGEST_REJECTED: " + error.message);
  process.exitCode = 1;
}
