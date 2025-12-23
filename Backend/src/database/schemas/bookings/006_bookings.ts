import { Migration } from '../../migrate';

export const bookingsTable: Migration = {
  id: 6,
  name: 'bookings',
  up: `
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

      booking_type booking_type NOT NULL,
      status booking_status NOT NULL DEFAULT 'PENDING',

      -- pricing snapshot
      base_amount NUMERIC(10,2) NOT NULL CHECK (base_amount >= 0),
      taxes NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (taxes >= 0),
      total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),

      -- admin actions
      approved_by UUID REFERENCES users(id),
      approved_at TIMESTAMPTZ,
      declined_by UUID REFERENCES users(id),
      declined_at TIMESTAMPTZ,
      decline_reason TEXT,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

      CHECK (
        (status != 'DECLINED') OR (decline_reason IS NOT NULL)
      )
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(booking_type);
  `,
};
