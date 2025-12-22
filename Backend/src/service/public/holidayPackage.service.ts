import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * List
 */
export async function listHolidayPackages(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const offset = (page - 1) * limit;

  const clauses: string[] = ["is_active = true"];
  const values: any[] = [];
  let i = 1;

  // Price
  if (query.minPrice) {
    clauses.push(`price >= $${i++}`);
    values.push(Number(query.minPrice));
  }

  if (query.maxPrice) {
    clauses.push(`price <= $${i++}`);
    values.push(Number(query.maxPrice));
  }
  if (query.destination) {
    clauses.push(`LOWER(destination) = LOWER($${i++})`);
    values.push(String(query.destination));
  }
  // Category (multi)
  if (query.category) {
    clauses.push(`category = ANY($${i++})`);
    values.push([].concat(query.category));
  }

  // Duration buckets
  if (query.duration) {
    const ranges: string[] = [];

    [].concat(query.duration).forEach((d: string) => {
      if (d === "2-3") ranges.push(`duration_days BETWEEN 2 AND 3`);
      if (d === "4-6") ranges.push(`duration_days BETWEEN 4 AND 6`);
      if (d === "7") ranges.push(`duration_days = 7`);
      if (d === "7+") ranges.push(`duration_days > 7`);
    });

    if (ranges.length) clauses.push(`(${ranges.join(" OR ")})`);
  }

  // Inclusions (JSONB contains ANY)
  if (query.inclusions) {
    clauses.push(`inclusions ?| $${i++}`);
    values.push([].concat(query.inclusions));
  }

  // Sorting
  let orderBy = "created_at DESC";
  switch (query.sort) {
    case "price":
      orderBy = "price ASC";
      break;
    case "price-desc":
      orderBy = "price DESC";
      break;
    case "rating":
      orderBy = "rating DESC NULLS LAST";
      break;
    case "duration":
      orderBy = "duration_days ASC";
      break;
    case "popularity":
    default:
      orderBy = "rating DESC NULLS LAST";
  }

  const where = `WHERE ${clauses.join(" AND ")}`;

  const sql = `
    SELECT
      id,
      title,
      destination,
      duration_days,
      duration_nights,
      cover_image,
      price::float8 AS price,
      rating,
      inclusions,
      category
    FROM holiday_packages
    ${where}
    ORDER BY ${orderBy}
    LIMIT $${i++} OFFSET $${i}
  `;

  values.push(limit, offset);
  const { rows } = await pool.query(sql, values);
  return rows;
}

export async function getHolidayPackageById(id: string) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM holiday_packages
    WHERE id = $1 AND is_active = true
    `,
    [id]
  );

  if (!rows.length) {
    throw new AppError("Holiday package not found", 404);
  }

  return rows[0];
}
