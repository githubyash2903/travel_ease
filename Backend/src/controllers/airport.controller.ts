// src/controllers/airports.controller.ts
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

type Airport = {
  code?: string;
  iata?: string;
  iataCode?: string;
  city?: string;
  country?: string;
  name?: string;
};

const DATA_PATH = path.join(process.cwd(), "src", "data", "airports.json");

// In-memory cache
let AIRPORTS: Airport[] = [];
let lastLoad = 0;
const TTL_LOAD = 1000 * 60 * 60; // 1 hour

const loadAirports = () => {
  if (AIRPORTS.length && Date.now() - lastLoad < TTL_LOAD) return;
  if (!fs.existsSync(DATA_PATH)) {
    AIRPORTS = [];
    lastLoad = Date.now();
    return;
  }
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    AIRPORTS = JSON.parse(raw);
    lastLoad = Date.now();
  } catch (err) {
    console.error("Failed to load airports.json", err);
    AIRPORTS = [];
    lastLoad = Date.now();
  }
};

// Utility normalizer
const normalize = (a: Airport) => ({
  code: a.code || a.iata || a.iataCode || "",
  city: a.city || "",
  country: a.country || "",
  name: a.name || "",
});

export const searchAirports = (req: Request, res: Response) => {
  try {
    loadAirports();

    const qRaw = (req.query.keyword as string) || "";
    const q = qRaw.trim().toLowerCase();
    if (!q || q.length < 1) {
      return res.json([]);
    }

    // Optional: numeric limit param
    const limit = Number(req.query.limit || 20);
    const maxLimit = Math.min(Math.max(limit, 1), 50);

    // Filter matches
    const matches = AIRPORTS
      .map((a) => {
        const n = normalize(a);
        return {
          ...n,
          _score: computeScore(n, q),
        };
      })
      .filter((a) => a._score > 0) // only relevant ones
      .sort((a, b) => b._score - a._score) // higher score first
      .slice(0, maxLimit)
      .map(({ _score, ...rest }) => rest);

    return res.json(matches);
  } catch (err) {
    console.error("AIRPORT SEARCH ERROR:", err);
    return res.status(500).json({ message: "Airport search failed", error: String(err) });
  }
};

// Scoring rules (higher = more relevant)
function computeScore(a: { code: string; city: string; name: string; country: string }, q: string) {
  const code = (a.code || "").toLowerCase();
  const city = (a.city || "").toLowerCase();
  const name = (a.name || "").toLowerCase();
  const country = (a.country || "").toLowerCase();

  // exact code match -> highest
  if (code === q) return 100;

  // code startsWith (e.g. query "de" -> "DEL") good
  if (code.startsWith(q)) return 90;

  // city startsWith (city begins with query) high
  if (city.startsWith(q)) return 80;

  // name startsWith
  if (name.startsWith(q)) return 70;

  // city contains query
  if (city.includes(q)) return 50;

  // name contains query
  if (name.includes(q)) return 40;

  // country contains
  if (country.includes(q)) return 20;

  // partial matches with code inside name (like "del" inside "Ponta Delgada")
  if (name.includes(q) || city.includes(q)) return 10;

  return 0;
}
