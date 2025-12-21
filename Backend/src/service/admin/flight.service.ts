import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/**
 * Create Flight
 */
export async function createFlight(data: any) {
  const { rows } = await pool.query(
    `
    INSERT INTO flights (
      airline,
      source,
      destination,
      departure,
      arrival,
      total_seats,
      price,
      stops,
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,COALESCE($9,true))
    RETURNING *
    `,
    [
      data.airline,
      data.source,
      data.destination,
      data.departure,
      data.arrival,
      data.total_seats,
      data.price ?? 0,
      data.stops ?? 0,
      data.is_active,
    ]
  );

  return rows[0];
}

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
console.log(query,'query')
  // Stops
  if (query.stops) {
    clauses.push(`stops = ANY($${i++})`);
    values.push([].concat(query.stops).map(Number));
  }

  // Airlines
  if (query.airlines) {
    clauses.push(`airline = ANY($${i++})`);
    values.push([].concat(query.airlines));
  }

  // Source, Destination. Case-insensitive.
  if (query.source) {
    clauses.push(`LOWER(source) = LOWER($${i++})`);
    values.push(String(query.source));
  }

  if (query.destination) {
    clauses.push(`LOWER(destination) = LOWER($${i++})`);
    values.push(String(query.destination));
  }

  // Price
  if (query.minPrice) {
    clauses.push(`price >= $${i++}`);
    values.push(Number(query.minPrice));
  }

  if (query.maxPrice) {
    clauses.push(`price <= $${i++}`);
    values.push(Number(query.maxPrice));
  }

  // Departure time buckets
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

  // Departure date range
  if (query.departureFrom) {
    clauses.push(`departure >= $${i++}`);
    values.push(new Date(query.departureFrom));
  }

  if (query.departureTo) {
    clauses.push(`departure <= $${i++}`);
    values.push(new Date(query.departureTo));
  }

  // Arrival date range
  if (query.arrivalFrom) {
    clauses.push(`arrival >= $${i++}`);
    values.push(new Date(query.arrivalFrom));
  }

  if (query.arrivalTo) {
    clauses.push(`arrival <= $${i++}`);
    values.push(new Date(query.arrivalTo));
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

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
    ORDER BY departure ASC
    LIMIT $${i++} OFFSET $${i}
  `;

  values.push(limit, offset);

  const { rows } = await pool.query(sql, values);
  return rows;
}

/**
 * Update Flight
 */
export async function updateFlight(id: string, data: any) {
  const { rowCount, rows } = await pool.query(
    `
    UPDATE flights
    SET
      airline     = COALESCE($2, airline),
      source      = COALESCE($3, source),
      destination = COALESCE($4, destination),
      departure   = COALESCE($5, departure),
      arrival     = COALESCE($6, arrival),
      total_seats = COALESCE($7, total_seats),
      price       = COALESCE($8, price),
      stops       = COALESCE($9, stops),
      is_active   = COALESCE($10, is_active),
      updated_at  = now()
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      data.airline,
      data.source,
      data.destination,
      data.departure,
      data.arrival,
      data.total_seats,
      data.price,
      data.stops,
      data.is_active,
    ]
  );

  if (!rowCount) {
    throw new AppError('Flight not found', 404);
  }

  return rows[0];
}

/**
 * Activate Flight
 */
export async function activateFlight(id: string) {
  const { rowCount } = await pool.query(
    `
    UPDATE flights
    SET is_active = true, updated_at = now()
    WHERE id = $1 AND is_active = false
    `,
    [id]
  );

  if (!rowCount) {
    throw new AppError('Flight not found or already active', 404);
  }
}

/**
 * Deactivate Flight
 */
export async function deactivateFlight(id: string) {
  const { rowCount } = await pool.query(
    `
    UPDATE flights
    SET is_active = false, updated_at = now()
    WHERE id = $1 AND is_active = true
    `,
    [id]
  );

  if (!rowCount) {
    throw new AppError('Flight not found or already inactive', 404);
  }
}

/**
 * Delete Flight
 */
export async function deleteFlight(id: string) {
  const { rowCount } = await pool.query(`DELETE FROM flights WHERE id = $1`, [id]);

  if (!rowCount) {
    throw new AppError('Flight not found', 404);
  }
}
