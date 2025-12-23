import { Migration } from '../../migrate';

export const holidayPackagesTable: Migration = {
  id: 5,
  name: 'holiday_packages',
  up: `
    CREATE TABLE IF NOT EXISTS holiday_packages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      -- Core display
      title TEXT NOT NULL,
      destination TEXT NOT NULL,
      category TEXT NOT NULL,

      overview TEXT,

      -- Duration
      duration_days INT NOT NULL CHECK (duration_days > 0),
      duration_nights INT NOT NULL CHECK (duration_nights >= 0),

      -- Pricing
      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      taxes NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (taxes >= 0),

      -- Rating
      rating NUMERIC(3,2) CHECK (rating >= 0 AND rating <= 5),

      -- People constraint
      min_persons INT NOT NULL DEFAULT 1 CHECK (min_persons > 0),

      -- Media
      cover_image TEXT NOT NULL,
      images JSONB NOT NULL DEFAULT '[]'::jsonb,

      -- Inclusions
      inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,

      -- Day-wise itinerary
      itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
      -- [{ day: 1, title: "...", description: "..." }]

      is_active BOOLEAN NOT NULL DEFAULT TRUE,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_holidays_active
      ON holiday_packages(is_active);

    CREATE INDEX IF NOT EXISTS idx_holidays_price
      ON holiday_packages(price);

    CREATE INDEX IF NOT EXISTS idx_holidays_rating
      ON holiday_packages(rating);

    CREATE INDEX IF NOT EXISTS idx_holidays_category
      ON holiday_packages(category);

    CREATE INDEX IF NOT EXISTS idx_holidays_destination
      ON holiday_packages(destination);

    CREATE INDEX IF NOT EXISTS idx_holidays_inclusions_gin
      ON holiday_packages USING GIN (inclusions);
  `,
};
