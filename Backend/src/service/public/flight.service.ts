import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * List Flights (Admin)
 */
export async function listFlights(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 100, 1), 100);
  const offset = (page - 1) * limit;

  const clauses: string[] = [];
  const values: any[] = [];
  let i = 1;

  clauses.push(`is_active = true`);

  if (query.stops) {
    clauses.push(`stops = ANY($${i++})`);
    values.push([].concat(query.stops).map(Number));
  }

  if (query.airlines) {
    clauses.push(`airline = ANY($${i++})`);
    values.push([].concat(query.airlines));
  }

  if (query.source) {
    clauses.push(`LOWER(source) = LOWER($${i++})`);
    values.push(String(query.source));
  }

  if (query.destination) {
    clauses.push(`LOWER(destination) = LOWER($${i++})`);
    values.push(String(query.destination));
  }

  if (query.minPrice) {
    clauses.push(`price >= $${i++}`);
    values.push(Number(query.minPrice));
  }

  if (query.maxPrice) {
    clauses.push(`price <= $${i++}`);
    values.push(Number(query.maxPrice));
  }

  if (query.depTime) {
    const buckets = [].concat(query.depTime);
    const ranges: string[] = [];

    buckets.forEach((b: string) => {
      if (b === "morning") ranges.push(`EXTRACT(HOUR FROM departure) BETWEEN 6 AND 11`);
      if (b === "afternoon") ranges.push(`EXTRACT(HOUR FROM departure) BETWEEN 12 AND 17`);
      if (b === "evening") ranges.push(`EXTRACT(HOUR FROM departure) BETWEEN 18 AND 23`);
      if (b === "night") ranges.push(`EXTRACT(HOUR FROM departure) BETWEEN 0 AND 5`);
    });

    if (ranges.length) clauses.push(`(${ranges.join(" OR ")})`);
  }

  if (query.date) {
    clauses.push(`departure >= $${i} AND departure < $${i + 1}`);
    const d = new Date(`${query.date}T00:00:00.000Z`);
    const next = new Date(d);
    next.setUTCDate(next.getUTCDate() + 1);
    values.push(d, next);
    i += 2;
  }

  if (query.departureFrom) {
    clauses.push(`departure >= $${i++}`);
    values.push(new Date(query.departureFrom));
  }

  if (query.departureTo) {
    clauses.push(`departure <= $${i++}`);
    values.push(new Date(query.departureTo));
  }

  if (query.arrivalFrom) {
    clauses.push(`arrival >= $${i++}`);
    values.push(new Date(query.arrivalFrom));
  }

  if (query.arrivalTo) {
    clauses.push(`arrival <= $${i++}`);
    values.push(new Date(query.arrivalTo));
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  /* ---------------- SORT (DATA SAFE) ---------------- */

  const sort = String(query.sort || "departure");

  const sortMap: Record<string, string> = {
    "price": "price ASC",
    "price-desc": "price DESC",
    "duration": "(arrival - departure) ASC",
    "departure": "departure ASC",
  };

  const orderBy = sortMap[sort] ?? sortMap["departure"];

  const sql = `
    SELECT
      id,
      airline,
      source,
      destination,
      departure,
      arrival,
      total_seats,
      price::float8 AS price,
      stops
    FROM flights
    ${where}
    ORDER BY ${orderBy}
    LIMIT $${i++} OFFSET $${i}
  `;

  values.push(limit, offset);

  const { rows } = await pool.query(sql, values);
  return rows;
}



/**
 * Get Flights By ID
 */
export async function getFlightById(id: string) {
  const { rows } = await pool.query(`SELECT * FROM flights WHERE id = $1`, [
    id,
  ]);

  if (!rows.length) {
    throw new AppError("Flights not found", 404);
  }

  return rows[0];
}
