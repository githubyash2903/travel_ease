import pool from '../../database/db';
import { AppError } from '../../utils/errors';

export async function listMessages(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT
      cm.id,
      cm.first_name,
      cm.last_name,
      cm.email,
      cm.phone,
      cm.subject,
      cm.message,
      cm.is_read,
      cm.created_at,
      u.id AS user_id,
      u.name AS user_name
    FROM contact_messages cm
    LEFT JOIN users u ON u.id = cm.user_id
    ORDER BY cm.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  return rows;
}

export async function getMessageById(id: string) {
  const { rows } = await pool.query(
    `
    SELECT
      cm.*,
      u.name AS user_name,
      u.email AS user_email,
      u.phone_country_code,
      u.phone_number
    FROM contact_messages cm
    LEFT JOIN users u ON u.id = cm.user_id
    WHERE cm.id = $1
    `,
    [id]
  );

  if (!rows.length) {
    throw new AppError('Message not found', 404);
  }

  await pool.query(
    `UPDATE contact_messages SET is_read = true WHERE id = $1`,
    [id]
  );

  return rows[0];
}
