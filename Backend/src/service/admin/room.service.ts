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
      price_per_night,
      total_rooms,
      amenities,
      images,
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8,true))
    RETURNING *
    `,
    [
      data.hotel_id,
      data.type,
      data.description ?? null,
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
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
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
    whereClause += `${params.length ? " AND" : "WHERE"} r.hotel_id = $${
      params.length
    }`;
  }

  params.push(limit, offset);

  const sql = `
    SELECT r.*, h.name as hotel_name
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
      type           = COALESCE($2, type),
      description    = COALESCE($3, description),
      price_per_night= COALESCE($4, price_per_night),
      total_rooms    = COALESCE($5, total_rooms),
      amenities      = COALESCE($6, amenities),
      images         = COALESCE($7, images),
      is_active      = COALESCE($8, is_active),
      updated_at     = now()
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      data.type,
      data.description,
      data.price_per_night,
      data.total_rooms,
      data.amenities ?? {},
      JSON.stringify(data.images ?? []),
      data.is_active,
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
