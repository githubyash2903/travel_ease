import pool from './db';
import { runMigrations } from './migrate';
import { usersTable } from './schemas/001_users';
import { flightsTable } from './schemas/flights/006_flights';
import { hotelsTable } from './schemas/hotels/002_hotels';
import { roomsTable } from './schemas/hotels/003_rooms';
import { hotelBookingsTable } from './schemas/hotels/004_hotels_bookings';
import { hotelBookingRoomsTable } from './schemas/hotels/005_hotel_booking_rooms';
// import other schemas here

export class DatabaseInitializer {
  static async initialize() {
    await this.verifyConnection();
    await this.runSchemaMigrations();
  }

  private static async verifyConnection() {
    try {
      await pool.query('SELECT 1');
      console.log('DB connection verified');
    } catch (err) {
      console.error('DB connection failed');
      throw err;
    }
  }

  private static async runSchemaMigrations() {
    await runMigrations([
      usersTable,
      hotelsTable,
      roomsTable,
      hotelBookingsTable,
      hotelBookingRoomsTable,
      flightsTable
    ]);
  }
}
