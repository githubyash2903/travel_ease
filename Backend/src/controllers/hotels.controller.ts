import { Request, Response } from "express";
import pool from "../database/db";

/* -------------------------------------------------
   GET /api/hotels  → SEARCH HOTELS (LISTING)
------------------------------------------------- */
export const searchHotels = async (req: Request, res: Response) => {
  try {
    const {
      city,
      page = "1",
      limit = "10",
    } = req.query as any;

    if (!city) {
      return res.status(400).json({ message: "city is required" });
    }

    const pageNum = Number(page);
    const pageSize = Number(limit);
    const offset = (pageNum - 1) * pageSize;

    // 🔥 IMPORTANT: min room price per hotel
    const sql = `
      SELECT
        h.id,
        h.name,
        h.location,
        h.description,
        h.star_rating,
        h.amenities,
        MIN(r.price) AS price_per_night
      FROM hotels h
      JOIN rooms r ON r.hotel_id = h.id
      WHERE LOWER(h.location) = LOWER($1)
      GROUP BY h.id
      ORDER BY h.star_rating DESC
      LIMIT $2 OFFSET $3
    `;

    const params = [city, pageSize, offset];

    const hotelsRes = await pool.query(sql, params);

    res.json({
      hotels: hotelsRes.rows,
      page: pageNum,
      limit: pageSize,
    });
  } catch (err) {
    console.error("❌ HOTEL SEARCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
};

/* -------------------------------------------------
   GET /api/hotels/:id → HOTEL DETAIL
------------------------------------------------- */
export const getHotelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hotelRes = await pool.query(
      `SELECT * FROM hotels WHERE id = $1`,
      [id]
    );

    if (!hotelRes.rows.length) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const roomsRes = await pool.query(
      `SELECT * FROM rooms WHERE hotel_id = $1 ORDER BY price ASC`,
      [id]
    );

    res.json({
      hotel: hotelRes.rows[0],
      rooms: roomsRes.rows,
    });
  } catch (err) {
    console.error("❌ HOTEL DETAIL ERROR:", err);
    res.status(500).json({ message: "Failed to fetch hotel" });
  }
};

/* -------------------------------------------------
   GET /api/hotels/cities → SEARCH DROPDOWN
------------------------------------------------- */
export const getHotelCities = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT location FROM hotels ORDER BY location
    `);

    res.json({
      cities: result.rows.map(r => ({ name: r.location })),
    });
  } catch (err) {
    console.error("❌ HOTEL CITIES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

/* -------------------------------------------------
   GET /api/hotels/room-types
------------------------------------------------- */
export const getRoomTypes = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT room_type FROM rooms ORDER BY room_type
    `);

    res.json({
      roomTypes: result.rows.map(r => r.room_type),
    });
  } catch (err) {
    console.error("❌ ROOM TYPES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch room types" });
  }
};

/* -------------------------------------------------
   POST /api/hotels/book
------------------------------------------------- */
export const bookHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId, roomId, checkin, checkout, guests } = req.body;

    if (!hotelId || !roomId || !checkin || !checkout) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    res.json({
      booking: {
        id: crypto.randomUUID(),
        hotelId,
        roomId,
        checkin,
        checkout,
        guests,
        status: "CONFIRMED",
      },
    });
  } catch (err) {
    console.error("❌ HOTEL BOOK ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};
