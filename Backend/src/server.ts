import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pool from "./database/db";
import { runMigrations } from "./database/runMigrations";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/bookings";
import flightRoutes from "./routes/flights";
import userRoutes from "./routes/user/user";
import airportRoutes from "./routes/airports";
import flightBookingRoutes from "./routes/flightBookings";
import adminUserRoutes from "./routes/admin/user";
import offersRoutes from "./routes/offers";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Connect DB -> run migrations -> start server
pool.connect()
  .then(() => {
    console.log("✅ Postgres connected");
    return runMigrations();
  })
  .then(() => {
    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/hotels", hotelRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/flights", flightRoutes);
    app.use("/api/user", userRoutes); 
    app.use("/api/airports", airportRoutes);
    app.use("/api/flight-bookings", flightBookingRoutes);
    app.use("/api/offers", offersRoutes);
    
    app.use("/api/admin/users", adminUserRoutes);


    const PORT = Number(process.env.PORT || 4000);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
