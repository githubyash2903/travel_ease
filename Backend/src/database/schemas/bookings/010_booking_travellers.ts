import { Migration } from "../../migrate";

export const travellersTable: Migration = {
  id: 10,
  name: "booking_travellers",
  up: `
    CREATE TYPE id_proof_type AS ENUM ('AADHAR','PASSPORT','DRIVING_LICENSE','VOTER_ID');

    CREATE TABLE IF NOT EXISTS booking_travellers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,

      full_name TEXT NOT NULL,
      age INT NOT NULL CHECK (age > 0),
      gender TEXT NOT NULL CHECK (gender IN ('MALE','FEMALE','OTHER')),

      id_proof_type id_proof_type NOT NULL,
      id_proof_number TEXT NOT NULL,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

      UNIQUE (booking_id, id_proof_type, id_proof_number)
    );

    CREATE INDEX IF NOT EXISTS idx_travellers_booking
      ON booking_travellers(booking_id);
  `,
};
