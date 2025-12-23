import { Migration } from '../../migrate';

export const hotelBookingDetailsTable: Migration = {
  id: 7,
  name: 'hotel_booking_details',
  up: `
    CREATE TABLE IF NOT EXISTS hotel_booking_details (
      booking_id UUID PRIMARY KEY
        REFERENCES bookings(id) ON DELETE CASCADE,

      hotel_id UUID NOT NULL REFERENCES hotels(id),
      room_id UUID NOT NULL REFERENCES rooms(id),

      check_in DATE NOT NULL,
      check_out DATE NOT NULL,

      rooms_count INT NOT NULL CHECK (rooms_count > 0),
      guests INT NOT NULL CHECK (guests > 0),

      price_per_night NUMERIC(10,2) NOT NULL CHECK (price_per_night >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_hotel_booking_hotel
      ON hotel_booking_details(hotel_id);
  `,
};
