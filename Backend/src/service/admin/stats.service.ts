import pool from "../../database/db";

export async function getAdminStats() {
  const [{ rows: users }, { rows: bookings }] = await Promise.all([
    pool.query(
      `SELECT COUNT(*)::int AS count
       FROM users
       WHERE role = 'USER'`
    ),
    pool.query(
      `SELECT COUNT(*)::int AS count
       FROM bookings`
    ),
  ]);

  return {
    users: users[0].count,
    bookings: bookings[0].count,
  };
}
