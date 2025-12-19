import pool from "./db";
import fs from "fs";
import path from "path";

/**
 * Database initialization script
 * This script creates all necessary tables when the application starts
 */
export class DatabaseInitializer {
  private static async executeQuery(query: string): Promise<void> {
    try {
      await pool.query(query);
      console.log("✅ Query executed successfully");
    } catch (error) {
      console.error("❌ Query execution failed:", error);
      throw error;
    }
  }

  private static async createUsersTable(): Promise<void> {
    const createUsersTableQuery = `
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log("📋 Creating users table...");
    await this.executeQuery(createUsersTableQuery);
  }

  private static async createFlightsTable(): Promise<void> {
    const createFlightsTableQuery = `
      CREATE TABLE IF NOT EXISTS flights (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        airline VARCHAR(150) NOT NULL,
        source VARCHAR(50) NOT NULL,
        destination VARCHAR(50) NOT NULL,
        departure TIMESTAMP NOT NULL,
        arrival TIMESTAMP NOT NULL,
        total_seats INT NOT NULL,
        price NUMERIC(10,2) NOT NULL DEFAULT 0,
        stops INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_flights_airline ON flights(airline);
      CREATE INDEX IF NOT EXISTS idx_flights_price ON flights(price);
      CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure);
      CREATE INDEX IF NOT EXISTS idx_flights_stops ON flights(stops);

      CREATE TABLE IF NOT EXISTS flight_seats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        flight_id UUID REFERENCES flights(id) ON DELETE CASCADE,
        seat_no VARCHAR(10) NOT NULL,
        class VARCHAR(50),
        price NUMERIC(10,2) NOT NULL,
        is_booked BOOLEAN DEFAULT FALSE
      );
    `;

    console.log("✈️ Creating flights and flight_seats tables...");
    await this.executeQuery(createFlightsTableQuery);
  }

  private static async createBookingEnums(): Promise<void> {
    const createEnumsQuery = `
      DO $$ BEGIN
        CREATE TYPE booking_type AS ENUM ('HOTEL', 'FLIGHT', 'BUS', 'PACKAGE');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `;

    console.log("🔧 Creating booking enums...");
    await this.executeQuery(createEnumsQuery);
  }

  private static async createBookingTables(): Promise<void> {
    const createBookingTablesQuery = `
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type booking_type NOT NULL,
        status booking_status DEFAULT 'PENDING',
        total_amount NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS flight_bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
        flight_id UUID REFERENCES flights(id),
        adults INT NOT NULL DEFAULT 1,
        children INT NOT NULL DEFAULT 0,
        infants INT NOT NULL DEFAULT 0,
        cabin_class VARCHAR(20) DEFAULT 'ECONOMY',
        total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
        status VARCHAR(20) DEFAULT 'CONFIRMED',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log("📋 Creating booking tables...");
    await this.executeQuery(createBookingTablesQuery);
  }

  private static async createAdditionalTables(): Promise<void> {
    const createAdditionalTablesQuery = `
      CREATE TABLE IF NOT EXISTS hotels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(200) NOT NULL,
        location VARCHAR(200) NOT NULL,
        description TEXT,
        star_rating INT NOT NULL DEFAULT 3,
        rating NUMERIC(2,1) DEFAULT 4.0,
        amenities JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_hotels_star_rating ON hotels(star_rating);
      CREATE INDEX IF NOT EXISTS idx_hotels_amenities ON hotels USING GIN (amenities);

      CREATE TABLE IF NOT EXISTS rooms (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
        room_type VARCHAR(150) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        capacity INT NOT NULL,
        avail_count INT NOT NULL DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_rooms_room_type ON rooms(room_type);
      CREATE INDEX IF NOT EXISTS idx_rooms_price ON rooms(price);

      CREATE TABLE IF NOT EXISTS packages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        duration_days INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS hotel_bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
        hotel_id UUID REFERENCES hotels(id),
        room_id UUID REFERENCES rooms(id),
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guests INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS package_bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
        package_id UUID REFERENCES packages(id),
        travellers INT NOT NULL
      );
    `;

    console.log("🏨 Creating hotels, rooms, packages and related booking tables...");
    await this.executeQuery(createAdditionalTablesQuery);
  }

  /**
   * Initialize all database tables
   * This method should be called when the application starts
   */
  public static async initializeDatabase(): Promise<void> {
    console.log("🚀 Starting database initialization...");
    
    try {
      // Test database connection
      await pool.query('SELECT NOW()');
      console.log("✅ Database connection successful");

      // Create tables in order of dependencies
      await DatabaseInitializer.createUsersTable();
      await DatabaseInitializer.createFlightsTable();
      await DatabaseInitializer.createBookingEnums();
      await DatabaseInitializer.createBookingTables();
      await DatabaseInitializer.createAdditionalTables();

      console.log("🎉 Database initialization completed successfully!");
      
    } catch (error) {
      console.error("💥 Database initialization failed:", error);
      throw error;
    }
  }

  /**
   * Alternative method to run the full schema.sql file if it exists
   */
  public static async runFullSchema(): Promise<void> {
    try {
      const schemaPath = path.join(__dirname, '../../Backend/src/database/schema.sql');
      
      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log("📁 Running full schema from schema.sql file...");
        await DatabaseInitializer.executeQuery(schema);
        console.log("✅ Full schema executed successfully!");
      } else {
        console.log("⚠️ schema.sql file not found, running individual table creation...");
        await DatabaseInitializer.initializeDatabase();
      }
    } catch (error) {
      console.error("❌ Failed to run full schema:", error);
      // Fallback to individual table creation
      await DatabaseInitializer.initializeDatabase();
    }
  }

  /**
   * Check if database tables exist
   */
  public static async checkTablesExist(): Promise<boolean> {
    try {
      const result = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'flights', 'bookings', 'flight_bookings')
      `);
      
      const tableNames = result.rows.map(row => row.table_name);
      const requiredTables = ['users', 'flights', 'bookings', 'flight_bookings'];
      
      return requiredTables.every(table => tableNames.includes(table));
    } catch (error) {
      console.error("Error checking table existence:", error);
      return false;
    }
  }
}

// Export the main initialization function for easy use
export const initializeDatabase = DatabaseInitializer.initializeDatabase;
export const runFullSchema = DatabaseInitializer.runFullSchema;
export const checkTablesExist = DatabaseInitializer.checkTablesExist;
