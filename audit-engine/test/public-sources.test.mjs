import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../sources.manifest.json", import.meta.url), "utf8"));

test("source registry has unique IDs and required public provenance metadata", () => {
  const ids = manifest.sources.map(x => x.source_id);
  assert.equal(new Set(ids).size, ids.length);
  for (const source of manifest.sources) {
    assert.ok(source.source_id);
    assert.ok(source.agency);
    assert.ok(source.title);
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.format);
    if (source.acquisition_receipt) {
      assert.equal(source.retrieval_required, false);
      assert.ok(source.transcription);
    } else {
      assert.equal(source.retrieval_required, true);
    }
  }
});

test("registry separates known publication date from future acquisition receipt", () => {
  for (const source of manifest.sources) {
    assert.ok(source.publication_date === null || /^\d{4}-\d{2}-\d{2}$/.test(source.publication_date));
  }
  assert.match(manifest.registry_policy, /acquisition receipt/);
});

test("registers the primary ORR, EOIR, DHS OIG and GAO source families", () => {
  const ids = new Set(manifest.sources.map(x => x.source_id));
  assert.ok(ids.has("HHS-ORR-UAC-DAILY"));
  assert.ok(ids.has("DOJ-EOIR-UAC-STATISTICS"));
  assert.ok(ids.has("DHS-OIG-OIG-24-46"));
  assert.ok(ids.has("DHS-OIG-OIG-25-21"));
  assert.ok(ids.has("GAO-25-107840"));
});
