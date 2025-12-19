import { Request, Response } from "express";
import pool from "../../database/db";

/**
 * POST /api/flight-bookings
 * Create a flight booking
 */
export const createFlightBooking = async (req: Request, res: Response) => {
  try {
    const {
      flightId,
      adults = 1,
      children = 0,
      infants = 0,
      cabinClass = "ECONOMY",
      totalPrice,
    } = req.body;

    if (!flightId || !totalPrice) {
      return res.status(400).json({ message: "flightId and totalPrice required" });
    }

    const result = await pool.query(
      `
      INSERT INTO flight_bookings
      (flight_id, adults, children, infants, cabin_class, total_price)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [flightId, adults, children, infants, cabinClass, totalPrice]
    );

    return res.status(201).json({
      message: "Flight booked successfully",
      booking: result.rows[0],
    });

  } catch (err: any) {
    console.error("❌ FLIGHT BOOKING ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
