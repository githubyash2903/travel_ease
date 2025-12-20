import { Migration } from '../../migrate';

export const hotelBookingsTable: Migration = {
  id: 4,
  name: 'hotel_bookings',
  up: `
    CREATE TABLE IF NOT EXISTS hotel_bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      user_id UUID NOT NULL REFERENCES users(id),
      hotel_id UUID NOT NULL REFERENCES hotels(id),

      check_in DATE NOT NULL,
      check_out DATE NOT NULL,

      nights INT GENERATED ALWAYS AS (check_out - check_in) STORED,

      status TEXT NOT NULL CHECK (
        status IN ('PENDING', 'CONFIRMED', 'CANCELLED')
      ),

      total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),

      cancelled_at TIMESTAMPTZ,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

      CHECK (check_out > check_in)
    );

    CREATE INDEX IF NOT EXISTS idx_hotel_bookings_user_id
      ON hotel_bookings(user_id);

    CREATE INDEX IF NOT EXISTS idx_hotel_bookings_hotel_id
      ON hotel_bookings(hotel_id);

    CREATE INDEX IF NOT EXISTS idx_hotel_bookings_dates
      ON hotel_bookings(check_in, check_out);

    CREATE INDEX IF NOT EXISTS idx_hotel_bookings_status
      ON hotel_bookings(status);
  `,
};
