import { Request, Response } from "express";
import pool from "../../database/db";

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;

    // Validate
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    // Query hotels where location matches
    const result = await pool.query(
      `
      SELECT 
        h.id AS hotel_id,
        h.name,
        h.location,
        h.description,
        h.created_at,
        json_agg(
          json_build_object(
            'room_id', r.id,
            'room_type', r.room_type,
            'price', r.price,
            'capacity', r.capacity,
            'avail_count', r.avail_count
          )
        ) AS rooms
      FROM hotels h
      LEFT JOIN rooms r ON r.hotel_id = h.id
      WHERE h.location ILIKE $1
      GROUP BY h.id
      
      `,
      [`%${location}%`]
    );

    return res.status(200).json({
      message: "Hotels fetched successfully",
      hotels: result.rows,
    });

  } catch (error) {
    console.error("Search Hotels Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
