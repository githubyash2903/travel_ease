import { Migration } from '../../migrate';

export const hotelBookingRoomsTable: Migration = {
  id: 5,
  name: 'hotel_booking_rooms',
  up: `
    CREATE TABLE IF NOT EXISTS hotel_booking_rooms (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      booking_id UUID NOT NULL
        REFERENCES hotel_bookings(id) ON DELETE CASCADE,

      room_id UUID NOT NULL
        REFERENCES rooms(id),

      quantity INT NOT NULL CHECK (quantity > 0),

      price_per_night NUMERIC(10,2) NOT NULL CHECK (price_per_night >= 0),
      total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

      UNIQUE (booking_id, room_id)
    );

    CREATE INDEX IF NOT EXISTS idx_booking_rooms_booking_id
      ON hotel_booking_rooms(booking_id);

    CREATE INDEX IF NOT EXISTS idx_booking_rooms_room_id
      ON hotel_booking_rooms(room_id);
  `,
};
