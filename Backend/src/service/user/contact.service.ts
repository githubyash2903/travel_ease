// service/user/contact.service.ts
import pool from '../../database/db';
import { CreateContactMessageInput } from '../../validation/user/contact.schema';

export async function createContactMessage(
  userId: string | null,
  payload: CreateContactMessageInput
) {
  const { rows } = await pool.query(
    `
    INSERT INTO contact_messages
      (user_id, first_name, last_name, email, phone, subject, message)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, created_at
    `,
    [
      userId,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.phone ?? null,
      payload.subject,
      payload.message,
    ]
  );

  return rows[0];
}
