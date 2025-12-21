import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * List Hotels (User)
 * Only returns ACTIVE hotels
 */
export async function listHotels(query: any) {
  console.log(query,'query')
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const offset = (page - 1) * limit;

  const city =
    typeof query.city === "string" && query.city.trim()
      ? query.city.trim()
      : null;

  const minRating =
    query.minRating !== undefined ? Number(query.minRating) : null;

  const minPrice =
    query.minPrice !== undefined ? Number(query.minPrice) : null;

  const maxPrice =
    query.maxPrice !== undefined ? Number(query.maxPrice) : null;

  const minRatingCount =
    query.minRatingCount !== undefined
      ? Number(query.minRatingCount)
      : null;

  const amenities =
    Array.isArray(query.amenities) && query.amenities.length > 0
      ? query.amenities
      : null;

  const sort =
    typeof query.sort === "string" ? query.sort.toLowerCase() : "rating_desc";

  const whereClauses: string[] = ["is_active = true"];
  const params: any[] = [];
  let idx = 1;

  if (city) {
  whereClauses.push(`LOWER(city) = LOWER($${idx++})`);
  params.push(city);
}

  if (minRating !== null && !Number.isNaN(minRating)) {
    whereClauses.push(`rating >= $${idx++}`);
    params.push(minRating);
  }

  if (minRatingCount !== null && !Number.isNaN(minRatingCount)) {
    whereClauses.push(`rating_count >= $${idx++}`);
    params.push(minRatingCount);
  }

  if (minPrice !== null && !Number.isNaN(minPrice)) {
    whereClauses.push(`min_price_per_night >= $${idx++}`);
    params.push(minPrice);
  }

  if (maxPrice !== null && !Number.isNaN(maxPrice)) {
    whereClauses.push(`min_price_per_night <= $${idx++}`);
    params.push(maxPrice);
  }

  if (amenities) {
    whereClauses.push(`amenities @> $${idx++}::jsonb`);
    params.push(JSON.stringify(amenities));
  }

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
  }

  const sql = `
    SELECT
      id,
      name,
      description,
      city,
      state,
      address,
      rating,
      rating_count,
      min_price_per_night,
      amenities,
      images,
      created_at
    FROM hotels
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY ${orderBy}
    LIMIT $${idx++}
    OFFSET $${idx}
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


