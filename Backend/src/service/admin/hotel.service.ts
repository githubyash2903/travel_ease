import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * Create Hotel
 */
export async function createHotel(data: any) {
  console.log(data,'data')
  const { rows } = await pool.query(
    `
    INSERT INTO hotels (
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
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,COALESCE($11,true))
    RETURNING *
    `,
    [
      data.name,
      data.description ?? null,
      data.city,
      data.state,
      data.address,
      data.rating ?? null,
      data.rating_count ?? 0,
      data.min_price_per_night ?? 0,
      data.amenities ?? {},
      JSON.stringify(data.images ?? []),
      data.is_active,
    ]
  );

  return rows[0];
}

/**
 * List Hotels (Admin)
 */
export async function listHotels(query: any) {
  const type: "all" | "inactive" | undefined =
    typeof query.type === "string" ? query.type.toLowerCase() : undefined;

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 100, 1), 100);
  const offset = (page - 1) * limit;

  let whereClause = "WHERE is_active = true";
  const params: any[] = [limit, offset];

  if (type === "all") {
    whereClause = "";
  } else if (type === "inactive") {
    whereClause = "WHERE is_active = false";
  }

  const sql = `
    SELECT
      id,
      name,
      description,
      city,
      state,
      address,
      rating::float8 AS rating,
      rating_count,
      min_price_per_night::float8 AS min_price_per_night,
      amenities,
      images,
      is_active,
      created_at,
      updated_at
    FROM hotels
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

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

/**
 * Update Hotel
 */
export async function updateHotel(id: string, data: any) {
  const { rowCount, rows } = await pool.query(
    `
    UPDATE hotels
    SET
      name        = COALESCE($2, name),
      description = COALESCE($3, description),
      city        = COALESCE($4, city),
      state        = COALESCE($5, state),
      address     = COALESCE($6, address),
      rating      = COALESCE($7, rating),
      rating_count      = COALESCE($8, rating_count),
      min_price_per_night      = COALESCE($9, min_price_per_night),
      amenities   = COALESCE($10, amenities),
      images      = COALESCE($11, images),
      is_active   = COALESCE($12, is_active),
      updated_at  = now()
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      data.name,
      data.description ?? null,
      data.city,
      data.state,
      data.address,
      data.rating ?? null,
      data.rating_count ?? 0,
      data.min_price_per_night ?? 0,
      data.amenities ?? {},
      JSON.stringify(data.images ?? []),
      data.is_active,
    ]
  );

  if (!rowCount) {
    throw new AppError("Hotel not found", 404);
  }

  return rows[0];
}

/**
 * Activate Hotel
 */
export async function activateHotel(id: string) {
  const { rowCount } = await pool.query(
    `
    UPDATE hotels
    SET is_active = true, updated_at = now()
    WHERE id = $1 AND is_active = false
    `,
    [id]
  );

  if (!rowCount) {
    throw new AppError("Hotel not found or already active", 404);
  }
}

/**
 * Deactivate Hotel
 */
export async function deactivateHotel(id: string) {
  const { rowCount } = await pool.query(
    `
    UPDATE hotels
    SET is_active = false, updated_at = now()
    WHERE id = $1 AND is_active = true
    `,
    [id]
  );

  if (!rowCount) {
    throw new AppError("Hotel not found or already inactive", 404);
  }
}

/**
 * Permanently Delete Hotel
 */
export async function deleteHotel(id: string) {
  const { rowCount } = await pool.query(`DELETE FROM hotels WHERE id = $1`, [
    id,
  ]);

  if (!rowCount) {
    throw new AppError("Hotel not found", 404);
  }
}
