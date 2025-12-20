import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/**
 * Get all users with optional pagination
 */
export async function listUsers(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  // Normalize type query
  const type = typeof query.type === 'string' ? query.type.toLowerCase() : undefined;

  let whereClause = 'WHERE is_active = true'; // default: only active users
  if (type === 'all') {
    whereClause = ''; // no filter
  } else if (type && type !== 'all') {
    // invalid type or anything else -> inactive users
    whereClause = 'WHERE is_active = false';
  }

  const sql = `
    SELECT id, name, email, phone_country_code, phone_number, role, is_active, created_at, updated_at
    FROM users
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  const { rows } = await pool.query(sql, [limit, offset]);
  return rows;
}


/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  const { rows } = await pool.query(
    `SELECT id, name, email, phone_country_code, phone_number, role, is_active, created_at, updated_at 
     FROM users 
     WHERE id = $1`,
    [id]
  );

  if (!rows.length) {
    throw new AppError('User not found', 404);
  }

  return rows[0];
}

/**
 * Deactivate user
 */
export async function deactivateUser(id: string) {
  const { rowCount } = await pool.query(
    `UPDATE users SET is_active = false, updated_at = now() WHERE id = $1 AND is_active = true`,
    [id]
  );

  if (!rowCount) {
    throw new AppError('User not found or already inactive', 404);
  }
}
