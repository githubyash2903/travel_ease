// scripts/clean-airports.ts
import fs from "fs";
import path from "path";

const input = path.join(process.cwd(), "src", "data", "airports.dat");
const output = path.join(process.cwd(), "src", "data", "airports.json");

if (!fs.existsSync(input)) {
  console.error("Missing airports.dat at", input);
  process.exit(1);
}

const raw = fs.readFileSync(input, "utf8");
const rows = raw.split("\n");
const out: any[] = [];

for (const row of rows) {
  if (!row.trim()) continue;
  // columns are comma separated, fields can be quoted
  const cols = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  // OpenFlights columns:
  // 0 id,1 name,2 city,3 country,4 iata,5 icao, ...
  const name = cols[1]?.replace(/(^"|"$)/g, "").trim();
  const city = cols[2]?.replace(/(^"|"$)/g, "").trim();
  const country = cols[3]?.replace(/(^"|"$)/g, "").trim();
  const iata = cols[4]?.replace(/(^"|"$)/g, "").trim();

  // keep only entries with valid 3-letter IATA
  if (!iata || iata === "\\N" || iata.length !== 3) continue;

  out.push({
    code: iata,
    name,
    city,
    country,
  });
}

fs.writeFileSync(output, JSON.stringify(out, null, 2));
console.log("Generated", out.length, "airports ->", output);
