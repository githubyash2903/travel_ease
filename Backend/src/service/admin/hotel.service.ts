import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * Create Hotel
 */
export async function createHotel(data: any) {
  const { rows } = await pool.query(
    `
    INSERT INTO hotels (
      name,
      description,
      city,
      address,
      rating,
      amenities,
      images,
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8,true))
    RETURNING *
    `,
    [
      data.name,
      data.description ?? null,
      data.city,
      data.address,
      data.rating ?? null,
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
    // Normalize inputs
    const type: "all" | "inactive" | undefined =
      typeof query.type === "string" ? query.type.toLowerCase() : undefined;

    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const offset = (page - 1) * limit;

    // Base query
    let whereClause = "WHERE is_active = true"; // default: only active hotels
    const params: any[] = [limit, offset];

    if (type === "all") {
      whereClause = ""; // no filter
    } else if (type === "inactive") {
      whereClause = "WHERE is_active = false";
    }

    const sql = `
    SELECT *
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
      address     = COALESCE($5, address),
      rating      = COALESCE($6, rating),
      amenities   = COALESCE($7, amenities),
      images      = COALESCE($8, images),
      is_active   = COALESCE($9, is_active),
      updated_at  = now()
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      data.name,
      data.description,
      data.city,
      data.address,
      data.rating ?? null,
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
