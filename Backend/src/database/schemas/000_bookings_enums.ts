import { Migration } from "../migrate";

export const bookingEnums: Migration = {
  id: 0,
  name: "booking_enums",
  up: `
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'booking_type'
      ) THEN
        CREATE TYPE booking_type AS ENUM ('HOTEL', 'FLIGHT', 'PACKAGE');
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'booking_status'
      ) THEN
        CREATE TYPE booking_status AS ENUM ('PENDING', 'APPROVED', 'DECLINED', 'CANCELLED');
      END IF;
    END
    $$;
  `,
};
