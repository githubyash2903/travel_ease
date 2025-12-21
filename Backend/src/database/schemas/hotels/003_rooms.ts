import { Migration } from '../../migrate';

export const roomsTable: Migration = {
  id: 3,
  name: 'rooms',
  up: `
    CREATE TABLE IF NOT EXISTS rooms (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,

      type TEXT NOT NULL,
      description TEXT,

      area_sqft NUMERIC(6,2) CHECK (area_sqft > 0),
      max_occupancy INT NOT NULL CHECK (max_occupancy > 0),
      beds JSONB NOT NULL DEFAULT '[]'::jsonb,
      -- example: [{ "type": "queen", "count": 1 }, { "type": "single", "count": 2 }]

      price_per_night NUMERIC(10,2) NOT NULL CHECK (price_per_night >= 0),
      total_rooms INT NOT NULL CHECK (total_rooms > 0),

      amenities JSONB NOT NULL DEFAULT '{}'::jsonb,
      images JSONB NOT NULL DEFAULT '[]'::jsonb,

      is_active BOOLEAN NOT NULL DEFAULT TRUE,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

      UNIQUE (hotel_id, type)
    );

    CREATE INDEX IF NOT EXISTS idx_rooms_hotel_id ON rooms(hotel_id);
    CREATE INDEX IF NOT EXISTS idx_rooms_active ON rooms(is_active);
    CREATE INDEX IF NOT EXISTS idx_rooms_amenities ON rooms USING GIN (amenities);
    CREATE INDEX IF NOT EXISTS idx_rooms_beds ON rooms USING GIN (beds);
  `,
};
