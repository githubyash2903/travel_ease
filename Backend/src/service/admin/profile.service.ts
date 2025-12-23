import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/**
 * Get logged-in user's profile
 */
export async function getProfile(userId: string) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      phone_country_code,
      phone_number,
      role,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = $1 AND is_active = true
    `,
    [userId]
  );

  if (!rows.length) {
    throw new AppError('User not found or inactive', 404);
  }

  return rows[0];
}

/**
 * Update logged-in user's name
 */
export async function updateProfileName(userId: string, name: string) {
    console.log(userId,name)
  const { rowCount, rows } = await pool.query(
    `
    UPDATE users
    SET
      name = $2,
      updated_at = now()
    WHERE id = $1 AND is_active = true
    RETURNING
      id,
      name,
      email,
      phone_country_code,
      phone_number,
      role,
      is_active,
      created_at,
      updated_at
    `,
    [userId, name]
  );

  if (!rowCount) {
    throw new AppError('User not found or inactive', 404);
  }

  return rows[0];
}
