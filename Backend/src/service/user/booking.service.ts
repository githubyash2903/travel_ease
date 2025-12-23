import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/* ---------------- HOTEL ---------------- */

export async function createHotelBooking(userId: string, data: any) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const roomRes = await client.query(
      `SELECT price_per_night FROM rooms WHERE id = $1 AND is_active = true`,
      [data.room_id]
    );
    if (!roomRes.rowCount) throw new AppError('Room not found', 404);

    const nights =
      (new Date(data.check_out).getTime() - new Date(data.check_in).getTime()) /
      (1000 * 60 * 60 * 24);

    const base = nights * data.rooms_count * Number(roomRes.rows[0].price_per_night);

    const bookingRes = await client.query(
      `
      INSERT INTO bookings
        (user_id, booking_type, base_amount, total_amount)
      VALUES ($1,'HOTEL',$2,$2)
      RETURNING *
      `,
      [userId, base]
    );

    await client.query(
      `
      INSERT INTO hotel_booking_details
        (booking_id, hotel_id, room_id, check_in, check_out, rooms_count, guests, price_per_night)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        bookingRes.rows[0].id,
        data.hotel_id,
        data.room_id,
        data.check_in,
        data.check_out,
        data.rooms_count,
        data.guests,
        roomRes.rows[0].price_per_night,
      ]
    );

    await client.query('COMMIT');
    return bookingRes.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

/* ---------------- FLIGHT ---------------- */

export async function createFlightBooking(userId: string, data: any) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const flightRes = await client.query(
      `SELECT price FROM flights WHERE id = $1 AND is_active = true`,
      [data.flight_id]
    );
    if (!flightRes.rowCount) throw new AppError('Flight not found', 404);

    const base = data.seats * Number(flightRes.rows[0].price);

    const bookingRes = await client.query(
      `
      INSERT INTO bookings
        (user_id, booking_type, base_amount, total_amount)
      VALUES ($1,'FLIGHT',$2,$2)
      RETURNING *
      `,
      [userId, base]
    );

    await client.query(
      `
      INSERT INTO flight_booking_details
        (booking_id, flight_id, seats, price_per_seat)
      VALUES ($1,$2,$3,$4)
      `,
      [
        bookingRes.rows[0].id,
        data.flight_id,
        data.seats,
        flightRes.rows[0].price,
      ]
    );

    await client.query('COMMIT');
    return bookingRes.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

/* ---------------- PACKAGE ---------------- */

export async function createPackageBooking(userId: string, data: any) {
  const pkgRes = await pool.query(
    `SELECT price FROM holiday_packages WHERE id = $1 AND is_active = true`,
    [data.package_id]
  );
  if (!pkgRes.rowCount) throw new AppError('Package not found', 404);

  const base = data.persons * Number(pkgRes.rows[0].price);

  const bookingRes = await pool.query(
    `
    INSERT INTO bookings
      (user_id, booking_type, base_amount, total_amount)
    VALUES ($1,'PACKAGE',$2,$2)
    RETURNING *
    `,
    [userId, base]
  );

  await pool.query(
    `
    INSERT INTO package_booking_details
      (booking_id, package_id, start_date, persons, price_per_person)
    VALUES ($1,$2,$3,$4,$5)
    `,
    [
      bookingRes.rows[0].id,
      data.package_id,
      data.start_date,
      data.persons,
      pkgRes.rows[0].price,
    ]
  );

  return bookingRes.rows[0];
}

/* ---------------- READ ---------------- */

export async function listMyBookings(userId: string) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM bookings
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );
  return rows;
}

export async function getMyBookingById(userId: string, bookingId: string) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM bookings
    WHERE id = $1 AND user_id = $2
    `,
    [bookingId, userId]
  );

  if (!rows.length) throw new AppError('Booking not found', 404);
  return rows[0];
}
