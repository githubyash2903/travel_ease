import { Migration } from '../../migrate';

export const flightsTable: Migration = {
  id: 4,
  name: 'flights',
  up: `
    CREATE TABLE IF NOT EXISTS flights (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      airline TEXT NOT NULL,

      source TEXT NOT NULL,
      destination TEXT NOT NULL,

      departure TIMESTAMPTZ NOT NULL,
      arrival TIMESTAMPTZ NOT NULL,

      total_seats INT NOT NULL CHECK (total_seats > 0),
      price NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
      stops INT NOT NULL DEFAULT 0 CHECK (stops >= 0),

      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_flights_airline ON flights(airline);
    CREATE INDEX IF NOT EXISTS idx_flights_price ON flights(price);
    CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure);
    CREATE INDEX IF NOT EXISTS idx_flights_stops ON flights(stops);
    CREATE INDEX IF NOT EXISTS idx_flights_active ON flights(is_active);
  `,
};
