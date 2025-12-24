import pool from "../../database/db";
import { AppError } from "../../utils/errors";


export async function listAllBookings(query: any) {
  const clauses: string[] = [];
  const values: any[] = [];
  let i = 1;

  if (query.status) {
    clauses.push(`b.status = $${i++}`);
    values.push(query.status);
  }

  if (query.type) {
    clauses.push(`b.booking_type = $${i++}`);
    values.push(query.type);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const limit = Math.min(Number(query.limit) || 5, 20);

  const { rows } = await pool.query(
    `
    SELECT
      b.id,
      b.booking_type,
      b.status,
      b.base_amount,
      b.taxes,
      b.total_amount,
      b.created_at,
      b.updated_at,

      -- user
      u.id    AS user_id,
      u.name  AS user_name,
      u.email AS user_email,
      u.phone_country_code,
      u.phone_number,

      -- travellers
      COALESCE(
        json_agg(
          json_build_object(
            'full_name', t.full_name,
            'age', t.age,
            'gender', t.gender,
            'id_proof_type', t.id_proof_type,
            'id_proof_number', t.id_proof_number
          )
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) AS travellers

    FROM bookings b
    JOIN users u ON u.id = b.user_id
    LEFT JOIN booking_travellers t ON t.booking_id = b.id

    ${where}

    GROUP BY
      b.id,
      u.id

    ORDER BY b.created_at DESC
    LIMIT ${limit}
    `,
    values
  );

  return rows;
}

export async function getBookingWithTravellers(id: string) {
  const { rows } = await pool.query(
    `
    SELECT
      b.*,

      u.id    AS user_id,
      u.name  AS user_name,
      u.email AS user_email,
      u.phone_country_code,
      u.phone_number,

      COALESCE(
        json_agg(
          json_build_object(
            'full_name', t.full_name,
            'age', t.age,
            'gender', t.gender,
            'id_proof_type', t.id_proof_type,
            'id_proof_number', t.id_proof_number
          )
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) AS travellers

    FROM bookings b
    JOIN users u ON u.id = b.user_id
    LEFT JOIN booking_travellers t ON t.booking_id = b.id
    WHERE b.id = $1
    GROUP BY b.id, u.id
    `,
    [id]
  );

  if (!rows.length) throw new AppError("Booking not found", 404);
  return rows[0];
}

export async function getBookingById(id: string) {
  const { rows } = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    id,
  ]);
  if (!rows.length) throw new AppError("Booking not found", 404);
  return rows[0];
}

export async function approveBooking(adminId: string, bookingId: string) {
  const { rowCount } = await pool.query(
    `
    UPDATE bookings
    SET status = 'APPROVED',
        approved_by = $1,
        approved_at = now(),
        updated_at = now()
    WHERE id = $2 AND status = 'PENDING'
    `,
    [adminId, bookingId]
  );

  if (!rowCount) throw new AppError("Booking not found or not pending", 400);
}

export async function declineBooking(
  adminId: string,
  bookingId: string,
  reason: string
) {
  const { rowCount } = await pool.query(
    `
    UPDATE bookings
    SET status = 'DECLINED',
        declined_by = $1,
        declined_at = now(),
        decline_reason = $2,
        updated_at = now()
    WHERE id = $3 AND status = 'PENDING'
    `,
    [adminId, reason, bookingId]
  );

  if (!rowCount) throw new AppError("Booking not found or not pending", 400);
}
