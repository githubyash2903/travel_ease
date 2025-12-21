import { Migration } from '../../migrate';

export const hotelsTable: Migration = {
  id: 2,
  name: 'hotels',
  up: `
    CREATE TABLE IF NOT EXISTS hotels (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      name TEXT NOT NULL,
      description TEXT,

      city TEXT NOT NULL,
      state TEXT NOT NULL,
      address TEXT NOT NULL,

      rating NUMERIC(3,2) CHECK (rating >= 0 AND rating <= 5),
      rating_count INTEGER NOT NULL DEFAULT 0 CHECK (rating_count >= 0),

      min_price_per_night NUMERIC(10,2) NOT NULL CHECK (min_price_per_night >= 0),

      amenities JSONB NOT NULL DEFAULT '{}'::jsonb,
      images JSONB NOT NULL DEFAULT '[]'::jsonb,

      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city);
    CREATE INDEX IF NOT EXISTS idx_hotels_active ON hotels(is_active);
    CREATE INDEX IF NOT EXISTS idx_hotels_city_active ON hotels(city, is_active);
    CREATE INDEX IF NOT EXISTS idx_hotels_amenities ON hotels USING GIN (amenities);
    CREATE INDEX IF NOT EXISTS idx_hotels_min_price ON hotels(min_price_per_night);
    CREATE INDEX IF NOT EXISTS idx_hotels_rating ON hotels(rating);
  `,
};
