import express from "express";
import pool from "../database/db";
const router = express.Router();

/* -------------------------------------------------------------
   AIRPORT CODE → CITY MAP
------------------------------------------------------------- */
const AIRPORT_CITY_MAP: Record<string, string> = {
  DEL: "Delhi",
  BOM: "Mumbai",
  JAI: "Jaipur",
  BLR: "Bangalore",
  HYD: "Hyderabad",
  MAA: "Chennai",
  CCU: "Kolkata",
  PNQ: "Pune",
  AMD: "Ahmedabad",
  GOI: "Goa",
};

/* -------------------------------------------------------------
   NORMALIZER → DB → UI FORMAT
------------------------------------------------------------- */
const normalizeFlight = (row: any) => ({
  id: row.id,
  airline: row.airline,
  flightNumber: `${row.airline}-${String(row.id).slice(0, 6)}`,
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
  price: Number(row.price),
  stops: row.stops,
  duration: "-",
});

/* -------------------------------------------------------------
   GET /api/flights → FRONTEND COMPATIBLE
------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const {
      from,
      to,
      departDate,
      page = "1",
      limit = "10",
    } = req.query as any;

    if (!from || !to || !departDate) {
      return res.status(400).json({
        message: "from, to and departDate are required",
      });
    }

    // 🔥 MAP airport code → city name
    const sourceCity = AIRPORT_CITY_MAP[from.toUpperCase()] || from;
    const destinationCity = AIRPORT_CITY_MAP[to.toUpperCase()] || to;

    const pageNum = Number(page);
    const pageSize = Number(limit);
    const offset = (pageNum - 1) * pageSize;

    const sql = `
      SELECT *
      FROM flights
      WHERE LOWER(source) = LOWER($1)
        AND LOWER(destination) = LOWER($2)
        AND DATE(departure) >= $3
      ORDER BY departure ASC, price ASC
      LIMIT $4 OFFSET $5
    `;

    const params = [
      sourceCity,
      destinationCity,
      departDate,
      pageSize,
      offset,
    ];

    const result = await pool.query(sql, params);

    const flights = result.rows.map(normalizeFlight);

    return res.json({
      meta: {
        total: flights.length,
        page: pageNum,
        limit: pageSize,
      },
      data: flights,
    });

  } catch (err: any) {
    console.error("❌ FLIGHT SEARCH ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
