import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * List Hotels (User)
 * Only returns ACTIVE hotels
 */
export async function listHotels(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const offset = (page - 1) * limit;

  const city =
    typeof query.city === "string" && query.city.trim()
      ? query.city.trim()
      : null;

  const minRating =
    query.minRating !== undefined ? Number(query.minRating) : null;

  const amenities =
    Array.isArray(query.amenities) && query.amenities.length > 0
      ? query.amenities
      : null;

  const sort =
    typeof query.sort === "string" ? query.sort.toLowerCase() : "rating_desc";

  /* -------------------- WHERE CLAUSE -------------------- */
  const whereClauses: string[] = ["is_active = true"];
  const params: any[] = [];
  let idx = 1;

  if (city) {
    whereClauses.push(`city = $${idx++}`);
    params.push(city);
  }

  if (minRating !== null && !Number.isNaN(minRating)) {
    whereClauses.push(`rating >= $${idx++}`);
    params.push(minRating);
  }

  if (amenities) {
    // requires all requested amenities to be present
    whereClauses.push(`amenities @> $${idx++}::jsonb`);
    params.push(JSON.stringify(amenities));
  }

  /* -------------------- SORTING -------------------- */
  let orderBy = "rating DESC NULLS LAST";

  switch (sort) {
    case "rating_asc":
      orderBy = "rating ASC NULLS LAST";
      break;
    case "newest":
      orderBy = "created_at DESC";
      break;
    case "name_asc":
      orderBy = "name ASC";
      break;
    case "name_desc":
      orderBy = "name DESC";
      break;
    case "rating_desc":
    default:
      orderBy = "rating DESC NULLS LAST";
  }

  /* -------------------- FINAL QUERY -------------------- */
  const sql = `
    SELECT
      id,
      name,
      description,
      city,
      address,
      rating,
      amenities,
      images,
      created_at
    FROM hotels
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY ${orderBy}
    LIMIT $${idx++} OFFSET $${idx}
  `;

  params.push(limit, offset);

  const { rows } = await pool.query(sql, params);

  return rows;
}


/**
 * Get Hotel By ID
 */
export async function getHotelById(id: string) {
  const { rows } = await pool.query(`SELECT * FROM hotels WHERE id = $1`, [id]);

  if (!rows.length) {
    throw new AppError("Hotel not found", 404);
  }

  return rows[0];
}


