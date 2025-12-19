CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- USERS TABLE

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    is_blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
-- USER ROLES
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'user'
);

-- HOTELS & ROOMS

CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    star_rating INT NOT NULL DEFAULT 3,
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

-- FLIGHTS & FLIGHT SEATS

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


-- HOLIDAY PACKAGES

CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    duration_days INT NOT NULL
);

-- ENUMS

DO $$ BEGIN
    CREATE TYPE booking_type AS ENUM ('HOTEL', 'FLIGHT', 'BUS', 'PACKAGE');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==============================
-- MASTER BOOKINGS TABLE
-- ==============================

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_reference VARCHAR(50),
  booking_type VARCHAR(20), -- flight / hotel
  total_amount NUMERIC(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- HOTEL BOOKING DETAILS

CREATE TABLE IF NOT EXISTS hotel_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    hotel_id UUID REFERENCES hotels(id),
    room_id UUID REFERENCES rooms(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INT NOT NULL
);
-- FLIGHT BOOKING DETAILS

ALTER TABLE flight_bookings
ADD COLUMN IF NOT EXISTS adults INT NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS children INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS infants INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS cabin_class VARCHAR(20) DEFAULT 'ECONOMY',
ADD COLUMN IF NOT EXISTS total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'CONFIRMED',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();



-- BUS BOOKING DETAILS

CREATE TABLE IF NOT EXISTS bus_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    bus_id UUID REFERENCES buses(id),
    seat_id UUID REFERENCES bus_seats(id)
);

-- PACKAGE BOOKING DETAILS

CREATE TABLE IF NOT EXISTS package_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    package_id UUID REFERENCES packages(id),
    travellers INT NOT NULL
);

----------FILTER

ALTER TABLE hotels
ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1) DEFAULT 4.0;



-------     USER PROFILE UPDATE
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

ALTER TABLE users
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

UPDATE users SET role = 'admin' WHERE email = 'admin@email.com';

---OFFERS-------
CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,

  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(150),

  description TEXT NOT NULL,

  image TEXT NOT NULL,

  price VARCHAR(50),
  old_price VARCHAR(50),

  tag VARCHAR(50),
  coupon_code VARCHAR(30),

  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
