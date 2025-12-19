import { Request, Response } from "express";
import pool from "../database/db"; // make sure your db connection file path is correct

// -------------------------------------------------------------
// NORMALIZER → Converts DB flight row into UI-ready object
// -------------------------------------------------------------
const normalizeDBFlight = (row: any) => {
  return {
    id: row.id,
    airline: row.airline,
    flightNumber: `${row.airline}-${row.id.slice(0, 6)}`,
    departure: {
      airport: row.source,
      code: row.source,
      time: row.departure.toISOString().slice(11, 16),
    },
    arrival: {
      airport: row.destination,
      code: row.destination,
      time: row.arrival.toISOString().slice(11, 16),
    },
    duration: "-", // optional: calculate if you want
    stops: row.stops,
    price: Number(row.price),
    cabinClass: "ECONOMY",
    raw: row,
  };
};

// -------------------------------------------------------------
// GET /flights/search  → REAL-TIME DATABASE SEARCH
// -------------------------------------------------------------
export const searchFlights = async (req: Request, res: Response) => {
  console.log("searchFlights")
  try {
    const {
      from,
      to,
      departDate,
      airline,
      minPrice,
      maxPrice,
      stops,
    } = req.query;

    if (!from || !to || !departDate) {
      return res.status(400).json({
        message: "from, to, and departDate are required",
      });
    }

    let query = `SELECT * FROM flights WHERE source = $1 AND destination = $2`;
    let params: any[] = [from, to];
    let index = 3;

    // date filter (ISO date only)
    query += ` AND DATE(departure) = $${index}`;
    params.push(departDate);
    index++;

    if (airline) {
      query += ` AND LOWER(airline) = LOWER($${index})`;
      params.push(airline);
      index++;
    }

    if (minPrice) {
      query += ` AND price >= $${index}`;
      params.push(minPrice);
      index++;
    }

    if (maxPrice) {
      query += ` AND price <= $${index}`;
      params.push(maxPrice);
      index++;
    }

    if (stops !== undefined) {
      query += ` AND stops = $${index}`;
      params.push(Number(stops));
      index++;
    }

    query += ` ORDER BY price ASC`;

    const result = await pool.query(query, params);

    const normalizedFlights = result.rows.map((row) =>
      normalizeDBFlight(row)
    );
      console.log(normalizedFlights)
    return res.json({
      flights: normalizedFlights,
    });

  } catch (error: any) {
    console.error("❌ DATABASE SEARCH ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch flights",
      error: error.message,
    });
  }
};

// -------------------------------------------------------------
// GET /flights/:id → GET SINGLE FLIGHT FROM DB
// -------------------------------------------------------------
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const flight = await pool.query(
      `SELECT * FROM flights WHERE id = $1`,
      [id]
    );

    if (flight.rows.length === 0) {
      return res.status(404).json({ message: "Flight not found" });
    }

    return res.json({
      flight: normalizeDBFlight(flight.rows[0]),
    });
  } catch (error: any) {
    console.error("❌ DATABASE FLIGHT DETAIL ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch flight details",
      error: error.message,
    });
  }
};
