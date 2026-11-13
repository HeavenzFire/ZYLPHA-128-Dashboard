import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { normalizeHhsUacRows, validateEoirTableImport } from "./aggregate.mjs";

const [command, inputPath, outputPath] = process.argv.slice(2);

try {
  if (command === "hhs-json" && inputPath && outputPath) {
    const raw = await readFile(inputPath);
    const rawText = raw.toString("utf8");
    const payload = JSON.parse(rawText);
    const result = normalizeHhsUacRows(payload, {
      raw_sha256: createHash("sha256").update(raw).digest("hex"),
      retrieved_at: new Date().toISOString()
    });
    await writeFile(outputPath, JSON.stringify(result, null, 2) + "\\n", { flag: "wx" });
    console.log(JSON.stringify({ status: "ingested", output: outputPath, source_rows: result.row_count, observations: result.observation_count, raw_sha256: result.source.raw_sha256 }, null, 2));
  } else if (command === "eoir-validate" && inputPath) {
    const input = JSON.parse(await readFile(inputPath, "utf8"));
    console.log(JSON.stringify(validateEoirTableImport(input), null, 2));
  } else {
    console.error("Usage: node src/public-ingest-cli.mjs hhs-json <download.json> <new-output.json> | eoir-validate <transcription.json>");
    process.exitCode = 2;
  }
} catch (error) {
  console.error("PUBLIC_INGEST_REJECTED: " + error.message);
  process.exitCode = 1;
}
