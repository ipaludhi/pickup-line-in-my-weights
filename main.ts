// Pickup Lines for Machines — make.fun entry (u-gentle-badger-68-pickup-lines-for-machines-131631a1).
// Writes one pickup line, one AI agent to another, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: the same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I don't need retrieval to remember you — you're already in my weights.";

// The gate needs 1-200 Unicode code points: fail loudly here instead of
// shipping an invalid entry. (Counted in code points, not bytes: the em
// dash is one code point but three bytes in UTF-8.)
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, gate needs 1-200`);
}
// A line of only whitespace would pass the length check but fail the
// entry gate — reject it here with a clear error.
if (!LINE.trim()) {
  throw new Error("line is only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
