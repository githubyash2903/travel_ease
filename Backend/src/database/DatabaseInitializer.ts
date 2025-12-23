import pool from "./db";
import { runMigrations } from "./migrate";
import { usersTable } from "./schemas/001_users";
import { hotelsTable } from "./schemas/hotels/002_hotels";
import { roomsTable } from "./schemas/hotels/003_rooms";
import { flightsTable } from "./schemas/flights/004_flights";
import { holidayPackagesTable } from "./schemas/holiday_packages/005_holiday_packages";
import { bookingsTable } from "./schemas/bookings/006_bookings";
import { hotelBookingDetailsTable } from "./schemas/bookings/007_hotel_bookings";
import { flightBookingDetailsTable } from "./schemas/bookings/008_flight_bookings";
import { packageBookingDetailsTable } from "./schemas/bookings/009_package_bookings";
import { bookingEnums } from "./schemas/000_bookings_enums";
// import other schemas here

export class DatabaseInitializer {
  static async initialize() {
    await this.verifyConnection();
    await this.runSchemaMigrations();
  }

  private static async verifyConnection() {
    try {
      await pool.query("SELECT 1");
      console.log("DB connection verified");
    } catch (err) {
      console.error("DB connection failed");
      throw err;
    }
  }

  private static async runSchemaMigrations() {
    await runMigrations([
      bookingEnums,
      usersTable,
      hotelsTable,
      roomsTable,
      flightsTable,
      holidayPackagesTable,
      bookingsTable,
      hotelBookingDetailsTable,
      flightBookingDetailsTable,
      packageBookingDetailsTable,
    ]);
  }
}
