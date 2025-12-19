import { Response } from "express";
import pool from "../database/db";
import { AuthRequest } from "../middlewares/auth";

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // HOTEL BOOKINGS
    const hotelBookings = await pool.query(`
      SELECT 
        b.id AS booking_id,
        b.status,
        hb.check_in AS date,
        h.name AS title,
        'hotel' AS type
      FROM bookings b
      JOIN hotel_bookings hb ON hb.booking_id = b.id
      JOIN hotels h ON h.id = hb.hotel_id
      WHERE b.user_id = $1
      ORDER BY hb.check_in DESC
    `, [userId]);

    // FLIGHT BOOKINGS
    const flightBookings = await pool.query(`
      SELECT 
        b.id AS booking_id,
        b.status,
        f.departure AS date,
        f.source || ' → ' || f.destination AS title,
        'flight' AS type
      FROM bookings b
      JOIN flight_bookings fb ON fb.booking_id = b.id
      JOIN flights f ON f.id = fb.flight_id
      WHERE b.user_id = $1
      ORDER BY f.departure DESC
    `, [userId]);

    // PACKAGE BOOKINGS (optional for later)
    const packageBookings = await pool.query(`
      SELECT 
        b.id AS booking_id,
        b.status,
        pb.travel_date AS date,
        p.title AS title,
        'package' AS type
      FROM bookings b
      JOIN package_bookings pb ON pb.booking_id = b.id
      JOIN packages p ON p.id = pb.package_id
      WHERE b.user_id = $1
      ORDER BY pb.travel_date DESC
    `, [userId]);

    return res.json({
      success: true,
      bookings: [
        ...hotelBookings.rows,
        ...flightBookings.rows,
        ...packageBookings.rows
      ]
    });

  } catch (error) {
    console.error("Bookings Fetch Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
