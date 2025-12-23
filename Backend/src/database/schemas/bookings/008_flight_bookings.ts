import { Migration } from "../../migrate";

export const flightBookingDetailsTable: Migration = {
  id: 8,
  name: 'flight_booking_details',
  up: `
    CREATE TABLE IF NOT EXISTS flight_booking_details (
      booking_id UUID PRIMARY KEY
        REFERENCES bookings(id) ON DELETE CASCADE,

      flight_id UUID NOT NULL REFERENCES flights(id),

      seats INT NOT NULL CHECK (seats > 0),
      price_per_seat NUMERIC(10,2) NOT NULL CHECK (price_per_seat >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_flight_booking_flight
      ON flight_booking_details(flight_id);
  `,
};
