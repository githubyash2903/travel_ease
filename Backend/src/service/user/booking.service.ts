import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/* ---------------- HOTEL ---------------- */
async function insertTravellers(
  client: any,
  bookingId: string,
  travellers: any[]
) {
  for (const t of travellers) {
    await client.query(
      `
      INSERT INTO booking_travellers
        (booking_id, full_name, age, gender, id_proof_type, id_proof_number)
      VALUES ($1,$2,$3,$4,$5,$6)
      `,
      [
        bookingId,
        t.full_name,
        t.age,
        t.gender,
        t.id_proof_type,
        t.id_proof_number,
      ]
    );
  }
}

export async function createHotelBooking(userId: string, data: any) {
  if (!Array.isArray(data.travellers))
    throw new AppError("Travellers required", 400);

  if (data.travellers.length !== data.guests)
    throw new AppError("Traveller count must match guests", 400);

  const checkIn = new Date(data.check_in);
  const checkOut = new Date(data.check_out);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()))
    throw new AppError("Invalid dates", 400);

  if (checkOut <= checkIn)
    throw new AppError("Check-out must be after check-in", 400);

  // integer night count
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / 86400000
  );

  if (nights <= 0)
    throw new AppError("Invalid night count", 400);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const roomRes = await client.query(
      `
      SELECT
        price_per_night,
        total_rooms,
        max_occupancy
      FROM rooms
      WHERE id = $1 AND is_active = true
      FOR UPDATE
      `,
      [data.room_id]
    );

    if (!roomRes.rowCount)
      throw new AppError("Room not found", 404);

    const room = roomRes.rows[0];

    if (data.rooms_count > room.total_rooms)
      throw new AppError(
        `Only \${room.total_rooms} rooms available`,
        400
      );

    const maxGuestsAllowed =
      data.rooms_count * room.max_occupancy;

    if (data.guests > maxGuestsAllowed)
      throw new AppError(
        `Maximum \${maxGuestsAllowed} guests allowed`,
        400
      );

    const baseAmount =
      nights *
      data.rooms_count *
      Number(room.price_per_night);

    const bookingRes = await client.query(
      `
      INSERT INTO bookings
        (user_id, booking_type, base_amount, total_amount)
      VALUES ($1, 'HOTEL', $2, $2)
      RETURNING *
      `,
      [userId, baseAmount]
    );

    await client.query(
      `
      INSERT INTO hotel_booking_details
        (
          booking_id,
          hotel_id,
          room_id,
          check_in,
          check_out,
          rooms_count,
          guests,
          price_per_night
        )
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
        room.price_per_night,
      ]
    );

    await insertTravellers(
      client,
      bookingRes.rows[0].id,
      data.travellers
    );

    await client.query("COMMIT");
    return bookingRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}


/* ---------------- FLIGHT ---------------- */

export async function createFlightBooking(userId: string, data: any) {
  if (data.travellers.length !== data.seats)
    throw new AppError("Traveller count must match seats", 400);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const flightRes = await client.query(
      `SELECT price FROM flights WHERE id=$1 AND is_active=true`,
      [data.flight_id]
    );
    if (!flightRes.rowCount) throw new AppError("Flight not found", 404);

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

    await insertTravellers(client, bookingRes.rows[0].id, data.travellers);

    await client.query("COMMIT");
    return bookingRes.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}


/* ---------------- PACKAGE ---------------- */

export async function createPackageBooking(userId: string, data: any) {
  if (data.travellers.length !== data.persons)
    throw new AppError("Traveller count must match persons", 400);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const pkgRes = await client.query(
      `SELECT price FROM holiday_packages WHERE id=$1 AND is_active=true`,
      [data.package_id]
    );
    if (!pkgRes.rowCount) throw new AppError("Package not found", 404);

    const base = data.persons * Number(pkgRes.rows[0].price);

    const bookingRes = await client.query(
      `
      INSERT INTO bookings
        (user_id, booking_type, base_amount, total_amount)
      VALUES ($1,'PACKAGE',$2,$2)
      RETURNING *
      `,
      [userId, base]
    );

    await client.query(
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

    await insertTravellers(client, bookingRes.rows[0].id, data.travellers);

    await client.query("COMMIT");
    return bookingRes.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
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
