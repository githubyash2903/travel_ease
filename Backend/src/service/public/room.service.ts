import pool from "../../database/db";
import { AppError } from "../../utils/errors";

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