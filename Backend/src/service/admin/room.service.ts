import pool from "../../database/db";
import { AppError } from "../../utils/errors";

/**
 * Create Room
 */
export async function createRoom(data: any) {
  const { rows } = await pool.query(
    `
    INSERT INTO rooms (
      hotel_id,
      type,
      description,
      area_sqft,
      max_occupancy,
      beds,
      price_per_night,
      total_rooms,
      amenities,
      images,
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,COALESCE($11,true))
    RETURNING *
    `,
    [
      data.hotel_id,
      data.type,
      data.description ?? null,
      data.area_sqft ?? 0,
      data.max_occupancy ?? 1,
      JSON.stringify(data.beds ?? []),
      data.price_per_night,
      data.total_rooms,
      data.amenities ?? {},
      JSON.stringify(data.images ?? []),
      data.is_active,
    ]
  );

  return rows[0];
}

/**
 * List Rooms
 */
export async function listRooms(query: any, hotelId?: string) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 100, 1), 100);
  const offset = (page - 1) * limit;

  let whereClause = "WHERE r.is_active = true";
  const params: any[] = [];

  if (query.type === "all") {
    whereClause = "WHERE 1=1";
  } else if (query.type === "inactive") {
    whereClause = "WHERE r.is_active = false";
  }

  if (hotelId) {
    params.push(hotelId);
    whereClause += ` AND r.hotel_id = $${params.length}`;
  }

  params.push(limit, offset);

  const sql = `
    SELECT
      r.id,
      r.hotel_id,
      r.type,
      r.description,

      r.area_sqft::float8        AS area_sqft,
      r.max_occupancy,
      r.beds,

      r.price_per_night::float8 AS price_per_night,
      r.total_rooms,

      r.amenities,
      r.images,
      r.is_active,
      r.created_at,
      r.updated_at,

      h.name AS hotel_name
    FROM rooms r
    JOIN hotels h ON r.hotel_id = h.id
    ${whereClause}
    ORDER BY r.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const { rows } = await pool.query(sql, params);
  return rows;
}

/**
 * Get Room by ID with hotel name
 */
export async function getRoomById(id: string) {
  const { rows } = await pool.query(
    `SELECT r.*, h.name as hotel_name 
     FROM rooms r 
     JOIN hotels h ON r.hotel_id = h.id 
     WHERE r.id = $1`,
    [id]
  );

  if (!rows.length) {
    throw new AppError("Room not found", 404);
  }

  return rows[0];
}

/**
 * Update Room
 */
export async function updateRoom(id: string, data: any) {
  const { rowCount, rows } = await pool.query(
    `
    UPDATE rooms
    SET
      type           = COALESCE($1, type),
      description    = COALESCE($2, description),
      area_sqft    = COALESCE($3, area_sqft),
      max_occupancy    = COALESCE($4, max_occupancy),
      beds    = COALESCE($5, beds),
      price_per_night= COALESCE($6, price_per_night),
      total_rooms    = COALESCE($7, total_rooms),
      amenities      = COALESCE($8, amenities),
      images         = COALESCE($9, images),
      is_active      = COALESCE($10, is_active),
      hotel_id      = COALESCE($11, hotel_id),
      updated_at     = now()
    WHERE id = $12
    RETURNING *
    `,
    [
      data.type,
      data.description,
      data.area_sqft ?? 0,
      data.max_occupancy ?? 1,
      JSON.stringify(data.beds ?? []),
      data.price_per_night,
      data.total_rooms,
      data.amenities ?? {},
      JSON.stringify(data.images ?? []),
      data.is_active,
      data.hotel_id,
      id,
    ]
  );

  if (!rowCount) {
    throw new AppError("Room not found", 404);
  }

  return rows[0];
}

/**
 * Activate Room
 */
export async function activateRoom(id: string) {
  const { rowCount } = await pool.query(
    `UPDATE rooms SET is_active = true, updated_at = now() WHERE id = $1 AND is_active = false`,
    [id]
  );

  if (!rowCount) {
    throw new AppError("Room not found or already active", 404);
  }
}

/**
 * Deactivate Room
 */
export async function deactivateRoom(id: string) {
  const { rowCount } = await pool.query(
    `UPDATE rooms SET is_active = false, updated_at = now() WHERE id = $1 AND is_active = true`,
    [id]
  );

  if (!rowCount) {
    throw new AppError("Room not found or already inactive", 404);
  }
}

/**
 * Delete Room
 */
export async function deleteRoom(id: string) {
  const { rowCount } = await pool.query(`DELETE FROM rooms WHERE id = $1`, [
    id,
  ]);

  if (!rowCount) {
    throw new AppError("Room not found", 404);
  }
}
